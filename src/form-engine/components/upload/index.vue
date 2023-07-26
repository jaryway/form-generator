<template>
  <el-upload class="upload-demo" v-bind="$attrs" v-on="$listeners" :file-list="fileList" :action="action" :before-upload="handleBeforeUpload" :on-remove="onRemove" :show-file-list="true" :on-success="onSuccess" :on-error="handleError" :on-progress="onProgress" :http-request="httpRequest" :on-change="onChange" :limit="limit" multiple="">
    <el-button v-if="!$attrs.drag" size="small" type="primary">点击上传</el-button>
    <div v-else>
      <i class="el-icon-picture">{{ desc }}</i>
    </div>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>
</template>

<script>
export default {
  name: 'FgUpload',
  props: ['typeId', 'value', 'config', '__slot__'],
  mounted() {
    console.log('FgUpload.mounted', this)
  },
  inject: {
    uploadFile: {},
  },
  computed: {
    desc() {
      const s = this.typeId === 'UPLOAD-FILE' ? '文件' : '图片'
      const s1 = this.typeId === 'UPLOAD-FILE' ? '张' : '个'
      const { expand } = this.$attrs

      console.log('fg-upload.expand', expand)

      return `选择或拖拽上传${s}，单${s1}${expand.fileSize || '200'}${expand.sizeUnit || 'kb'}以内`
    },
    limit() {
      const { setting, expand } = this.$attrs
      let limit = expand.limit
      if (setting?.onlyOne) {
        limit = 1
      }

      return limit
    },
    multiple() {
      return false
    },
  },
  data() {
    return {
      action: `http://183.236.225.195:9800/enterprise-api/assist/oss/upload/image`,
      fileList: [],
    }
  },

  watch: {
    value: {
      immediate: true,
      handler(val) {
        // console.log('this.fileList', this.fileList, val)
        // value 只保存 id ,name
        if (this.fileList.length !== (val || []).length) {
          this.fileList = val.map((m) => ({ id: m.id, name: m.name, url: this.getFileUrl(m.id) }))
        }

        // if (this.fileList.length) {
        //   this.fileList = this.fileList.filter((m) => val.some((n) => n.id === m.id))
        // } else {
        //   this.fileList = val
        // }
      },
    },
  },

  methods: {
    handleBeforeUpload(file) {
      const { expand } = this.$attrs
      let sizeUnitNum = 1
      // 文件大小判断
      switch (expand.sizeUnit) {
        case 'KB':
          sizeUnitNum = 1024
          break
        case 'MB':
          sizeUnitNum = 1024 * 1024
          break
        case 'GB':
          sizeUnitNum = 1024 * 1024 * 1024
          break
      }
      const totalSize = expand.fileSize * sizeUnitNum
      if (file.size > totalSize) {
        this.$message.error(`上传文件大小不能超过${expand.fileSize}${expand.sizeUnit}`)
        return false
      }
    },
    async httpRequest(params, ...args) {
      // console.log('fg-upload.handleUpload', params, args)
      const file = params.file
      const formData = new FormData()
      formData.append('file', file)
      const res = await this.uploadFile(formData)

      this.fileList.push({
        ...params.file,
        name: res.originFileName,
        id: res.id, // res.id,
        url: this.getFileUrl(res.id),
      })

      const changeValue = this.fileList.map((m) => ({ id: m.id, name: m.name }))

      this.$emit('input', changeValue)
    },
    onSuccess(response, file, fileList) {},
    handleError(err, file, fileList) {
      console.log('----onError----', err)
      // this.loading = false
    },
    onProgress(event, file, fileList) {
      // console.log('----onProgress----', event, file, fileList)
    },
    onChange(file, fileList) {
      // console.log('----onChange----', file, fileList)
    },
    onRemove(file, fileList) {
      this.fileList = fileList
      const changeValue = fileList.map((m) => ({ id: m.id, name: m.name }))
      this.$emit('input', changeValue)
      // console.log(file, fileList)
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep .el-upload-dragger {
  height: auto;
}
</style>
