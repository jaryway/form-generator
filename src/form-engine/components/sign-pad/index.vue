<template>
  <div id="signature-pad" class="signature-pad">
    <div class="signature-pad--body">
      <canvas class="canvasId" style="border: 2px dashed #f7f7f7" />
      <img v-if="signImageUrl" :src="signImageUrl" class="img-box" />
    </div>
    <div class="desc-text" v-if="!disabled">请在上面区域完成签名 然后点击确"确认"按钮</div>
    <div v-if="!signImageUrl && !disabled">
      <el-button plain size="mini" type="danger" @click="clear" :disabled="disabled">清除</el-button>
      <el-button plain size="mini" type="warning" @click="undo" :disabled="disabled">回撤</el-button>
      <el-button size="mini" type="success" @click="savePng" :disabled="disabled">确认</el-button>
    </div>
    <div v-if="signImageUrl && !disabled">
      <el-button size="mini" type="primary" @click="reSign">重签</el-button>
    </div>
  </div>
</template>

<script>
import SignaturePad from 'signature_pad'

export default {
  name: 'FgSignPad',
  props: ['value', 'config', '__slot__', 'color', 'action', 'disabled'],
  data() {
    return {
      signaturePad: null,
      canvas: null,
      signImageUrl: null,
      selfConfig: {
        minWidth: 1,
        maxWidth: 3,
        penColor: this.color
      }
    }
  },
  inject: {
    uploadFile: {
      default: async () => {
        return Promise.resolve()
      }
    },
    getFileUrl: {
      default: (id) => {
        return id
      }
    }
  },

  watch: {
    value: {
      handler(val) {
        this.signImageUrl = val ? this.getFileUrl(val) : null
        if (!val) this.clear()
      },
      immediate: true
    },
    disabled: {
      handler(val) {
        if (!this.signaturePad) return
        if (val) {
          this.signaturePad.off()
        } else {
          this.signaturePad.on()
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.init()
    window.onresize = () => {
      return (() => {
        this.resizeCanvas()
      })()
    }
    this.resizeCanvas()
  },
  methods: {
    resizeCanvas() {
      // console.log('resizeCanvas'+this.color)
      const canvas = this.canvas
      // When zoomed out to less than 100%, for some very strange reason,
      // some browsers report devicePixelRatio as less than 1
      // and only part of the canvas is cleared then.
      const ratio = Math.max(window.devicePixelRatio || 1, 1)
      // This part causes the canvas to be cleared
      canvas.width = canvas.offsetWidth * ratio
      canvas.height = canvas.offsetHeight * ratio
      canvas.getContext('2d').scale(ratio, ratio)

      // This library does not listen for canvas changes, so after the canvas is automatically
      // cleared by the browser, SignaturePad#isEmpty might still return false, even though the
      // canvas looks empty, because the internal data of this library wasn't cleared. To make sure
      // that the state of this library is consistent with visual state of the canvas, you
      // have to clear it manually.
      this.signaturePad.clear()
    },
    init() {
      this.canvas = document.querySelector('.canvasId')
      const canvas = this.canvas
      this.signaturePad = new SignaturePad(canvas, this.config)
      // canvas.height = 300
      // canvas.width = 500
    },
    clear() {
      this.signaturePad && this.signaturePad.clear()
    },
    undo() {
      const data = this.signaturePad.toData()
      if (data) {
        data.pop() // remove the last dot or line
        this.signaturePad.fromData(data)
      }
    },
    async savePng() {
      if (this.signaturePad.isEmpty()) {
        this.$modal.msgError('请先填写签名')
        return
      }
      const data = this.signaturePad.toDataURL('image/png')
      const file = this.dataURLtoFile(data, `${new Date().getTime()}.png`)
      const params = new FormData() // 创建form对象
      params.append('file', file) // 通过append向form对象添加数据

      const { id } = await this.uploadFile(params)
      this.signImageUrl = this.getFileUrl(id)
      this.$emit('input', id)
    },
    reSign() {
      this.signImageUrl = ''
      this.signaturePad.clear()
    },
    dataURLtoFile(dataurl, filename) {
      // 获取到base64编码
      const arr = dataurl.split(',')
      // 将base64编码转为字符串
      const bstr = window.atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n) // 创建初始化为0的，包含length个元素的无符号整型数组
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename, {
        type: 'image/png'
      })
    }
  }
}
</script>

<style scoped>
@import './index.css';
.sign-pad-container {
  padding: 1px;
}

.signature-pad--body {
  width: 100%;
  min-height: 300px;
  position: relative;
}
.img-box {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}
.desc-text {
  color: #a6a9ad;
}
</style>
