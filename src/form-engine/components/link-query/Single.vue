<template>
  <el-form size="mini" :model="model" label-position="top">
    <el-form-item v-for="item in fields" :key="item.id" :label="item.label">
      <div v-if="Array.isArray(model[item.vModel])" class="item-box">{{ model[item.vModel].map((i) => i.name).join(',') }}</div>
      <el-input v-else readonly disabled v-model="model[item.vModel]" size="mini" />
    </el-form-item>
  </el-form>
</template>

<script>
// import render from '@/components/render/render'
import { deepClone } from '@/utils/index'

export default {
  name: 'FgLinkQuerySingle',
  props: ['value', 'linkFields'],
  // components: { render }
  data() {
    return {}
  },
  mounted() {},
  computed: {
    model() {
      console.log('linkFieldValues.Single', this.value, this.linkFields)
      return deepClone(this.value || {})
    },
    fields() {
      return this.linkFields
    },
  },
  // methods: {},
}
</script>

<style lang="scss" scoped></style>
