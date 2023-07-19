<script>
export default {
  name: 'FgLinkDataPicker',
  props: ['visible', 'linkFields', 'field'],

  inject: {
    linkDataRequest: {},
  },

  data() {
    return {
      fields: [],
      dataSource: [],
    }
  },

  methods: {
    handleOpen() {
      if (!this.linkDataRequest) {
        console.warn('未提供 linkDataRequest 参数')
        return
      }

      const params = {
        fieldList: [],
        filter: {},
        pageNum: 1,
        pageSize: 10,
      }

      this.linkDataRequest(params) //
        .then((resp) => {
          console.log('respresprespresp10', resp)
          const { list, headList, pageNum, pageSize } = resp
          this.dataSource = list || []
          this.fields = headList
        })
        .catch((ex) => {
          console.error(ex)
        })
    },
    handleClose() {
      this.$emit('update:visible', false)
    },
    handleSelect(_selection, row) {
      // this.$emit('select', row)
      // console.log('handleSelect', this.$refs.refTable)
      this.$emit('update:visible', false)
      this.$emit('select', row || {})
      this.$refs.refTable.clearSelection()
    },
  },
  render() {
    const fields = this.fields || []

    const loop = (data) => {
      return data.map((field, key) => {
        return (
          <el-table-column prop={field.vModel} label={field.label} key={key}>
            {loop(field.children || [])}
          </el-table-column>
        )
      })
    }

    return (
      <el-dialog size='small' title='选择数据' visible={this.visible} onOpen={this.handleOpen} onClose={this.handleClose}>
        <el-table size='small' ref='refTable' border data={this.dataSource} row-key='id' onSelect={this.handleSelect}>
          <el-table-column type='selection' width='55' align='center' />
          {loop(fields)}
        </el-table>
      </el-dialog>
    )
  },
}
</script>

<style lang="less" scoped>
::v-deep .el-dialog__body {
  padding: 4px 16px 16px;
}
</style>
