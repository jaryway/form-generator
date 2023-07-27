<!-- <template>
  <el-table>
    <el-table-column v-for="(item, key) in linkFields" :key="key"> </el-table-column>
  </el-table>
</template> -->

<script>
const memberFields = ['MEMBER_CHECK', 'MEMBER_RADIO', 'DEPT_CHECK', 'DEPT_RADIO']
export default {
  name: 'FginkedQueryMultple',
  props: ['dataSource', 'linkFields', 'linkForm', 'allowAdd'],

  inject: {
    handleAddLinkFormData: {
      default: (linkFormId) => {
        // console.log('handleAddLinkFormData-default', linkFormId)
      },
    },
  },

  data() {
    return {}
  },

  methods: {
    handleAdd() {
      if (!this.handleAddLinkFormData) {
        console.warn('没有提供 handleAddLinkFormData 方法')
      } else {
        this.handleAddLinkFormData(this.linkForm)
      }
    },
  },

  render(h) {
    return (
      <div class='link-query'>
        {this.allowAdd && (
          <div class='link-query-header'>
            <el-button size='mini' type='default' onClick={this.handleAdd}>
              新增
            </el-button>
          </div>
        )}
        <el-table data={this.dataSource || []} size='small' border>
          {this.linkFields.map((item, key) => {
            return (
              <el-table-column
                prop={item.vModel}
                label={item.label}
                key={key}
                scopedSlots={{
                  default: ({ row }) => {
                    const v = row[item.vModel]
                    if (memberFields.includes(item.typeId)) return (v || []).map((m) => m.name)
                    return v
                  },
                }}
              >
                {(item.children || []).map((child, childKey) => {
                  return (
                    <el-table-column
                      prop={child.vModel}
                      label={child.label}
                      key={childKey}
                      scopedSlots={{
                        default: ({ row }) => {
                          const v = row[child.vModel]
                          if (memberFields.includes(child.typeId)) return (v || []).map((m) => m.name)
                          return v
                        },
                      }}
                    />
                  )
                })}
              </el-table-column>
            )
          })}
        </el-table>
      </div>
    )
  },
}
</script>

<style lang="less" scoped>
.link-query {
  width: 100%;
  &-header {
    margin-bottom: 8px;
    text-align: right;
  }
}
</style>
