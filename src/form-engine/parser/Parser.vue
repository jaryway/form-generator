<!-- eslint-disable no-unreachable -->
<script>
import { deepClone } from '@/utils/index'
import render from '../render/render.js'
import { filterLinkData } from './example/mock'
import getIn from 'lodash/get'
import throttle from 'lodash/throttle'
import { filterLink, listField } from './example/api'
import { calcCondition } from './utils/condition-helper'

const ruleTrigger = {
  'el-input': 'blur',
  'el-input-number': 'blur',
  'el-select': 'change',
  'el-radio-group': 'change',
  'el-checkbox-group': 'change',
  'el-cascader': 'change',
  'el-time-picker': 'change',
  'el-date-picker': 'change',
  'el-rate': 'change',
}

const layouts = {
  colFormItem(h, scheme) {
    console.log('dataSource.Parse.4')
    const config = scheme.config
    const listeners = buildListeners.call(this, scheme)
    const { formConfCopy } = this
    const model = this[formConfCopy.formModel]

    if (scheme.typeId === 'CHILD_FORM') {
      console.log('scheme.colFormItem', scheme.typeId, model, scheme.vModel)
    }

    let labelWidth = config.labelWidth ? `${config.labelWidth}px` : null
    if (config.showLabel === false) labelWidth = '0'
    // console.log('dataSource.Parse.5')
    return (
      <el-col span={config.span}>
        <el-form-item label-width={labelWidth} prop={scheme.vModel} label={config.showLabel ? config.label : ''}>
          <render conf={scheme} on={listeners} values={model} />
        </el-form-item>
      </el-col>
    )
  },
  rowFormItem(h, scheme) {
    // console.log('dataSource.Parse.3')
    if (scheme.typeId === 'CHILD_FORM') {
      return layouts.colFormItem.call(this, h, scheme)
    }
    let child = renderChildren.apply(this, arguments)
    if (scheme.type === 'flex') {
      child = (
        <el-row type={scheme.type} justify={scheme.justify} align={scheme.align}>
          {child}
        </el-row>
      )
    }
    return (
      <el-col span={scheme.span}>
        <el-row gutter={scheme.gutter || 8}>{child}</el-row>
      </el-col>
    )
  },
}

const buildLinkQuery = function (field) {
  return () => {
    const self = this
    const model = self[self.formConfCopy.formModel]
    const { filterCond, config, dataNum, typeId, fieldIdx } = field
    const cond = filterCond.map((m) => {
      // type：0 表示自定义 | 1 当前表单
      // condition 运算符
      let value = ''
      const { type, condition, value2, value: fieldId } = m
      if (type === 0) {
        value = getIn(model, value2)
      } else {
        value = value2
      }

      if (Array.isArray(value)) {
        if (['MEMBER_RADIO', 'MEMBER_CHECK', 'DEPT_RADIO', 'DEPT_CHECK'].includes(typeId)) {
          return value.map((j) => j.id)
        }
      } else {
        value = value === undefined || value === null ? [] : [value]
      }

      return { fieldId, typeId, condition, value }
    })

    const loopFieldList = (list) => {
      return (list || []).reduce((prev, cur) => {
        if (cur.children) return [...prev, cur.vModel, ...loopFieldList(cur.children)]
        return [...prev, cur.vModel]
      }, [])
    }

    // 监听字段变化，构建查询参数，发起查询请求
    const requestParams = {
      appId: this.appId, //
      formDesignerId: config.dbTable,
      fieldList: loopFieldList(config.linkList),
      multi: dataNum * 1 - 1,
      filter: { rel: 0, cond },
    }

    const hasEmpty = cond.some((m) => m.value.length < 1 && m.condition < 16)
    if (hasEmpty) return

    return filterLink(requestParams)
      .then((resp) => resp.data)
      .then((resp) => {
        const { list, pageNum, pageSize, total } = resp || {}

        if (dataNum > 1) {
          // this.$set(this.fields[fieldIdx], 'datalist', list)
          self.$set(field, 'linkFieldValues', list || [])
          this.$set(field, 'linkData', { pageNum, pageSize, total, ...requestParams })
        } else {
          //
          self.$set(field, 'linkFieldValues', list?.[0] || {})
        }
      })
  }
}

