// 表单属性【右面板】
export const formConf = {
  formRef: 'elForm',
  formModel: 'formData',
  size: 'medium',
  labelPosition: 'right',
  labelWidth: 100,
  formRules: 'rules',
  gutter: 15,
  disabled: false,
  span: 24,
  formBtns: true
}

// 输入型组件 【左面板】
export const inputComponents = [
  {
    // 组件的自定义配置
    'config': {
      label: '单行文本',
      labelWidth: null,
      showLabel: true,
      changeTag: true,
      tag: 'el-input',
      tagIcon: 'input',
      defaultValue: 'FFF',
      required: true,
      layout: 'colFormItem',
      span: 24,
      document: 'https://element.eleme.cn/#/zh-CN/component/input',
      // 正则校验规则
      regList: []
    },
    // 组件的插槽属性
    '__slot__': {
      prepend: '',
      append: ''
    },
    // 其余的为可直接写在组件标签上的属性
    'placeholder': '请输入',
    'style': { width: '100%' },
    'clearable': true,
    'prefix-icon': '',
    'suffix-icon': '',
    'maxlength': null,
    'show-word-limit': false,
    'readonly': false,
    'disabled': false
  },
  {
    'config': {
      label: '多行文本',
      labelWidth: null,
      showLabel: true,
      tag: 'el-input',
      tagIcon: 'textarea',
      defaultValue: undefined,
      required: true,
      layout: 'colFormItem',
      span: 24,
      regList: [],
      changeTag: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/input'
    },
    'type': 'textarea',
    'placeholder': '请输入',
    'autosize': {
      minRows: 4,
      maxRows: 4
    },
    'style': { width: '100%' },
    'maxlength': null,
    'show-word-limit': false,
    'readonly': false,
    'disabled': false
  },
  {
    'config': {
      label: '密码',
      showLabel: true,
      labelWidth: null,
      changeTag: true,
      tag: 'el-input',
      tagIcon: 'password',
      defaultValue: undefined,
      layout: 'colFormItem',
      span: 24,
      required: true,
      regList: [],
      document: 'https://element.eleme.cn/#/zh-CN/component/input'
    },
    '__slot__': {
      prepend: '',
      append: ''
    },
    'placeholder': '请输入',
    'show-password': true,
    'style': { width: '100%' },
    'clearable': true,
    'prefix-icon': '',
    'suffix-icon': '',
    'maxlength': null,
    'show-word-limit': false,
    'readonly': false,
    'disabled': false
  },
  {
    'config': {
      label: '计数器',
      showLabel: true,
      changeTag: true,
      labelWidth: null,
      tag: 'el-input-number',
      tagIcon: 'number',
      defaultValue: undefined,
      span: 24,
      layout: 'colFormItem',
      required: true,
      regList: [],
      document: 'https://element.eleme.cn/#/zh-CN/component/input-number'
    },
    'placeholder': '',
    'min': undefined,
    'max': undefined,
    'step': 1,
    'step-strictly': false,
    'precision': undefined,
    'controls-position': '',
    'disabled': false
  },
  {
    config: {
      label: '编辑器',
      showLabel: true,
      changeTag: true,
      labelWidth: null,
      tag: 'tinymce',
      tagIcon: 'rich-text',
      defaultValue: null,
      span: 24,
      layout: 'colFormItem',
      required: true,
      regList: [],
      document: 'http://tinymce.ax-z.cn'
    },
    placeholder: '请输入',
    height: 300, // 编辑器高度
    branding: false // 隐藏右下角品牌烙印
  }
]

