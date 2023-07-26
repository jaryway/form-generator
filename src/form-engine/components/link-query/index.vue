<template>
  <Multiple v-if="multi" :linkFields="fields" :linkForm="linkForm" :dataSource="data" :allowAdd="allowAdd" />
  <Single v-else :linkFields="fields" :value="data" />
</template>

<script>
import Single from './Single.vue'
import Multiple from './Multiple.vue'

/**
 * 关联查询-当依赖的表单字段发生变化时，构造查询添加，去获取数据，并展示
 * 这里只做展示，不执行数据查询动作，
 * 查询动作由 form 监听执行
 */

export default {
  name: 'FgLinkQuery',
  props: ['value', 'linkFieldValues', 'linkList', 'linkForm', 'linkFilter', 'linkFilterRel', 'dataNum', 'allowAdd'],

  components: {
    Single,
    Multiple
  },

  data() {
    return {}
  },
  computed: {
    multi() {
      return this.dataNum > 1
    },
    data() {
        // return this.linkFieldValues
      return this.multi ? this.linkFieldValues || [] : this.linkFieldValues || {}
    },
    fields() {
      return this.linkList || []
    }
  },

  mounted() {},

  methods: {}
}
</script>

<style lang="scss" scoped></style>
