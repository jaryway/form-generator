<!-- <template>
  <el-table>
    <el-table-column v-for="(item, key) in linkFields" :key="key"> </el-table-column>
  </el-table>
</template> -->

<script>
export default {
  name: 'FginkedQueryMultple',
  props: ['dataSource', 'linkFields', 'linkForm', 'allowAdd'],

  inject: {
    handleAddLinkFormData: {
      default: (linkFormId) => {
        // console.log('handleAddLinkFormData-default', linkFormId)
      }
    }
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
    }
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
        <el-table data={this.dataSource || []}>
          {this.linkFields.map((item, key) => {
            return (
              <el-table-column prop={item.vModel} label={item.label} key={key}>
                {(item.children || []).map((child, childKey) => {
                  return <el-table-column prop={child.vModel} label={child.label} key={childKey} />
                })}
              </el-table-column>
            )
          })}
        </el-table>
      </div>
    )
  }
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
