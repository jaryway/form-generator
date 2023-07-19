<template>
  <div class="test-form">
    <Parser :form-conf="formConf" :values="formValues" @submit="sumbitForm1" />
  </div>
</template>

<script>
import Parser from '../Parser'
import { formData, formValues } from './mock'

export default {
  components: {
    Parser,
  },
  props: {},
  data() {
    console.log('formValues', formValues)
    return {
      key2: +new Date(),
      isEdit: true,
      formConf: { ...formData.formConf, fields: formData.fields, formBtns: true },
      formValues,
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
      // this.fillFormData(this.formConf, data)
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
