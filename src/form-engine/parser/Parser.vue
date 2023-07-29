<!-- eslint-disable no-unreachable -->
<script>
import { deepClone } from '@/utils/index'
import render from '../render/render.js'
// import { filterLinkData } from './example/mock'
import getIn from 'lodash/get'
import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'
import { filterLink, listField } from './example/api'
import { calcCondition } from './utils/condition'

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
  colFormItem(h, scheme, key) {
    const config = scheme.config
    const listeners = buildListeners.call(this, scheme)
    const { formConfCopy, formMode } = this
    const model = this[formConfCopy.formModel]

    // console.log('colFormItem', formMode)

    if (scheme.visibility === false) return null

    let labelWidth = config.labelWidth ? `${config.labelWidth}px` : null
    if (config.showLabel === false) labelWidth = '0'
    if (formMode === 'readOnly') {
      scheme.disabled = true
      scheme.readOnly = true
      scheme.readonly = true
    } else {
      scheme.disabled = false
      scheme.readOnly = false
      scheme.readonly = false
    }

    return (
      <el-col span={config.span} key={key}>
        <el-form-item label-width={labelWidth} prop={scheme.vModel} label={config.showLabel ? config.label : ''}>
          <render conf={scheme} on={listeners} values={model} />
        </el-form-item>
      </el-col>
    )
  },
  rowFormItem(h, scheme, key) {
    if (scheme.typeId === 'CHILD_FORM') {
      return layouts.colFormItem.call(this, h, scheme, key)
    }

    let child = renderChildren.apply(this, arguments)
    if (scheme.type === 'flex') {
      child = (
        <el-row type={scheme.type} justify={scheme.justify} align={scheme.align} key={key}>
          {child}
        </el-row>
      )
    }
    return (
      <el-col span={scheme.span} key={key}>
        <el-row gutter={scheme.gutter || 8}>{child}</el-row>
      </el-col>
    )
  },
}

const Patterns = {
  phoneNumber: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
  tel: /^0\d{2,3}-\d{7,8}|\(?0\d{2,3}[)-]?\d{7,8}|\(?0\d{2,3}[)-]*\d{7,8}$/,
  zipCode: /^\d{6}$/,
  idNumber: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
}

const buildFormatValidatorRule = (format) => {
  switch (format) {
    case 'phoneNumber':
      return { pattern: Patterns.phoneNumber, message: '手机号码格式错误', trigger: 'change' }
    case 'tel':
      return { pattern: Patterns.tel, message: '电话号码格式错误', trigger: 'change' }
    case 'zipCode':
      return { pattern: Patterns.zipCode, message: '邮政号码格式错误', trigger: 'change' }
    case 'idNumber':
      return { pattern: Patterns.idNumber, message: '身份证号码格式错误', trigger: 'change' }
    case 'email':
      return { type: 'email', message: '邮箱格式错误', trigger: 'change' }
    case 1:
      return { type: 'number', message: '格式错误', transform: (v) => Number(v), trigger: 'change' }
    case 'text':
    default:
      break
  }
}

