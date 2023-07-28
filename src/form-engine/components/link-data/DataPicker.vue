<script>
export default {
  name: 'FgLinkDataPicker',
  props: ['visible', 'linkFields', 'filterCond', 'formDesignerId', 'multiple'],

  inject: {
    linkDataRequest: {}
  },

  data() {
    return {
      loading: true,
      fields: this.linkFields || [],
      dataSource: [],
      total: 0,
      selection: []
    }
  },

  methods: {
    handleOpen() {
      if (!this.linkDataRequest) {
        console.warn('未提供 linkDataRequest 参数')
        return
      }

      const params = {
        fieldList: ['customTitle'],
        filter: this.filterCond,
        formDesignerId: this.formDesignerId,
        pageNum: 1,
        pageSize: 10
      }

      this.loading = true
      this.linkDataRequest(params) //
        .then((resp) => {
          // console.log('respresprespresp10', resp)
          const { list, headList, total } = resp
          this.dataSource = list || []
          this.fields = headList || this.linkFields
          this.total = total
          this.loading = false
        })
        .catch((ex) => {
          this.loading = false
          console.error(ex)
        })
    },
    handleClose() {
      this.$emit('update:visible', false)
    },
    handleSelect(selection, row) {
      console.log('handleSelect', selection)
      this.selection = selection
      if (this.multiple) return
      this.$emit('update:visible', false)
      this.$emit('select', selection)
      this.$refs.refTable.clearSelection()
      this.selection = []
    },
    handleCancel() {
      this.$emit('update:visible', false)
    },
    handleOk() {
      // this.$refs.refTable.get
      this.$emit('update:visible', false)
      this.$emit('select', this.selection)
    }
  },
  render() {
    const fields = this.fields || []

    // console.log('xxxxxxxxxxxxx', this.multiple)

    const loop = (data) => {
      return data.map((field, key) => {
        return (
          <el-table-column
            prop={field.vModel}
            label={field.label}
            key={key}
            scopedSlots={{
              default: ({ row }) => {
                const text = row[field.vModel]
                if (Array.isArray(text)) return text.map((m) => m.name).join(',')
                return row[field.vModel]
              }
            }}
          >
            {loop(field.children || [])}
          </el-table-column>
        )
      })
    }

    return (
      <el-dialog
        width='880px'
        size='small'
        title='选择数据'
        visible={this.visible}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
      >
        <el-form>
          <el-form-item>
            <el-table
              vLoading={this.loading}
              height={480}
              size='small'
              ref='refTable'
              border
              data={this.dataSource}
              row-key='id'
              onSelect={this.handleSelect}
            >
              <el-table-column
                type='selection'
                width='40'
                align='center'
                fixed='left'
                class-name={this.multiple ? '' : 'no-select-all'}
              />
              {loop(fields)}
            </el-table>
          </el-form-item>
        </el-form>
        <div slot='footer' class='dialog-footer'>
          {(this.total > this.pageSize || true) && (
            <el-pagination style='float:left' background layout='prev, pager, next' total={this.total} />
          )}
          {this.multiple && (
            <div style='margin-top:8px'>
              <el-button onClick={this.handleCancel}>取 消</el-button>
              <el-button type='primary' onClick={this.handleOk}>
                确定
              </el-button>
            </div>
          )}
        </div>
      </el-dialog>
    )
  }
}
</script>

<style lang="less" scoped>
.dialog-footer {
  display: flex;
  flex-direction: column;
}
::v-deep {
  .el-pagination {
    align-self: start;
    padding: 0;
    margin-left: -5px;
  }

  .el-dialog__footer {
    padding: 4px 16px 16px;
  }
  .el-dialog__body {
    padding: 4px 16px 4px;
  }
  .el-table .el-table__header .no-select-all .cell {
    display: none;
  }
}
</style>
