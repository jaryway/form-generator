<template>
  <el-divider v-bind="$attrs" v-on="$listeners" />
</template>

<script>
export default {
  name: 'FgDivider',
  props: ['config', '__slot__'],
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped></style>
