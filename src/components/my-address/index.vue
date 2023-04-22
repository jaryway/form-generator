<!-- eslint-disable vue/valid-v-model -->
<!-- eslint-disable vue/require-default-prop -->
<template>
  <div>
    <!-- <el-cascader v-bind:vallue v-model="areas" :options="options" :placeholder="placeholder" clearable :disabled="disabled" @change="handleChange" /> -->
    <el-input
      v-model="areas"
      type="text"
      placeholder="请填写"
      maxlength="200"
      :disabled="disabled"
      @input="handleChange"
    />
    <el-input
      v-if="type == 2"
      v-model="addr"
      type="textarea"
      placeholder="请填写详细地址"
      maxlength="200"
      style="margin-top: 10px"
      :disabled="disabled"
      @input="handleChange"
    />
  </div>
</template>

<script>
export default {
  name: 'MyAddress',
  props: {
    value: { areas: { type: String, default: [] }, addr: { type: String } },
  },

  data() {
    console.log('data', this.value)
    return {
      disabled: false,
      type: 2,
      options: [],
      placeholder: '请选择',
      areas: this.value?.areas,
      addr: this.value?.addr,
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(v) {
        console.log('xxxxxx', v)
      },
    },
  },

  mounted() {
    // this.value = { areas: this.value?.areas || '' }
  },

  methods: {
    handleChange() {
      this.$emit('change', { areas: this.areas, addr: this.addr })
    },
  },
}
</script>

<style lang="scss" scoped></style>
