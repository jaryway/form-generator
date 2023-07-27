<template>
  <el-tree
    show-checkbox
    check-strictly
    :load="loadNode"
    lazy
    node-key="key"
    ref="tree"
    :props="defaultProps"
    @check="checkNode"
  >
    <div class="custom-tree-node" :class="data.checked ? 'checked' : ''" slot-scope="{ data }">
      <i :class="data.icon"></i>
      <div class="name">
        {{ data.name }}
      </div>
    </div>
  </el-tree>
</template>

<script>
// import { selectWindow } from '@/api/organization'
import { Repository } from './utils'
// import debounce from 'lodash-es/debounce'

export default {
  inject: { selectWindow: {} },
  props: {
    tab: {
      type: String,
      require: ''
    },
    selectedIds: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      repo: new Repository(),
      selected_id: '',
      defaultProps: {
        children: 'children',
        label: 'name',
        disabled: 'disabled',
        isLeaf: 'isLeaf'
      },
      projectId: ''
    }
  },
  mounted() {},
  watch: {
    selectedIds: {
      immediate: true,
      handler(ids) {
        // 当ids发生变化时，重新设置选中项
        if (!ids) return
        const keys = (ids || []).reduce((prev, cur) => {
          return [...prev, ...this.repo.getKeys(cur)]
        }, [])

        // console.log('rest.selectedIds', ids, keys);
        this.$refs['tree']?.setCheckedKeys?.(keys)
      }
    }
  },
  methods: {
    async loadData(id) {
      const type = this.getSelectType()
      this.loading = true
      try {
        const resp = await this.selectWindow({ divisionId: id, projectId: this.projectId, selectType: type })

        const data = (resp?.data || []).map((item) => {
          const selectable = type === item.type
          const key = this.repo.add(item)
          return {
            key,
            disabled: !selectable,
            name: item.name,
            isLeaf: item.type !== 1,
            icon: item.type === 3 ? 'el-icon-user' : 'el-icon-folder'
          }
        })

        this.loading = false
        return data
      } catch (ex) {
        console.log('resp.xxxxx', ex)
        this.loading = false
      }
    },

    getSelectType() {
      if (this.tab === 'DIVISION') return 1
      if (this.tab === 'GROUP') return 2
      if (this.tab === 'USER') return 3
      return ''
    },

    async loadNode(node, resolve) {
      let key = node.data?.key
      if (node.level === 0) {
        key = undefined
      }

      const { id } = this.repo.getEntry(key)
      // console.log('resp.loadNode', id);
      const resp = await this.loadData(id)
      // console.log('resp.loadNode0', resp);
      resolve(resp)
    },
    checkNode(node) {
      const entry = this.repo.getEntry(node.key)
      console.log('resp.checkNode', node, entry)
      this.$emit('onManSelected', entry)
    },
    getCheckedNodes() {
      return this.$refs.tree.getCheckedNodes()
    },
    setCheckedNodes(val) {
      const arr = val.filter((item) => item.type === this.getSelectType())
      this.$refs.tree.setCheckedNodes(arr)
    }
  }
}
</script>

<style lang="less" scoped>
.custom-tree-node {
  padding: 0 16px;
}

.checked {
  background-color: #1b62b7;
  color: #fff;
}
</style>
