<script>
import getIn from 'lodash/get'
import { deepClone } from '@/utils/index'
import render from '@/components/render/render.js'
import {
  calcFieldDisplayRules,
  getFieldDisplayRulesMap,
  getVisibilityMap
} from './utils/field-display-rule-helper'
import { getLinkFields, getFieldLinksMap, calcFieldLinks, calcFieldLinkConditions } from './utils/field-link-helper'

const ruleTrigger = {
  'el-input': 'change',
  'el-input-number': 'change',
  'el-select': 'change',
  'el-radio-group': 'change',
  'el-checkbox-group': 'change',
  'el-cascader': 'change',
  'el-time-picker': 'change',
  'el-date-picker': 'change',
  'el-rate': 'change'
}

const layouts = {
  colFormItem(h, scheme) {
    if (this.visibilityMap[scheme.vModel] === false) return null
    const config = scheme.config
    const listeners = buildListeners.call(this, scheme)

    let labelWidth = config.labelWidth ? `${config.labelWidth}px` : null
    if (config.showLabel === false) labelWidth = '0'
    return (
      <el-col span={config.span}>
        <el-form-item label-width={labelWidth} prop={scheme.vModel} label={config.showLabel ? config.label : ''}>
          <render conf={scheme} on={listeners} />
        </el-form-item>
      </el-col>
    )
  },
  rowFormItem(h, scheme) {
    if (this.visibilityMap[scheme.vModel] === false) return null
    let child = renderChildren.apply(this, arguments)
    // console.log('xxxxxxx', child, scheme)

    if (scheme.typeId === 'CHILD_FORM') {
      return renderChildForm.call(this, h, scheme)
    }

    if (scheme.type === 'flex') {
      child = (
        <el-row type={scheme.type} justify={scheme.justify} align={scheme.align}>
          {child}
        </el-row>
      )
    }
    return (
      <el-col span={scheme.span}>
        <el-row gutter={scheme.gutter}>{child}</el-row>
      </el-col>
    )
  }
}

function setValue(event, config, scheme, parentScheme, index) {
  if (parentScheme) {
    this.$set(config, 'defaultValue', event)

    const formData = this[this.formConf.formModel][parentScheme.vModel]

    if (!formData) {
      this.$set(this[this.formConf.formModel], parentScheme.vModel, [{ [scheme.vModel]: event }])
    } else {
      this.$set(this[this.formConf.formModel][parentScheme.vModel][index], scheme.vModel, event)
    }
  } else {
    this.$set(config, 'defaultValue', event)
    this.$set(this[this.formConf.formModel], scheme.vModel, event)
  }

  // 处理显隐规则
  calcFieldDisplayRules(this.fieldDisplayRulesMap, scheme, this.formConfCopy.fields).forEach((m) => {
    this.$set(this.visibilityMap, m.id, m.visible)
  })
  // const cond = calcFieldLinks(this.fieldLinksMap, scheme, this[this.formConf.formModel], index)

  // console.log('linkFields.calcFieldLinks', cond)
  // 处理数据联动
  // 关联查询
}

function onBlur(event, config, scheme, parentScheme, index) {
  // 处理关联查询
  const cond = calcFieldLinks(this.fieldLinksMap, scheme, this[this.formConf.formModel], parentScheme, index)
  // 如果
  console.log('linkFields.calcFieldLinks', scheme, this.fieldLinksMap, parentScheme, cond)
  // 处理数据联动
  // 关联查询
}
function onMounted(event, config, scheme, parentScheme) {
  console.log('linkFields.onMounted', scheme.typeId, this.fieldLinksMap, scheme.vModel)
  const formData = this[this.formConf.formModel]
  if (scheme.typeId === 'QUERY_CHECK') {
    // 关联查询初始化时
    doLinkQuery.call(this, scheme, formData)
  } else if (scheme.typeId === 'CHILD_FORM' && scheme.children.some(m => m.typeId === 'QUERY_CHECK')) {
    // console.log('linkFields.onMounted......', scheme)
    const linkScheme = scheme.children.find(m => m.typeId === 'QUERY_CHECK')
    // 此时的关联查询条件字段只能是子表单本身的字段及其他非子表单字段
    // 如果是子表单，有多条记录则要发起多个请求
    const values = formData[scheme.vModel] || []
    values.forEach((_, i) => doLinkQuery.call(this, linkScheme, formData, i))
  }
}

