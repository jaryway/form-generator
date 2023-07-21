<template>
  <el-select v-model="model" v-bind="$attrs" v-on="$listeners" @focus="handleFocus">
    <el-option
      v-for="(item, key) in options"
      :key="key"
      :label="item.label"
      :value="item.label"
      :disabled="item.disabled"
    />
  </el-select>
</template>

<script>
import debounce from 'lodash/debounce'
export default {
  name: 'FgSelect',
  /**
   * optionsModel 0=自定义，1=关联其他表单，2=数据联动
   *
   */
  props: ['value', 'config', '__slot__', 'linkValue', 'optionsModel', 'dataLink'],

  inject: {
    appId: {},
    fieldsMap: {},
    listField: {}
  },

  data() {
    console.log('data', this.$props)
    return { options: this.__slot__.options || [] }
  },

  computed: {
    model: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  created() {
    delete this.$attrs['dataLink']
  },
  mounted() {
    console.log('mounted', this.__slot__)
  },
  methods: {
    handleFocus: debounce(
      function () {
        console.log(this.fieldsMap['fieldeyAOVgB1689866865091'])
        if (this.optionsModel === 0) return

        let requestParams = {}

        // 数据联动
        if (this.optionsModel === 2) {
          const { condition, linkVModel, linkForm } = this.dataLink || {}
          const cond = condition?.map((item) => {
            const { autoText, type, condition, curFormFieldId, field, typeId } = item
            // 联动表单的字段 =... 当前表单的字段
            let value = [autoText]
            if (type !== 0) {
              // 当前表单字段的值
              value = []
              const curFormField = this.fieldsMap[curFormFieldId]
              if (curFormField) {
                const { defaultValue } = curFormField.config
                value = Array.isArray(defaultValue) ? defaultValue : [defaultValue]
              }
            }

            return { value, fieldId: field, typeId, condition, hasEmpty: condition < 16 ? 0 : 1 }
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
      500,
      { leading: true }
    )
  }
}
</script>

<style lang="scss" scoped></style>
