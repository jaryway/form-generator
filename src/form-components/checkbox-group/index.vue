<template>
  <el-checkbox-group v-model="model" v-bind="$attrs" v-on="$listeners">
    <slot></slot>
    <el-checkbox v-for="(item, key) in options" :key="key" :label="item.label" :value="item.value" />
  </el-checkbox-group>
</template>

<script>
export default {
  name: 'FgCheckboxGroup',
  props: ['value', 'config', '__slot__'],
  data() {
    return {
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
      return this.__slot__.options || []
    },
  },
}
</script>

<style lang="scss" scoped></style>
