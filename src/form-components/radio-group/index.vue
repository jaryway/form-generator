<template>
  <el-radio-group
    v-model="model"
    v-bind="$attrs"
    v-on="$listeners"
    @input="handleInput"
    class="radio-group"
    :class="'radio-group-' + direction"
  >
    <el-radio v-for="(item, key) in options" :key="key" :label="item.label" />

    <label
      class="el-radio radio-other"
      v-for="(item, key) in this.otherOptions"
      :key="'other' + key"
      style="display: flex; align-items: center"
    >
      <el-radio :label="other" style="margin-right: 8px; margin-bottom: 0">
        {{ item.label }}
      </el-radio>
      <el-input size="mini" v-if="showOther" :value="model" @input="handleInput" />
    </label>
  </el-radio-group>
</template>

<script>
const isValid = (s) => s !== null && s !== undefined && s !== ''
export default {
  name: 'FgRadioGroup',
  props: ['value', 'config', '__slot__'],
  data() {
    return {
      other: null,
      showOther: false
    }
  },
  computed: {
    model: {
      get() {
        return this.value || ''
      },
      set(value) {
        this.$emit('input', value)
      }
    },
    direction() {
      return this.config.direction || 'horizontal'
    },
    options() {
      return (this.__slot__.options || []).filter((m) => !m.isOther)
    },
    otherOptions() {
      return (this.__slot__.options || []).filter((m) => m.isOther)
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        // console.log('handleInput.watch', { kkk: this.other })
        if (isValid(val)) {
          const checked = this.options.some((m) => m.label === val)
          // 优先判断正常的选项，如果正常选项被选中，则不显示“其他”输入框
          this.showOther = !checked
          this.other = checked ? '' : val
        }
      }
    }
  },
  methods: {
    handleInput(v) {
      const val = v || ''
      // 这里是用户行为，
      // 此时如果val是空，则是用户选中了“其他”选项
      // 此时要显示“其他”输入框
      if (val === '') {
        this.other = ''
        this.showOther = true
      }

      this.$emit('input', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.radio-group {
  display: flex;
  flex: auto;
  justify-content: start;
  align-items: center;
}

::v-deep .el-radio {
  line-height: 36px;
}

.radio-group-horizontal {
  flex-direction: row;
}

.radio-group-vertival {
  flex-direction: column;
  align-items: start;
}
</style>
