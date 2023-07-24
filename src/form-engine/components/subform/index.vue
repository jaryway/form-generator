<!-- eslint-disable no-unreachable -->
<script>
import Render from '../../render/render.js'
import { deepClone } from '@/utils/index'
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
    maxWidth: '100%',
  },
  typeId: 'INPUT',
  placeholder: '请输入工程号',
  config: {
    defaultValue: '',
    typeOption: [
      {
        label: '无',
        value: 'text',
      },
      {
        label: '手机号码',
        value: 'phoneNumber',
      },
      {
        label: '电话号码',
        value: 'tel',
      },
      {
        label: '邮政编码',
        value: 'zipCode',
      },
      {
        label: '身份证号码',
        value: 'idNumber',
      },
      {
        label: '邮箱',
        value: 'email',
      },
    ],
    format: 'text',
    label: '工程号',
    defaultValueSource: {
      id: '',
      type: 0,
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
    span: 6,
  },
  vModel: 'fieldKMhNSFB167843875651801',
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
    maxWidth: '100%',
  },
  typeId: 'INPUT',
  placeholder: '请输入技术采购单号',
  config: {
    defaultValue: '',
    typeOption: [
      {
        label: '无',
        value: 'text',
      },
      {
        label: '手机号码',
        value: 'phoneNumber',
      },
      {
        label: '电话号码',
        value: 'tel',
      },
      {
        label: '邮政编码',
        value: 'zipCode',
      },
      {
        label: '身份证号码',
        value: 'idNumber',
      },
      {
        label: '邮箱',
        value: 'email',
      },
    ],
    format: 'text',
    label: '技术采购单号',
    defaultValueSource: {
      id: '',
      type: 0,
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
    span: 6,
  },
  vModel: 'fieldgAgOSFB1678438901921',
}
export default {
  model: { event: 'input', prop: 'value' },
  name: 'FgSubform',
  props: ['value', 'config', 'children'],
  components: { Render },
  data() {
    return {
      tableKey: 'tableKey',
      hasBindListeners: false,
      // fields: this.children || [],
      colConfs: {},
      title: '',
      keys: {},
      // dataSource: [{ fieldmiyDhEB1678166867066: 'sdfasdf' }]
    }
  },

  inject: {
    buildListeners: {},
  },

  mounted() {},
  methods: {
    handleSelect() {},
    handelChange() {},
    handelAdd() {
      this.dataSource.push({})
      this.$emit('input', this.dataSource)
    },
    handleDelete(index) {
      console.log('handleDelete')
      this.dataSource.splice(index, 1)
      this.$emit('input', this.dataSource)
    },
  },
  computed: {
    dataSource: {
      get() {
        console.log('formConf.get', this.value)
        return this.value || []
      },
      set(val) {
        console.log('input.set')
        this.$emit('input', val)
      },
    },
    fields() {
      console.log('listeners.focus.select.7777')
      return this.children || []
    },
  },
  watch: {
    children: {
      handler(val) {
        console.log('listeners.focus.select.66666', val)
      },
    },
  },
  render(h) {
    // const fields = this.children || []
    const self = this
    console.log('dataSource.render.value', this.$props)

    const loop = (data) => {
      return data.map((item, key) => {
        const cloneConf = deepClone(item)
        // const { children, config, vModel } = item
        // console.log('scheme.subform.item', item)
        // let _key = key
        const scopedSlots = {
          default: ({ row, $index }) => {
            let extra = {}
            if (cloneConf.typeId === 'LINKED_DATA') {
              extra = { rowIndex: $index, renderInTable: true, multiple: true }
            }

            // this.colConfs[key] = cloneConf

            console.log('listeners.focus.select.9999', cloneConf)
            const listeners = self.buildListeners(cloneConf, $index, () => {
              console.log('listeners.focus.select.8888', cloneConf, self.children[key], cloneConf.__slot__.options)

              self.children[key].__slot__.options = cloneConf.__slot__.options
              // self.$nextTick(() => {
              self.$set(self.children[key].__slot__, 'options', cloneConf.__slot__.options)
              self.$set(self.fields[key].config, 'label', 'ddd')
              self.$set(self.fields[key].__slot__, 'options', cloneConf.__slot__.options)

              let __key = self.fields[key].key || 0

              self.$set(self.fields[key], 'key', __key++)
              // self.title = Math.random()
              // this.$forceUpdate()
              // })
            })

            return h(
              'Render',
              {
                key: item.key + $index,
                props: { conf: cloneConf, values: row, key: key + $index },
                on: listeners,
              },
              ['dddsfsdf']
            )
          },
        }

        return <el-table-column minWidth={160} key={key + '' + cloneConf.key} prop={cloneConf.vModel} label={cloneConf.config.label + cloneConf.key} scopedSlots={scopedSlots} />
      })
    }

    return (
      <div class='fg-subform'>
        {this.title}
        <el-table maxHeight={480} size='small' title={this.title} key={this.tableKey} ref='refTable' border data={this.dataSource} row-key='id'>
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
              },
            }}
          />
          {loop(this.fields)}
        </el-table>
        <div style='margin-top:8px'>
          <el-button type='default' onClick={this.handelAdd}>
            添加
          </el-button>
        </div>
      </div>
    )
  },
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
