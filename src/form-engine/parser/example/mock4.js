export const formData4 = {
  formConf: {
    formId: '1684122028680327170',
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
        width: '508px',
        maxWidth: '100%'
      },
      config: {
        tag: 'dept-and-user',
        span: 24,
        label: '部门多选',
        layout: 'colFormItem',
        tagIcon: 'input',
        required: true,
        changeTag: true,
        renderKey: 'rdNrkkB1690360855201',
        showLabel: true,
        displayType: true,
        optionalRange: 0,
        defaultValueType: 0,
        defaultValueSource: {
          id: '',
          type: 0
        }
      },
      typeId: 'DEPT_CHECK',
      vModel: 'fieldrdNrkkB1690360855201',
      __slot__: {
        default: '选择部门'
      },
      editable: true,
      readonly: false,
      typeName: '部门多选',
      visibility: true,
      description: '',
      conditionType: 13,
      optionalRange: 0
    },
    {
      style: {
        width: '254px',
        maxWidth: '100%'
      },
      config: {
        tag: 'dept-and-user',
        span: 24,
        label: '部门单选',
        layout: 'colFormItem',
        tagIcon: 'input',
        required: true,
        changeTag: true,
        renderKey: 'PbMrkkB1690360852883',
        showLabel: true,
        displayType: true,
        optionalRange: 0,
        defaultValueType: 0,
        showDefaultValue: true,
        defaultValueSource: {
          id: '',
          type: 0
        }
      },
      typeId: 'DEPT_RADIO',
      vModel: 'fieldPbMrkkB1690360852883',
      __slot__: {
        default: '选择部门'
      },
      editable: true,
      readonly: false,
      typeName: '部门单选',
      visibility: true,
      description: '',
      conditionType: 12,
      optionalRange: 0
    },
    {
      style: {
        width: '508px',
        maxWidth: '100%'
      },
      config: {
        tag: 'dept-and-user',
        dept: 1,
        span: 24,
        label: '成员多选',
        layout: 'colFormItem',
        tagIcon: 'input',
        required: true,
        changeTag: true,
        renderKey: 'HdLrkkB1690360850113',
        showLabel: true,
        displayType: true,
        defaultValue: [],
        optionalRange: 0,
        defaultValueType: 0,
        showDefaultValue: true,
        defaultValueSource: {
          id: '',
          type: 0
        }
      },
      typeId: 'MEMBER_CHECK',
      vModel: 'fieldHdLrkkB1690360850113',
      __slot__: {
        default: '选择成员'
      },
      editable: true,
      readonly: false,
      typeName: '成员多选',
      listRange: [],
      visibility: true,
      description: '',
      conditionType: 11,
      optionalRange: 0
    },
    {
      style: {
        width: '254px',
        maxWidth: '100%'
      },
      config: {
        tag: 'dept-and-user',
        dept: 1,
        span: 24,
        label: '成员单选',
        layout: 'colFormItem',
        tagIcon: 'input',
        required: true,
        changeTag: true,
        renderKey: 'dbKrkkB1690360847512',
        showLabel: true,
        displayType: true,
        defaultValue: [],
        optionalRange: 0,
        defaultValueType: 0,
        showDefaultValue: true,
        defaultValueSource: {
          id: '',
          type: 0
        }
      },
      typeId: 'MEMBER_RADIO',
      vModel: 'fielddbKrkkB1690360847512',
      __slot__: {
        default: '选择成员'
      },
      editable: true,
      readonly: false,
      typeName: '成员单选',
      listRange: [],
      visibility: true,
      description: '',
      conditionType: 10,
      optionalRange: 0
    },
    {
      style: {
        width: '254px',
        maxWidth: '100%'
      },
      config: {
        tag: 'el-input',
        span: 24,
        label: '流水号',
        layout: 'colFormItem',
        tagIcon: 'input',
        changeTag: true,
        renderKey: 'fuGrkkB1690360845243',
        showLabel: true,
        displayType: true,
        defaultValue: '',
        showDefaultValue: false
      },
      typeId: 'SERIALNUMBER_INPUT',
      vModel: 'fieldfuGrkkB1690360845243',
      onlyOne: true,
      __slot__: {},
      disabled: true,
      notChild: true,
      typeName: '流水号',
      visibility: true,
      description: '',
      placeholder: '自动生成无需填写',
      serialNumberRule: [
        {
          name: '自动计数',
          label: '5位数字,不自动重置',
          vModel: 'name',
          ruleType: '0',
          countDigits: 5,
          fixedDigits: 1,
          resetPeriod: '0',
          initialValue: 1,
          dateFormatStr: 'yyyy-MM-dd',
          dateFormatType: 0,
          fixedCharacter: 'num'
        }
      ]
    },
    {
      color: '#000000',
      style: {
        maxWidth: '100%'
      },
      action: 'http://183.236.225.195:9800/enterprise-api/assist/oss/upload/image',
      config: {
        tag: 'sign-pad',
        span: 24,
        label: '手写签名',
        layout: 'colFormItem',
        tagIcon: 'sign-pad',
        required: true,
        changeTag: false,
        renderKey: 'QpIrkkB1690360842224',
        showLabel: true,
        displayType: true,
        showRegList: false,
        defaultValue: '123456',
        showRequired: true,
        showClearable: false,
        showDefaultValue: false,
      },
      typeId: 'SIGN_PAD',
      vModel: 'fieldQpIrkkB1690360842224',
      editable: true,
      readonly: false,
      typeName: '手写签名',
      visibility: true,
      description: ''
    },
    {
      style: {
        width: '100%',
        maxWidth: '100%'
      },
      config: {
        tag: 'my-form',
        span: 24,
        label: '关联数据',
        layout: 'colFormItem',
        tagIcon: 'input',
        required: true,
        changeTag: true,
        renderKey: 'iuHrkkB1690360839822',
        showLabel: true,
        displayType: true,
        showDefaultValue: false
      },
      typeId: 'LINKED_DATA',
      vModel: 'fieldiuHrkkB1690360839822',
      editable: true,
      linkList: [],
      readonly: false,
      typeName: '关联数据',
      showTitle: true,
      filterCond: [],
      visibility: true,
      description: '',
      linkedFillRules: [],
      linkedShowField: []
    },
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
        dbTable: '',
        tagIcon: 'input',
        changeTag: true,
        renderKey: 'LsGrkkB1690360837037',
        showLabel: true,
        displayType: true,
        showDefaultValue: false
      },
      typeId: 'QUERY_CHECK',
      vModel: 'fieldLsGrkkB1690360837037',
      dataNum: 1,
      linkList: [],
      typeName: '关联查询',
      filterCond: [],
      visibility: true,
      description: '',
      linkedShowField: []
    },
    {
      style: {
        width: '254px',
        maxWidth: '100%'
      },
      value: [
        {
          fieldMUPrkkB1690360859838: '',
          fieldxNQrkkB1690360862441: '',
          fieldaGRrkkB1690360865443: ''
        }
      ],
      config: {
        tag: 'my-table',
        span: 24,
        label: '子表单',
        layout: 'rowFormItem',
        tagIcon: 'input',
        changeTag: true,
        renderKey: 'fgFrkkB1690360834084',
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
      vModel: 'fieldfgFrkkB1690360834084',
      __slot__: {
        dataList: []
      },
      children: [
        {
          style: {
            width: '254px',
            maxWidth: '100%'
          },
          config: {
            tag: 'el-input',
            span: 24,
            label: '单行文本',
            format: 'text',
            layout: 'colFormItem',
            tagIcon: 'input',
            required: true,
            changeTag: true,
            renderKey: 'MUPrkkB1690360859838',
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
          vModel: 'fieldMUPrkkB1690360859838',
          editable: true,
          readonly: false,
          typeName: '单行文本',
          parentKey: 'fieldfgFrkkB1690360834084',
          visibility: true,
          description: '',
          limitRepeat: 0,
          placeholder: '请输入',
          repeatReminderText: '此项内容已存在，不允许重复提交'
        },
        {
          'type': 'textarea',
          'style': {
            width: '100%'
          },
          'config': {
            tag: 'el-input',
            span: 24,
            label: '多行文本',
            layout: 'colFormItem',
            tagIcon: 'textarea',
            required: true,
            changeTag: true,
            renderKey: 'xNQrkkB1690360862441',
            showLabel: true,
            displayType: true,
            defaultValue: '',
            defaultValueType: 0,
            defaultValueSource: {
              id: '',
              type: 0
            }
          },
          'typeId': 'TEXTAREA',
          'vModel': 'fieldxNQrkkB1690360862441',
          'autosize': {
            maxRows: 5,
            minRows: 3
          },
          'editable': true,
          'readonly': false,
          'typeName': '多行文本',
          'parentKey': 'fieldfgFrkkB1690360834084',
          'visibility': true,
          'description': '',
          'placeholder': '请输入',
          'show-word-limit': false
        },
        {
          'step': 1,
          'style': {
            width: '254px',
            maxWidth: '100%'
          },
          'config': {
            tag: 'el-input-number',
            span: 24,
            label: '数字',
            format: 1,
            layout: 'colFormItem',
            tagIcon: 'number',
            required: true,
            changeTag: true,
            renderKey: 'aGRrkkB1690360865443',
            showLabel: true,
            limitRange: false,
            typeOption: [
              {
                label: '数值',
                value: 1
              },
              {
                label: '百分比',
                value: 2
              }
            ],
            displayType: true,
            showDecimal: false,
            defaultValueType: 0,
            defaultValueSource: {
              id: '',
              type: 0
            },
            showThousandsSeparator: false
          },
          'typeId': 'NUMBER_INPUT',
          'vModel': 'fieldaGRrkkB1690360865443',
          'controls': false,
          'editable': true,
          'readonly': false,
          'typeName': '数字',
          'parentKey': 'fieldfgFrkkB1690360834084',
          'visibility': true,
          'description': '',
          'placeholder': '请输入',
          'conditionType': 1,
          'step-strictly': false,
          'controls-position': ''
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
    },
    {
      'name': 'file',
      'style': {
        width: '254px',
        maxWidth: '100%'
      },
      'action': 'http://183.236.225.195:9800/enterprise-api/assist/oss/upload/file',
      'config': {
        tag: 'el-upload',
        span: 24,
        label: '附件',
        layout: 'colFormItem',
        showTip: false,
        tagIcon: 'upload',
        required: true,
        changeTag: true,
        renderKey: 'CrErkkB1690360831966',
        showLabel: true,
        buttonText: '点击上传',
        displayType: true,
        showRegList: false,
        showDefaultValue: false
      },
      'expand': {
        limit: 0,
        accept: '',
        fileSize: 10,
        sizeUnit: 'MB'
      },
      'typeId': 'UPLOAD-FILE',
      'vModel': 'fieldCrErkkB1690360831966',
      'setting': {
        limit: false,
        accept: '',
        onlyOne: false
      },
      '__slot__': {
        'list-type': true
      },
      'editable': true,
      'multiple': true,
      'readonly': false,
      'typeName': '附件',
      'list-type': 'text',
      'visibility': true,
      'auto-upload': true,
      'description': '',
      'show-file-list': false
    },
    {
      'drag': true,
      'name': 'file',
      'style': {
        width: '254px',
        maxWidth: '100%'
      },
      'accept': 'image/*',
      'action': 'http://183.236.225.195:9800/enterprise-api/assist/oss/upload/image',
      'config': {
        tag: 'el-upload',
        span: 24,
        label: '图片',
        layout: 'colFormItem',
        showTip: false,
        tagIcon: 'upload',
        required: true,
        changeTag: true,
        renderKey: 'WDErkkB1690360829780',
        showLabel: true,
        displayType: true,
        showRegList: false,
        showDefaultValue: false
      },
      'expand': {
        limit: 0,
        fileSize: 10,
        sizeUnit: 'MB'
      },
      'typeId': 'UPLOAD-IMG',
      'vModel': 'fieldWDErkkB1690360829780',
      'setting': {
        limit: false,
        onlyOne: false
      },

      'editable': true,
      'multiple': true,
      'readonly': false,
      'typeName': '图片',
      'list-type': 'picture',
      'visibility': true,
      'auto-upload': true,
      'description': '',
      'show-file-list': false
    },
    {
      style: {
        width: '254px',
        maxWidth: '100%'
      },
      config: {
        tag: 'input-map',
        auto: '',
        span: 24,
        label: '定位',
        layout: 'colFormItem',
        tagIcon: 'input',
        required: true,
        changeTag: false,
        renderKey: 'zRDrkkB1690360827996',
        showLabel: true,
        displayType: true,
        limitTargeting: false,
        defaultValueType: 0,
        showDefaultValue: true,
        limitTargetingOpt: 1,
        defaultValueSource: {
          id: '',
          type: 0
        }
      },
      typeId: 'INPUT_MAP',
      vModel: 'fieldzRDrkkB1690360827996',
      editable: true,
      readonly: false,
      typeName: '定位',
      visibility: true,
      description: '',
      conditionType: 8,
      fineTuningNum: 0,
      allowFineTuning: false,
      showLatitudeAndLongitude: false
    },
    {
      type: 1,
      config: {
        tag: 'province-city',
        span: 24,
        label: '地址',
        layout: 'colFormItem',
        tagIcon: 'input',
        required: true,
        changeTag: false,
        renderKey: 'STCrkkB1690360825310',
        showLabel: true,
        displayType: true,
        showDefaultValue: true
      },
      typeId: 'PROVINCE_CITY',
      vModel: 'fieldSTCrkkB1690360825310',
      __slot__: {
        options: [
          {
            label: '省-市-区',
            value: 1
          },
          {
            label: '省-市-区-详细地址',
            value: 2
          }
        ]
      },
      editable: true,
      readonly: false,
      typeName: '地址',
      visibility: true,
      description: '',
      conditionType: 7
    },
    {
      style: {
        width: '100%'
      },
      config: {
        tag: 'el-divider',
        span: 24,
        label: '分割线',
        layout: 'colFormItem',
        tagIcon: 'divider',
        changeTag: false,
        renderKey: 'AcBrkkB1690360823041',
        showLabel: true,
        displayType: true,
        defaultValue: '',
        showRequired: false,
        showClearable: false,
        showDefaultValue: false
      },
      typeId: 'DIVIDER',
      vModel: 'fieldAcBrkkB1690360823041',
      notChild: true,
      typeName: '分割线',
      description: ''
    },
    {
      style: {
        width: '254px',
        maxWidth: '100%'
      },
      config: {
        tag: 'el-select',
        span: 24,
        label: '下拉复选框',
        layout: 'colFormItem',
        tagIcon: 'select',
        multiple: true,
        required: true,
        changeTag: true,
        renderKey: 'plArkkB1690360820939',
        showLabel: true,
        displayType: true,
        defaultValue: [],
        showDefaultValue: false
      },
      typeId: 'SELECT-MULTIPLE',
      vModel: 'fieldplArkkB1690360820939',
      __slot__: {
        options: [
          {
            label: '选项一',
            value: 1
          },
          {
            label: '选项二',
            value: 2
          }
        ]
      },
      editable: true,
      multiple: true,
      readonly: false,
      typeName: '下拉复选框',
      clearable: true,
      linkValue: {},
      filterable: true,
      visibility: true,
      description: '',
      placeholder: '请选择',
      optionsModel: 0,
      conditionType: 6
    },
    {
      style: {
        width: '254px',
        maxWidth: '100%'
      },
      config: {
        tag: 'el-select',
        span: 24,
        label: '下拉框',
        layout: 'colFormItem',
        tagIcon: 'select',
        required: true,
        changeTag: true,
        renderKey: 'tAyqkkB1690360813466',
        showLabel: true,
        displayType: true,
        showDefaultValue: false
      },
      typeId: 'SELECT',
      vModel: 'fieldtAyqkkB1690360813466',
      __slot__: {
        options: [
          {
            label: '选项一',
            value: 1,
            checked: false
          },
          {
            label: '选项二',
            value: 2,
            checked: false
          }
        ]
      },
      editable: true,
      multiple: false,
      readonly: false,
      typeName: '下拉框',
      clearable: true,
      linkValue: {},
      filterable: true,
      visibility: true,
      description: '',
      limitRepeat: 0,
      placeholder: '请选择',
      optionsModel: 0,
      conditionType: 5,
      repeatReminderText: '此项内容已存在，不允许重复提交'
    },
    {
      'type': 'date',
      'style': {
        width: '254px',
        maxWidth: '100%'
      },
      'config': {
        tag: 'el-date-picker',
        span: 24,
        label: '日期时间',
        layout: 'colFormItem',
        tagIcon: 'date',
        required: true,
        changeTag: true,
        renderKey: 'kQtqkkB1690360800523',
        showLabel: true,
        displayType: true,
        defaultValueType: 0,
        showDefaultValue: true,
        defaultValueSource: {
          id: '',
          type: 0
        }
      },
      'format': 'yyyy-MM-dd',
      'typeId': 'DATE',
      'vModel': 'fieldkQtqkkB1690360800523',
      'editable': true,
      'readonly': false,
      'typeName': '日期时间',
      'clearable': true,
      'visibility': true,
      'description': '',
      'placeholder': '请选择',
      'value-format': 'yyyy-MM-dd',
      'conditionType': 2
    },
    {
      size: 'small',
      style: {
        display: 'block'
      },
      config: {
        tag: 'el-radio-group',
        span: 24,
        label: '单选按钮组',
        border: false,
        layout: 'colFormItem',
        tagIcon: 'radio',
        required: true,
        changeTag: true,
        renderKey: 'KLuqkkB1690360803395',
        showLabel: true,
        optionType: 'default',
        displayType: true,
        showDefaultValue: false
      },
      typeId: 'RADIO',
      vModel: 'fieldKLuqkkB1690360803395',
      segment: 'vertical',
      __slot__: {
        options: [
          {
            label: '选项一',
            value: 1
          },
          {
            label: '选项二',
            value: 2
          }
        ]
      },
      editable: true,
      readonly: false,
      typeName: '单选按钮组',
      visibility: true,
      description: '',
      conditionType: 3
    },
    {
      'step': 1,
      'style': {
        width: '254px',
        maxWidth: '100%'
      },
      'config': {
        tag: 'el-input-number',
        span: 24,
        label: '数字',
        format: 1,
        layout: 'colFormItem',
        tagIcon: 'number',
        required: true,
        changeTag: true,
        renderKey: 'nCsqkkB1690360797036',
        showLabel: true,
        limitRange: false,
        typeOption: [
          {
            label: '数值',
            value: 1
          },
          {
            label: '百分比',
            value: 2
          }
        ],
        displayType: true,
        showDecimal: false,
        defaultValueType: 0,
        defaultValueSource: {
          id: '',
          type: 0
        },
        showThousandsSeparator: false
      },
      'typeId': 'NUMBER_INPUT',
      'vModel': 'fieldnCsqkkB1690360797036',
      'controls': false,
      'editable': true,
      'readonly': false,
      'typeName': '数字',
      'visibility': true,
      'description': '',
      'placeholder': '请输入',
      'conditionType': 1,
      'step-strictly': false,
      'controls-position': ''
    },
    {
      size: 'small',
      style: {
        width: '254px',
        maxWidth: '100%'
      },
      config: {
        tag: 'el-checkbox-group',
        span: 24,
        label: '复选框组',
        border: false,
        layout: 'colFormItem',
        tagIcon: 'checkbox',
        required: true,
        changeTag: true,
        renderKey: 'ofsqkkB1690360798571',
        showLabel: true,
        optionType: 'default',
        displayType: true,
        defaultValue: [],
        showDefaultValue: false
      },
      typeId: 'CHECKBOX',
      vModel: 'fieldofsqkkB1690360798571',
      segment: 'vertical',
      __slot__: {
        options: [
          {
            label: '选项一',
            value: 1
          },
          {
            label: '选项二',
            value: 2
          }
        ]
      },
      editable: true,
      readonly: false,
      typeName: '复选框组',
      visibility: true,
      description: '',
      conditionType: 4
    },
    {
      'type': 'textarea',
      'style': {
        width: '100%'
      },
      'config': {
        tag: 'el-input',
        span: 24,
        label: '多行文本',
        layout: 'colFormItem',
        tagIcon: 'textarea',
        required: true,
        changeTag: true,
        renderKey: 'eYrqkkB1690360795168',
        showLabel: true,
        displayType: true,
        defaultValue: '',
        defaultValueType: 0,
        defaultValueSource: {
          id: '',
          type: 0
        }
      },
      'typeId': 'TEXTAREA',
      'vModel': 'fieldeYrqkkB1690360795168',
      'autosize': {
        maxRows: 5,
        minRows: 3
      },
      'editable': true,
      'readonly': false,
      'typeName': '多行文本',
      'visibility': true,
      'description': '',
      'placeholder': '请输入',
      'show-word-limit': false
    },
    {
      style: {
        width: '254px',
        maxWidth: '100%'
      },
      config: {
        tag: 'el-input',
        span: 24,
        label: '单行文本',
        format: 'text',
        layout: 'colFormItem',
        tagIcon: 'input',
        required: true,
        changeTag: true,
        renderKey: 'ptqqkkB1690360794260',
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
      vModel: 'fieldptqqkkB1690360794260',
      editable: true,
      readonly: false,
      typeName: '单行文本',
      visibility: true,
      description: '',
      limitRepeat: 0,
      placeholder: '请输入',
      repeatReminderText: '此项内容已存在，不允许重复提交'
    }
  ]
}
