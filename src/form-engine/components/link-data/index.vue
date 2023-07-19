<template>
  <div class="linkdata">
    <div class="linkdata-header">
      <el-button size="small" @click="handleClick">选择数据</el-button>
    </div>
    <DataPicker :linkFields="fields" :visible.sync="visible" :field="vModel" @select="handleSelect" />
    <Single :linkFields="fields" :data="model" />
  </div>
</template>

<script>
import DataPicker from './DataPicker.vue'
import Single from './Single.vue'
import { deepClone } from '@/utils/index'
/**
 * 关联数据-当依赖的表单字段发生变化时，构造查询添加，去获取数据，并展示
 * 这里只做展示，不执行数据查询动作，
 * 查询动作由 form 监听执行
 */

export default {
  name: 'FgLinkData',
  /**
   * linkFields
   */
  props: ['value', 'config', 'vModel', 'linkFields', 'linkForm', 'linkFilter', 'linkFilterRel'],

  components: {
    DataPicker,
    Single
  },

  data() {
    console.log('fg-link-data', this.value)
    return { visible: false }
  },
  computed: {
    model: {
      get() {
        return deepClone(this.value || {})
      },
      set(val) {}
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

  methods: {
    handleClick() {
      console.log('handleClick')
      this.visible = true
    },
    handleSelect(val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="less" scoped>
.linkdata {
  &-header {
    line-height: 1;
    margin-bottom: 8px;
  }
}
</style>
