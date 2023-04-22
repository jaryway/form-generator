<script>
import { deepClone } from '@/utils/index'
import render from '@/components/render/render.js'

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
    const config = scheme.__config__
    const listeners = buildListeners.call(this, scheme)

    let labelWidth = config.labelWidth ? `${config.labelWidth}px` : null
    if (config.showLabel === false) labelWidth = '0'
    return (
      <el-col span={config.span}>
        <el-form-item label-width={labelWidth} prop={scheme.__vModel__} label={config.showLabel ? config.label : ''}>
          <render conf={scheme} on={listeners} />
        </el-form-item>
      </el-col>
    )
  },
  rowFormItem(h, scheme) {
    let child = renderChildren.apply(this, arguments)
    console.log('xxxxxxx', child, scheme)

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
  },
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
    const config = scheme.__config__
    const layout = layouts[config.layout]

    if (layout) {
      return layout.call(this, h, scheme)
    }
    throw new Error(`没有与${config.layout}匹配的layout`)
  })
}

function renderChildren(h, scheme) {
  const config = scheme.__config__
  if (!Array.isArray(config.children)) return null
  return renderFormItem.call(this, h, config.children)
}

function renderChildForm(h, scheme) {
  const scopedSlots = (field, editable) => {
    // 区分是展示模式还是编辑模式

    return {
      default: (scope) => {
        // 编辑模式
        if (this.isEdit && editable !== false) {
          const fieldCopy = deepClone(field)
          const listeners = buildListeners.call(this, fieldCopy, scheme, scope.$index)
          // console.log('scopedSlots', field, scope)
          return (
            <el-form-item label-width='0'>
              <render conf={fieldCopy} on={listeners} key={scope.$index} use-value={true} value={scope.row[field.__vModel__]} />
            </el-form-item>
          )
        }
        if (['MEMBER_RADIO', 'MEMBER_CHECK', 'DEPT_RADIO', 'DEPT_CHECK'].includes(field.typeId)) {
          return scope.row[field.__vModel__]?.map((m) => m.name).join(',')
        }

        // console.log('scope', scope, field, scope.row[field.__vModel__])

        return scope.row[field.__vModel__]
      },
    }
  }
  const buildColumns = (children) => {
    return (children || []).map((item, idx) => {
      const childProp = item.typeId === 'QUERY_CHECK' ? 'linkList' : 'children'
      const hasChild = item[childProp] && item[childProp].length

      // console.log('item', item)

      if (item.typeId === 'QUERY_CHECK') {
        return (
          <el-table-column props={{ label: item.__config__.label }} key={idx}>
            {(item.linkList || []).map((child, index) => {
              return <el-table-column key={index} props={{ label: child.label, prop: child.__vModel__ }} scopedSlots={scopedSlots(child, false)}></el-table-column>
            })}
          </el-table-column>
        )
      }

      return (
        <el-table-column props={{ label: item.__config__.label, prop: hasChild ? undefined : item.__vModel__ }} scopedSlots={scopedSlots(item)}>
          {hasChild && buildColumns(item[childProp])}
        </el-table-column>
      )
    })
  }
  const props = {
    data: this[this.formConf.formModel][scheme.__vModel__] || scheme.value,
    size: scheme.__config__.size,
    stripe: scheme.__config__.stripe,
    border: scheme.__config__.border,
    fit: scheme.__config__.fit,
    'show-header': scheme.showHeader,
    'header-cell-style': scheme.headerCellStyle,
    'cell-style': scheme.cellStyle,
  }

  // console.log('scheme.children', scheme.children)

  return (
    <div>
      <el-form-item>
        <el-table style='width: 100%' size='small' props={props}>
          {buildColumns(scheme.children)}
        </el-table>
      </el-form-item>
    </div>
  )
}

function setValue(event, config, scheme, parentScheme, index) {
  if (parentScheme) {
    this.$set(config, 'defaultValue', event)

    const formData = this[this.formConf.formModel][parentScheme.__vModel__]
    // console.log('setValue.o', parentScheme, scheme, config)

    if (!formData) {
      this.$set(this[this.formConf.formModel], parentScheme.__vModel__, [{ [scheme.__vModel__]: event }])
    } else {
      this.$set(this[this.formConf.formModel][parentScheme.__vModel__][index], scheme.__vModel__, event)
    }
  } else {
    this.$set(config, 'defaultValue', event)
    this.$set(this[this.formConf.formModel], scheme.__vModel__, event)
  }
}

function buildListeners(scheme, parentScheme, index) {
  const config = scheme.__config__
  const methods = this.formConf.__methods__ || {}
  const listeners = {}

  // 给__methods__中的方法绑定this和event
  Object.keys(methods).forEach((key) => {
    listeners[key] = (event) => methods[key].call(this, event)
  })
  // 响应 render.js 中的 vModel $emit('input', val)
  listeners.input = (event) => setValue.call(this, event, config, scheme, parentScheme, index)

  return listeners
}

export default {
  components: {
    render,
  },
  props: {
    formConf: {
      type: Object,
      required: true,
    },
  },
  data() {
    const data = {
      isEdit: true,
      formConfCopy: deepClone(this.formConf),
      [this.formConf.formModel]: {},
      [this.formConf.formRules]: {},
    }
    this.initFormData(data.formConfCopy.fields, data[this.formConf.formModel])
    this.buildRules(data.formConfCopy.fields, data[this.formConf.formRules])
    return data
  },
  methods: {
    initFormData(componentList, formData) {
      componentList.forEach((cur) => {
        const config = cur.__config__
        if (cur.__vModel__) formData[cur.__vModel__] = cur.typeId === 'CHILD_FORM' ? cur.value : config.defaultValue
        if (config.children) this.initFormData(config.children, formData)
      })
    },
    buildRules(componentList, rules) {
      componentList.forEach((cur) => {
        const config = cur.__config__
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
          rules[cur.__vModel__] = config.regList.map((item) => {
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
