<!-- eslint-disable no-unreachable -->
<script>
import { deepClone } from '@/utils/index'
import render from '../render/render.js'
import { filterLinkData } from './example/mock'
import getIn from 'lodash/get'
import throttle from 'lodash/throttle'
import { filterLink, listField } from './example/api'

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
    // console.log('formConf.setValue', model, [scheme.vModel], rowIndex)
    // this.$set(config, 'defaultValue', event)
    console.log('setValuesetValuesetValue', model[parentKey])
    if (model[parentKey] === undefined) {
      console.log('setValuesetValuesetValue.1', model[parentKey])
      this.$set(model, parentKey, [])
    }

    if (!model[parentKey][rowIndex]) {
      this.$set(model[parentKey], rowIndex, {})
    }

    // console.log('formConf.setValue9', model[parentKey], rowIndex)

    this.$set(model[parentKey][rowIndex], vModel, event)
    // this.$set(this.fieldsMap[scheme.vModel].config, 'defaultValue', event)
    // console.log('formConf.setValue.10', model[parentKey][rowIndex], rowPropName)
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
  console.log('listeners.focus.buildListeners', scheme, rowIndex)
  // 给__methods__中的方法绑定this和event
  Object.keys(methods).forEach((key) => {
    listeners[key] = (event) => methods[key].call(this, event)
  })
  // 响应 render.js 中的 vModel $emit('input', val)
  listeners.input = (event) => {
    console.log('listeners.input', event, scheme, rowIndex)
    setValue.call(this, event, config, scheme, rowIndex)
  }

  if (['SELECT', 'SELECT-MULTIPLE'].includes(scheme.typeId)) {
    listeners.focus = throttle(
      function (e) {
        e.stopPropagation()
        e.preventDefault()
        console.log('listeners.focus.select', self, scheme)
        console.log('listeners.focus.select', self, scheme)
        // self.$set(self.formConfCopy.fields[1].children[1].config, 'label', self.formConfCopy.fields[1].children[1].config.label + 1)

        // self.$set(self.formConfCopy.fields[1].children[1].__slot__, 'options', [{ label: Math.random(), value: Math.random() }])

        scheme.__slot__.options.splice(0, scheme.__slot__.options.length || 0, ...[{ label: Math.random(), value: Math.random() }])
        cb?.()

        // self.$set(scheme.__slot__, 'options', [{ label: Math.random(), value: Math.random() }])

        return

        // this.$emit('focus', e)
        // console.log('mmkmkkkm', this.fieldsMap['fieldeyAOVgB1689866865091'])
        if (this.optionsModel === 0) return

        let requestParams = {}

        // 数据联动
        if (this.optionsModel === 2) {
          const { condition, linkVModel, linkForm } = this.dataLink || {}
          const cond = condition?.map((item) => {
            const { autoText, type, condition, curFormFieldId, curFormParentKey, field, typeId } = item
            // 联动表单的字段 =... 当前表单的字段
            let value = [autoText]
            if (type !== 0) {
              // 当前表单字段的值
              value = []
              const curFormField = this.fieldsMap[curFormParentKey || curFormFieldId]
              if (curFormField) {
                const { defaultValue } = curFormField.config
                value = Array.isArray(defaultValue) ? defaultValue : [defaultValue]
              }
            }

            return { value: ['上海黄浦动力'], fieldId: field, typeId, condition, hasEmpty: condition < 16 ? 0 : 1 }
          })

          const [appId, formDesignerId] = linkForm
          requestParams = { appId, formDesignerId, fieldList: [linkVModel], filter: { rel: 0, cond } }
        } else {
          // 关联其他表单
          const [appId, formDesignerId, fieldId] = this.linkValue || []
          requestParams = { appId, formDesignerId, fieldId }
        }

        this.listField(requestParams)
          .then((resp) => resp.data) //
          .then((resp) => {
            console.log('this.listField', resp)
            const options = (resp.data.list || []).map((m) => ({ label: m, value: m }))
            this.options = options
          })
      },
      5000, // 对查询结果进行5秒的缓存
      { leading: true, trailing: false }
    )
  } else {
    listeners.focus = (event, rowIndex, rowPropName) => {
      console.log('listeners.focus.111', event, rowIndex, rowPropName, scheme)
    }
  }

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
      buildListeners: (scheme, rowIndex, cb) => {
        return buildListeners.call(this, scheme, rowIndex, cb)
      },
      listField,
      fieldsMap: this.fieldsMap,
      appId: this.appId,
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
    console.log('formConf.data', data, initialValues)

    return {
      formConfCopy,
      [this.formConf.formModel]: initialValues,
      [this.formConf.formRules]: data[this.formConf.formRules],
    }
  },
  computed: {
    fieldsMap() {
      return this.formConf.fields.reduce((prev, cur) => {
        return { ...prev, [cur.vModel]: cur }
      }, {})
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
