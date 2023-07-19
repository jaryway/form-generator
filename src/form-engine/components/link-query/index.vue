<template>
  <Multiple v-if="multi" :linkFields="fields" :linkForm="linkForm" :dataSource="data" :allowAdd="allowAdd" />
  <Single v-else :linkFields="fields" :data="data" />
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
  props: ['value', 'linkFields', 'linkForm', 'linkFilter', 'linkFilterRel', 'multi', 'allowAdd'],

  components: {
    Single,
    Multiple
  },

  data() {
    console.log('fg-link-query')
    return {}
  },
  computed: {
    data() {
      return this.multi ? this.value || [] : this.value || {}
    },
    fields() {
      return [
        {
          id: '1650435474451525633',
          label: '单行文本2',
          type: 0,
          foreignId: 0,
          typeId: 'INPUT',
          name: 'fieldGTFmdMB1681184052316',
          visible: 1,
          childrenFlag: 0,
          childrenFromDesignerId: null,
          children: null,
          vModel: 'fieldGTFmdMB1681184052316',
          __slot__: null,
          parentId: 1
        },
        {
          id: '1650435474518634498',
          label: '成员多选',
          type: 0,
          foreignId: 0,
          typeId: 'MEMBER_CHECK',
          name: 'fieldzBZmKOB1681805592190',
          visible: 1,
          childrenFlag: 0,
          childrenFromDesignerId: null,
          children: null,
          vModel: 'fieldzBZmKOB1681805592190',
          __slot__: '{"default":"选择成员"}',
          parentId: 1
        },
        {
          id: '1650435474547994626',
          label: '提交人',
          type: 0,
          foreignId: 0,
          typeId: 'MEMBER_RADIO',
          name: 'createBy',
          visible: 1,
          childrenFlag: 0,
          childrenFromDesignerId: null,
          children: null,
          vModel: 'createBy',
          __slot__: null,
          parentId: 1
        },
        {
          id: '1650435474615103489',
          label: '创建时间',
          type: 0,
          foreignId: 0,
          typeId: 'DATE',
          name: 'createTime',
          visible: 1,
          childrenFlag: 0,
          childrenFromDesignerId: null,
          children: null,
          vModel: 'createTime',
          __slot__: null,
          parentId: 1
        }
      ]
      // return this.linkFields || []
    }
  },

  mounted() {},

  methods: {}
}
</script>

<style lang="scss" scoped></style>
