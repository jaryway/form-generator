<template>
  <el-form size="mini" :model="model" label-position="top">
    <el-form-item v-for="item in fields" :key="item.id" :label="item.label">
      <div v-if="Array.isArray(model[item.vModel])" class="item-box">{{ model[item.vModel].map((i) => i.name).join(',') }}</div>
      <el-input v-else readonly v-model="model[item.vModel]" size="mini" />
    </el-form-item>
  </el-form>
</template>

<script>
// import render from '@/components/render/render'
import { deepClone } from '@/utils/index'

export default {
  name: 'FgLinkQuerySingle',
  props: ['data', 'linkFields'],

  computed: {
    model() {
      return deepClone(this.data || {})
    },
    fields() {
      return this.linkFields
    }
  }
}
</script>

<style lang="scss" scoped></style>
