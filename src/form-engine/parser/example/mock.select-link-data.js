export const mockSelectLinkData = {
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
        label: '供应商',
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
        renderKey: 'RBnGFlB1690509265145'
      },
      placeholder: '请输入供应商',
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
      vModel: 'fieldRBnGFlB1690509265145'
    },
    {
      typeId: 'SELECT',
      typeName: '下拉框',
      config: {
        label: '联动供应商',
        showLabel: true,
        defaultValue: [],
        showDefaultValue: false,
        labelWidth: null,
        tag: 'el-select',
        tagIcon: 'select',
        layout: 'colFormItem',
        displayType: true,
        span: 24,
        required: true,
        changeTag: true,
        renderKey: 'enlGFlB1690509262317'
      },
      __slot__: {
        options: []
      },
      placeholder: '请选择联动供应商',
      style: {
        width: '254px',
        maxWidth: '100%'
      },
      clearable: true,
      filterable: true,
      multiple: false,
      readonly: false,
      editable: true,
      visibility: true,
      optionsModel: 2,
      linkValue: {},
      conditionType: 5,
      limitRepeat: 0,
      repeatReminderText: '此项内容已存在，不允许重复提交',
      description: '',
      vModel: 'liandongselect1',
      dataLink: {
        type: 0,
        linkForm: ['1631472558016991234', '1682037576756015106'],
        condition: [
          {
            field: '1682037576894427138',
            typeId: 'INPUT',
            condition: 12,
            curFormTypeId: 'INPUT',
            curFormFieldId: 'fieldRBnGFlB1690509265145',
            autoText: '',
            type: 0
          }
        ],
        linkVModel: 'fielddVUtUgB1689863965386',
        subFields: []
      }
    },
    {
      typeId: 'SELECT',
      typeName: '下拉框',
      config: {
        label: '其他表-供应商',
        showLabel: true,
        defaultValue: [],
        showDefaultValue: false,
        labelWidth: null,
        tag: 'el-select',
        tagIcon: 'select',
        layout: 'colFormItem',
        displayType: true,
        span: 24,
        required: true,
        changeTag: true,
        renderKey: 'qgUHFlB1690509356456'
      },
      __slot__: {
        options: []
      },
      placeholder: '请选择其他表-供应商',
      style: {
        width: '254px',
        maxWidth: '100%'
      },
      clearable: true,
      filterable: true,
      multiple: false,
      readonly: false,
      editable: true,
      visibility: true,
      optionsModel: 1,
      linkValue: ['1631472558016991234', '1682037576756015106', '1682037576894427138'],
      conditionType: 5,
      limitRepeat: 0,
      repeatReminderText: '此项内容已存在，不允许重复提交',
      description: '',
      vModel: 'fieldqgUHFlB1690509356456',
      dataLink: {
        type: 0,
        linkForm: ['1631472558016991234', '1682037576756015106'],
        condition: [
          {
            field: '1682037576894427138',
            typeId: 'INPUT',
            condition: 12,
            curFormTypeId: 'INPUT',
            curFormFieldId: 'fieldRBnGFlB1690509265145',
            autoText: '',
            type: 0
          }
        ],
        linkVModel: 'fielddVUtUgB1689863965386',
        subFields: []
      }
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
        renderKey: 'XUqHFlB1690509414894'
      },
      children: [
        {
          typeId: 'INPUT',
          typeName: '单行文本',
          config: {
            label: '单行文本',
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
            renderKey: 'CGrHFlB1690509417135'
          },
          placeholder: '请输入',
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
          vModel: 'fieldCGrHFlB1690509417135',
          parentKey: 'fieldXUqHFlB1690509414894',
          label: '子表单--单行文本'
        },
        {
          typeId: 'SELECT',
          typeName: '下拉框',
          config: {
            label: '联动供应商',
            showLabel: true,
            defaultValue: [],
            showDefaultValue: false,
            labelWidth: null,
            tag: 'el-select',
            tagIcon: 'select',
            layout: 'colFormItem',
            displayType: true,
            span: 24,
            required: true,
            changeTag: true,
            renderKey: 'mxsHFlB1690509422723'
          },
          __slot__: {
            options: []
          },
          placeholder: '请选择联动供应商',
          style: {
            width: '254px',
            maxWidth: '100%'
          },
          clearable: true,
          filterable: true,
          multiple: false,
          readonly: false,
          editable: true,
          visibility: true,
          optionsModel: 2,
          linkValue: {},
          conditionType: 5,
          limitRepeat: 0,
          repeatReminderText: '此项内容已存在，不允许重复提交',
          description: '',
          vModel: 'fieldmxsHFlB1690509422723',
          label: '子表单--联动供应商',
          parentKey: 'fieldXUqHFlB1690509414894',
          dataLink: {
            type: 0,
            linkForm: ['1631472558016991234', '1682037576756015106'],
            condition: [
              {
                field: '1682037576894427138',
                typeId: 'INPUT',
                condition: 12,
                curFormTypeId: 'INPUT',
                curFormFieldId: 'fieldRBnGFlB1690509265145',
                autoText: '',
                type: 0
              }
            ],
            linkVModel: 'fielddVUtUgB1689863965386',
            subFields: []
          }
        },
        {
          typeId: 'SELECT',
          typeName: '下拉框',
          config: {
            label: '其他表-供应商',
            showLabel: true,
            defaultValue: [],
            showDefaultValue: false,
            labelWidth: null,
            tag: 'el-select',
            tagIcon: 'select',
            layout: 'colFormItem',
            displayType: true,
            span: 24,
            required: true,
            changeTag: true,
            renderKey: 'peGIFlB1690509459371'
          },
          __slot__: {
            options: []
          },
          placeholder: '请选择其他表-供应商',
          style: {
            width: '254px',
            maxWidth: '100%'
          },
          clearable: true,
          filterable: true,
          multiple: false,
          readonly: false,
          editable: true,
          visibility: true,
          optionsModel: 1,
          linkValue: ['1631472558016991234', '1682037576756015106', '1682037576894427138'],
          conditionType: 5,
          limitRepeat: 0,
          repeatReminderText: '此项内容已存在，不允许重复提交',
          description: '',
          vModel: 'fieldpeGIFlB1690509459371',
          label: '子表单--其他表-供应商',
          parentKey: 'fieldXUqHFlB1690509414894',
          dataLink: {
            type: 0,
            linkForm: ['1631472558016991234', '1682037576756015106'],
            condition: [
              {
                field: '1682037576894427138',
                typeId: 'INPUT',
                condition: 12,
                curFormTypeId: 'INPUT',
                curFormFieldId: 'fieldRBnGFlB1690509265145',
                autoText: '',
                type: 0
              }
            ],
            linkVModel: 'fielddVUtUgB1689863965386',
            subFields: []
          }
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
      vModel: 'fieldXUqHFlB1690509414894',
      value: [
        {
          fieldCGrHFlB1690509417135: '',
          fieldmxsHFlB1690509422723: [],
          fieldpeGIFlB1690509459371: []
        }
      ]
    }
  ]
}

