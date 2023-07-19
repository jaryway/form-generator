<template>
  <div class="fg-address">
    <el-cascader
      v-model="val"
      :options="options"
      :props="props"
      :placeholder="placeholder"
      clearable
      @change="handleChange"
      :disabled="disabled"
    />

    <el-input
      type="textarea"
      placeholder="请填写详细地址"
      v-model="addr"
      maxlength="200"
      v-if="type == 2"
      style="margin-top: 10px"
      :disabled="disabled"
      @change="handleAddrChange"
    />
  </div>
</template>

<script>
import city from './level.min.json'
export default {
  name: 'FgAddress',
  props: ['type', 'value', 'config', '__slot__', 'disabled', 'placeholder'],
  data() {
    console.log('FgAddress', this.value)
    return {
      // value: this.value,
      options: city,
      props: {
        label: 'n',
        value: 'n',
        children: 'd'
      },
      val: '',
      addr: ''
    }
  },

  watch: {
    value: {
      immediate: true,
      handler(val) {
        // console.log('ProvinceCity',val);
        if (val) {
          if (this.type === 2) {
            this.val = val.slice(0, -1)
            this.addr = val.at(-1)
          } else {
            this.val = val
            this.addr = undefined
          }
        }
      }
    }
  },

  methods: {
    handleChange(val) {
      if (this.type === 2) {
        this.$emit('input', [...val, this.addr])
      } else {
        this.$emit('input', val)
      }
    },
    handleAddrChange(val) {
      this.$emit('input', [...this.val, val])
    }
  }
}
</script>

<style lang="scss" scoped></style>
