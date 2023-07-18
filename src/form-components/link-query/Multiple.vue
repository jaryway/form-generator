<!-- <template>
  <el-table>
    <el-table-column v-for="(item, key) in linkFields" :key="key"> </el-table-column>
  </el-table>
</template> -->

<script>
export default {
  name: 'LinkedQueryMultple',
  props: ['dataSource', 'linkFields', 'linkForm', 'allowAdd'],

  inject: {
    handleAddLinkFormData: {
      default: (linkFormId) => {
        console.log('handleAddLinkFormData-default', linkFormId)
      },
    },
  },

  data() {
    return {}
  },

  mounted() {},

  methods: {
    handleAdd() {
      this.handleAddLinkFormData(this.linkForm)
    },
  },

  render(h) {
    return (
      <div class='linked-query'>
        <div class='linked-query-header' v-if='allowAdd'>
          <el-button type='primary' onClick={this.handleAdd}>
            新增
          </el-button>
        </div>
        <el-table data={this.dataSource || []}>
          {this.linkFields.map((item, key) => {
            return (
              <el-table-column prop={item.config.vModel} label={item.config.label} key={key}>
                {(item.children || []).map((child, childKey) => {
                  return <el-table-column prop={child.config.vModel} label={child.config.label} key={childKey} />
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

<style lang="scss" scoped></style>
