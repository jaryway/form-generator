<template>
  <el-date-picker v-model="model" v-bind="$attrs" v-on="$listeners" />
</template>

<script>
export default {
  name: 'FgDatePicker',
  props: ['value', 'config', '__slot__'],
  data() {
    return {}
  },

  computed: {
    model: {
      get() {
        return this.value || ''
      },
      set(val) {
        this.$emit('input', val)
      },
    },
  },
}
</script>

<style lang="scss" scoped></style>
