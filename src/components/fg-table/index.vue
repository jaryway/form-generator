<script>
import render from '../render/render'
// import { buildListeners } from '../parser/Parser.vue'
const field = {
  style: {
    width: '254px',
    maxWidth: '100%',
  },
  value: [
    {
      fieldpFirCPB1682128031249: '',
      fieldkorrCPB1682128057527: '',
    },
    {
      fieldkorrCPB1682128057527: '',
      fieldpFirCPB1682128031249: '',
    },
    {
      fieldkorrCPB1682128057527: '',
      fieldpFirCPB1682128031249: '',
    },
  ],
  __config__: {
    tag: 'el-table',
    span: 12,
    label: '子表单',
    layout: 'rowFormItem',
    tagIcon: 'input',
    changeTag: true,
    renderKey: 'OagrCPB1682128026646',
    showLabel: true,
    labelWidth: null,
    displayType: true,
    showRequired: false,
    defaultValueType: 0,
    showDefaultValue: true,
    defaultValueSource: {
      id: '',
      type: 0,
    },
  },
  typeId: 'CHILD_FORM',
  __vModel__: 'fieldOagrCPB1682128026646',
  __slot__: {
    dataList: [],
  },
  children: [
    {
      style: {
        width: '254px',
        maxWidth: '100%',
      },
      __config__: {
        tag: 'el-input',
        span: 12,
        label: '姓名',
        format: 'text',
        layout: 'colFormItem',
        tagIcon: 'input',
        required: true,
        changeTag: true,
        renderKey: 'pFirCPB1682128031249',
        showLabel: true,
        labelWidth: null,
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
        displayType: true,
        defaultValue: '',
        defaultValueType: 0,
        defaultValueSource: {
          id: '',
          type: 0,
        },
      },
      typeId: 'INPUT',
      __vModel__: 'fieldpFirCPB1682128031249',
      editable: true,
      readonly: false,
      typeName: '单行文本',
      parentKey: 'fieldOagrCPB1682128026646',
      visibility: true,
      description: '',
      limitRepeat: false,
      placeholder: '请输入姓名',
      repeatReminderText: '此项内容已存在，不允许重复提交',
    },
    {
      style: {
        width: '254px',
        maxWidth: '100%',
      },
      __config__: {
        tag: 'el-input',
        span: 24,
        label: '班级',
        format: 'text',
        layout: 'colFormItem',
        tagIcon: 'input',
        required: true,
        changeTag: true,
        renderKey: 'korrCPB1682128057527',
        showLabel: true,
        labelWidth: null,
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
        displayType: true,
        defaultValue: '',
        defaultValueType: 0,
        defaultValueSource: {
          id: '',
          type: 0,
        },
      },
      typeId: 'INPUT',
      __vModel__: 'fieldkorrCPB1682128057527',
      editable: true,
      readonly: false,
      typeName: '单行文本',
      parentKey: 'fieldOagrCPB1682128026646',
      visibility: true,
      description: '',
      limitRepeat: false,
      placeholder: '请输入班级',
      repeatReminderText: '此项内容已存在，不允许重复提交',
    },
    {
      style: {
        maxWidth: '100%',
      },
      canAdd: true,
      __config__: {
        tag: 'my-form',
        span: 24,
        label: '关联查询',
        layout: 'colFormItem',
        dbTable: '1640899270301220865',
        tagIcon: 'input',
        changeTag: true,
        renderKey: 'HLMoGPB1682156796273',
        showLabel: true,
        labelWidth: null,
        dbFieldList: ['1649711137891065858', '1649711251044999169'],
        displayType: true,
        showDefaultValue: false,
      },
      typeId: 'QUERY_CHECK',
      __vModel__: 'fieldHLMoGPB1682156796273',
      dataNum: 1,
      linkList: [
        {
          id: '1649711137891065858',
          name: 'fieldibpnGPB1682156734859',
          type: 0,
          label: '单行01',
          typeId: 'INPUT',
          __vModel__: 'fieldibpnGPB1682156734859',
          visible: 1,
          __slot__: null,
          children: null,
          disabled: false,
          parentId: 1,
          foreignId: 0,
          childrenFlag: 0,
          childrenFromDesignerId: null,
        },
        {
          id: '1649711251044999169',
          name: 'fieldPhAoGPB1682156765021',
          type: 0,
          label: '单行02',
          typeId: 'INPUT',
          __vModel__: 'fieldPhAoGPB1682156765021',
          visible: 1,
          __slot__: null,
          children: null,
          disabled: false,
          parentId: 1,
          foreignId: 0,
          childrenFlag: 0,
          childrenFromDesignerId: null,
        },
      ],
      typeName: '关联查询',
      parentKey: 'fieldgkbsCPB1682128154200',
      filterCond: [
        {
          type: 0,
          value: '1649711137891065858',
          typeId: 'INPUT',
          value2: 'fieldckNYMOB1681818216184',
          condition: 2,
          typeDisabled: false,
        },
      ],
      visibility: true,
      description: '',
      linkedShowField: [],
    },
  ],
  editable: true,
  notChild: true,
  readonly: false,
  typeName: '子表单',
  tableList: [],
  visibility: true,
  description: '',
  fieldDisplayRules: [],
}

