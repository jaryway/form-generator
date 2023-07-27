export const mockSubformLinkData = {
  formConf: {
    formId: '',
    formRef: 'elForm',
    formModel: 'formData',
    size: 'mini',
    labelPosition: 'top',
    labelWidth: 100,
    formRules: 'rules',
    disabled: false,
    numberOfColumns: 24,
    description: '',
    submitButtonState: 0,
    submitButtonText: '提交',
    frontEndEvents: [],
    formSubmissionValidation: [],
    fieldDisplayRules: [],
    dataFilterSetting: {
      rel: 0,
      cond: []
    },
    submitAssociationOperation: []
  },
  fields: [
    {
      typeId: 'INPUT',
      typeName: '单行文本',
      config: {
        label: '供应商名称',
        labelWidth: null,
        showLabel: true,
        changeTag: true,
        tag: 'el-input',
        tagIcon: 'input',
        defaultValue: '',
        defaultValueType: 0,
        defaultValueSource: {
          type: 0,
          id: ''
        },
        displayType: true,
        required: true,
        layout: 'colFormItem',
        span: 24,
        format: 'text',
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
        renderKey: 'dGlAvkB1690435301255'
      },
      placeholder: '请输入供应商名称',
      style: {
        width: '254px',
        maxWidth: '100%'
      },
      readonly: false,
      editable: true,
      visibility: true,
      limitRepeat: 0,
      repeatReminderText: '此项内容已存在，不允许重复提交',
      description: '',
      vModel: 'fielddGlAvkB1690435301255'
    },
    {
      typeId: 'CHILD_FORM',
      typeName: '子表单',
      config: {
        label: '子表单',
        labelWidth: null,
        showLabel: true,
        changeTag: true,
        tag: 'my-table',
        tagIcon: 'input',
        showDefaultValue: true,
        defaultValueType: 0,
        defaultValueSource: {
          type: 0,
          id: ''
        },
        displayType: true,
        showRequired: false,
        layout: 'rowFormItem',
        span: 24,
        renderKey: 'kGOAvkB1690435238902'
      },
      children: [
        {
          typeId: 'LINKED_DATA',
          typeName: '关联数据',
          config: {
            label: '关联数据',
            labelWidth: null,
            showLabel: true,
            changeTag: true,
            tag: 'my-form',
            tagIcon: 'input',
            showDefaultValue: false,
            displayType: true,
            required: true,
            layout: 'colFormItem',
            span: 24,
            renderKey: 'wrPAvkB1690435243082',
            dbTable: '1682037576756015106',
            dbFieldList: [
              '1682037576894427138',
              '1682037576898621441',
              '1682037576898621442',
              '1682037576902815746',
              '1682037576907010049',
              '1682037576907010050'
            ]
          },
          style: {
            width: '100%',
            maxWidth: '100%'
          },
          showTitle: true,
          linkList: [
            {
              id: '1682037576894427138',
              label: '供应名称',
              type: 0,
              foreignId: 0,
              typeId: 'INPUT',
              name: 'fielddVUtUgB1689863965386',
              visible: 1,
              childrenFlag: 0,
              childrenFromDesignerId: null,
              children: null,
              vModel: 'fielddVUtUgB1689863965386',
              __slot__: null,
              parentId: 1,
              disabled: true
            },
            {
              id: '1682037576898621441',
              label: '地址',
              type: 0,
              foreignId: 0,
              typeId: 'INPUT',
              name: 'fieldlXYtUgB1689863976524',
              visible: 1,
              childrenFlag: 0,
              childrenFromDesignerId: null,
              children: null,
              vModel: 'fieldlXYtUgB1689863976524',
              __slot__: null,
              parentId: 1,
              disabled: false
            },
            {
              id: '1682037576898621442',
              label: '提交人',
              type: 0,
              foreignId: 0,
              typeId: 'MEMBER_RADIO',
              name: 'createBy',
              visible: 1,
              childrenFlag: 0,
              childrenFromDesignerId: null,
              children: null,
              vModel: 'createBy',
              __slot__: null,
              parentId: 1,
              disabled: false
            },
            {
              id: '1682037576902815746',
              label: '修改人',
              type: 0,
              foreignId: 0,
              typeId: 'MEMBER_RADIO',
              name: 'updateBy',
              visible: 1,
              childrenFlag: 0,
              childrenFromDesignerId: null,
              children: null,
              vModel: 'updateBy',
              __slot__: null,
              parentId: 1,
              disabled: false
            },
            {
              id: '1682037576907010049',
              label: '创建时间',
              type: 0,
              foreignId: 0,
              typeId: 'DATE',
              name: 'createTime',
              visible: 1,
              childrenFlag: 0,
              childrenFromDesignerId: null,
              children: null,
              vModel: 'createTime',
              __slot__: null,
              parentId: 1,
              disabled: false
            },
            {
              id: '1682037576907010050',
              label: '修改时间',
              type: 0,
              foreignId: 0,
              typeId: 'DATE',
              name: 'updateTime',
              visible: 1,
              childrenFlag: 0,
              childrenFromDesignerId: null,
              children: null,
              vModel: 'updateTime',
              __slot__: null,
              parentId: 1,
              disabled: false
            }
          ],
          linkedShowField: [
            {
              id: '1682037576894427138',
              label: '供应名称',
              type: 0,
              foreignId: 0,
              typeId: 'INPUT',
              name: 'fielddVUtUgB1689863965386',
              visible: 1,
              childrenFlag: 0,
              childrenFromDesignerId: null,
              children: null,
              vModel: 'fielddVUtUgB1689863965386',
              __slot__: null,
              parentId: 1,
              disabled: true
            },
            {
              id: '1682037576898621441',
              label: '地址',
              type: 0,
              foreignId: 0,
              typeId: 'INPUT',
              name: 'fieldlXYtUgB1689863976524',
              visible: 1,
              childrenFlag: 0,
              childrenFromDesignerId: null,
              children: null,
              vModel: 'fieldlXYtUgB1689863976524',
              __slot__: null,
              parentId: 1,
              disabled: false
            },
            {
              id: '1682037576898621442',
              label: '提交人',
              type: 0,
              foreignId: 0,
              typeId: 'MEMBER_RADIO',
              name: 'createBy',
              visible: 1,
              childrenFlag: 0,
              childrenFromDesignerId: null,
              children: null,
              vModel: 'createBy',
              __slot__: null,
              parentId: 1,
              disabled: false
            },
            {
              id: '1682037576902815746',
              label: '修改人',
              type: 0,
              foreignId: 0,
              typeId: 'MEMBER_RADIO',
              name: 'updateBy',
              visible: 1,
              childrenFlag: 0,
              childrenFromDesignerId: null,
              children: null,
              vModel: 'updateBy',
              __slot__: null,
              parentId: 1,
              disabled: false
            },
            {
              id: '1682037576907010049',
              label: '创建时间',
              type: 0,
              foreignId: 0,
              typeId: 'DATE',
              name: 'createTime',
              visible: 1,
              childrenFlag: 0,
              childrenFromDesignerId: null,
              children: null,
              vModel: 'createTime',
              __slot__: null,
              parentId: 1,
              disabled: false
            },
            {
              id: '1682037576907010050',
              label: '修改时间',
              type: 0,
              foreignId: 0,
              typeId: 'DATE',
              name: 'updateTime',
              visible: 1,
              childrenFlag: 0,
              childrenFromDesignerId: null,
              children: null,
              vModel: 'updateTime',
              __slot__: null,
              parentId: 1,
              disabled: false
            }
          ],
          linkedFillRules: [
            {
              id: '1682037576894427138',
              label: '供应名称',
              type: 0,
              foreignId: 0,
              typeId: 'INPUT',
              name: 'fielddVUtUgB1689863965386',
              visible: 1,
              childrenFlag: 0,
              childrenFromDesignerId: null,
              children: null,
              vModel: 'fielddVUtUgB1689863965386',
              __slot__: null,
              parentId: 1,
              check: true,
              depend: {
                field: 'fieldLmABvkB169043534244701'
              }
            },
            {
              id: '1682037576898621441',
              label: '地址',
              type: 0,
              foreignId: 0,
              typeId: 'INPUT',
              name: 'fieldlXYtUgB1689863976524',
              visible: 1,
              childrenFlag: 0,
              childrenFromDesignerId: null,
              children: null,
              vModel: 'fieldlXYtUgB1689863976524',
              __slot__: null,
              parentId: 1,
              check: true,
              depend: {
                field: 'fieldAhABvkB169043534245411'
              }
            },
            {
              id: '1682037576898621442',
              label: '提交人',
              type: 0,
              foreignId: 0,
              typeId: 'MEMBER_RADIO',
              name: 'createBy',
              visible: 1,
              childrenFlag: 0,
              childrenFromDesignerId: null,
              children: null,
              vModel: 'createBy',
              __slot__: null,
              parentId: 1,
              check: true,
              depend: {
                field: 'fieldofABvkB169043534245721'
              }
            },
            {
              id: '1682037576902815746',
              label: '修改人',
              type: 0,
              foreignId: 0,
              typeId: 'MEMBER_RADIO',
              name: 'updateBy',
              visible: 1,
              childrenFlag: 0,
              childrenFromDesignerId: null,
              children: null,
              vModel: 'updateBy',
              __slot__: null,
              parentId: 1,
              check: true,
              depend: {
                field: 'fieldDaABvkB169043534245731'
              }
            },
            {
              id: '1682037576907010049',
              label: '创建时间',
              type: 0,
              foreignId: 0,
              typeId: 'DATE',
              name: 'createTime',
              visible: 1,
              childrenFlag: 0,
              childrenFromDesignerId: null,
              children: null,
              vModel: 'createTime',
              __slot__: null,
              parentId: 1,
              check: true,
              depend: {
                field: 'fieldZbABvkB169043534245841'
              }
            },
            {
              id: '1682037576907010050',
              label: '修改时间',
              type: 0,
              foreignId: 0,
              typeId: 'DATE',
              name: 'updateTime',
              visible: 1,
              childrenFlag: 0,
              childrenFromDesignerId: null,
              children: null,
              vModel: 'updateTime',
              __slot__: null,
              parentId: 1,
              check: true,
              depend: {
                field: 'fieldRiABvkB169043534245851'
              }
            }
          ],
          filterCond: [
            {
              value: '1682037576894427138',
              typeId: 'INPUT',
              condition: 12,
              type: 0,
              value2: 'fielddGlAvkB1690435301255',
              typeDisabled: false
            }
          ],
          readonly: false,
          editable: true,
          visibility: true,
          description: '',
          vModel: 'fieldwrPAvkB1690435243082',
          parentKey: 'fieldkGOAvkB1690435238902'
        },
        {
          style: {
            width: '254px',
            maxWidth: '100%'
          },
          config: {
            tag: 'el-input',
            span: 24,
            label: '供应名称',
            format: 'text',
            layout: 'colFormItem',
            tagIcon: 'input',
            required: true,
            changeTag: true,
            renderKey: 'dVUtUgB1689863965386',
            showLabel: true,
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
            displayType: true,
            defaultValue: '',
            defaultValueType: 0,
            defaultValueSource: {
              id: '',
              type: 0
            }
          },
          typeId: 'INPUT',
          vModel: 'fieldLmABvkB169043534244701',
          editable: true,
          readonly: false,
          typeName: '单行文本',
          visibility: true,
          description: '',
          limitRepeat: 0,
          placeholder: '请输入供应名称',
          repeatReminderText: '此项内容已存在，不允许重复提交',
          linkVModel: 'fieldwrPAvkB1690435243082',
          parentKey: 'fieldkGOAvkB1690435238902'
        },
        {
          typeId: 'MEMBER_RADIO',
          typeName: '成员单选',
          config: {
            label: '提交人',
            labelWidth: null,
            showLabel: true,
            changeTag: true,
            tag: 'dept-and-user',
            tagIcon: 'input',
            showDefaultValue: true,
            defaultValue: [],
            defaultValueType: 0,
            defaultValueSource: {
              type: 0,
              id: ''
            },
            displayType: true,
            required: false,
            layout: 'colFormItem',
            span: 24,
            optionalRange: 0,
            dept: 1
          },
          __slot__: {
            default: '选择成员'
          },
          style: {
            width: '254px',
            maxWidth: '100%'
          },
          readonly: false,
          editable: true,
          visibility: true,
          conditionType: 10,
          listRange: [],
          optionalRange: 0,
          vModel: 'fieldofABvkB169043534245721',
          linkVModel: 'fieldwrPAvkB1690435243082',
          parentKey: 'fieldkGOAvkB1690435238902'
        },
        {
          'typeId': 'DATE',
          'typeName': '日期时间',
          'config': {
            label: '创建时间',
            tag: 'el-date-picker',
            tagIcon: 'date',
            showDefaultValue: true,
            defaultValue: null,
            defaultValueType: 0,
            defaultValueSource: {
              type: 0,
              id: ''
            },
            displayType: true,
            showLabel: true,
            labelWidth: null,
            span: 24,
            layout: 'colFormItem',
            required: true,
            changeTag: true
          },
          'placeholder': '请选择',
          'type': 'date',
          'style': {
            width: '254px',
            maxWidth: '100%'
          },
          'clearable': true,
          'format': 'yyyy-MM-dd',
          'value-format': 'yyyy-MM-dd',
          'readonly': false,
          'editable': true,
          'visibility': true,
          'conditionType': 2,
          'vModel': 'fieldZbABvkB169043534245841',
          'linkVModel': 'fieldwrPAvkB1690435243082',
          'parentKey': 'fieldkGOAvkB1690435238902'
        }
      ],
      tableList: [],
      __slot__: {
        dataList: []
      },
      style: {
        width: '254px',
        maxWidth: '100%'
      },
      fieldDisplayRules: [],
      readonly: false,
      editable: true,
      visibility: true,
      notChild: true,
      description: '',
      vModel: 'fieldkGOAvkB1690435238902',
      value: [
        {
          fieldwrPAvkB1690435243082: '',
          fieldLmABvkB169043534244701: '',
          fieldofABvkB169043534245721: [],
          fieldZbABvkB169043534245841: ''
        }
      ]
    }
  ]
}
