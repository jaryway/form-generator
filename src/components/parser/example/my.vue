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
    FgTable
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
              width: '508px',
              maxWidth: '100%'
            },
            config: {
              tag: 'dept-and-user',
              dept: 1,
              span: 12,
              label: '成员多选',
              layout: 'colFormItem',
              tagIcon: 'input',
              required: true,
              changeTag: true,
              renderKey: 'AGwTPPB1682219745434',
              showLabel: true,
              labelWidth: null,
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
            vModel: 'fieldAGwTPPB1682219745434',
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
              tag: 'el-input',
              span: 12,
              label: '单行文本',
              format: 'text',
              layout: 'colFormItem',
              tagIcon: 'input',
              required: true,
              changeTag: true,
              renderKey: 'zVMDBLB1680594220150',
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
            vModel: 'fieldzVMDBLB1680594220150',
            editable: true,
            readonly: false,
            typeName: '单行文本',
            visibility: true,
            description: '',
            limitRepeat: false,
            placeholder: '请输入',
            repeatReminderText: '此项内容已存在，不允许重复提交'
          },
          {
            type: 2,
            config: {
              tag: 'province-city',
              span: 12,
              label: '地址',
              layout: 'colFormItem',
              tagIcon: 'input',
              required: true,
              changeTag: false,
              renderKey: 'uWzGXOB1681896637281',
              showLabel: true,
              labelWidth: null,
              displayType: true,
              showDefaultValue: true
            },
            typeId: 'PROVINCE_CITY',
            vModel: 'fielduWzGXOB1681896637281',
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
              width: '254px',
              maxWidth: '100%'
            },
            value: [
              {
                fieldpFirCPB1682128031249: '111',
                fieldkorrCPB1682128057527: '22',
                fieldTtFkGPB1682156217264: '11'
              },
              {
                fieldkorrCPB1682128057527: '1',
                fieldpFirCPB1682128031249: '1'
              },
              {
                fieldkorrCPB1682128057527: '',
                fieldpFirCPB1682128031249: ''
              }
            ],
            config: {
              tag: 'my-table',
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
                type: 0
              }
            },
            typeId: 'CHILD_FORM',
            vModel: 'fieldOagrCPB1682128026646',
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
                  defaultValue: '对对对',
                  defaultValueType: 0,
                  defaultValueSource: {
                    id: '',
                    type: 0
                  }
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
                repeatReminderText: '此项内容已存在，不允许重复提交'
              },
              {
                style: {
                  width: '254px',
                  maxWidth: '100%'
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
                vModel: 'fieldkorrCPB1682128057527',
                editable: true,
                readonly: false,
                typeName: '单行文本',
                parentKey: 'fieldOagrCPB1682128026646',
                visibility: true,
                description: '',
                limitRepeat: false,
                placeholder: '请输入班级',
                repeatReminderText: '此项内容已存在，不允许重复提交'
              },
              {
                style: {
                  maxWidth: '100%'
                },
                canAdd: true,
                config: {
                  tag: 'my-form',
                  span: 12,
                  label: '关联查询',
                  layout: 'colFormItem',
                  dbTable: 'cf6af970464c9ff53576420924bd7be0',
                  tagIcon: 'input',
                  changeTag: true,
                  renderKey: 'TtFkGPB1682156217264',
                  showLabel: true,
                  labelWidth: null,
                  dbFieldList: ['1647885908212625409', '1647885908288122881'],
                  displayType: true,
                  showDefaultValue: false
                },
                typeId: 'QUERY_CHECK',
                vModel: 'fieldTtFkGPB1682156217264',
                dataNum: 1,
                linkList: [
                  {
                    id: '1647885908212625409',
                    name: 'fieldrDtLzNB1681721422820',
                    type: 0,
                    label: '单行文本01',
                    typeId: 'INPUT',
                    vModel: 'fieldrDtLzNB1681721422820',
                    visible: 1,
                    __slot__: null,
                    children: null,
                    parentId: 1,
                    foreignId: 0,
                    childrenFlag: 0,
                    childrenFromDesignerId: null
                  },
                  {
                    id: '1647885908288122881',
                    name: 'fieldVguLzNB1681721426505',
                    type: 0,
                    label: '成员单选',
                    typeId: 'MEMBER_RADIO',
                    vModel: 'fieldVguLzNB1681721426505',
                    visible: 1,
                    __slot__: '{"default":"选择成员"}',
                    children: null,
                    parentId: 1,
                    foreignId: 0,
                    childrenFlag: 0,
                    childrenFromDesignerId: null
                  }
                ],
                typeName: '关联查询',
                parentKey: 'fieldOagrCPB1682128026646',
                filterCond: [
                  {
                    type: 0,
                    value: '1647940544961359874',
                    typeId: 'INPUT',
                    value2: 'fieldOagrCPB1682128026646.fieldpFirCPB1682128031249',
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
          },
          {
            style: {
              maxWidth: '100%'
            },
            canAdd: true,
            config: {
              tag: 'my-form',
              span: 12,
              label: '关联查询',
              layout: 'colFormItem',
              dbTable: '',
              tagIcon: 'input',
              changeTag: true,
              renderKey: 'DIDHDPB1682130197075',
              showLabel: true,
              labelWidth: null,
              displayType: true,
              showDefaultValue: false
            },
            typeId: 'QUERY_CHECK',
            vModel: 'fieldDIDHDPB1682130197075',
            dataNum: 1,
            linkList: [],
            typeName: '关联查询',
            filterCond: [],
            visibility: true,
            description: '',
            linkedShowField: []
          }
        ],
        formId: 'a1fd37066464958873f41fcd66cfbbe7',
        formRef: 'elForm',
        formModel: 'formData',
        size: 'mini',
        labelPosition: 'top',
        labelWidth: 100,
        formRules: 'rules',
        disabled: false,
        numberOfColumns: 12,
        description: '',
        submitButtonState: 0,
        submitButtonText: '提交',
        frontEndEvents: [],
        formSubmissionValidation: [],
        fieldDisplayRules: [
          {
            conditionsChoice: 1,
            conditionsList: [
              {
                id: 'fieldzVMDBLB1680594220150',
                label: '单行文本',
                value: ['111'],
                option: [],
                typeId: 'INPUT',
                condValue: '111',
                condition: 2
              }
            ],
            displayFieldList: ['fieldOagrCPB1682128026646']
          },
          // {
          //   conditionsChoice: 1,
          //   conditionsList: [
          //     {
          //       id: 'fieldAGwTPPB1682219745434',
          //       typeId: 'MEMBER_CHECK',
          //       label: '成员多选',
          //       condValue: [
          //         {
          //           id: '3875b29b74b84cbdbd46dec97c5b3f3a',
          //           name: '赵阳01',
          //           account: 'z621501',
          //           logo: null,
          //           type: 3,
          //           parentId: null,
          //           parentTreeId: null,
          //           divisionName: '平台组',
          //           sysUserId: '3b842cb1f1d843d0967da100611319ea',
          //           weight: null
          //         }
          //       ],
          //       condition: 0,
          //       option: [],
          //       value: ['赵阳01']
          //     }
          //   ],
          //   displayFieldList: ['fieldzVMDBLB1680594220150']
          // }
        ],
        dataFilterSetting: {
          rel: 0,
          cond: []
        },
        submitAssociationOperation: [],
        span: null,
        gutter: null,
        medium: null,
        menuId: null,
        multiLabel: null,
        pcFormLayout: null,
        saveDraftText: null,
        assignmentRule: null,
        saveDraftState: null,
        mobileFormLayout: null
      }
    }
  },
  computed: {},
  watch: {},
  created() { },
  mounted() {
    // 表单数据回填，模拟异步请求场景
    setTimeout(() => {
      // 请求回来的表单数据
      const data = {
        mobile: '18836662555'
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
    }
  }
}
</script>

<style lang="scss" scoped>
.test-form {
  margin: 15px auto;
  width: 800px;
  padding: 15px;
}
</style>
