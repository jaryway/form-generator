<script>
import { deepClone } from '@/utils/index'
import render from '../render/render.js'
import { filterLinkData } from './example/mock'
import getIn from 'lodash/get'

const ruleTrigger = {
  'el-input': 'blur',
  'el-input-number': 'blur',
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
    console.log('dataSource.Parse.4')
    const config = scheme.config
    const listeners = buildListeners.call(this, scheme)
    const { formConfCopy } = this
    const model = this[formConfCopy.formModel]
    // const value = model[scheme.vModel]

    // if (scheme.visibility === false) return null

    if (scheme.typeId === 'CHILD_FORM') {
      console.log('scheme.colFormItem', scheme.typeId, model, scheme.vModel)
    }

    let labelWidth = config.labelWidth ? `${config.labelWidth}px` : null
    if (config.showLabel === false) labelWidth = '0'
    console.log('dataSource.Parse.5')
    return (
      <el-col span={config.span}>
        <el-form-item label-width={labelWidth} prop={scheme.vModel} label={config.showLabel ? config.label : ''}>
          <render conf={scheme} on={listeners} values={model} />
        </el-form-item>
      </el-col>
    )
  },
  rowFormItem(h, scheme) {
    console.log('dataSource.Parse.3')
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

function setValue(event, config, scheme) {
  this.$set(config, 'defaultValue', event)
  this.$set(this[this.formConf.formModel], scheme.vModel, event)
}

function buildListeners(scheme) {
  const config = scheme.config
  const methods = this.formConf.__methods__ || {}
  const listeners = {}

  // 给__methods__中的方法绑定this和event
  Object.keys(methods).forEach((key) => {
    listeners[key] = (event) => methods[key].call(this, event)
  })
  // 响应 render.js 中的 vModel $emit('input', val)
  listeners.input = (event) => setValue.call(this, event, config, scheme)

  return listeners
}

export default {
  components: { render },
  props: ['formConf', 'values'],
  provide() {
    return {
      linkDataRequest: async (params) => {
        // 获取关联数据
        const resp = await Promise.resolve(filterLinkData)
        const { list, headList, pageNum, pageSize, total } = resp.data
        return { list, headList, pageNum, pageSize, total }
      },
      updateFormModel: (key, value, prevKeys, mode) => {
        let model = this[this.formConfCopy.formModel]
        console.log('updateFormModel', key, value, prevKeys, mode)
        if (prevKeys && prevKeys.filter(Boolean).length) {
          model = getIn(model, prevKeys.join('.'))
        }

        if (mode === 'insert') {
          model.splice(key, 0, value)
        } else {
          this.$set(model, key, value)
        }
      }
    }
  },
  data() {
    // console.log('vvvvvvv', this.values)
    const data = {
      formConfCopy: deepClone(this.formConf),
      [this.formConf.formModel]: {},
      [this.formConf.formRules]: {}
    }
    // this.initFormData(data.formConfCopy.fields, data[this.formConf.formModel])
    this.buildRules(data.formConfCopy.fields, data[this.formConf.formRules])
    return data
  },
  watch: {
    values: {
      immediate: true,
      handler(val) {
        this[this.formConf.formModel] = val
      }
    }
  },
  methods: {
    initFormData(componentList, formData) {
      componentList.forEach((cur) => {
        const config = cur.config
        if (cur.vModel) formData[cur.vModel] = config.defaultValue
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
  render(h) {
    return renderFrom.call(this, h)
  }
}
</script>
