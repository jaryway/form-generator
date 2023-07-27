<template>
  <div class="link-data">
    <el-button v-if="renderInTable" type="text" icon="el-icon-coin" @click="handleClick" />
    <div v-else class="link-data-header">
      <el-button size="mini" :disabled="disabled" @click="handleClick">选择数据</el-button>
    </div>
    <slot></slot>

    <DataPicker
      :linkFields="fields"
      :visible.sync="visible"
      :field="vModel"
      @select="handleSelect"
      :multiple="multiple"
      :filterCond="filterCond"
      :formDesignerId="formDesignerId"
    />
    <Single v-if="!renderInTable || !multiple" style="margin-top: 8px" :linkFields="fields" :data="model" />
  </div>
</template>

<script>
import DataPicker from './DataPicker.vue'
import Single from './Single.vue'
// import { deepClone } from '@/utils/index'

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
    'linkedFillRules',
    'filterCond',
    'disabled'
  ],

  components: {
    DataPicker,
    Single
  },

  inject: {
    updateFormModel: {}
  },

  data() {
    // console.log('fg-link-data', this)
    return { visible: false, model: {} }
  },
  computed: {
    formDesignerId() {
      return this.config?.dbTable || ''
    },
    fields() {
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
      console.log('handleSelect.111')
      this.$emit('linkdataSeleced', val)

      val.forEach((m, i) => {
        if (!this.multiple && i === 0) {
          // 1、更新 model
          this.fields.forEach((item) => {
            this.$set(this.model, item.vModel, m[item.vModel])
          })
        }

        // if (i > 0) {
        //   // 第一条后先插入，后更新
        //   this.updateFormModel?.(this.rowIndex + i, {}, [this.parentKey], 'insert')
        // }

        // // 2、根据填充规则，填充其他数据
        // this.linkedFillRules?.forEach((item) => {
        //   this.updateFormModel?.(item.depend.field, m[item.vModel], [this.parentKey, this.rowIndex + i])
        // })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.link-data {
  &-header {
    line-height: 1;
    // margin-bottom: 8px;
  }
}
</style>
