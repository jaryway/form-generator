<template>
  <div class="test-form">
    <parser :form-conf="formConf" @submit="sumbitForm1" />
    <!-- <fg-table /> -->

    <!-- <el-button @click="change"> change </el-button> -->
  </div>
</template>

<script>
import Parser from '../Parser'
import FgTable from '@/components/fg-table'

// 若parser是通过安装npm方式集成到项目中的，使用此行引入
// import Parser from 'form-gen-parser'

export default {
  components: {
    Parser,
    FgTable,
  },
  props: {},
  data() {
    return {
      key2: +new Date(),
      isEdit: true,
      formConf: {
        fields: [
          {
            style: {
              width: '254px',
              maxWidth: '100%',
            },
            value: [
              {
                fieldpFirCPB1682128031249: 'sfdf',
                fieldkorrCPB1682128057527: 'fdfd',
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
            config: {
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
            vModel: 'fieldOagrCPB1682128026646',
            __slot__: {
              dataList: [],
            },
            children: [
              {
                style: {
                  width: '254px',
                  maxWidth: '100%',
                },
                config: {
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
                vModel: 'fieldpFirCPB1682128031249',
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
                config: {
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
                vModel: 'fieldkorrCPB1682128057527',
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
                  width: '254px',
                  maxWidth: '100%',
                },
                value: [
                  {
                    fieldfgcsCPB1682128157163: '',
                    fieldHLMoGPB1682156796273: '',
                  },
                  {
                    fieldfgcsCPB1682128157163: '2',
                  },
                ],
                config: {
                  tag: 'my-table',
                  span: 24,
                  label: '子表单',
                  layout: 'rowFormItem',
                  tagIcon: 'input',
                  changeTag: true,
                  renderKey: 'gkbsCPB1682128154200',
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
                vModel: 'fieldgkbsCPB1682128154200',
                __slot__: {
                  dataList: [],
                },
                children: [
                  {
                    style: {
                      width: '254px',
                      maxWidth: '100%',
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
                      renderKey: 'fgcsCPB1682128157163',
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
                    vModel: 'fieldfgcsCPB1682128157163',
                    editable: true,
                    readonly: false,
                    typeName: '单行文本',
                    parentKey: 'fieldgkbsCPB1682128154200',
                    visibility: true,
                    description: '',
                    limitRepeat: false,
                    placeholder: '请输入',
                    repeatReminderText: '此项内容已存在，不允许重复提交',
                  },
                  {
                    style: {
                      maxWidth: '100%',
                    },
                    canAdd: true,
                    config: {
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
                    vModel: 'fieldHLMoGPB1682156796273',
                    dataNum: 1,
                    linkList: [
                      {
                        id: '1649711137891065858',
                        name: 'fieldibpnGPB1682156734859',
                        type: 0,
                        label: '单行01',
                        typeId: 'INPUT',
                        vModel: 'fieldibpnGPB1682156734859',
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
                        vModel: 'fieldPhAoGPB1682156765021',
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
          },
          {
            config: {
              label: '单行文本999',
              labelWidth: null,
              showLabel: true,
              changeTag: true,
              tag: 'el-input',
              tagIcon: 'input',
              required: true,
              layout: 'colFormItem',
              span: 24,
              document: 'https://element.eleme.cn/#/zh-CN/component/input',
              regList: [
                {
                  pattern: '/^1(3|4|5|7|8|9)\\d{9}$/',
                  message: '手机号格式错误',
                },
              ],
            },
            defaultValue: 'sfasdfa',
            __slot__: {
              prepend: '',
              append: '',
            },
            vModel: 'mobile',
            placeholder: '请输入手机号',
            style: {
              width: '100%',
            },
            clearable: true,
            'prefix-icon': 'el-icon-mobile',
            'suffix-icon': '',
            maxlength: 11,
            'show-word-limit': true,
            readonly: false,
            disabled: false,
          },
          {
            config: {
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
              document: 'https://element.eleme.cn/#/zh-CN/component/date-picker',
              formId: 101,
              renderKey: 1585980082729,
            },
            style: {
              width: '100%',
            },
            type: 'daterange',
            'range-separator': '至',
            'start-placeholder': '开始日期',
            'end-placeholder': '结束日期',
            disabled: false,
            clearable: true,
            format: 'yyyy-MM-dd',
            'value-format': 'yyyy-MM-dd',
            readonly: false,
            vModel: 'field101',
          },
          {
            config: {
              layout: 'rowFormItem',
              tagIcon: 'row',
              label: '行容器',
              layoutTree: true,
              children: [
                {
                  config: {
                    label: '评分',
                    tag: 'el-rate',
                    tagIcon: 'rate',
                    defaultValue: 0,
                    span: 24,
                    showLabel: true,
                    labelWidth: null,
                    layout: 'colFormItem',
                    required: true,
                    regList: [],
                    changeTag: true,
                    document: 'https://element.eleme.cn/#/zh-CN/component/rate',
                    formId: 102,
                    renderKey: 1586839671259,
                  },
                  style: {},
                  max: 5,
                  'allow-half': false,
                  'show-text': false,
                  'show-score': false,
                  disabled: false,
                  vModel: 'field102',
                },
              ],
              document: 'https://element.eleme.cn/#/zh-CN/component/layout',
              formId: 101,
              span: 24,
              renderKey: 1586839668999,
              componentName: 'row101',
              gutter: 15,
            },
            type: 'default',
            justify: 'start',
            align: 'top',
          },
          //   {
          //     config: {
          //       label: '按钮',
          //       showLabel: true,
          //       changeTag: true,
          //       labelWidth: null,
          //       tag: 'el-button',
          //       tagIcon: 'button',
          //       span: 24,
          //       layout: 'colFormItem',
          //       document: 'https://element.eleme.cn/#/zh-CN/component/button',
          //       renderKey: 1594288459289,
          //     },
          //     __slot__: {
          //       default: '测试按钮1',
          //     },
          //     type: 'primary',
          //     icon: 'el-icon-search',
          //     round: false,
          //     size: 'medium',
          //     plain: false,
          //     circle: false,
          //     disabled: false,
          //     on: {
          //       click: 'clickTestButton1',
          //     },
          //   },
        ],
        __methods__: {
          clickTestButton1() {
            console.log(
              `%c【测试按钮1】点击事件里可以访问当前表单：
                  1) formModel='formData', 所以this.formData可以拿到当前表单的model
                  2) formRef='elForm', 所以this.$refs.elForm可以拿到当前表单的ref(vue组件)
                `,
              'color:#409EFF;font-size: 15px'
            )
            console.log('表单的Model：', this.formData)
            console.log('表单的ref：', this.$refs.elForm)
          },
        },
        formRef: 'elForm',
        formModel: 'formData',
        size: 'small',
        labelPosition: 'right',
        labelWidth: 100,
        formRules: 'rules',
        gutter: 15,
        disabled: false,
        span: 24,
        formBtns: true,
        unFocusedComponentBorder: false,
      },
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    // 表单数据回填，模拟异步请求场景
    setTimeout(() => {
      // 请求回来的表单数据
      const data = {
        mobile: '18836662555',
      }
      // 回填数据
      this.fillFormData(this.formConf, data)
      // 更新表单
      this.key2 = +new Date()
    }, 2000)
  },
  methods: {
    fillFormData(form, data) {
      form.fields.forEach((item) => {
        const val = data[item.vModel]
        if (val) {
          item.config.defaultValue = val
        }
      })
    },
    change() {
      this.key2 = +new Date()
      const t = this.formConf
      this.formConf = this.formConf2
      this.formConf2 = t
    },
    submitForm(formName) {
      // eslint-disable-next-line consistent-return
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    sumbitForm1(data) {
      console.log('sumbitForm1提交数据：', data)
    },
    sumbitForm2(data) {
      console.log('sumbitForm2提交数据：', data)
    },
  },
}
</script>

<style lang="scss" scoped>
.test-form {
  margin: 15px auto;
  width: 800px;
  padding: 15px;
}
</style>
