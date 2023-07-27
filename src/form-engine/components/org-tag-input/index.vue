<template>
  <div class="org-tag-input" :class="{ multiple: multiple, disabled }" @click="handleClick">
    <div v-if="selecteds.length < 1" class="text-box">{{ placeholder }}</div>
    <div v-else class="tags">
      <el-tag
        v-bind="getTagConfig()"
        class="org-tag"
        v-for="item in selecteds"
        :key="item.id"
        @close.stop="removeItem(item)"
        :closable="!disabled"
      >
        {{ item.name }}
      </el-tag>
    </div>
    <org-picker
      ref="organization"
      @confirm="onSelected"
      :title="title"
      :selectedList="selecteds"
      :multiple="multiple"
      :type="type"
      :visible.sync="show"
    />
  </div>
</template>
<script>
import emitter from 'element-ui/lib/mixins/emitter'
import OrgPicker from '../org-picker'

const typeLabel = {
  DIVISION: '部门',
  GROUP: '分组',
  USER: '成员'
}

export default {
  name: 'FgOrgTagInput',
  mixins: [emitter],
  model: {
    prop: 'value',
    event: 'change'
  },
  components: {
    OrgPicker
  },
  props: {
    value: {
      validator: function (value) {
        // console.log('validatorvalidatorvalidator',value);
        if (!value) return true
        return Array.isArray(value)
      }
    },
    type: {
      type: Array,
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return Array.isArray(value) && value.every((m) => ['DIVISION', 'GROUP', 'USER'].includes(m))
      },
      default: () => {
        return ['USER']
      }
    },
    selectedList: {
      type: Array,
      default: () => {
        return []
      }
    },
    title: {
      type: String,
      default: '请选择'
    },
    multiple: {
      type: Boolean,
      default: true
    },
    disabled: Boolean,
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    // console.log('fgFormParser.dept.data', this)
    return {
      show: false
      // selecteds: [],
    }
  },
  computed: {
    placeholder() {
      const label = this.type.map((t) => typeLabel[t]).join('、')
      return `选择${label}`
    },
    selecteds: {
      get() {
        return this.value || []
      },
      set(v) {
        this.value = v
      }
    }
  },
  methods: {
    handleClick() {
      // console.log('fgFormParser', this.disabled, this.isEdit);
      if (this.disabled) return
      this.show = true
    },
    removeItem(item) {
      this.selecteds = this.selecteds.filter((m) => m.id !== item.id)
      this.emitEvent(this.selecteds)
    },

    onSelected(selecteds) {
      this.show = false
      this.emitEvent(selecteds)
    },
    emitEvent(selecteds) {
      console.log('emitEvent', selecteds)
      this.$emit('change', selecteds)
      this.dispatch('ElFormItem', 'el.form.change', [selecteds])
      // this.$emit("input", selecteds);
    },
    getTagConfig() {
      return {
        // type: "info",
        'closable': true,
        'disable-transitions': false,
        'hit': false,
        'color': undefined,
        'size': 'small',
        'effect': 'light'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.org-tag-input {
  overflow-x: hidden;
  overflow-y: hidden;
  border: 1px dashed #d7d9dc;
  cursor: pointer;
  min-height: 32px;
  position: relative;
  min-width: 160px;
  &.disabled {
    background-color: #f5f7fa;
    border-color: #e4e7ed;
    // color: #C0C4CC;
    cursor: not-allowed;
  }
}

// .multiple {
//   // min-height: 68px;
// }

.text-box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.tags {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  .input-box.as-input {
    border: 1px solid #dcdfe6;
    padding-left: 6px;
    font-size: 12px;
    min-height: 32px;
    line-height: 30px;
    border-radius: 4px;
    background: white;
    color: #606266;
    cursor: pointer;
  }

  .org-tag {
    margin-right: 6px;
    // max-width: 6rem;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    padding-right: 1rem;
    vertical-align: middle;

    >>> .el-tag__close {
      position: absolute;
      right: 2px;
      top: 50%;
      margin-top: -7px;
    }
  }
}
</style>
