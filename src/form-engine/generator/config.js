// 表单属性【右面板】
// import { getAppApiUrl } from '@/utils/auth'

export const formConf = {
  formId: '',
  formRef: 'elForm',
  formModel: 'formData',
  size: 'mini',
  labelPosition: 'top',
  labelWidth: 100,
  formRules: 'rules',
  // gutter: 20,
  disabled: false,
  numberOfColumns: 24, // 表单布局：列数
  description: '',
  submitButtonState: 0,
  submitButtonText: '提交',
  frontEndEvents: [], // 前端事件
  formSubmissionValidation: [], // 表单验证
  fieldDisplayRules: [], // 字段显隐规则
  dataFilterSetting: {
    rel: 0, // 过滤方式 0所有 1任一
    cond: [],
  }, // 数据过滤规则
  submitAssociationOperation: [], // 提交关联操作
  // unFocusedComponentBorder: true
}

// 组件默认值
export const componentDefaultValue = {
  INPUT: {
    val: undefined,
  },
  TEXTAREA: {
    val: undefined,
  },
  NUMBER_INPUT: {
    val: undefined,
  },
  CASCADER: {
    val: [],
  },
  RADIO: {
    val: -1,
  },
  CHECKBOX: {
    val: [],
  },
  SWITCH: {
    val: false,
  },
  SLIDER: {
    val: null,
  },
  TIME: {
    val: null,
  },
  TIME_RANGE: {
    val: null,
  },
  DATE: {
    val: null,
  },
  DATE_RANGE: {
    val: null,
  },
  RATE: {
    val: 0,
  },
  COLOR: {
    val: null,
  },
  UPLOAD: {
    val: null,
  },
  IMAGE_CAROUSEL: {
    val: null,
  },
  IMAGE_SELECT: {
    val: null,
  },
  DESC_TEXT: {
    val: '描述文字',
  },
  DIVIDER: {
    val: '',
  },
  SIGN_PAD: {
    val: '',
  },
  FORM_PAGINATION: {
    val: '分页',
  },
}