function getFilterCond(filterCond, model) {
  return filterCond.map((m) => {
    // type：0=当前表单,1=自定义
    // condition 运算符
    let value = ''
    const { type, condition, typeId, value2, value: fieldId } = m
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
}

async function buildLinkQuery(field, parent) {
  const self = this
  const model = self[self.formConfCopy.formModel]
  const { filterCond, config, dataNum } = field
  // console.log('link-query.buildLinkQuery', field)
  const cond = getFilterCond(filterCond, model)

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
    multi: dataNum > 1 ? 1 : 0,
    filter: { rel: 0, cond },
  }

  const hasEmpty = cond.some((m) => m.value.length < 1 && m.condition < 16)
  if (hasEmpty) return

  const resp = await filterLink(requestParams)
  const { list, pageNum, pageSize, total } = resp.data || {}
  const multiple = dataNum > 1
  const linkFieldValues = multiple ? list || [] : list?.[0] || {}

  if (multiple) {
    // this.$set(this.fields[fieldIdx], 'datalist', list)
    self.$set(field, 'linkFieldValues', linkFieldValues)
    self.$set(field, 'linkData', { pageNum, pageSize, total, ...requestParams })
  } else {
    // console.log('link-query.buildLinkQuery.set', parent || field, linkFieldValues)
    self.$set(parent || field, 'linkFieldValues', linkFieldValues)
  }
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
  return elementList.map((scheme, key) => {
    const config = scheme.config
    const layout = layouts[config.layout]

    if (layout) {
      return layout.call(this, h, scheme, key)
    }
    throw new Error(`没有与${config.layout}匹配的layout`)
  })
}

function renderChildren(h, scheme) {
  const config = scheme.config
  if (!Array.isArray(config.children)) return null
  return renderFormItem.call(this, h, config.children)
}

function setValue(event, config, scheme, rowIndex, seed = 0) {
  // console.log('setValuesetValue', rowIndex, seed, scheme, event)
  const model = this[this.formConf.formModel]
  const { parentKey, vModel } = scheme
  if (rowIndex !== undefined) {
    if (seed > 0) {
      // seed > 0 为插入行
      // console.log('setValuesetValue.splice', rowIndex, seed, scheme, event)
      model[parentKey].splice(rowIndex + seed, 0, ...event)
    } else {
      this.$set(model[parentKey][rowIndex], vModel, event)
    }
  } else {
    this.$set(model, vModel, event)
  }
}

function buildListeners(scheme, rowIndex, defaultRowValue, cb) {
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
  listeners.input = (event, seed) => {
    setValue.call(self, event, config, scheme, rowIndex, seed)
  }

  listeners.linkDataSelected = (event) => {
    // console.log('linkDataSelected.0000', rowIndex, event, scheme, defaultRowValue)
    if (!event || event.length === 0) return
    const { linkedFillRules, vModel, parentKey } = scheme
    const [cur, ...rest] = event
    const changedRowValues = rest.map((m) => ({ ...defaultRowValue, [vModel]: m }))
    listeners.input(cur) // 更新当前行
    if (changedRowValues.length > 0) {
      // 如果选了多条，在当前行后一行插入
      listeners.input(changedRowValues, 1)
    }

    // 根据填充规则，填充其他字段
    event.forEach((item, i) => {
      linkedFillRules.forEach(({ depend: { field }, ...rule }) => {
        const val = item[rule.vModel]
        const temp = { parentKey, vModel: field }
        setValue.call(self, val, config, temp, rowIndex === undefined ? undefined : rowIndex + i)
      })
    })
  }

  listeners.focus = throttle(
    async function () {
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
              const fieldValue = model[curFormFieldId] // getIn(model, curFormFieldId)
              value = Array.isArray(fieldValue) ? fieldValue : [fieldValue]
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

        // return Promise.resolve({
        //   data: {
        //     list: [
        //       Math.random().toString(16).slice(2),
        //       Math.random().toString(16).slice(2),
        //       Math.random().toString(16).slice(2)
        //     ]
        //   }
        // }).then((resp) => {
        //   console.log('listField', scheme)
        //   const options = (resp.data.list || []).map((m) => ({ label: m, value: m }))
        //   self.$set(scheme.__slot__, 'options', options)
        //   cb?.(options)
        // })

        const forceUpdateCell = () => {
          if (rowIndex === undefined) return
          /* 强制更新单元格内容 */
          const oldVal = model[scheme.parentKey][rowIndex][scheme.vModel]
          self.$set(model[scheme.parentKey][rowIndex], scheme.vModel, Math.random())
          self.$set(model[scheme.parentKey][rowIndex], scheme.vModel, oldVal)
        }

        self.$set(scheme.__slot__, 'loading', true)
        forceUpdateCell()
        const resp = await listField(requestParams)
        const { list } = resp?.data?.data || {}
        const options = (list || []).map((m) => ({ label: m, value: m }))
        self.$set(scheme.__slot__, 'options', options)
        self.$set(scheme.__slot__, 'loading', false)
        console.log('sdsdfsdf', list)
        forceUpdateCell()
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
  props: ['formConf', 'values', 'appId', 'menuId', 'mode'],

  provide() {
    return {
      linkDataRequest: async ({ filter, ...params }) => {
        const model = this[this.formConfCopy.formModel]
        // 获取关联数据
        // 构建查询条件
        const cond = getFilterCond(filter, model)
        const data = { appId: this.appId, ...params, multi: 1, filter: { rel: 0, cond } }
        const resp = await filterLink(data)
        return resp.data
      },
      updateFormModel: (key, value, prevKeys, mode) => {
        let model = this[this.formConfCopy.formModel]
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
      formMode: this.formMode,
      buildListeners: buildListeners.bind(this),
      // (schame, rowIndex, cb) => {
      //   return buildListeners.call(this, schame, rowIndex, cb)
      // },
      uploadFile: (params) => {
        return Promise.resolve({
          msg: '操作成功',
          code: 200,
          data: {
            uploadedFileList: [
              {
                id: Math.random(),
                mainUrl: 'http://127.0.0.1:9000/saasenterprise/prodenv/file/20230726/1634027128165412866_1690365544305.jpg',
                externalUrl1: null,
                externalUrl2: null,
                description: null,
                viewUrl: '/assist/oss/file/view/1631468255705485314/1684141276815339521',
                originFileName: '01371c565d3a2c32f875964744c3ab.jpg',
                originFileSize: '95832',
                originFileExtension: 'jpg',
              },
            ],
          },
        }).then((resp) => {
          return resp.data.uploadedFileList[0]
        })
      },
      getFileUrl: (id) => {
        return `https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100&id=${id}`
      },
      searchUser: async () => {},
      searchWindow: async () => {},
      selectWindow: async () => {},
    }
  },
  data() {
    const { values, formConf } = this
    const formConfCopy = deepClone(formConf)
    const rules = this.buildValidatorRules(formConfCopy.fields)
    const initialValues = values || this.initFormData(formConfCopy.fields)

    console.log('initialValues', JSON.stringify(initialValues))

    return {
      formConfCopy,
      [this.formConf.formModel]: initialValues,
      [this.formConf.formRules]: rules,
    }
  },
  computed: {
    formMode() {
      return this.mode || 'editable'
    },
  },
  mounted() {
    const { formConfCopy } = this
    const { fields, fieldDisplayRules } = formConfCopy
    this.buildLinkQueryWatch(fields)
    this.buildDisplayRulesWatch(fieldDisplayRules)
  },
  methods: {
    initFormData(fields) {
      return fields.reduce((prev, cur) => {
        const config = cur.config
        if (cur.vModel && !cur.dataLink) {
          return { ...prev, [cur.vModel]: config.defaultValue }
        }
        if (config.children) {
          return { ...prev, ...this.initFormData(config.children) }
        }
      }, {})
    },
    buildValidatorRules(fields) {
      return fields.reduce((prev, field) => {
        const rules = []
        const { config, typeId, max, min } = field
        const { required, format } = config

        if (required) {
          rules.push({
            required,
            message: typeId === 'CHILD_FORM' ? '请至少添加一项' : `${config.label}不能为空`,
            trigger: 'change',
            validator(_rule, value, cb) {
              if (value === undefined || value === null || value === '') return cb(new Error())
              if (Array.isArray(value) && value.length === 0) return cb(new Error())
              cb()
            },
          })
        }

        if (format) {
          const r = buildFormatValidatorRule(format)
          r && rules.push(r)
        }

        if ((max !== undefined || min !== undefined) && typeId === 'NUMBER_INPUT') {
          rules.push({ type: 'number', min, max, trigger: 'change' })
        }

        if (typeId === 'CHILD_FORM') {
          const r = {
            type: 'array',
            len: required ? 1 : undefined,
            // options: { first: true }
            trigger: 'change',
            defaultField: { type: 'object', fields: this.buildValidatorRules(field.children) },
          }

          rules.push(r)
        }
        return { ...prev, [field.vModel]: rules }
      }, {})
    },
    buildLinkQueryWatch(fields) {
      const self = this

      // console.log('link-query.333', fields, self.formConfCopy)

      fields.forEach((field) => {
        if (field.typeId === 'QUERY_CHECK') {
          let parent
          const { filterCond, parentKey /* config, dataNum, typeId, fieldIdx */ } = field
          if (parentKey) {
            parent = self.formConfCopy.fields.find((m) => m.vModel === parentKey)
          }
          // console.log('link-query.444', fields, field, parent)
          const doLinkQuery = debounce(buildLinkQuery.bind(self, field, parent), 800, { leading: false })
          filterCond.forEach((item) => {
            // type: 0=当前表单, 1=自定义
            if (item.type === 0) {
              // 监听依赖的字段变化
              self.$watch(
                `${self.formConfCopy.formModel}.${item.value2}`,
                () => {
                  doLinkQuery()
                },
                { immediate: true }
              )
            }
          })
        }

        if (field.children) {
          this.buildLinkQueryWatch(field.children)
        }
      })
    },
    // 字段显隐
    buildDisplayRulesWatch(displayRules) {
      const self = this
      const { formConfCopy } = self
      const { fields, formModel } = formConfCopy
      const model = self[formModel]

      // conditionsList 条件字段
      // displayFieldList // 显示字段

      const doVisibilityCalc = ({ conditionsList, displayFieldList, conditionsChoice }) => {
        // console.log('buildVisibilityCalc.doVisibilityCalc')
        const itemCalculator = (item) => {
          const { condition: op, id } = item
          const fieldValue = getIn(model, id) // 获取字段值
          // console.log('buildVisibilityCalc.2', op, fieldValue, item.value)
          return calcCondition(op, fieldValue, item.value)
        }

        let result = false
        if (conditionsChoice === 1) {
          // 满足所有条件
          result = (conditionsList || []).every(itemCalculator)
        } else {
          // 满足任一条件
          result = (conditionsList || []).some(itemCalculator)
        }

        fields
          .filter((m) => (displayFieldList || []).includes(m.vModel))
          .forEach((field) => {
            field.visibility = result
          })
      }

      displayRules.forEach((rule) => {
        rule.conditionsList.forEach((item) => {
          // 监听依赖字段变化，依赖字段值发生变化了，需要重新计算可见性
          self.$watch(`${formModel}.${item.id}`, () => doVisibilityCalc(rule), { immediate: true })
        })
      })
    },
    resetForm() {
      this.formConfCopy = deepClone(this.formConf)
      this.$refs[this.formConf.formRef].resetFields()
    },
    submitForm() {
      console.log('submit', this[this.formConf.formModel])
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
