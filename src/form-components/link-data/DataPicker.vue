<script>
export default {
  name: 'FgLinkDataPicker',
  props: ['visible', 'linkFields', 'field'],

  inject: {
    linkDataRequest: {},
    onLinkDataSelect: {}
  },

  data() {
    return {
      dataSource: []
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
        pageSize: 10
      }

      this.linkDataRequest(params) //
        .then((resp) => {
          // console.log('respresprespresp10', resp)
          this.dataSource = resp
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
      this.$emit('update:visible', false)
      this.$emit('select', row)
      if (!this.onLinkDataSelect) {
        console.warn(' 未提供 onLinkDataSelect 方法')
      }

      this.onLinkDataSelect(this.field, row)
    }
  },
  render() {
    const fields = this.linkFields || []

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
      <el-dialog
        size='small'
        title='选择数据'
        visible={this.visible}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
      >
        <el-table size='small' border data={this.dataSource} row-key='id' onSelect={this.handleSelect}>
          <el-table-column type='selection' width='55' align='center' />
          {loop(fields)}
        </el-table>
      </el-dialog>
    )
  }
}
</script>

<style lang="less" scoped>
::v-deep .el-dialog__body {
  padding: 4px 16px 16px;
}
</style>
