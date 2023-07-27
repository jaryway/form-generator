<template>
  <div>
    <div class="input">
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="searchWord"
        @input="search"
        size="small"
      />
    </div>
    <div class="content" v-loading="loading">
      <div v-if="divisions && divisions.length">
        <div>部门</div>
        <el-tree
          show-checkbox
          check-strictly
          :data="divisions"
          node-key="key"
          ref="divisionTree"
          :props="defaultProps"
          @check="checkNode"
        >
          <div class="custom-tree-node" :class="data.checked ? 'checked' : ''" slot-scope="{ data }">
            <div class="name">
              {{ data.name }}
            </div>
          </div>
        </el-tree>
      </div>

      <div v-if="groups && groups.length">
        <div>分组</div>
        <el-tree
          show-checkbox
          check-strictly
          :data="groups"
          node-key="key"
          ref="groupTree"
          :props="defaultProps"
          @check="checkNode"
        >
          <div class="custom-tree-node" :class="data.checked ? 'checked' : ''" slot-scope="{ data }">
            <div class="name">
              {{ data.name }}
            </div>
          </div>
        </el-tree>
      </div>

      <div v-if="users && users.length">
        <div>人员</div>
        <el-tree
          show-checkbox
          check-strictly
          :data="users"
          node-key="key"
          ref="userTree"
          :props="defaultProps"
          @check="checkNode"
        >
          <div class="custom-tree-node" :class="data.checked ? 'checked' : ''" slot-scope="{ data }">
            <div class="name">
              {{ data.name }}
            </div>
            <div class="dept">
              {{ data.divisionName }}
            </div>
          </div>
        </el-tree>
      </div>
    </div>
  </div>
</template>

<script>
// import { searchUser, searchWindow } from '@/api/organization'
import { Repository } from './utils'
import debounce from 'lodash/debounce'

export default {
  inject: {
    searchUser: {},
    searchWindow: {}
  },
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
    },
    onlyUser: {
      type: Boolean
    }
  },
  data() {
    return {
      repo: new Repository(),
      searchWord: '',
      defaultProps: {
        children: 'children',
        label: 'name',
        disabled: 'disabled',
        isLeaf: 'isLeaf'
      },
      loading: false,
      projectId: '',
      divisions: [],
      groups: [],
      users: []
    }
  },
  mounted() {},
  watch: {
    selectedIds: {
      immediate: true,
      handler(ids) {
        // 当ids发生变化时，重新设置选中项
        if (!ids) return
        this.setCheckedKeys()
      }
    }
  },
  methods: {
    setCheckedKeys() {
      const keys = (this.selectedIds || []).reduce((prev, cur) => {
        return [...prev, ...this.repo.getKeys(cur)]
      }, [])

      ;['divisionTree', 'groupTree', 'userTree'].forEach((key) => {
        this.$refs[key]?.setCheckedKeys?.(keys)
      })
    },
    checkNode(node) {
      const entry = this.repo.getEntry(node.key)
      this.$emit('onManSelected', entry)
    },

    search: debounce(async function () {
      try {
        this.loading = true
        const params = {
          queryValue: this.searchWord,
          limitCount: 100
        }

        const fetchFunc = this.onlyUser ? this.searchUser : this.searchWindow
        const resp = await fetchFunc(params).then((m) => m.data)

        const mapper = (entry) => {
          const key = this.repo.add(entry)
          return { ...entry, key }
        }
        // console.log('safeResp', resp, this.users);
        this.loading = false
        if (this.onlyUser) {
          this.users = (resp || []).map(mapper)
        } else {
          const safeResp = resp || {}
          this.divisions = (safeResp.divisionList || []).map(mapper)
          this.groups = (safeResp.employeeGroupList || []).map(mapper)
          this.users = (safeResp.employeeList || []).map(mapper)
        }

        this.$nextTick(() => {
          this.setCheckedKeys()
        })
      } catch (ex) {
        console.log('safeResp', ex)
        this.loading = false
        throw ex
      }
    }, 500)
  }
}
</script>

<style lang="less" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.checked {
  background-color: #1b62b7;
  color: #fff;
}
</style>
