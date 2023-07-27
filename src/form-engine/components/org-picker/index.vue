<template>
  <div>
    <el-dialog
      class="menuDialog"
      :title="title"
      width="620px"
      :close-on-click-modal="false"
      append-to-body
      v-bind="$attrs"
      v-on="$listeners"
      @open="handleOpen"
    >
      <el-form>
        <el-form-item>
          <div class="menu">
            <div class="tabs">
              <el-tabs v-model="activeTab" type="card" size="small">
                <el-tab-pane v-for="tab in type" :key="tab" :label="typeLabel[tab]" :name="tab">
                  <organization-tree
                    ref="selectedTree"
                    :selectedIds="selectedIds"
                    :tab="tab"
                    @onManSelected="onManSelected"
                  />
                </el-tab-pane>
                <el-tab-pane label="搜索">
                  <searcher :selectedIds="selectedIds" :onlyUser="onlyUser" @onManSelected="onManSelected" />
                </el-tab-pane>
              </el-tabs>
            </div>
            <div class="selectedBox">
              <div class="title">已选择的部门、成员</div>
              <div class="content">
                <el-tag
                  v-for="tag in selecteds"
                  :key="tag.id"
                  closable
                  disable-transitions
                  effect="light"
                  size="small"
                  @close="removeTag(tag)"
                >
                  <div class="name">
                    {{ tag.name }}
                  </div>
                </el-tag>
              </div>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <div class="tips">已选择{{ count }}个</div>
        <div class="buttons">
          <el-button @click="handleCancel">取 消</el-button>
          <el-button type="primary" @click="handleOk">确 定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Searcher from './Searcher.vue'
import OrganizationTree from './OrganizationTree.vue'

export default {
  components: {
    Searcher,
    OrganizationTree
  },
  props: {
    type: {
      type: Array,
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return Array.isArray(value) && value.every((m) => ['DIVISION', 'GROUP', 'USER'].includes(m))
      },
      default: () => {
        return ['USER']
      }
    },
    selectedList: {
      type: Array,
      default: () => {
        return []
      }
    },
    title: {
      type: String,
      default: '请选择'
    },
    multiple: {
      type: Boolean,
      default: true
    }
  },

  data() {
    const safeType = this.type || []
    return {
      onlyUser: safeType.length === 1 && safeType.includes('USER'),
      activeTab: '',
      typeLabel: {
        DIVISION: '部门',
        GROUP: '分组',
        USER: '成员'
      },
      selecteds: []
    }
  },
  computed: {
    selectedIds() {
      return this.selecteds.map((m) => m.id)
    },
    count() {
      return this.selecteds.length
    }
  },

  mounted() {
    this.activeTab = this.type[0]
  },
  methods: {
    onManSelected(entry) {
      // console.log('resp.onManSelected', entry, this.selecteds);
      const checked = this.selecteds.some((m) => m.id === entry.id)
      if (checked) {
        this.selecteds = this.selecteds.filter((m) => m.id !== entry.id)
      } else {
        // 多选是追加，单选是返回当前
        this.selecteds = this.multiple ? this.selecteds.concat(entry) : [entry]
      }
    },
    removeTag(entry) {
      this.selecteds = this.selecteds.filter((item) => item.id !== entry.id)
    },

    handleOpen() {
      this.selecteds = JSON.parse(JSON.stringify(this.selectedList))
    },
    handleOk() {
      this.$emit('confirm', this.selecteds, 'submit')
      this.$emit('update:visible', false)
    },
    handleCancel() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="less" scoped>
::v-deep .el-dialog {
  .el-dialog__header {
    border-bottom: 1px solid #f0f0f0;
  }

  .el-dialog__body {
    height: 460px;
  }

  .el-dialog__footer {
    border-top: 1px solid #f0f0f0;

    .dialog-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .tips {
        font-size: 14px;
        text-align: left;
      }
    }
  }

  .menu {
    height: 100%;
    display: flex;

    .tabs {
      height: 100%;
      width: 55%;
      padding-right: 12px;
      border-right: 1px solid #f0f0f0;

      .el-tabs {
        height: 100%;
        overflow: hidden;

        .el-tabs__content {
          height: 340px;
          overflow: auto;

          .el-tree {
            .custom-tree-node {
              display: flex;
              align-items: center;
            }
          }

          .title {
            padding: 8px 0px;
          }

          .content {
            .searchResults {
              padding: 4px 0;
              padding-left: 24px;
              cursor: pointer;
            }

            .checked {
              background-color: #1b62b7;
              color: #fff;
            }
          }
        }
      }
    }

    .selectedBox {
      width: 43%;
      padding-left: 12px;

      .content {
        width: 100%;
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;

        .el-tag {
          display: flex;
          align-items: center;
          max-width: 100%;

          .name {
            width: 95%;
            display: block;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          i {
            display: flex;
            justify-content: center;
            align-items: center;
            top: 0;
          }
        }
      }
    }
  }
}
</style>