function doLinkQuery(scheme, formData, index) {
  // 检查关联查询字段的所有过滤条件的值都不为空
  const conditions = calcFieldLinkConditions(scheme, formData, index)
  const fieldList = scheme.linkList.map((m) => m.vModel)
  const formDesignerId = scheme.config.dbTable
  const params = {
    fieldList,
    formDesignerId,
    filter: { cond: conditions, rel: 0, },
    multi: scheme.dataNum > 1 ? 1 : 0,
    pageNum: 1,
    pageSize: scheme.dataNum,
  }
  const key = [scheme.vModel, index || 0].join('_')
  // console.log('doLinkQuery', this.linkQueryMap, conditions, params)
  // 没有条件，不发起请求
  if (!conditions) return
  // this.$get(this.linkQueryMap, `${key}.conditions`)
  const prevConditions = this.linkQueryMap[`${key}.conditions`] || []
  const hasChanged = conditions.some((m, i) => {
    if (!prevConditions[i]) return true
    if (prevConditions[i].value.length !== m.value.length) return true
    // console.log('doLinkQuery.run.hasChanged', prevConditions[i].value, m.value, prevConditions[i].value.some(n => !m.value.includes(n)))
    return prevConditions[i].value.some(n => !m.value.includes(n))
  })

  // 条件发生了变化，不发起请求
  if (!hasChanged) return

  // 条件发生了变化，此时才发起请求
  this.$set(this.linkQueryMap, `${key}.conditions`, conditions)
  const onSuccess = (resp) => {
    this.$set(this.linkQueryMap, `${key}.response`, resp)
    const row = getIn(formData, [scheme.parentKey, index])
    // const newRow = { ...row, ...resp[0] }

    // this.$set(formData[scheme.parentKey], index, row)
    // console.log('doLinkQuery.run.onSuccess', formData, newRow)
    // 数据加载成功后
    // scheme.response = resp
  }

  // 此时才发起请求
  new Promise(resolve => {
    setTimeout(() => {
      const resp = []
      for (let index = 0; index < params.pageSize; index++) {
        const item = scheme.linkList.reduce((prev, cur) => {
          return { ...prev, [cur.vModel]: Math.random().toString(16).slice(2) }
        }, {})
        resp.push(item)
      }

      resolve(resp)
    }, 1000)
  }).then(onSuccess)
  console.log('doLinkQuery.run', this.linkQueryMap, conditions, params)
  // console.log('doLinkQuery', scheme, parentScheme, formData, conditions)
}

function buildListeners(scheme, parentScheme, index) {
  const config = scheme.config
  const methods = this.formConf.__methods__ || {}
  const listeners = {}

  // 给__methods__中的方法绑定this和event
  Object.keys(methods).forEach((key) => {
    listeners[key] = (event) => methods[key].call(this, event)
  })
  // 响应 render.js 中的 vModel $emit('input', val)
  listeners.input = (event) => setValue.call(this, event, config, scheme, parentScheme, index)
  listeners.blur = (event) => onBlur.call(this, event, config, scheme, parentScheme, index)
  listeners.mounted = (event) => onMounted.call(this, event, config, scheme, parentScheme, index)

  return listeners
}

function renderFrom(h) {
  const { formConfCopy } = this

  return (
    <el-row gutter={formConfCopy.gutter}>
      <el-form
        size={formConfCopy.size}
        label-position={formConfCopy.labelPosition}
        disabled={formConfCopy.disabled}
        label-width={`${formConfCopy.labelWidth}px`}
        ref={formConfCopy.formRef}
        // model不能直接赋值 https://github.com/vuejs/jsx/issues/49#issuecomment-472013664
        props={{ model: this[formConfCopy.formModel] }}
        rules={this[formConfCopy.formRules]}
      >
        {renderFormItem.call(this, h, formConfCopy.fields)}
        {formConfCopy.formBtns && formBtns.call(this, h)}
      </el-form>
    </el-row>
  )
}

function formBtns(h) {
  return (
    <el-col>
      <el-form-item size='large'>
        <el-button type='primary' onClick={this.submitForm}>
          提交
        </el-button>
        <el-button onClick={this.resetForm}>重置</el-button>
      </el-form-item>
    </el-col>
  )
}