const buildVisibilityCalc = (rule) => () => {
  const itemCalculator = (item) => {
    const field = this.formConfCopy.fields.find((m) => m.vModel === item.id)
    const value = '' // this.formConfCopy.fields.find((m) => m.vModel === item.id)
    const condValue = item.value
    // return calcCondition(condition, value, condValue)
    return true
  }
  const { conditionsList, displayFieldList, conditionsChoice } = rule
  let result

  if (conditionsChoice === 1) {
    // 满足所有条件
    result = (conditionsList || []).every(itemCalculator)
  } else {
    // 满足任一条件
    result = (conditionsList || []).some(itemCalculator)
  }

  displayFieldList

  console.log('buildVisibilityCalc', result)
}

function renderFrom(h) {
  const { formConfCopy } = this
  const model = this[formConfCopy.formModel]
  return (
    <el-row gutter={formConfCopy.gutter || 8}>
      <el-form
        size={formConfCopy.size}
        label-position={formConfCopy.labelPosition}
        disabled={formConfCopy.disabled}
        label-width={`${formConfCopy.labelWidth}px`}
        ref={formConfCopy.formRef}
        // model不能直接赋值 https://github.com/vuejs/jsx/issues/49#issuecomment-472013664
        // props={{ model: this[formConfCopy.formModel] }}
        props={{ model }}
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

function setValue(event, config, scheme, rowIndex) {
  const model = this[this.formConf.formModel]
  const { parentKey, vModel } = scheme
  if (rowIndex !== undefined) {
    this.$set(model[parentKey][rowIndex], vModel, event)
  } else {
    // this.$set(config, 'defaultValue', event)
    this.$set(model, vModel, event)
    // this.$set(this.fieldsMap[scheme.vModel].config, 'defaultValue', event)
  }
}

function buildListeners(scheme, rowIndex, cb) {
  const config = scheme.config
  const methods = this.formConf.__methods__ || {}
  const listeners = {}
  const self = this
  const model = self[self.formConfCopy.formModel]

  // 给__methods__中的方法绑定this和event
  Object.keys(methods).forEach((key) => {
    listeners[key] = (event) => methods[key].call(this, event)
  })
  // 响应 render.js 中的 vModel $emit('input', val)
  listeners.input = (event) => setValue.call(self, event, config, scheme, rowIndex)

  listeners.focus = throttle(
    function (event) {
      console.log('listeners.focus', event, scheme)

      if (['SELECT', 'SELECT-MULTIPLE'].includes(scheme.typeId)) {
        if (scheme.optionsModel === 0) return

        let requestParams = {}

        // 数据联动
        if (scheme.optionsModel === 2) {
          const { condition, linkVModel, linkForm } = scheme.dataLink || {}
          const cond = condition?.map((item) => {
            const { autoText, type, condition, curFormFieldId, field, typeId } = item
            // 联动表单的字段 =... 当前表单的字段
            let value = [autoText]
            if (type !== 0) {
              // 当前表单字段的值
              value = []
              // const curFormField = this.fieldsMap[curFormFieldId]
              // if (curFormField) {
              //   const { defaultValue } = curFormField.config
              const fieldValue = getIn(model, curFormFieldId)
              value = Array.isArray(fieldValue) ? fieldValue : [fieldValue]
              // }
            }

            return { value, fieldId: field, typeId, condition, hasEmpty: condition < 16 ? 0 : 1 }
          })

          const [appId, formDesignerId] = linkForm
          requestParams = { appId, formDesignerId, fieldList: [linkVModel], filter: { rel: 0, cond } }
        } else {
          // 关联其他表单
          const [appId, formDesignerId, fieldId] = scheme.linkValue || []
          requestParams = { appId, formDesignerId, fieldId }
        }

        // self.$set(scheme.__slot__, 'options', [{ label: Math.random(), value: Math.random() }])

        listField(requestParams)
          .then((resp) => resp.data) //
          .then((resp) => {
            console.log('this.listField', resp)
            const options = (resp.data.list || []).map((m) => ({ label: m, value: m }))
            self.$set(scheme.__slot__, 'options', options)
            cb?.(options)
          })
      }
    },
    5000,
    { trailing: false }
  )

  return listeners
}

export default {
  name: 'Parse',
  components: { render },
  props: ['formConf', 'values', 'appId', 'menuId'],

  provide() {
    return {
      linkDataRequest: async (params) => {
        // 获取关联数据
        const data = { appId: this.appId, ...params }
        const resp = await filterLink(data)
        return resp

        // const resp = await Promise.resolve(filterLinkData)
        // const { list, headList, pageNum, pageSize, total } = resp.data
        // return { list, headList, pageNum, pageSize, total }
      },
      updateFormModel: (key, value, prevKeys, mode) => {
        let model = this[this.formConfCopy.formModel]
        // console.log('updateFormModel', key, value, prevKeys, mode)
        if (prevKeys && prevKeys.filter(Boolean).length) {
          model = getIn(model, prevKeys.join('.'))
        }

        if (mode === 'insert') {
          model.splice(key, 0, value)
        } else {
          this.$set(model, key, value)
        }
      },
      // listField,
      // fieldsMap: this.fieldsMap,
      appId: this.appId,
      buildListeners: (schame, rowIndex, cb) => {
        return buildListeners.call(this, schame, rowIndex, cb)
      },
    }
  },
  data() {
    const data = {
      formConfCopy: deepClone(this.formConf),
      [this.formConf.formModel]: {},
      [this.formConf.formRules]: {},
    }
    const formConfCopy = deepClone(this.formConf)
    const initialValues = this.initFormData(data.formConfCopy.fields, data[this.formConf.formModel])
    this.buildRules(data.formConfCopy.fields, data[this.formConf.formRules])

    return data
  },
  computed: {
    // fieldsMap() {
    //   return this.formConf.fields.reduce((prev, cur) => {
    //     return { ...prev, [cur.vModel]: cur }
    //   }, {})
    // }
  },
  mounted() {
    console.log('test.mounted')
    this.buildWatch(this.formConfCopy.fields)
    this.buildDisplayRulesWatch(this.formConfCopy.fieldDisplayRules)
  },
  watch: {
    values: {
      immediate: true,
      handler(val) {
        this[this.formConf.formModel] = val
      },
    },
  },
  // watch: {
  //   values9: {
  //     immediate: true,
  //     handler(val) {
  //       this[this.formConf.formModel] = val
  //     },
  //   },
  // },
  methods: {
    initFormData(componentList, formData) {
      return componentList.reduce((prev, cur) => {
        console.log('formConf.initFormData', componentList, formData)
        const config = cur.config
        if (cur.vModel) {
          // formData[] = config.defaultValue
          return { ...prev, [cur.vModel]: config.defaultValue }
        }
        if (config.children) {
          return { ...prev, ...this.initFormData(config.children) }
        }
      }, {})
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
    buildWatch(componentList) {
      const self = this
      componentList.forEach((field) => {
        if (field.typeId === 'QUERY_CHECK') {
          const { filterCond /* config, dataNum, typeId, fieldIdx */ } = field
          const doLinkQuery = buildLinkQuery.call(self, field)
          // console.log('buildWatch', filterCond)
          filterCond.forEach((item) => {
            // type: 0 表示自定义 | 1 当前表单
            if (item.type === 0) {
              console.log('buildWatch.formModel', `${self.formConfCopy.formModel}.${item.value2}`)
              // 监听依赖的字段变化
              self.$watch(
                `${self.formConfCopy.formModel}.${item.value2}`,
                () => {
                  console.log('buildWatch.doLinkQuery')
                  // self.$set(field, 'linkFieldValues', { name: 'asdfasd' })
                  doLinkQuery()
                },
                { immediate: true }
              )
            }
          })
        }

        if (field.children) {
          this.buildWatch(field.children)
        }
      })
    },
    // 字段显隐
    buildDisplayRulesWatch(displayRules) {
      const self = this
      const caledDisplayRules = (displayRules || []).reduce((prev, cur) => {
        // 字段值发生变化，
        // 计算条件
        // 设置显示隐藏

        const { conditionsList, displayFieldList, conditionsChoice } = cur
        return conditionsList.reduce((prev, item) => {
          const prevCondition = prev[item.id] || []
          console.log('resp.fields.prevCondition', item)

          return {
            ...prev,
            [item.id]: [...prevCondition, { conditionsList, displayFieldList, conditionsChoice }],
          }
        }, prev)
      }, {})

      Object.entries(caledDisplayRules).forEach(([fieldKey, rule]) => {
        const doVisibilityCalc = buildVisibilityCalc.call(this, rule)

        // 监听字段变化
        self.$watch(fieldKey, () => doVisibilityCalc(), { immediate: true })
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
    },
  },
  render(h) {
    return renderFrom.call(this, h)
  },
}
</script>
