<!-- eslint-disable no-unreachable -->
<template>
  <div class="test-form">
    <el-button @click="handleClick">handleClick</el-button>
    <Parser :form-conf="formConf" :values="formValues" @submit="sumbitForm1" />
  </div>
</template>

<script>
import Parser from '../Parser'
import render from '../../render/render.js'
import { formData, formValues } from './mock'
import { formData1 } from './mock1'
import getIn from 'lodash/get'

const c = {
  // 'clearable': true,
  // 'visibility': true,
  // 'editable': true,
  // 'format': 'yyyy-MM-dd',
  // 'typeName': '日期时间',
  // 'value-format': 'yyyy-MM-dd',
  // 'description': '',
  // 'type': 'date',
  // 'readonly': false,
  // 'style': {
  //   width: '254px',
  //   maxWidth: '100%'
  // },
  // 'typeId': 'DATE',
  // 'conditionType': 2,
  // 'placeholder': '请选择实际送货日期',
  config: {
    label: '实际送货日期',
    defaultValueSource: {
      id: '',
      type: 0
    },
    required: true,
    showLabel: true,
    renderKey: 'KknDhEB1678166837506',
    layout: 'colFormItem',
    displayType: true,
    showDefaultValue: true,
    tagIcon: 'date',
    changeTag: true,
    tag: 'el-date-picker',
    defaultValueType: 0,
    span: 6
  },
  vModel: 'fieldKknDhEB1678166837506'
}

export default {
  components: {
    Parser,
    render
  },
  props: {},
  data() {
    console.log('formValues', formValues)
    return {
      c,
      key2: +new Date(),
      isEdit: true,
      formConf: { ...formData1.formConf, fields: formData1.fields, formBtns: true },
      formValues,
      test: { a: { b: { c: 1221 } } }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    // 表单数据回填，模拟异步请求场景
    // setTimeout(() => {
    //   // 请求回来的表单数据
    //   const data = {
    //     mobile: '18836662555'
    //   }
    //   // 回填数据
    //   // this.fillFormData(this.formConf, data)
    //   // 更新表单
    //   this.key2 = +new Date()
    // }, 2000)
  },
  methods: {
    handleClick() {
      console.log('handleClick', this.test.a.b.c)
      this.$set(getIn(this.test, 'a.b'), 'c', '55555')
      console.log('handleClick', this.test.a.b.c)
    },
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
    handleChange() {}
  }
}
</script>

<style lang="scss" scoped>
.test-form {
  margin: 15px auto;
  width: 960px;
  padding: 15px;
}
</style>