// 选择型组件 【左面板】
export const selectComponents = [
  {
    typeId: 'PROVINCE_CITY',
    typeName: '地址',
    config: {
      label: '地址',
      labelWidth: null,
      showLabel: true,
      changeTag: false,
      tag: 'province-city',
      tagIcon: 'input',
      defaultValue: undefined,
      showDefaultValue: true,
      displayType: true,
      required: true,
      layout: 'colFormItem',
      span: 24,
    },
    detailsValue: undefined,
    type: 1,
    placeholder: undefined,
    readonly: false,
    editable: true,
    visibility: true,
    conditionType: 7,
    __slot__: {
      options: [
        {
          label: '省-市-区',
          value: 1,
        },
        {
          label: '省-市-区-详细地址',
          value: 2,
        },
      ],
    },
  },
  {
    typeId: 'INPUT_MAP',
    typeName: '定位',
    config: {
      label: '定位',
      labelWidth: null,
      showLabel: true,
      changeTag: false,
      tag: 'input-map',
      tagIcon: 'input',
      showDefaultValue: true,
      defaultValue: undefined,
      defaultValueType: 0,
      defaultValueSource: {
        type: 0,
        id: '',
      },
      displayType: true,
      required: true,
      limitTargeting: false,
      limitTargetingOpt: 1,
      layout: 'colFormItem',
      span: 24,
      auto: '',
    },
    placeholder: undefined,
    showLatitudeAndLongitude: false,
    allowFineTuning: false,
    readonly: false,
    editable: true,
    visibility: true,
    fineTuningNum: 0,
    style: {
      width: '254px',
      maxWidth: '100%',
    },
    conditionType: 8,
  },
  {
    typeId: 'UPLOAD-IMG',
    typeName: '图片',
    config: {
      label: '图片',
      tag: 'el-upload',
      tagIcon: 'upload',
      layout: 'colFormItem',
      showDefaultValue: false,
      defaultValue: null,
      displayType: true,
      showLabel: true,
      showRegList: false,
      labelWidth: null,
      required: true,
      span: 24,
      showTip: false,

      // buttonText: '',
      changeTag: true,
    },
    expand: {
      limit: 0,
      fileSize: 10,
      sizeUnit: 'MB',
    },
    setting: {
      onlyOne: false,
      limit: false,
    },
    __slot__: {
      'list-type': true,
    },
    style: {
      width: '254px',
      maxWidth: '100%',
    },
    // action: getAppApiUrl() + '/assist/oss/upload/image',
    accept: 'image/*',
    'show-file-list': false,
    name: 'file',
    'auto-upload': true,
    'list-type': 'picture',
    // 'file-list':[],
    multiple: true,
    drag: true,
    readonly: false,
    editable: true,
    visibility: true,
  },
  {
    typeId: 'UPLOAD-FILE',
    typeName: '附件',
    config: {
      label: '附件',
      tag: 'el-upload',
      tagIcon: 'upload',
      layout: 'colFormItem',
      showDefaultValue: false,
      defaultValue: null,
      displayType: true,
      showLabel: true,
      showRegList: false,
      labelWidth: null,
      required: true,
      span: 24,
      showTip: false,
      buttonText: '点击上传',
      changeTag: true,
    },
    expand: {
      limit: 0,
      fileSize: 10,
      sizeUnit: 'MB',
      accept: '',
    },
    setting: {
      onlyOne: false,
      accept: '',
      limit: false,
    },
    __slot__: {
      'list-type': true,
    },
    style: {
      width: '254px',
      maxWidth: '100%',
    },
    // action: getAppApiUrl() + '/assist/oss/upload/file',
    'show-file-list': false,
    name: 'file',
    'auto-upload': true,
    'list-type': 'text',
    multiple: true,
    editable: true,
    visibility: true,
    readonly: false,
  },
  {
    // 组件的自定义配置
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
      defaultValue: undefined,
      defaultValueType: 0,
      defaultValueSource: {
        type: 0,
        id: '',
      },
      displayType: true,
      required: undefined,
      showRequired: false,
      layout: 'rowFormItem',
    },
    children: [],
    tableList: [],
    __slot__: {
      dataList: [],
    },
    style: {
      width: '254px',
      maxWidth: '100%',
    },
    fieldDisplayRules: [],
    readonly: false,
    editable: true,
    visibility: true,
    notChild: true,
    // conditionType: 9
  },
  {
    // 组件的自定义配置
    typeId: 'QUERY_CHECK',
    typeName: '关联查询',
    config: {
      layout: 'colFormItem',
      label: '关联查询',
      labelWidth: null,
      showLabel: true,
      changeTag: true,
      tag: 'my-form',
      tagIcon: 'input',
      showDefaultValue: false,
      displayType: true,
      span: 24,
      dbTable: [],
    },
    style: {
      maxWidth: '100%',
    },
    linkList: [],
    filterCond: [],
    linkedShowField: [],
    dataNum: 1,
    canAdd: true,
    visibility: true,
  },
  {
    // 组件的自定义配置
    typeId: 'LINKED_DATA',
    typeName: '关联数据',
    config: {
      label: '关联数据',
      labelWidth: null,
      showLabel: true,
      changeTag: true,
      tag: 'my-form',
      tagIcon: 'input',
      defaultValue: undefined,
      showDefaultValue: false,
      displayType: true,
      required: true,
      layout: 'colFormItem',
      span: 24,
    },
    style: {
      width: '100%',
      maxWidth: '100%',
    },
    showTitle: true,
    linkList: [],
    linkedShowField: [],
    linkedFillRules: [],
    filterCond: [],
    readonly: false,
    editable: true,
    visibility: true,
  },
  {
    typeId: 'SIGN_PAD',
    typeName: '手写签名',
    config: {
      label: '手写签名',
      defaultValue: '',
      showLabel: true,
      showDefaultValue: false,
      displayType: true,
      showRequired: true,
      showClearable: false,
      showRegList: false,
      tag: 'sign-pad',
      tagIcon: 'sign-pad',
      layout: 'colFormItem',
      span: 24,
      required: true,
      changeTag: false,
    },
    color: '#000000',
    style: {
      // width: '254px',
      maxWidth: '100%',
    },
    // action: getAppApiUrl() + '/assist/oss/upload/image',
    readonly: false,
    editable: true,
    visibility: true,
  },
  {
    // 组件的自定义配置
    typeId: 'SERIALNUMBER_INPUT',
    typeName: '流水号',
    config: {
      label: '流水号',
      labelWidth: null,
      showLabel: true,
      changeTag: true,
      tag: 'el-input',
      tagIcon: 'input',
      showDefaultValue: false,
      defaultValue: '',
      displayType: true,
      layout: 'colFormItem',
      span: 24,
    },
    placeholder: '自动生成无需填写',
    // 其余的为可直接写在组件标签上的属性
    // placeholder: '自动生成无需填写',
    __slot__: {
      // rulesOptions: [{
      //   label: '5位数字,不自动重置',
      //   name: '自动计数',
      //   type: 0,
      //   setting: {
      //     num: 5,
      //     fixed: true,
      //     cycle: '0',
      //     initNum: 1
      //   }
      // }]
    },
    serialNumberRule: [
      {
        name: '自动计数',
        ruleType: '0', // 规则类型 0自动计数， 1提交日期， 2.固定字符， 3表单字段 字典#fd_rule_type
        countDigits: 5, // 计数位数 规则类型是0时需要传
        fixedDigits: 1, // 位数固定 0否 1是 规则类型是0时需要传
        resetPeriod: '0', // 重置周期 0不自动重置， 1每日重置， 2每周重置， 3每月重置， 4每年重置 规则类型是0时需要传 流水号规则 #fd_reset_period
        initialValue: 1, // 初始值 规则类型是0时需要传
        dateFormatType: 0, // 日期格式类型 0预定义格式， 1自定义格式 规则类型是1时需要传
        dateFormatStr: 'yyyy-MM-dd', // 日期格式类型0或1都是传这个参数 规则类型是1时需要传 #sys_date_format
        fixedCharacter: 'num', // 固定字符 规则类型是2时需要传
        vModel: 'name', // 表单vModel 注意前端要过滤掉子表单，
        label: '5位数字,不自动重置', // 表单标题，label
      },
    ],
    style: {
      width: '254px',
      maxWidth: '100%',
    },
    disabled: true,
    visibility: true,
    notChild: true,
    onlyOne: true,
  },
  // {
  //   // 组件的自定义配置
  //   typeId: 'TEXT_RECOGNITION',
  //   typeName: '文字识别',
  //   config: {
  //     label: '文字识别',
  //     labelWidth: null,
  //     showLabel: true,
  //     changeTag: true,
  //     tag: 'el-input',
  //     tagIcon: 'input',
  //     showDefaultValue: false,
  //     defaultValue: '请设置识别内容',
  //     displayType: true,
  //     // required: true,
  //     layout: 'colFormItem',
  //     span: 24,
  //   },
  //   style: {
  //     width: '254px',
  //     maxWidth: '100%'
  //   },
  //   // 其余的为可直接写在组件标签上的属性
  //   // placeholder: '请输入',
  //   // 'show-word-limit': false,
  //   // readonly: false,
  //   editable: true,
  //   type: 0,
  //   disabled: true,
  //   visibility: true,
  //   notChild: true
  // },
  {
    // 组件的自定义配置
    typeId: 'MEMBER_RADIO',
    typeName: '成员单选',
    config: {
      label: '成员单选',
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
        id: '',
      },
      displayType: true,
      required: true,
      layout: 'colFormItem',
      span: 24,
      optionalRange: 0,
      dept: 1,
    },
    __slot__: {
      default: '选择成员',
      // options:[]
    },
    style: {
      width: '254px',
      maxWidth: '100%',
    },
    readonly: false,
    editable: true,
    visibility: true,
    conditionType: 10,
    listRange: [],
    optionalRange: 0,
  },
  {
    // 组件的自定义配置
    typeId: 'MEMBER_CHECK',
    typeName: '成员多选',
    config: {
      label: '成员多选',
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
        id: '',
      },
      displayType: true,
      required: true,
      layout: 'colFormItem',
      span: 24,
      optionalRange: 0,
      dept: 1,
    },
    __slot__: {
      default: '选择成员',
      // options:[]
    },
    style: {
      width: '508px',
      maxWidth: '100%',
    },
    readonly: false,
    editable: true,
    visibility: true,
    optionalRange: 0,
    listRange: [],
    conditionType: 11,
  },
  {
    // 组件的自定义配置
    typeId: 'DEPT_RADIO',
    typeName: '部门单选',
    config: {
      label: '部门单选',
      labelWidth: null,
      showLabel: true,
      changeTag: true,
      tag: 'dept-and-user',
      tagIcon: 'input',
      showDefaultValue: true,
      defaultValue: undefined,
      defaultValueType: 0,
      defaultValueSource: {
        type: 0,
        id: '',
      },
      displayType: true,
      required: true,
      layout: 'colFormItem',
      span: 24,
      optionalRange: 0,
    },
    __slot__: {
      default: '选择部门',
      // options:[]
    },
    style: {
      width: '254px',
      maxWidth: '100%',
    },
    readonly: false,
    editable: true,
    visibility: true,
    optionalRange: 0,
    conditionType: 12,
  },
  {
    // 组件的自定义配置
    typeId: 'DEPT_CHECK',
    typeName: '部门多选',
    config: {
      label: '部门多选',
      labelWidth: null,
      showLabel: true,
      changeTag: true,
      tag: 'dept-and-user',
      tagIcon: 'input',
      defaultValue: undefined,
      defaultValueType: 0,
      defaultValueSource: {
        type: 0,
        id: '',
      },
      displayType: true,
      required: true,
      layout: 'colFormItem',
      span: 24,
      optionalRange: 0,
    },
    __slot__: {
      default: '选择部门',
      // options:[]
    },
    style: {
      width: '508px',
      maxWidth: '100%',
    },
    readonly: false,
    editable: true,
    visibility: true,
    optionalRange: 0,
    conditionType: 13,
  },
]

