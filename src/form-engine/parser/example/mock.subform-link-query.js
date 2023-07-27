export const mockSubformLinkQuery = {
  formConf: {
    formId: '1684402084422004737',
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
      style: {
        width: '254px',
        maxWidth: '100%'
      },
      config: {
        tag: 'el-input',
        span: 24,
        label: '供应商名称',
        format: 'text',
        layout: 'colFormItem',
        tagIcon: 'input',
        required: true,
        changeTag: true,
        renderKey: 'btlytkB1690427709727',
        showLabel: true,
        labelWidth: null,
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
      vModel: 'fieldbtlytkB1690427709727',
      editable: true,
      readonly: false,
      typeName: '单行文本',
      visibility: true,
      description: '',
      limitRepeat: 0,
      placeholder: '请输入供应商名称',
      repeatReminderText: '此项内容已存在，不允许重复提交'
    },
    {
      style: {
        width: '254px',
        maxWidth: '100%'
      },
      value: [
        {
          fieldpDrxtkB1690427582863: ''
        }
      ],
      config: {
        tag: 'my-table',
        span: 24,
        label: '子表单',
        layout: 'rowFormItem',
        tagIcon: 'input',
        changeTag: true,
        renderKey: 'cGpxtkB1690427578403',
        showLabel: true,
        displayType: true,
        showRequired: false,
        defaultValueType: 0,
        showDefaultValue: true,
        defaultValueSource: {
          id: '',
          type: 0
        }
      },
      typeId: 'CHILD_FORM',
      vModel: 'fieldcGpxtkB1690427578403',
      __slot__: {
        dataList: []
      },
      children: [
        {
          style: {
            maxWidth: '100%'
          },
          canAdd: true,
          config: {
            tag: 'my-form',
            span: 24,
            label: '关联查询',
            layout: 'colFormItem',
            dbTable: '1682037576756015106',
            tagIcon: 'input',
            changeTag: true,
            renderKey: 'pDrxtkB1690427582863',
            showLabel: true,
            dbFieldList: ['1682037576894427138', '1682037576898621441', '1682037576898621442'],
            displayType: true,
            showDefaultValue: false
          },
          typeId: 'QUERY_CHECK',
          vModel: 'fieldpDrxtkB1690427582863',
          dataNum: 1,
          linkList: [
            {
              id: '1682037576894427138',
              name: 'fielddVUtUgB1689863965386',
              type: 0,
              label: '供应名称',
              typeId: 'INPUT',
              vModel: 'fielddVUtUgB1689863965386',
              visible: 1,
              disabled: true,
              parentId: 1,
              foreignId: 0,
              childrenFlag: 0
            },
            {
              id: '1682037576898621441',
              name: 'fieldlXYtUgB1689863976524',
              type: 0,
              label: '地址',
              typeId: 'INPUT',
              vModel: 'fieldlXYtUgB1689863976524',
              visible: 1,
              disabled: false,
              parentId: 1,
              foreignId: 0,
              childrenFlag: 0
            },
            {
              id: '1682037576898621442',
              name: 'createBy',
              type: 0,
              label: '提交人',
              typeId: 'MEMBER_RADIO',
              vModel: 'createBy',
              visible: 1,
              disabled: false,
              parentId: 1,
              foreignId: 0,
              childrenFlag: 0
            }
          ],
          typeName: '关联查询',
          parentKey: 'fieldcGpxtkB1690427578403',
          filterCond: [
            {
              type: 0,
              value: '1682037576894427138',
              typeId: 'INPUT',
              value2: 'fieldbtlytkB1690427709727',
              condition: 2,
              typeDisabled: false
            }
          ],
          visibility: true,
          description: '',
          linkedShowField: []
        }
      ],
      editable: true,
      notChild: true,
      readonly: false,
      typeName: '子表单',
      tableList: [],
      visibility: true,
      description: '',
      fieldDisplayRules: []
    }
  ]
}