function renderFormItem(h, elementList) {
  return elementList.map((scheme) => {
    const config = scheme.config
    const layout = layouts[config.layout]

    if (layout) {
      return layout.call(this, h, scheme)
    }
    throw new Error(`没有与${config.layout}匹配的layout`)
  })
}

function renderChildren(h, scheme) {
  const config = scheme.config
  if (!Array.isArray(config.children)) return null
  return renderFormItem.call(this, h, config.children)
}

function renderChildForm(h, scheme) {
  const scopedSlots = (field, editable, parent) => {
    // 区分是展示模式还是编辑模式

    return {
      default: (scope) => {
        // 编辑模式
        if (this.isEdit && editable !== false) {
          const fieldCopy = deepClone(field)
          const listeners = buildListeners.call(this, fieldCopy, scheme, scope.$index)
          console.log('scopedSlots', field.typeId)
          return (
            <el-form-item label-width='0'>
              <render
                conf={fieldCopy}
                on={listeners}
                key={scope.$index}
                use-value={true}
                value={scope.row[field.vModel]}
              />
            </el-form-item>
          )
        }
        if (['MEMBER_RADIO', 'MEMBER_CHECK', 'DEPT_RADIO', 'DEPT_CHECK'].includes(field.typeId)) {
          return scope.row[field.vModel]?.map((m) => m.name).join(',')
        }

        if (parent && parent.typeId === 'QUERY_CHECK') {
          const resp = this.linkQueryMap[`${parent.vModel}_${scope.$index}.response`]
          console.log('renderChildForm.scope', this.linkQueryMap, `${parent.vModel}_${scope.$index}.response`, resp)
          // console.log('renderChildForm.scope', field, resp)
          return resp?.[0][field.vModel]
        }

        return scope.row[field.vModel]
      }
    }
  }
  const buildColumns = (children) => {
    return (children || []).map((item, idx) => {
      const childProp = item.typeId === 'QUERY_CHECK' ? 'linkList' : 'children'
      const hasChild = item[childProp] && item[childProp].length

      if (item.typeId === 'QUERY_CHECK') {
        return (
          <el-table-column props={{ label: item.config.label }} key={idx}>
            {(item.linkList || []).map((child, index) => {
              return (
                <el-table-column
                  key={index}
                  props={{ label: child.label, prop: child.vModel }}
                  scopedSlots={scopedSlots(child, false, item)}
                />
              )
            })}
          </el-table-column>
        )
      }

      return (
        <el-table-column
          props={{ label: item.config.label, prop: hasChild ? undefined : item.vModel }}
          scopedSlots={scopedSlots(item)}
        >
          {hasChild && buildColumns(item[childProp])}
        </el-table-column>
      )
    })
  }

  const dataSource = this[this.formConf.formModel][scheme.vModel]

  const props = {
    'data': dataSource,
    'size': scheme.config.size,
    'stripe': scheme.config.stripe,
    'border': scheme.config.border,
    'fit': scheme.config.fit,
    'show-header': scheme.showHeader,
    'header-cell-style': scheme.headerCellStyle,
    'cell-style': scheme.cellStyle
  }
  const defValue = {}
  const columns = buildColumns(scheme.children)
  this.initFormData(scheme.children, defValue)
  const removeItem = (i) => {
    dataSource.splice(i, 1)
  }
  const addItem = () => {
    dataSource.push(defValue)
  }

  const optionCol = (
    <el-table-column
      props={{ label: '' }}
      scopedSlots={{
        default: (props) => {
          return (
            <div class='row-head'>
              <span class='row-num'>{props.$index + 1}</span>
              <el-popconfirm
                title='确定删除吗？'
                on={{
                  onConfirm: () => {
                    removeItem(props.$index)
                  }
                }}
              >
                <span slot:default='reference' class='el-icon-delete icon-trash' />
              </el-popconfirm>
            </div>
          )
        }
      }}
    />
  )

  columns.unshift(optionCol)

  console.log('doLinkQuery.run.dataSource', dataSource)

  this.$nextTick(function () {
    // 渲染完后触发 mounted 事件
    onMounted.call(this, null, scheme.config, scheme)
  })

  return (
    <el-col span={24}>
      <el-form-item label=''>
        <el-table style='width: 100%' size='small' props={props}>
          {columns}
        </el-table>
        <el-button
          type='text'
          class='el-icon-plus'
          onClick={(event) => {
            event.stopPropagation()
            addItem()
          }}
        >
          添加
        </el-button>
      </el-form-item>
    </el-col>
  )
}