// 选择型组件 【左面板】
export const selectComponents = [
  {
    config: {
      label: '下拉选择',
      showLabel: true,
      labelWidth: null,
      tag: 'el-select',
      tagIcon: 'select',
      layout: 'colFormItem',
      span: 24,
      required: true,
      regList: [],
      changeTag: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/select'
    },
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
    placeholder: '请选择',
    style: { width: '100%' },
    clearable: true,
    disabled: false,
    filterable: false,
    multiple: false
  },
  {
    'config': {
      label: '级联选择',
      url: 'https://www.fastmock.site/mock/f8d7a54fb1e60561e2f720d5a810009d/fg/cascaderList',
      method: 'get',
      dataPath: 'list',
      dataConsumer: 'options',
      showLabel: true,
      labelWidth: null,
      tag: 'el-cascader',
      tagIcon: 'cascader',
      layout: 'colFormItem',
      defaultValue: [],
      dataType: 'dynamic',
      span: 24,
      required: true,
      regList: [],
      changeTag: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/cascader'
    },
    'options': [
      {
        id: 1,
        value: 1,
        label: '选项1',
        children: [
          {
            id: 2,
            value: 2,
            label: '选项1-1'
          }
        ]
      }
    ],
    'placeholder': '请选择',
    'style': { width: '100%' },
    'props': {
      props: {
        multiple: false,
        label: 'label',
        value: 'value',
        children: 'children'
      }
    },
    'show-all-levels': true,
    'disabled': false,
    'clearable': true,
    'filterable': false,
    'separator': '/'
  },
  {
    config: {
      label: '单选框组',
      labelWidth: null,
      showLabel: true,
      tag: 'el-radio-group',
      tagIcon: 'radio',
      changeTag: true,
      defaultValue: undefined,
      layout: 'colFormItem',
      span: 24,
      optionType: 'default',
      regList: [],
      required: true,
      border: false,
      document: 'https://element.eleme.cn/#/zh-CN/component/radio'
    },
    __slot__: {
      options: [
        {
          label: '选项一',
          value: 1
        },
        {
          label: '选项二',
          value: 2
        },
        {
          label: '其他',
          // value: ,
          isOther: true
        }
      ]
    },
    style: {},
    size: 'medium',
    disabled: false
  },
  {
    config: {
      label: '多选框组',
      tag: 'el-checkbox-group',
      tagIcon: 'checkbox',
      defaultValue: [],
      span: 24,
      showLabel: true,
      labelWidth: null,
      layout: 'colFormItem',
      optionType: 'default',
      required: true,
      regList: [],
      changeTag: true,
      border: false,
      document: 'https://element.eleme.cn/#/zh-CN/component/checkbox'
    },
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
    style: {},
    size: 'medium',
    min: null,
    max: null,
    disabled: false
  },
  {
    'config': {
      label: '开关',
      tag: 'el-switch',
      tagIcon: 'switch',
      defaultValue: false,
      span: 24,
      showLabel: true,
      labelWidth: null,
      layout: 'colFormItem',
      required: true,
      regList: [],
      changeTag: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/switch'
    },
    'style': {},
    'disabled': false,
    'active-text': '',
    'inactive-text': '',
    'active-color': null,
    'inactive-color': null,
    'active-value': true,
    'inactive-value': false
  },
  {
    'config': {
      label: '滑块',
      tag: 'el-slider',
      tagIcon: 'slider',
      defaultValue: null,
      span: 24,
      showLabel: true,
      layout: 'colFormItem',
      labelWidth: null,
      required: true,
      regList: [],
      changeTag: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/slider'
    },
    'disabled': false,
    'min': 0,
    'max': 100,
    'step': 1,
    'show-stops': false,
    'range': false
  },
  {
    'config': {
      label: '时间选择',
      tag: 'el-time-picker',
      tagIcon: 'time',
      defaultValue: null,
      span: 24,
      showLabel: true,
      layout: 'colFormItem',
      labelWidth: null,
      required: true,
      regList: [],
      changeTag: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/time-picker'
    },
    'placeholder': '请选择',
    'style': { width: '100%' },
    'disabled': false,
    'clearable': true,
    'picker-options': {
      selectableRange: '00:00:00-23:59:59'
    },
    'format': 'HH:mm:ss',
    'value-format': 'HH:mm:ss'
  },
  {
    'config': {
      label: '时间范围',
      tag: 'el-time-picker',
      tagIcon: 'time-range',
      span: 24,
      showLabel: true,
      labelWidth: null,
      layout: 'colFormItem',
      defaultValue: null,
      required: true,
      regList: [],
      changeTag: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/time-picker'
    },
    'style': { width: '100%' },
    'disabled': false,
    'clearable': true,
    'is-range': true,
    'range-separator': '至',
    'start-placeholder': '开始时间',
    'end-placeholder': '结束时间',
    'format': 'HH:mm:ss',
    'value-format': 'HH:mm:ss'
  },
  {
    'config': {
      label: '日期选择',
      tag: 'el-date-picker',
      tagIcon: 'date',
      defaultValue: null,
      showLabel: true,
      labelWidth: null,
      span: 24,
      layout: 'colFormItem',
      required: true,
      regList: [],
      changeTag: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/date-picker'
    },
    'placeholder': '请选择',
    'type': 'date',
    'style': { width: '100%' },
    'disabled': false,
    'clearable': true,
    'format': 'yyyy-MM-dd',
    'value-format': 'yyyy-MM-dd',
    'readonly': false
  },
  {
    'config': {
      label: '日期范围',
      tag: 'el-date-picker',
      tagIcon: 'date-range',
      defaultValue: null,
      span: 24,
      showLabel: true,
      labelWidth: null,
      required: true,
      layout: 'colFormItem',
      regList: [],
      changeTag: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/date-picker'
    },
    'style': { width: '100%' },
    'type': 'daterange',
    'range-separator': '至',
    'start-placeholder': '开始日期',
    'end-placeholder': '结束日期',
    'disabled': false,
    'clearable': true,
    'format': 'yyyy-MM-dd',
    'value-format': 'yyyy-MM-dd',
    'readonly': false
  },
  {
    'typeId': 'DIVIDER',
    'typeName': '分割线',
    'config': {
      label: '分割线',
      showLabel: false,
      tag: 'el-divider',
      tagIcon: 'divider',
      layout: 'colFormItem'
    },
    'color': undefined,
    'style': { width: '100%' },
    'direction': 'horizontal', // 设置分割线方向
    'content-position': 'center',
    'notChild': true
  }
  // {
  //   config: {
  //     label: '评分',
  //     tag: 'el-rate',
  //     tagIcon: 'rate',
  //     defaultValue: 0,
  //     span: 24,
  //     showLabel: true,
  //     labelWidth: null,
  //     layout: 'colFormItem',
  //     required: true,
  //     regList: [],
  //     changeTag: true,
  //     document: 'https://element.eleme.cn/#/zh-CN/component/rate',
  //   },
  //   style: {},
  //   max: 5,
  //   'allow-half': false,
  //   'show-text': false,
  //   'show-score': false,
  //   disabled: false,
  // },
  // {
  //   config: {
  //     label: '颜色选择',
  //     tag: 'el-color-picker',
  //     tagIcon: 'color',
  //     span: 24,
  //     defaultValue: null,
  //     showLabel: true,
  //     labelWidth: null,
  //     layout: 'colFormItem',
  //     required: true,
  //     regList: [],
  //     changeTag: true,
  //     document: 'https://element.eleme.cn/#/zh-CN/component/color-picker',
  //   },
  //   'show-alpha': false,
  //   'color-format': '',
  //   disabled: false,
  //   size: 'medium',
  // },
  // {
  //   config: {
  //     label: '上传',
  //     tag: 'el-upload',
  //     tagIcon: 'upload',
  //     layout: 'colFormItem',
  //     defaultValue: null,
  //     showLabel: true,
  //     labelWidth: null,
  //     required: true,
  //     span: 24,
  //     showTip: false,
  //     buttonText: '点击上传',
  //     regList: [],
  //     changeTag: true,
  //     fileSize: 2,
  //     sizeUnit: 'MB',
  //     document: 'https://element.eleme.cn/#/zh-CN/component/upload',
  //   },
  //   __slot__: {
  //     'list-type': true,
  //   },
  //   action: 'https://jsonplaceholder.typicode.com/posts/',
  //   disabled: false,
  //   accept: '',
  //   name: 'file',
  //   'auto-upload': true,
  //   'list-type': 'text',
  //   multiple: false,
  // },
]

