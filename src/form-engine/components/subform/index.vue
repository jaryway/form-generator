<!-- eslint-disable no-unreachable -->
<script>
import Render from '../../render/render.js'
const memberFields = ['MEMBER_CHECK', 'MEMBER_RADIO', 'DEPT_CHECK', 'DEPT_RADIO']
export default {
  model: { event: 'input', prop: 'value' },
  name: 'FgSubform',
  props: ['value', 'config', 'children', 'disabled', 'readOnly', 'linkFieldValues', 'defaultValue'],
  components: { Render },
  inject: {
    buildListeners: {},
  },
  data() {
    return {
      tableKey: 'tableKey',
      hasBindListeners: false,
      // fields: this.children || [],
      colConfs: {},
      title: '',
      keys: {},
      // dataSource: [{ fieldmiyDhEB1678166867066: 'sdfasdf' }]
      confs: {},
    }
  },
  created() {},
  mounted() {
    // console.log('mounted', this.value)
  },
  methods: {
    handleSelect() {},
    handelChange() {},
    handelAdd() {
      // if (!this.value) this.value.push(this.defaultValue)
      // console.log('handelAdd', this.dataSource)
      if (!this.value) {
        this.$emit('input', this.defaultValue)
      } else {
        this.value.push(this.defaultValue?.[0] || {})
      }
    },
    handleDelete(index) {
      // console.log('handleDelete')
      this.value.splice(index, 1)
      // this.$emit('input', this.dataSource)
    },
  },
  computed: {
    dataSource: {
      get() {
        // console.log('setValuesetValue.get', this.value)
        return this.value || []
      },
      set(val) {
        // this.$emit('input', val)
      },
    },
    fields() {
      return this.children || []
    },
    columns() {
      return (this.children || []).reduce((prev, cur, index) => {
        return { ...prev, [index]: cur, rows: {} }
      }, {})
    },
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler(val) {
        // console.log('setValuesetValue.watch', val)
      },
    },
  },
  render(h) {
    const fields = this.fields // this.children || []
    const self = this
    const [defaultRowValue] = self.defaultValue || []
    // console.log('getLinkColValue', this.value)
    const buildScopedSlots = (schema, index, parentSchema) => {
      const { typeId, vModel } = schema
      return {
        default: ({ row, $index }) => {
          const isLinkDataFirstCol = parentSchema?.typeId === 'LINKED_DATA' && index === 0

          const getLinkColValue = () => {
            if (parentSchema?.typeId === 'LINKED_DATA') return (row[parentSchema.vModel] || {})[vModel]
            return (this.linkFieldValues || {})[vModel]
          }

          const text = () => {
            const v = getLinkColValue()
            if (memberFields.includes(typeId)) return (v || []).map((m) => m.name)
            return v
          }

          if (parentSchema && !isLinkDataFirstCol) {
            // 如果是关联查询和关联数据的字段，只展示数据
            return text()
          }

          let extra = {}
          if (isLinkDataFirstCol) {
            extra = { rowIndex: $index, renderInTable: true, multiple: true }
          }

          let listeners = {}
          if (!this.disabled) {
            listeners = self.buildListeners(isLinkDataFirstCol ? parentSchema : schema, $index, defaultRowValue, (options) => {
              self.$set(self.children[index], 'rowKey', Math.random())
              self.$set(self.children[index].__slot__, 'options', options)
            })
          }

          return h(
            'Render',
            {
              props: {
                conf: {
                  ...(isLinkDataFirstCol ? parentSchema : schema),
                  ...extra,
                  readOnly: this.readOnly,
                  readonly: this.readOnly,
                  disabled: this.disabled,
                },
                values: row,
              },
              on: listeners,
              key: [parentSchema?.vModel, vModel, $index].filter(Boolean).join('_'),
            },
            [isLinkDataFirstCol && text()]
          )
        },
      }
    }

    const buildLinkColumns = (schema) => {
      const { linkList, linkedShowField, typeId, vModel } = schema
      const isLinkData = typeId === 'LINKED_DATA'
      const list = isLinkData ? linkedShowField : linkList

      return list.map((child, childKey) => {
        // console.log('isLinkDataFirstCol'.list, childKey)
        return (
          <el-table-column
            key={vModel + '_' + child.vModel}
            label={child.label} //
            scopedSlots={buildScopedSlots(child, childKey, schema)}
          />
        )
      })
    }

    const loop = (data) => {
      return data.reduce((prev, schema, index) => {
        const { config, vModel, typeId, rowKey } = schema
        const key = rowKey + vModel + index

        if (typeId === 'QUERY_CHECK' || typeId === 'LINKED_DATA') {
          if (!config.showLabel) {
            return [...prev, ...buildLinkColumns(schema, index)]
          } else {
            return [
              ...prev,
              <el-table-column key={vModel} label={config.label} align='center'>
                {buildLinkColumns(schema, index)}
              </el-table-column>,
            ]
          }
        }

        return [...prev, <el-table-column minWidth={160} key={vModel} prop={vModel} label={config.label} scopedSlots={buildScopedSlots(schema, index)} />]
      }, [])
    }

    const optionScopedSlots = {
      default: ({ $index }) => {
        return (
          <div class='row-head' disabled={this.disabled} style={{ width: '100%' }}>
            <span class='row-num'>{$index + 1}</span>
            {!this.disabled && (
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
            )}
          </div>
        )
      },
    }

    return (
      <div class='fg-subform' style={{ width: '100%' }}>
        <el-table maxHeight={360} size='small' ref='refTable' border data={this.dataSource} row-key='id'>
          <el-table-column type='index' align='center' fixed='left' scopedSlots={optionScopedSlots} />
          {loop(fields)}
        </el-table>
        {!this.disabled && (
          <div style='margin-top:8px'>
            <el-button type='default' onClick={this.handelAdd}>
              添加
            </el-button>
          </div>
        )}
      </div>
    )
  },
}
</script>

<style lang="scss" scoped>
::v-deep .el-table__body tr {
  .row-head:not([disabled]) {
    .row-num {
      display: block;
    }
    .icon-trash {
      display: none;
    }
  }

  &:hover {
    .row-head:not([disabled]) {
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