//  基础字段 【左面板】
export const assistComponents = [
  {
    // 组件的自定义配置
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
        id: '',
      },
      displayType: true,
      required: true,
      layout: 'colFormItem',
      span: 24,
      format: 'text',
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
    },
    placeholder: '请输入',
    style: {
      width: '254px',
      maxWidth: '100%',
    },
    // clearable: true,
    // maxlength: null,
    // 'show-word-limit': false,
    // readonly: false,
    readonly: false,
    editable: true,
    visibility: true,
    limitRepeat: 0, // 0否，1是
    repeatReminderText: '此项内容已存在，不允许重复提交',
  },
  {
    typeId: 'TEXTAREA',
    typeName: '多行文本',
    config: {
      label: '多行文本',
      labelWidth: null,
      showLabel: true,
      tag: 'el-input',
      tagIcon: 'textarea',
      defaultValue: '',
      defaultValueType: 0,
      defaultValueSource: {
        type: 0,
        id: '',
      },
      displayType: true,
      required: true,
      layout: 'colFormItem',
      span: 24,
      changeTag: true,
    },
    type: 'textarea',
    placeholder: '请输入',
    autosize: {
      minRows: 3,
      maxRows: 5,
    },
    style: {
      width: '100%',
    },
    maxlength: null,
    'show-word-limit': false,
    readonly: false,
    editable: true,
    visibility: true,
  },
  {
    typeId: 'NUMBER_INPUT',
    typeName: '数字',
    controls: false,
    config: {
      label: '数字',
      showLabel: true,
      changeTag: true,
      labelWidth: null,
      tag: 'el-input-number',
      tagIcon: 'number',
      defaultValue: undefined,
      defaultValueType: 0,
      defaultValueSource: {
        type: 0,
        id: '',
      },
      displayType: true,
      span: 24,
      layout: 'colFormItem',
      required: true,
      format: 1,
      typeOption: [
        {
          label: '数值',
          value: 1,
        },
        {
          label: '百分比',
          value: 2,
        },
      ],
      showDecimal: false,
      showThousandsSeparator: false,
      limitRange: false,
    },
    style: {
      width: '254px',
      maxWidth: '100%',
    },
    placeholder: '请输入',
    min: undefined,
    max: undefined,
    step: 1,
    'step-strictly': false,
    precision: undefined,
    'controls-position': '',
    readonly: false,
    editable: true,
    visibility: true,
    conditionType: 1,
  },
  {
    typeId: 'DATE',
    typeName: '日期时间',
    config: {
      label: '日期时间',
      tag: 'el-date-picker',
      tagIcon: 'date',
      showDefaultValue: true,
      defaultValue: null,
      defaultValueType: 0,
      defaultValueSource: {
        type: 0,
        id: '',
      },
      displayType: true,
      showLabel: true,
      labelWidth: null,
      span: 24,
      layout: 'colFormItem',
      required: true,
      changeTag: true,
    },
    placeholder: '请选择',
    type: 'date',
    style: {
      width: '254px',
      maxWidth: '100%',
    },
    clearable: true,
    format: 'yyyy-MM-dd',
    'value-format': 'yyyy-MM-dd',
    readonly: false,
    editable: true,
    visibility: true,
    conditionType: 2,
  },
  {
    typeId: 'RADIO',
    typeName: '单选按钮组',
    config: {
      label: '单选按钮组',
      labelWidth: null,
      showLabel: true,
      displayType: true,
      tag: 'el-radio-group',
      tagIcon: 'radio',
      changeTag: true,
      showDefaultValue: false,
      defaultValue: undefined,
      layout: 'colFormItem',
      span: 24,
      optionType: 'default',
      required: true,
      border: false,
    },
    __slot__: {
      options: [
        {
          label: '选项一',
          value: 1,
        },
        {
          label: '选项二',
          value: 2,
        },
      ],
    },
    style: {
      display: 'block',
    },
    size: 'small',
    segment: 'vertical',
    readonly: false,
    editable: true,
    visibility: true,
    conditionType: 3,
  },
  {
    typeId: 'CHECKBOX',
    typeName: '复选框组',
    config: {
      label: '复选框组',
      tag: 'el-checkbox-group',
      tagIcon: 'checkbox',
      defaultValue: [],
      showDefaultValue: false,
      span: 24,
      showLabel: true,
      displayType: true,
      labelWidth: null,
      layout: 'colFormItem',
      optionType: 'default',
      required: true,
      changeTag: true,
      border: false,
    },
    __slot__: {
      options: [
        {
          label: '选项一',
          value: 1,
        },
        {
          label: '选项二',
          value: 2,
        },
      ],
    },
    style: {
      width: '254px',
      maxWidth: '100%',
    },
    size: 'small',
    segment: 'vertical',
    readonly: false,
    editable: true,
    visibility: true,
    conditionType: 4,
  },
  {
    typeId: 'SELECT',
    typeName: '下拉框',
    config: {
      label: '下拉框',
      showLabel: true,
      defaultValue: undefined,
      showDefaultValue: false,
      labelWidth: null,
      tag: 'el-select',
      tagIcon: 'select',
      layout: 'colFormItem',
      displayType: true,
      span: 24,
      required: true,
      changeTag: true,
    },
    __slot__: {
      options: [
        {
          label: '选项一',
          value: 1,
          checked: false,
        },
        {
          label: '选项二',
          value: 2,
          checked: false,
        },
      ],
    },
    placeholder: '请选择',
    style: {
      width: '254px',
      maxWidth: '100%',
    },
    clearable: true,
    filterable: true,
    multiple: false,
    readonly: false,
    editable: true,
    visibility: true,
    optionsModel: 0,
    linkValue: {},
    conditionType: 5,
    limitRepeat: 0, // 0否，1是
    repeatReminderText: '此项内容已存在，不允许重复提交',
  },
  {
    typeId: 'SELECT-MULTIPLE',
    typeName: '下拉复选框',
    config: {
      label: '下拉复选框',
      showLabel: true,
      defaultValue: undefined,
      showDefaultValue: false,
      labelWidth: null,
      tag: 'el-select',
      tagIcon: 'select',
      layout: 'colFormItem',
      displayType: true,
      span: 24,
      required: true,
      multiple: true,
      changeTag: true,
    },
    __slot__: {
      options: [
        {
          label: '选项一',
          value: 1,
        },
        {
          label: '选项二',
          value: 2,
        },
      ],
    },
    placeholder: '请选择',
    style: {
      width: '254px',
      maxWidth: '100%',
    },
    clearable: true,
    filterable: true,
    multiple: true,
    readonly: false,
    editable: true,
    visibility: true,
    optionsModel: 0,
    linkValue: {},
    conditionType: 6,
  },
  {
    typeId: 'DIVIDER',
    typeName: '分割线',
    config: {
      label: '分割线',
      defaultValue: '',
      displayType: true,
      showLabel: true,
      showDefaultValue: false,
      showRequired: false,
      showClearable: false,
      tag: 'el-divider',
      tagIcon: 'divider',
      layout: 'colFormItem',
      required: undefined,
      changeTag: false,
    },
    color: undefined,
    style: {
      width: '100%',
    },
    notChild: true,
  },
  // {
  //   typeId: 'BUTTON',
  //   typeName: '按钮',
  //   config: {
  //     label: '按钮',
  //     showLabel: false,
  //     changeTag: true,
  //     labelWidth: null,
  //     tag: 'el-button',
  //     tagIcon: 'button',
  //     defaultValue: undefined,
  //     showDefaultValue: false,
  //     showRegList: false,
  //     required: undefined,
  //     showRequired: false,
  //     regList: [],
  //     displayType: false,
  //     span: 24,
  //     layout: 'colFormItem',
  //   },
  //   __slot__: {
  //     default: '按钮' // 指的是 <el-button>{{ __slot__.defulat的值(非defualt的将被<template>包裹)}}}</el-button>
  //   },
  //   btnAction: [],
  //   type: 'primary',
  //   // icon: 'el-icon-search',
  //   round: false,
  //   size: 'small',
  //   plain: false,
  //   circle: false,
  //   disabled: false
  // }
]
