<template>
  <div>
    <el-form size="small">
      <el-form-item label="表单布局">
        <div class="flex-between-center">
          <el-select v-model="formConf.numberOfColumns" size="mini" @change="handleLayoutChange">
            <el-option v-for="item in layoutOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item label="字段标题位置">
        <div class="flex-between-center" style="width: 100%">
          <div
            style="width: 48%"
            class="skeleton-box"
            :class="{ selected: formConf.labelPosition == 'top' }"
            @click.stop="formConf.labelPosition = 'top'"
          >
            <el-skeleton>
              <template slot="template">
                <div style="display: flex; justify-items: space-between; flex-direction: column">
                  <el-skeleton-item variant="span" style="width: 30%" class="mb8" />
                  <el-skeleton-item variant="span" />
                </div>
              </template>
            </el-skeleton>
            <p class="text_center">上下</p>
            <i class="el-icon-check my-icon"></i>
          </div>
          <div
            style="width: 48%"
            class="skeleton-box"
            @click.stop="formConf.labelPosition = 'left'"
            :class="{ selected: formConf.labelPosition != 'top' }"
          >
            <el-skeleton>
              <template slot="template">
                <div>
                  <div style="display: flex; align-items: center; justify-items: space-between" class="mb8">
                    <el-skeleton-item variant="text" style="width: 30%; margin-right: 4px" />
                    <el-skeleton-item variant="text" />
                  </div>
                  <div style="display: flex; align-items: center; justify-items: space-between">
                    <el-skeleton-item variant="text" style="width: 30%; margin-right: 4px" />
                    <el-skeleton-item variant="text" />
                  </div>
                </div>
              </template>
            </el-skeleton>
            <p class="text_center">左右</p>
            <i class="el-icon-check my-icon"></i>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="对齐方式" v-if="formConf.labelPosition != 'top'">
        <el-radio-group v-model="formConf.labelPosition">
          <el-radio-button label="left"> 左对齐 </el-radio-button>
          <el-radio-button label="right"> 右对齐 </el-radio-button>
          <!-- <el-radio-button label="top"> 顶部对齐 </el-radio-button> -->
        </el-radio-group>
      </el-form-item>
      <el-form-item label="标签宽度" v-if="formConf.labelPosition != 'top'">
        <el-input v-model.number="formConf.labelWidth" placeholder="请输入标签宽度" type="number" />
      </el-form-item>
      <el-form-item label="字段显隐规则" class="flex-form-item">
        <el-button @click="handleFormDisplay" style="width: 100%">设置</el-button>
      </el-form-item>
      <el-form-item label="数据过滤规则" class="flex-form-item">
        <el-button @click="handleFormFilter" style="width: 100%">设置</el-button>
      </el-form-item>
      <!-- <el-form-item label="提交关联操作" class="flex-form-item">
        <el-button @click="handleAssociatedOperation" style="width: 100%">设置</el-button>
      </el-form-item> -->
    </el-form>
    <FieldDisplayRuleDrawer />
    <DataFilterRuleDrawer />
  </div>
</template>

<script>
import FieldDisplayRuleDrawer from './FieldDisplayRuleDrawer'
import DataFilterRuleDrawer from './DataFilterRuleDrawer'
export default {
  name: 'FormPanel',
  props: ['formConf'],
  components: {
    FieldDisplayRuleDrawer,
    DataFilterRuleDrawer
  },

  data() {
    return {
      layoutOptions: [
        { value: 24, label: '单列' },
        { value: 12, label: '双列' },
        { value: 8, label: '三列' },
        { value: 6, label: '四列' }
      ]
    }
  },

  mounted() {},

  methods: {
    handleLayoutChange(val) {
      this.$emit('form-change', val)
    },
    handleFormFilter() {},
    handleFormDisplay() {},
    handleAssociatedOperation() {}
  }
}
</script>

<style lang="scss" scoped></style>
