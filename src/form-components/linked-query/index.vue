<template>
  <Multiple v-if="multi" :linkFields="linkFields" :linkForm="linkForm" :dataSource="data" :allowAdd="allowAdd" />
  <Single v-else :linkFields="linkFields" :data="data" />
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
  name: 'FgLinkedQuery',
  props: ['value', 'linkFields', 'linkForm', 'linkFilter', 'linkFilterRel', 'multi', 'allowAdd'],

  components: {
    Single,
    Multiple,
  },

  data() {
    return {}
  },
  computed: {
    data() {
      return this.multi ? this.value || [] : this.value || {}
    },
  },

  mounted() {},

  methods: {},
}
</script>

<style lang="scss" scoped></style>
