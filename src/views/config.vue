<template>
  <el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-row class="config-header-opreate">
          <h4>DEV</h4>
          <el-button size="mini"
                     type="primary"
                     @click="loadDev">刷新</el-button>
          <el-button size="mini"
                     type="primary"
                     @click="addDev">新增</el-button>
        </el-row>
        <el-table stripe
                  border
                  max-height="700"
                  :data="data_dev">
          <el-table-column label="Key"
                           align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.key"
                        size="mini"
                        class="is-required"
                        :autofocus="autofocus_dev && !scope.row.id" />
            </template>
          </el-table-column>
          <el-table-column label="Value"
                           align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.value"
                        size="mini"
                        class="is-required" />
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
                         @click="deleteDevConfig(scope.row.id)">删除</el-button>
              <el-button size="mini"
                         type="success"
                         plain
                         @click="saveDevConfig(scope.row)">保存</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>

      <el-col :span="8">
        <el-row class="config-header-opreate">
          <h4>SITE</h4>
          <el-button size="mini"
                     type="primary"
                     @click="loadSit">刷新</el-button>
          <el-button size="mini"
                     type="primary"
                     @click="addSit">新增</el-button>
        </el-row>
        <el-table stripe
                  border
                  max-height="700"
                  :data="data_sit">
          <el-table-column label="Key"
                           align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.key"
                        size="mini"
                        class="is-required"
                        :autofocus="autofocus_sit && !scope.row.id" />
            </template>
          </el-table-column>
          <el-table-column label="Value"
                           align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.value"
                        size="mini"
                        class="is-required" />
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
                         @click="deleteSitConfig(scope.row.id)">删除</el-button>
              <el-button size="mini"
                         type="success"
                         plain
                         @click="saveSitConfig(scope.row)">保存</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>

      <el-col :span="8">
        <el-row class="config-header-opreate">
          <h4>PROD</h4>
          <el-button size="mini"
                     type="primary"
                     @click="loadProd">刷新</el-button>
          <el-button size="mini"
                     type="primary"
                     @click="addProd">新增</el-button>
        </el-row>
        <el-table stripe
                  border
                  max-height="700"
                  :data="data_prod">
          <el-table-column label="Key"
                           align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.key"
                        size="mini"
                        class="is-required"
                        :autofocus="autofocus_prod && !scope.row.id" />
            </template>
          </el-table-column>
          <el-table-column label="Value"
                           align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.value"
                        size="mini"
                        class="is-required" />
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
                         @click="deleteProdConfig(scope.row.id)">删除</el-button>
              <el-button size="mini"
                         type="success"
                         plain
                         @click="saveProdConfig(scope.row)">保存</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: 'config',

  data () {
    return {
      data_dev: [],
      data_sit: [],
      data_prod: [],
      autofocus_dev: false,
      autofocus_sit: false,
      autofocus_prod: false
    }
  },

  created () {
    this.loadDev()
    this.loadSit()
    this.loadProd()
  },

  methods: {
    // 加载开发配置
    loadDev () {
      this.$http.get('/generate/env/dev').then(res => {
        this.data_dev = res.data
      })
    },

    // 加载测试配置
    loadSit () {
      this.$http.get('/generate/env/sit').then(res => {
        this.data_sit = res.data
      })
    },

    // 加载生产配置
    loadProd () {
      this.$http.get('/generate/env/prod').then(res => {
        this.data_prod = res.data
      })
    },

    // 新增开发配置行
    addDev () {
      let len_sit = this.data_sit.length
      if (!this.data_sit[len_sit - 1].id) {
        this.data_sit.pop()
        this.autofocus_sit = false
      }

      let len_prod = this.data_prod.length
      if (!this.data_prod[len_prod - 1].id) {
        this.data_prod.pop()
        this.autofocus_prod = false
      }

      let len_dev = this.data_dev.length
      if (this.data_dev[len_dev - 1].id) {
        this.data_dev.push({})
        this.autofocus_dev = true
      }
    },

    // 新增测试配置行
    addSit () {
      let len_dev = this.data_dev.length
      if (!this.data_dev[len_dev - 1].id) {
        this.data_dev.pop()
        this.autofocus_dev = false
      }

      let len_prod = this.data_prod.length
      if (!this.data_prod[len_prod - 1].id) {
        this.data_prod.pop()
        this.autofocus_prod = false
      }

      let len_sit = this.data_sit.length
      if (this.data_sit[len_sit - 1].id) {
        this.data_sit.push({})
        this.autofocus_sit = true
      }
    },

    // 新增生产配置行
    addProd () {
      let len_dev = this.data_dev.length
      if (!this.data_dev[len_dev - 1].id) {
        this.data_dev.pop()
        this.autofocus_dev = false
      }

      let len_sit = this.data_sit.length
      if (!this.data_sit[len_sit - 1].id) {
        this.data_sit.pop()
        this.autofocus_sit = false
      }

      let len_prod = this.data_prod.length
      if (this.data_prod[len_prod - 1].id) {
        this.data_prod.push({})
        this.autofocus_prod = true
      }
    },

    // 删除开发配置
    deleteDevConfig (id) {
      this.$http.delete(`/generate/env/${id}`).then(() => {
        this.$message.success('删除成功！')
        this.loadDev()
      })
    },

    // 删除测试配置
    deleteSitConfig (id) {
      this.$http.delete(`/generate/env/${id}`).then(() => {
        this.$message.success('删除成功！')
        this.loadSit()
      })
    },

    // 删除生产配置
    deleteProdConfig (id) {
      this.$http.delete(`/generate/env/${id}`).then(() => {
        this.$message.success('删除成功！')
        this.loadProd()
      })
    },

    // 保存开发配置
    saveDevConfig (row) {
      if (!row.key || !row.value) return this.$alert('请将信息填写完整', '提示')
      let params = {
        ...row,
        type: 'dev'
      }
      if (row.id) { // 修改开发配置
        this.$http.put('/generate/env', params).then(() => {
          this.$message.success('修改成功！')
          this.loadDev()
        })
      } else {  // 新增开发配置
        this.$http.post('/generate/env', params).then(() => {
          this.$message.success('新增成功！')
          this.loadDev()
        })
      }
    },

    // 保存测试配置
    saveSitConfig (row) {
      if (!row.key || !row.value) return this.$alert('请将信息填写完整', '提示')
      let params = {
        ...row,
        type: 'sit'
      }
      if (row.id) { // 修改测试配置
        this.$http.put('/generate/env', params).then(() => {
          this.$message.success('修改成功！')
          this.loadSit()
        })
      } else {  // 新增测试配置
        this.$http.post('/generate/env', params).then(() => {
          this.$message.success('新增成功！')
          this.loadSit()
        })
      }
    },

    // 保存生产配置
    saveProdConfig (row) {
      if (!row.key || !row.value) return this.$alert('请将信息填写完整', '提示')
      let params = {
        ...row,
        type: 'prod'
      }
      if (row.id) { // 修改生产配置
        this.$http.put('/generate/env', params).then(() => {
          this.$message.success('修改成功！')
          this.loadProd()
        })
      } else {  // 新增生产配置
        this.$http.post('/generate/env', params).then(() => {
          this.$message.success('新增成功！')
          this.loadProd()
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.config-header-opreate {
  text-align: right;
  margin-bottom: 12px;

  h4 {
    float: left;
  }
}
</style>style