export default {
  name: 'FgTable',

  render(h) {
    return (
      <div>
        <el-table data={this.tableData} style='width: 100%' size='small'>
          {this.columns}
        </el-table>
      </div>
    )
  },

  data() {
    const scopedSlots = (field) => {
      // 区分是展示模式还是编辑模式

      return {
        default: (scope) => {
          // 展示模式
          if (this.isEdit) {
            // const listeners = buildListeners(field)
            return <render conf={field} />
          }
          if (['MEMBER_RADIO', 'MEMBER_CHECK', 'DEPT_RADIO', 'DEPT_CHECK'].includes(field.typeId)) {
            return scope.row[field.__vModel__]?.map((m) => m.name).join(',')
          }
        },
      }
    }
    const buildColumns = (children) => {
      return (children || []).map((item) => {
        const childProp = item.typeId === 'QUERY_CHECK' ? 'linkList' : 'children'
        const hasChild = item[childProp] && item[childProp].length

        console.log('item', item.__config__.label, item.children)

        if (item.typeId === 'QUERY_CHECK') {
          return (
            <el-table-column props={{ label: item.__config__.label }}>
              {(item.linkList || []).map((child) => {
                return <el-table-column props={{ label: child.label, prop: child.__vModel__ }} scopedSlots={scopedSlots(child)}></el-table-column>
              })}
            </el-table-column>
          )
        }

        return (
          <el-table-column props={{ label: item.__config__.label, prop: hasChild ? undefined : item.__vModel__ }} scopedSlots={scopedSlots(item)}>
            {hasChild && buildColumns(item[childProp])}
          </el-table-column>
        )
      })
    }
    console.log('item.', field.children)
    const columns = buildColumns(field.children)

    return {
      isEdit: true,
      columns: columns,
      //   [
      //     {
      //       //   prop: 'date',
      //       label: '日期',
      //       width: '180',
      //       children: [<el-table-column props={{ label: 'test', prop: 'date' }} />],
      //       scopedSlots: {
      //         default: (scope) => {
      //           console.log('scope', scope)
      //           //   const name = scope.row.name
      //           return <span>{scope.row.date}</span>
      //         },
      //       },
      //     },
      //     { prop: 'name', label: '姓名', width: '180' },
      //     { prop: 'address', label: '地址', width: '' },
      //   ],
      tableData: [
        {
          fieldPhAoGPB1682156765021: '2016-05-02',
          fieldpFirCPB1682128031249: '王小虎',
          fieldibpnGPB1682156734859: '上海市普陀区金沙江路 1518 弄',
          fieldkorrCPB1682128057527: 'fieldibpnGPB1682156734859',
        },
        {
          fieldPhAoGPB1682156765021: '2016-05-04',
          fieldpFirCPB1682128031249: '王小虎',
          fieldibpnGPB1682156734859: '上海市普陀区金沙江路 1517 弄',
          fieldkorrCPB1682128057527: 'fieldibpnGPB1682156734859',
        },
        {
          fieldPhAoGPB1682156765021: '2016-05-01',
          fieldpFirCPB1682128031249: '王小虎',
          fieldibpnGPB1682156734859: '上海市普陀区金沙江路 1519 弄',
          fieldkorrCPB1682128057527: 'fieldibpnGPB1682156734859',
        },
        {
          fieldPhAoGPB1682156765021: '2016-05-03',
          fieldpFirCPB1682128031249: '王小虎',
          fieldibpnGPB1682156734859: '上海市普陀区金沙江路 1516 弄',
          fieldkorrCPB1682128057527: 'fieldibpnGPB1682156734859',
        },
      ],
    }
  },

  mounted() {},

  methods: {},
}
</script>

<style lang="scss" scoped></style>
