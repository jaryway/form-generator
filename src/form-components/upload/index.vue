<template>
  <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" v-bind="$attrs" v-on="$listeners" :on-change="handleChange">
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>
</template>

<script>
export default {
  name: 'FgUpload',
  props: ['type', 'value', 'config', '__slot__'],
  // data() {
  //   console.log('fg-upload', this.$attrs)
  //   return {
  //     fileList: [
  //       { name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
  //       { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
  //     ],
  //   }
  // },
  methods: {
    handleChange() {},
  },
}
</script>

<style lang="scss" scoped></style>
