/* eslint-disable no-extra-semi */
import { deepClone } from '@/utils/index'

// const componentChild = {}
/**
 * 将./slots中的文件挂载到对象componentChild上
 * 文件名为key，对应JSON配置中的__config__.tag
 * 文件内容为value，解析JSON配置中的__slot__
 */
// const slotsFiles = require.context('./slots', false, /\.js$/)
// const keys = slotsFiles.keys() || []
// keys.forEach((key) => {
//   const tag = key.replace(/^\.\/(.*)\.\w+$/, '$1')
//   const value = slotsFiles(key).default
//   componentChild[tag] = value
// })

function vModel(dataObject, defaultValue) {
  console.log('dataObject.vModel', defaultValue)
  dataObject.props.value = defaultValue
  dataObject.on.input = (val, rowIndex, rowPropName) => {
    this.$emit('input', val, rowIndex, rowPropName)
  }
  // dataObject.on.blur = (val) => {
  //   this.$emit('blur', val)
  // }
}

function emitEvents(confClone) {
  ;['on', 'nativeOn'].forEach((attr) => {
    const eventKeyList = Object.keys(confClone[attr] || {})
    eventKeyList.forEach((key) => {
      const val = confClone[attr][key]
      if (typeof val === 'string') {
        confClone[attr][key] = (event) => this.$emit(val, event)
      }
    })
  })
}

const baseProps = ['config', '__slot__', 'linkedShowField', 'linkList', 'filterCond', 'linkedFillRules', 'typeId', 'typeName', 'editable', 'visibility', 'tableList', 'description', 'renderInTable', 'parentKey', 'rowIndex', 'repeatReminderText']
const subformProps = ['children', 'value']
const ignoreProps = ['notChild']

function buildDataObject(confClone, dataObject) {
  Object.keys(confClone).forEach((key) => {
    if (ignoreProps.includes(key)) return

    const val = confClone[key]
    if (key === 'vModel') {
      const value = this.values ? this.values[confClone.vModel] : confClone.config.defaultValue
      dataObject.props[key] = val
      vModel.call(this, dataObject, value)
    } else if (key === 'editable') {
      dataObject.attrs['disabled'] = !confClone.editable
    } else if ((confClone.typeId === 'CHILD_FORM' && subformProps.includes(key)) || baseProps.includes(key)) {
      dataObject.props[key] = val
    } else if (dataObject[key] !== undefined) {
      if (dataObject[key] === null || dataObject[key] instanceof RegExp || ['boolean', 'string', 'number', 'function'].includes(typeof dataObject[key])) {
        dataObject[key] = val
      } else if (Array.isArray(dataObject[key])) {
        dataObject[key] = [...dataObject[key], ...val]
      } else {
        dataObject[key] = { ...dataObject[key], ...val }
      }
    } else {
      dataObject.attrs[key] = val
    }
  })

  // 清理属性
  clearAttrs(dataObject)
}

function clearAttrs(dataObject) {
  // delete dataObject.attrs.config
  // delete dataObject.attrs.__slot__
  delete dataObject.attrs.__methods__
}

function makeDataObject(key) {
  // 深入数据对象：
  // https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1
  return {
    class: {},
    attrs: {},
    props: {},
    domProps: {},
    nativeOn: {},
    on: {},
    style: {},
    directives: [],
    scopedSlots: {},
    slot: null,
    key,
    ref: null,
    refInFor: true,
  }
}

export default {
  props: {
    conf: {
      type: Object,
      required: true,
    },
    values: { type: [Object] },
  },
  mounted() {
    // this.$emit('mounted', this.conf)
    // console.log('render.mounted', this.conf)
  },
  watch: {
    'conf.__slot__': {
      handler(val) {
        console.log('listeners.focus.select.watch', val)
      },
    },
  },
  render(h) {
    const dataObject = makeDataObject(this.key)
    const confClone = deepClone(this.conf)
    const children = this.$slots.default || []
    dataObject.on = this.$listeners
    console.log('listeners.focus.select.render...', this.conf)

    // console.log('__slot__', children)
    // 如果slots文件夹存在与当前tag同名的文件，则执行文件中的代码
    // mountSlotFiles.call(this, h, confClone, children)

    // 将字符串类型的事件，发送为消息
    emitEvents.call(this, confClone)

    // 将json表单配置转化为vue render可以识别的 “数据对象（dataObject）”
    buildDataObject.call(this, confClone, dataObject)

    console.log('dataObject', dataObject.props.value)
    if (this.conf.config.tag === 'el-checkbox-group') {
      return h('fg-checkbox-group', dataObject, children)
    }

    if (this.conf.config.tag === 'el-radio-group') {
      return h('fg-radio-group', dataObject, children)
    }

    if (this.conf.config.tag === 'el-input') {
      return h('fg-input', dataObject, children)
    }

    if (this.conf.config.tag === 'el-select') {
      return h('fg-select', dataObject, children)
    }

    if (this.conf.config.tag === 'el-date-picker') {
      return h('fg-date-picker', dataObject, children)
    }

    if (this.conf.config.tag === 'el-divider') {
      return h('fg-divider', dataObject, children)
    }

    if (this.conf.config.tag === 'input-map') {
      return h('fg-location', dataObject, children)
    }

    if (this.conf.config.tag === 'el-upload') {
      return h('fg-upload', dataObject, children)
    }

    if (this.conf.typeId === 'CHILD_FORM') {
      console.log('dataSource.Parse.7', dataObject.props.value, this.values)
      return h('fg-subform', dataObject, children)
    }

    if (this.conf.typeId === 'LINKED_DATA') {
      return h('fg-link-data', dataObject, children)
    }

    if (this.conf.typeId === 'QUERY_CHECK') {
      return h('fg-link-query', dataObject, children)
    }

    return h(this.conf.config.tag, dataObject, children)
  },
}
