<template>
  <div class="right-board">
    <el-tabs v-model="currentTab" class="center-tabs">
      <el-tab-pane label="字段属性" name="field" />
      <el-tab-pane label="表单属性" name="form" />
    </el-tabs>

    <!--未选中组件时-->
    <div class="field-box" v-if="!activeData">
      <data-empty :desc="'请添加字段'" />
    </div>

    <!-- 选中组件时 -->
    <div class="field-box" v-if="activeData">
      <el-scrollbar class="right-scrollbar">
        <!-- 组件属性 -->
        <FieldPanel v-show="currentTab === 'field' && showField" :activeData="activeData" />
        <FormPanel v-show="currentTab === 'form'" :formConf="formConf" />
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import FieldPanel from './FieldPanel'
import FormPanel from './FormPanel'

export default {
  name: 'RightPanel',
  props: ['showField', 'activeData', 'formConf', 'drawingList'],
  components: { FieldPanel, FormPanel },

  data() {
    return {
      currentTab: 'field'
    }
  },

  mounted() {},

  methods: {}
}
</script>

<style lang="scss" scoped>
.right-board {
  width: 350px;
  position: absolute;
  right: 0;
  top: 0;
  padding-top: 3px;
  .field-box {
    position: relative;
    height: calc(100vh - 42px);
    box-sizing: border-box;
    overflow: hidden;
  }
  .el-scrollbar {
    height: 100%;
  }
}
.select-item {
  display: flex;
  border: 1px dashed #fff;
  box-sizing: border-box;
  & .close-btn {
    cursor: pointer;
    color: #f56c6c;
  }
  & .el-input + .el-input {
    margin-left: 4px;
  }
}
.select-item + .select-item {
  margin-top: 4px;
}
.select-item.sortable-chosen {
  border: 1px dashed #409eff;
}
.select-line-icon {
  line-height: 32px;
  font-size: 22px;
  padding: 0 4px;
  color: #777;
}
.option-drag {
  cursor: move;
}
.time-range {
  .el-date-editor {
    width: 227px;
  }
  ::v-deep .el-icon-time {
    display: none;
  }
}
.document-link {
  position: absolute;
  display: block;
  width: 26px;
  height: 26px;
  top: 0;
  left: 0;
  cursor: pointer;
  background: #409eff;
  z-index: 1;
  border-radius: 0 0 6px 0;
  text-align: center;
  line-height: 26px;
  color: #fff;
  font-size: 18px;
}
.node-label {
  font-size: 14px;
}
.node-icon {
  color: #bebfc3;
}
</style>