export default {
  components: {
    render
  },
  props: {
    formConf: {
      type: Object,
      required: true
    }
  },
  data() {
    const data = {
      isEdit: true,
      formConfCopy: deepClone(this.formConf),
      [this.formConf.formModel]: {},
      [this.formConf.formRules]: {}
    }
    const { fieldDisplayRules, fields } = data.formConfCopy
    this.initFormData(fields, data[this.formConf.formModel])
    this.buildRules(fields, data[this.formConf.formRules])
    // 初始化字段显隐规则字典
    data.fieldDisplayRulesMap = getFieldDisplayRulesMap(fieldDisplayRules)
    // 初始化字段显隐字典
    data.visibilityMap = getVisibilityMap(fieldDisplayRules)

    // 初始化关联查询的字段，记录哪个字段发生变化需要发起请求

    const linkFields = getLinkFields(fields)
    data.fieldLinksMap = getFieldLinksMap(linkFields)
    data.linkQueryMap = {}
    // const effects = linkFields.reduce((prev, cur) => {
    //   return [...prev, cur.filterCond.map(m => m.value2)]
    // }, [])

    console.log('linkFields.fields', data.formConfCopy.fields)
    // Object.keys(data.fieldLinksMap)

    // 发起请求，需要获取请求的条件，cond.value 运算符 cond.value2
    // 监听关联查询的条件值
    // data.linkFilterConditionMap={}

    // this.$nextTick(() => {
    //   effects.forEach((k) => {
    //     this.$watch(`${this.formConf.formModel}.fieldOagrCPB1682128026646`, (v) => {
    //       console.log('linkFields.watch', v)
    //     }, { deep: true, immediate: true })
    //   })
    // })

    return data
  },
  mounted() {

  },
  methods: {
    initFormData(componentList, formData) {
      componentList.forEach((cur) => {
        const config = cur.config
        if (cur.vModel) formData[cur.vModel] = cur.typeId === 'CHILD_FORM' ? cur.value : config.defaultValue
        if (config.children) this.initFormData(config.children, formData)
      })
    },
    buildRules(componentList, rules) {
      componentList.forEach((cur) => {
        const config = cur.config
        if (Array.isArray(config.regList)) {
          if (config.required) {
            const required = { required: config.required, message: cur.placeholder }
            if (Array.isArray(config.defaultValue)) {
              required.type = 'array'
              required.message = `请至少选择一个${config.label}`
            }
            required.message === undefined && (required.message = `${config.label}不能为空`)
            config.regList.push(required)
          }
          rules[cur.vModel] = config.regList.map((item) => {
            item.pattern && (item.pattern = eval(item.pattern))
            item.trigger = ruleTrigger && ruleTrigger[config.tag]
            return item
          })
        }
        if (config.children) this.buildRules(config.children, rules)
      })
    },
    resetForm() {
      this.formConfCopy = deepClone(this.formConf)
      this.$refs[this.formConf.formRef].resetFields()
    },
    submitForm() {
      this.$refs[this.formConf.formRef].validate((valid) => {
        if (!valid) return false
        // 触发sumit事件
        this.$emit('submit', this[this.formConf.formModel])
        return true
      })
    }
  },
  // watch: {
  //   displayFieldList: {
  //     immediate: true,
  //     handler(v) {
  //       console.log('displayFieldList', v)
  //       v.forEach(m => {
  //         const index = this.formConfCopy.fields.findIndex(f => f.vModel === m)
  //         this.$set(this.formConfCopy.fields[index], 'visibility', false)
  //       })
  //     }
  //   }
  // },
  // computed: {
  //   visibilityMap() {
  //     const res = this.displayFieldList.reduce((prev, cur) => {
  //       return { ...prev, [cur]: false }
  //     }, {})
  //     console.log('setValue.visibilityMap', res, this.displayFieldList)
  //     return res
  //   }
  // },
  render(h) {
    return renderFrom.call(this, h)
  }
}
</script>

<style lang="less" scoped>
::v-deep .el-table__body tr {
  .row-head {
    .row-num {
      display: block;
    }

    .icon-trash {
      display: none;
    }
  }

  &:hover {
    .row-head {
      .row-num {
        display: none;
      }

      .icon-trash {
        display: block;
        cursor: pointer;
      }
    }
  }
}

::v-deep .el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 0;
}
</style>
