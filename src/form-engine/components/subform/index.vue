<!-- eslint-disable no-unreachable -->
<script>
import Render from '../../render/render.js'
const c1 = {
  visibility: true,
  editable: true,
  typeName: '单行文本',
  description: '',
  limitRepeat: false,
  repeatReminderText: '此项内容已存在，不允许重复提交',
  parentKey: 'fieldeCtDhEB1678166852263',
  readonly: false,
  linkVModel: 'fieldmiyDhEB1678166867066',
  style: {
    width: '254px',
    maxWidth: '100%'
  },
  typeId: 'INPUT',
  placeholder: '请输入工程号',
  config: {
    defaultValue: '',
    typeOption: [
      {
        label: '无',
        value: 'text'
      },
      {
        label: '手机号码',
        value: 'phoneNumber'
      },
      {
        label: '电话号码',
        value: 'tel'
      },
      {
        label: '邮政编码',
        value: 'zipCode'
      },
      {
        label: '身份证号码',
        value: 'idNumber'
      },
      {
        label: '邮箱',
        value: 'email'
      }
    ],
    format: 'text',
    label: '工程号',
    defaultValueSource: {
      id: '',
      type: 0
    },
    required: true,
    showLabel: true,
    renderKey: 'sQLGSFB1678438134927',
    layout: 'colFormItem',
    displayType: true,
    tagIcon: 'input',
    changeTag: true,
    tag: 'el-input',
    defaultValueType: 0,
    span: 6
  },
  vModel: 'fieldKMhNSFB167843875651801'
}
const c2 = {
  visibility: true,
  editable: true,
  typeName: '单行文本',
  description: '',
  limitRepeat: false,
  repeatReminderText: '此项内容已存在，不允许重复提交',
  parentKey: 'fieldeCtDhEB1678166852263',
  readonly: false,
  style: {
    width: '254px',
    maxWidth: '100%'
  },
  typeId: 'INPUT',
  placeholder: '请输入技术采购单号',
  config: {
    defaultValue: '',
    typeOption: [
      {
        label: '无',
        value: 'text'
      },
      {
        label: '手机号码',
        value: 'phoneNumber'
      },
      {
        label: '电话号码',
        value: 'tel'
      },
      {
        label: '邮政编码',
        value: 'zipCode'
      },
      {
        label: '身份证号码',
        value: 'idNumber'
      },
      {
        label: '邮箱',
        value: 'email'
      }
    ],
    format: 'text',
    label: '技术采购单号',
    defaultValueSource: {
      id: '',
      type: 0
    },
    required: false,
    showLabel: true,
    renderKey: 'gAgOSFB1678438901921',
    layout: 'colFormItem',
    displayType: true,
    tagIcon: 'input',
    changeTag: true,
    tag: 'el-input',
    defaultValueType: 0,
    span: 6
  },
  vModel: 'fieldgAgOSFB1678438901921'
}
export default {
  model: { event: 'input', prop: 'value' },
  name: 'FgSubform',
  props: ['value', 'config', 'children'],
  components: { Render },
  data() {
    return {
      // dataSource: [{ fieldmiyDhEB1678166867066: 'sdfasdf' }]
    }
  },

  mounted() {},
  methods: {
    handleSelect() {},
    handelChange() {},
    handelAdd() {
      this.dataSource.push({})
    },
    handleDelete(index) {
      console.log('handleDelete')
      this.dataSource.splice(index, 1)
    }
  },
  computed: {
    dataSource: {
      get() {
        console.log('input.get')
        return this.value || []
      },
      set(val) {
        console.log('input.set')
        this.$emit('input')
      }
    }
  },
  render(h) {
    const fields = this.children || []
    const self = this
    // console.log('dataSource.render.value', this.dataSource)

    const loop = (data) => {
      return data.map((c1, key) => {
        // const { children, config, vModel } = item
        // console.log('scheme.subform.item', item)
        return (
          <el-table-column
            minWidth={160}
            key={c1.vModel}
            prop={c1.vModel}
            label={c1.config.label}
            scopedSlots={{
              default: ({ row, $index }) => {
                let extra = {}
                if (c1.typeId === 'LINKED_DATA') {
                  extra = { rowIndex: $index, renderInTable: true, multiple: true }
                }

                return h('Render', {
                  props: { conf: { ...c1, ...extra }, values: row, key: $index },
                  on: {
                    input(event) {
                      self.$set(row, c1.vModel, event)
                    }
                  }
                })
              }
            }}
          />
        )
      })
    }

    return (
      <div class='fg-subform'>
        <el-table maxHeight={480} size='small' ref='refTable' border data={this.dataSource} row-key='id'>
          <el-table-column
            type='index'
            align='center'
            fixed='left'
            scopedSlots={{
              default: ({ $index }) => {
                return (
                  <div class='row-head'>
                    <span class='row-num'>{$index + 1}</span>
                    <el-popconfirm
                      confirm-button-text='好的'
                      cancel-button-text='不用了'
                      icon='el-icon-info'
                      icon-color='red'
                      title='确定删除吗？'
                      size='mini'
                      onOnConfirm={() => {
                        this.handleDelete($index)
                      }}
                    >
                      <span slot='reference' class='el-icon-delete icon-trash' />
                    </el-popconfirm>
                  </div>
                )
              }
            }}
          />
          {loop(fields)}
        </el-table>
        <div style='margin-top:8px'>
          <el-button type='default' onClick={this.handelAdd}>
            添加
          </el-button>
        </div>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-table__body tr {
  .row-head {
    .row-num {
      display: block;
    }

    .icon-trash {
      display: none;
    }
  }

  &:hover {
    .row-head {
      .row-num {
        display: none;
      }

      .icon-trash {
        display: block;
        cursor: pointer;
      }
    }
  }
}
</style>
