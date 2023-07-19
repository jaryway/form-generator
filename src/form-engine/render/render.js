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
  dataObject.props.value = defaultValue
  dataObject.on.input = (val) => {
    this.$emit('input', val)
  }
  // dataObject.on.blur = (val) => {
  //   this.$emit('blur', val)
  // }
}

// function mountSlotFiles(h, confClone, children) {
//   // eslint-disable-next-line prefer-const
//   let tag = confClone.config.tag
//   if (confClone.config.tag === 'el-checkbox-group') {
//     tag = 'checkbox-group'
//   }

//   const childObjs = componentChild[tag]
//   if (childObjs) {
//     Object.keys(childObjs).forEach((key) => {
//       const childFunc = childObjs[key]
//       if (confClone.__slot__ && confClone.__slot__[key]) {
//         children.push(childFunc(h, confClone, key, this))
//       }
//     })
//   }
// }

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

function buildDataObject(confClone, dataObject) {
  Object.keys(confClone).forEach((key) => {
    const val = confClone[key]
    if (key === 'vModel') {
      const value = this.useValue ? this.value : confClone.config.defaultValue
      dataObject.props[key] = val
      vModel.call(this, dataObject, value)
    } else if (['config', '__slot__'].includes(key)) {
      dataObject.props[key] = val
    } else if (dataObject[key] !== undefined) {
      if (
        dataObject[key] === null ||
        dataObject[key] instanceof RegExp ||
        ['boolean', 'string', 'number', 'function'].includes(typeof dataObject[key])
      ) {
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
    refInFor: true
  }
}

export default {
  props: {
    conf: {
      type: Object,
      required: true
    },
    useValue: {
      type: Boolean
    },
    value: {
      type: [String, Number, null, undefined, Object]
    },
    on: {
      type: [String, Number, null, undefined, Object]
    }
  },
  mounted() {
    this.$emit('mounted', this.conf)
    console.log('render.mounted', this.conf)
  },
  render(h) {
    const dataObject = makeDataObject(this.key)
    const confClone = deepClone(this.conf)
    const children = this.$slots.default || []
    dataObject.on = this.$listeners

    // console.log('__slot__', children)
    // 如果slots文件夹存在与当前tag同名的文件，则执行文件中的代码
    // mountSlotFiles.call(this, h, confClone, children)

    // 将字符串类型的事件，发送为消息
    emitEvents.call(this, confClone)

    // 将json表单配置转化为vue render可以识别的 “数据对象（dataObject）”
    buildDataObject.call(this, confClone, dataObject)
    console.log('render.render', confClone, dataObject)

    if (this.conf.config.tag === 'el-checkbox-group') {
      return h('fg-checkbox-group', dataObject, children)
    }

    if (this.conf.config.tag === 'el-radio-group') {
      return h('fg-radio-group', dataObject, children)
    }

    if (this.conf.config.tag === 'el-input') {
      return h('fg-input', dataObject, children)
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

    return h(this.conf.config.tag, dataObject, children)
  }
}
