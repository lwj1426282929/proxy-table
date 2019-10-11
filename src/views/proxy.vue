<template>
  <el-row>
    <el-row class="proxy-header-opreate">
      <el-button size="mini"
                 type="primary"
                 @click="loadData">刷新</el-button>
      <el-button size="mini"
                 type="primary"
                 @click="add">新增</el-button>
    </el-row>

    <el-table stripe
              border
              max-height="750"
              :data="data">
      <el-table-column label="Name"
                       align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.prefix"
                    size="mini"
                    class="is-required"
                    :autofocus="autofocus && !scope.row.id" />
        </template>
      </el-table-column>
      <el-table-column label="Target"
                       align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.target"
                    size="mini"
                    class="is-required" />
        </template>
      </el-table-column>
      <el-table-column label="ChangeOrigin"
                       align="center"
                       width="200">
        <template slot-scope="scope">
          <el-select v-model="scope.row.changeOrigin"
                     size="mini">
            <el-option label="true"
                       :value="true">
            </el-option>
            <el-option label="false"
                       :value="false">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="Xfwd"
                       align="center"
                       width="200">
        <template slot-scope="scope">
          <el-select v-model="scope.row.xfwd"
                     size="mini">
            <el-option label="true"
                       :value="true">
            </el-option>
            <el-option label="false"
                       :value="false">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="AutoRewrite"
                       align="center"
                       width="200">
        <template slot-scope="scope">
          <el-select v-model="scope.row.autoRewrite"
                     size="mini">
            <el-option label="true"
                       :value="true">
            </el-option>
            <el-option label="false"
                       :value="false">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="Secure"
                       align="center"
                       width="200">
        <template slot-scope="scope">
          <el-select v-model="scope.row.secure"
                     size="mini">
            <el-option label="true"
                       :value="true">
            </el-option>
            <el-option label="false"
                       :value="false">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="Opreate"
                       align="center"
                       width="200">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="danger"
                     plain
                     :disabled="!scope.row.id"
                     @click="deleteProxy(scope.row.id)">删除</el-button>
          <el-button size="mini"
                     type="success"
                     plain
                     @click="saveProxy(scope.row)">保存</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script>

export default {
  name: 'proxy',

  data () {
    return {
      data: [],
      autofocus: false
    }
  },

  created () {
    this.loadData()
  },

  methods: {
    // 查询
    loadData () {
      this.$http('/generate/proxy/address').then(res => {
        let { data } = res
        this.data = data
      })
    },

    // 点击新增
    add () {
      let len = this.data.length
      if (this.data[len - 1].id) {
        this.data.push({})
        this.autofocus = true
      }
    },

    // 保存代理
    saveProxy (row) {
      if (row.prefix && row.target) {
        if (row.id) { // 修改代理
          this.$http.put('/generate/proxy/address', row).then(() => {
            this.$message.success('修改成功！')
            this.loadData()
          })
        } else {  // 新增代理
          this.$http.post('/generate/proxy/address', row).then(() => {
            this.$message.success('新增成功！')
            this.loadData()
          })
        }
      } else {
        this.$alert('请将信息填写完整', '提示')
      }
    },

    // 删除代理
    deleteProxy (id) {
      this.$http.delete(`/generate/proxy/address/${id}`, { params: { id } }).then(() => {
        this.$message.success('删除成功！')
        this.loadData()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.proxy-header-opreate {
  position: absolute;
  right: 0;
  top: -40px;
}
</style>