// 布局型组件 【左面板】
export const layoutComponents = [
  {
    config: {
      layout: 'rowFormItem',
      tagIcon: 'row',
      label: '行容器',
      layoutTree: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/layout#row-attributes'
    },
    type: 'default',
    justify: 'start',
    align: 'top'
  },
  {
    config: {
      label: '地址',
      showLabel: true,
      changeTag: true,
      labelWidth: null,
      tag: 'fg-address',
      tagIcon: 'button',
      span: 24,
      layout: 'colFormItem',
      document: 'https://element.eleme.cn/#/zh-CN/component/button',
      defaultValue: ['北京市', '东城区', '中山大道西']
    },

    type: 2
    // __slot__: {
    //   default: '主要按钮'
    // },
    // type: 'primary',
    // icon: 'el-icon-search',
    // round: false,
    // size: 'medium',
    // plain: false,
    // circle: false,
    // disabled: false
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
      defaultValueSource: { type: 0, id: '' },
      displayType: true,
      required: true,
      limitTargeting: false,
      limitTargetingOpt: 1,
      layout: 'colFormItem',
      span: 24,
      auto: ''
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
      maxWidth: '100%'
    },
    conditionType: 8
  },
  {
    'typeId': 'UPLOAD-IMG',
    'typeName': '图片',
    'config': {
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
      changeTag: true
    },
    // 'expand': {
    //   limit: 0,
    //   fileSize: 10,
    //   sizeUnit: 'MB'
    // },
    // 'setting': {
    //   onlyOne: false,
    //   limit: false
    // },
    '__slot__': {
      'list-type': true
    },
    'style': {
      width: '320px',
      maxWidth: '100%'
    },
    // 'action': getAppApiUrl() + '/assist/oss/upload/image',
    'accept': 'image/*',
    'show-file-list': false,
    'name': 'file',
    'auto-upload': true,
    'list-type': 'picture',
    'multiple': true,
    'drag': false,
    'readonly': false,
    'editable': true,
    'visibility': true
    // fileList: [
    //   { name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
    //   { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
    // ],
  },
  {
    'typeId': 'UPLOAD-FILE',
    'typeName': '附件',
    'config': {
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
      changeTag: true
    },
    // expand: {
    //   limit: 0,
    //   fileSize: 10,
    //   sizeUnit: 'MB',
    //   accept: '',
    // },
    // setting: {
    //   onlyOne: false,
    //   accept: '',
    //   limit: false,
    // },
    // __slot__: {
    //   'list-type': true,
    // },
    'style': {
      width: '254px',
      maxWidth: '100%'
    },
    // 'action': getAppApiUrl() + '/assist/oss/upload/file',
    'show-file-list': false,
    'name': 'file',
    'auto-upload': true,
    'list-type': 'text',
    'multiple': true,
    'editable': true,
    'visibility': true,
    'readonly': false
  },

  {
    // 组件的自定义配置
    typeId: 'linkquery',
    typeName: '关联查询',
    config: {
      label: '关联查询',
      labelWidth: null,
      showLabel: true,
      changeTag: true,
      tag: 'fg-link-query',
      tagIcon: 'input',
      showDefaultValue: false,
      defaultValue: undefined,
      defaultValueType: 0,
      defaultValueSource: {
        type: 0,
        id: ''
      },
      displayType: true,
      required: undefined,
      showRequired: false,
      layout: 'colFormItem',
      type: 'linkquery'
    },
    children: [],
    style: {},
    linkFields: [],
    linkForm: '',
    linkFilter: [],
    linkFilterRel: [],
    multi: true,
    allowAdd: true,
    readonly: false,
    editable: true,
    visibility: true,
    notChild: false
  },

  {
    // 组件的自定义配置
    typeId: 'linkdata',
    typeName: '关联数据',
    config: {
      label: '关联数据',
      labelWidth: null,
      showLabel: true,
      changeTag: true,
      tag: 'fg-link-data',
      tagIcon: 'input',
      showDefaultValue: false,
      defaultValue: undefined,
      defaultValueType: 0,
      defaultValueSource: {
        type: 0,
        id: ''
      },
      displayType: true,
      required: undefined,
      showRequired: false,
      layout: 'colFormItem',
      type: 'linkdata'
    },
    children: [],
    style: {},
    linkDataMaps: [],
    linkFields: [],
    linkForm: '',
    linkFilter: [],
    linkFilterRel: [],
    readonly: false,
    editable: true,
    visibility: true,
    notChild: false
  },
  {
    // 组件的自定义配置
    typeId: 'CHILD_FORM',
    typeName: '子表单000',
    config: {
      label: '子表单00',
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
        id: ''
      },
      displayType: true,
      required: undefined,
      showRequired: false,
      layout: 'rowFormItem',
      type: 'subform'
    },
    children: [],
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
    notChild: false,
    type: 'flex'
    // conditionType: 9
  },
  // {
  //   config: {
  //     label: '按钮',
  //     showLabel: true,
  //     changeTag: true,
  //     labelWidth: null,
  //     tag: 'el-button',
  //     tagIcon: 'button',
  //     span: 24,
  //     layout: 'colFormItem',
  //     document: 'https://element.eleme.cn/#/zh-CN/component/button',
  //   },

  //   type: 'primary',
  //   icon: 'el-icon-search',
  //   round: false,
  //   size: 'medium',
  //   plain: false,
  //   circle: false,
  //   disabled: false,
  // },
  {
    config: {
      layout: 'colFormItem',
      tagIcon: 'table',
      tag: 'el-table',
      document: 'https://element.eleme.cn/#/zh-CN/component/table',
      span: 24,
      // formId: 101,
      renderKey: 1595761764203,
      componentName: 'row101',
      showLabel: true,
      changeTag: true,
      labelWidth: null,
      label: '表格[开发中]',
      dataType: 'dynamic',
      method: 'get',
      dataPath: 'list',
      dataConsumer: 'data',
      url: 'https://www.fastmock.site/mock/f8d7a54fb1e60561e2f720d5a810009d/fg/tableData',
      children: [
        {
          config: {
            layout: 'raw',
            tag: 'el-table-column',
            renderKey: 15957617660153
          },
          prop: 'date',
          label: '日期'
        },
        {
          config: {
            layout: 'raw',
            tag: 'el-table-column',
            renderKey: 15957617660152
          },
          prop: 'address',
          label: '地址'
        },
        {
          config: {
            layout: 'raw',
            tag: 'el-table-column',
            renderKey: 15957617660151
          },
          prop: 'name',
          label: '名称'
        },
        {
          config: {
            layout: 'raw',
            tag: 'el-table-column',
            renderKey: 1595774496335,
            children: [
              {
                config: {
                  label: '按钮',
                  tag: 'el-button',
                  tagIcon: 'button',
                  layout: 'raw',
                  renderKey: 1595779809901
                },
                __slot__: {
                  default: '主要按钮'
                },
                type: 'primary',
                icon: 'el-icon-search',
                round: false,
                size: 'medium'
              }
            ]
          },
          label: '操作'
        }
      ]
    },
    data: [],
    directives: [
      {
        name: 'loading',
        value: true
      }
    ],
    border: true,
    type: 'default',
    justify: 'start',
    align: 'top'
  }
]
