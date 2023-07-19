<template>
  <el-select v-model="model" v-bind="$attrs" v-on="$listeners" />
</template>

<script>
export default {
  name: 'FgSelect',
  props: ['value', 'config', '__slot__'],

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
