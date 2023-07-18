<template>
  <el-input v-model="model" v-bind="$attrs" v-on="$listeners" />
</template>

<script>
export default {
  name: 'FgInput',
  props: ['value', 'config', '__slot__'],

  // data() {
  //   return {}
  // },

  computed: {
    model: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
