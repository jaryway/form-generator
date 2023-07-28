<!-- eslint-disable no-unreachable -->
<script>
import render from '../../render/render.js'
import emitter from 'element-ui/lib/mixins/emitter'
const memberFields = ['MEMBER_CHECK', 'MEMBER_RADIO', 'DEPT_CHECK', 'DEPT_RADIO']
export default {
  model: { event: 'input', prop: 'value' },
  name: 'FgSubform',
  props: ['value', 'config', 'children', 'disabled', 'readOnly', 'linkFieldValues', 'defaultValue'],
  components: { render },
  inject: {
    buildListeners: {}
  },
  mixins: [emitter],
  methods: {
    handleSelect() {},
    handelChange() {},
    handelAdd() {
      if (!this.value) {
        this.$emit('input', this.defaultValue)
      } else {
        this.value.push(this.defaultValue?.[0] || {})
      }
    },
    handleDelete(index) {
      this.value.splice(index, 1)
    }
  },
  computed: {
    dataSource: {
      get() {
        return this.value || []
      },
      set() {}
    },
    fields() {
      return this.children || []
    },
    columns() {
      return (this.children || []).reduce((prev, cur, index) => {
        return { ...prev, [index]: cur, rows: {} }
      }, {})
    }
  },

  render(h) {
    const self = this
    const fields = this.fields
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

          const actualSchema = isLinkDataFirstCol ? parentSchema : schema
          const listeners = this.disabled ? {} : self.buildListeners(actualSchema, $index, defaultRowValue)
          let conf = { ...actualSchema, readOnly: this.readOnly, readonly: this.readOnly, disabled: this.disabled }

          if (isLinkDataFirstCol) {
            conf = { ...conf, renderInTable: true, multiple: true }
          }

          return h(
            'render',
            {
              props: { conf, values: row },
              on: listeners,
              key: [parentSchema?.vModel, vModel, $index].filter(Boolean).join('_')
            },
            [isLinkDataFirstCol && text()]
          )
        }
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
        const { config, vModel, typeId } = schema

        if (typeId === 'QUERY_CHECK' || typeId === 'LINKED_DATA') {
          if (!config.showLabel) {
            return [...prev, ...buildLinkColumns(schema, index)]
          } else {
            return [
              ...prev,
              <el-table-column key={vModel} label={config.label} align='center'>
                {buildLinkColumns(schema, index)}
              </el-table-column>
            ]
          }
        }

        return [
          ...prev,
          <el-table-column
            minWidth={160}
            key={vModel}
            prop={vModel}
            label={config.label}
            scopedSlots={buildScopedSlots(schema, index)}
          />
        ]
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
      }
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
  }
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
