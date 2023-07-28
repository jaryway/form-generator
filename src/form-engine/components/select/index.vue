<template>
  <el-select v-model="model" v-bind="$attrs" v-on="$listeners" :loading="loading" @focus="handleFocus">
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
// import debounce from 'lodash'
export default {
  name: 'FgSelect',
  /**
   * optionsModel 0=自定义，1=关联其他表单，2=数据联动
   *
   */
  props: ['value', 'config', '__slot__'],

  data() {
    return {
      // options: this.__slot__.options || []
    }
  },

  computed: {
    model: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    },
    options() {
      // console.log('linkdata.computed', this.__slot__.options)
      return this.__slot__.options || []
    },
    loading: {
      get() {
        return this.__slot__.loading
      },
      set(v) {
        this.__slot__.loading = v
      }
    }
  },
  methods: {
    handleFocus() {
      this.loading = true
      console.log('handleFocus')
    }
  }
}
</script>

<style lang="scss" scoped></style>
