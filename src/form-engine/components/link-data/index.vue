<template>
  <div class="linkdata">
    <div class="linkdata-header">
      <el-button size="mini" @click="handleClick">选择数据</el-button>
    </div>
    <DataPicker
      :linkFields="fields"
      :visible.sync="visible"
      :field="vModel"
      @select="handleSelect"
      :multiple="multiple"
    />
    <Single v-if="!renderInTable || !multiple" style="margin-top: 8px" :linkFields="fields" :data="model" />
  </div>
</template>

<script>
import DataPicker from './DataPicker.vue'
import Single from './Single.vue'
import { deepClone } from '@/utils/index'

/**
 * 关联数据-选择数据后将选中的数据展示，并根据填充规则，填充其他字段
 *
 *
 */

export default {
  name: 'FgLinkData',
  /**
   * linkFields
   */
  props: [
    'value',
    'config',
    'vModel',
    'renderInTable',
    'parentKey',
    'rowIndex',
    'multiple',
    'linkedShowField',
    'linkedFillRules'
  ],

  components: {
    DataPicker,
    Single
  },

  inject: {
    updateFormModel: {}
  },

  data() {
    // console.log('fg-link-data', this.linkedShowField)
    return { visible: false, model: {} }
  },
  computed: {
    // model: {
    //   get() {
    //     return this.value || {}
    //   },
    //   set(val) {},
    // },
    fields() {
      // return [
      //   {
      //     id: '1650435474451525633',
      //     label: '单行文本2',
      //     type: 0,
      //     foreignId: 0,
      //     typeId: 'INPUT',
      //     name: 'fieldGTFmdMB1681184052316',
      //     visible: 1,
      //     childrenFlag: 0,
      //     childrenFromDesignerId: null,
      //     children: null,
      //     vModel: 'fieldGTFmdMB1681184052316',
      //     __slot__: null,
      //     parentId: 1
      //   },
      //   {
      //     id: '1650435474518634498',
      //     label: '成员多选',
      //     type: 0,
      //     foreignId: 0,
      //     typeId: 'MEMBER_CHECK',
      //     name: 'fieldzBZmKOB1681805592190',
      //     visible: 1,
      //     childrenFlag: 0,
      //     childrenFromDesignerId: null,
      //     children: null,
      //     vModel: 'fieldzBZmKOB1681805592190',
      //     __slot__: '{"default":"选择成员"}',
      //     parentId: 1
      //   },
      //   {
      //     id: '1650435474547994626',
      //     label: '提交人',
      //     type: 0,
      //     foreignId: 0,
      //     typeId: 'MEMBER_RADIO',
      //     name: 'createBy',
      //     visible: 1,
      //     childrenFlag: 0,
      //     childrenFromDesignerId: null,
      //     children: null,
      //     vModel: 'createBy',
      //     __slot__: null,
      //     parentId: 1
      //   },
      //   {
      //     id: '1650435474615103489',
      //     label: '创建时间',
      //     type: 0,
      //     foreignId: 0,
      //     typeId: 'DATE',
      //     name: 'createTime',
      //     visible: 1,
      //     childrenFlag: 0,
      //     childrenFromDesignerId: null,
      //     children: null,
      //     vModel: 'createTime',
      //     __slot__: null,
      //     parentId: 1
      //   }
      // ]
      return this.linkedShowField || []
    }
  },
  watch: {
    value: {
      handler(val) {
        this.model = val
      }
    }
  },

  mounted() {},

  methods: {
    handleClick() {
      // console.log('handleClick')
      this.visible = true
    },
    handleSelect(val) {
      val.forEach((m, i) => {
        if (!this.multiple && i === 0) {
          // 1、更新 model
          const m = val[0]
          this.linkedShowField.forEach((item) => {
            this.$set(this.model, item.vModel, m[item.vModel])
          })
        }

        if (i > 0) {
          // 第一条后先插入，后更新
          this.updateFormModel?.(this.rowIndex + i, {}, [this.parentKey], 'insert')
        }

        // 2、根据填充规则，填充其他数据
        this.linkedFillRules?.forEach((item) => {
          this.updateFormModel?.(item.depend.field, m[item.vModel], [this.parentKey, this.rowIndex + i])
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.linkdata {
  &-header {
    line-height: 1;
    // margin-bottom: 8px;
  }
}
</style>
