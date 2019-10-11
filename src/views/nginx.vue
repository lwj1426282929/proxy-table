<template>
  <el-row>
    <el-form inline
             size="mini"
             class="nginx-header-opreate"
             label-width="80px">
      <el-form-item label="IP">
        <el-input v-model="form.ip"
                  :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="端口">
        <el-select v-model="form.port"
                   @change="loadData">
          <el-option v-for="item in form.ports"
                     :key="item"
                     :label="item"
                     :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-button size="mini"
                 type="primary"
                 @click="loadData">刷新</el-button>
      <el-button size="mini"
                 type="primary"
                 @click="save">保存</el-button>
    </el-form>

    <el-row>
      <codemirror v-model="config_nginx"
                  :options="cmOption"></codemirror>
    </el-row>
  </el-row>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/mode/nginx/nginx'
import 'codemirror/addon/hint/show-hint'
import 'codemirror/addon/selection/active-line'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/darcula.css'
import 'codemirror/addon/hint/show-hint.css'

export default {
  name: 'codemirrorDemo',

  components: {
    codemirror
  },

  data () {
    return {
      form: {
        ip: 'http://10.1.190.225',
        port: '',
        ports: [80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019, 1020, 1021, 1022, 1023, 1024, 1025, 1026, 1027, 1028, 1029, 1030],
      },
      config_nginx: '',
      cmOption: {
        theme: 'darcula',
        mode: 'text/x-nginx-conf',
        styleActiveLine: true,
        lineNumbers: true,
        lineWrapping: true,
        line: true,
        foldGutter: true,
        matchBrackets: true,
        autoCloseBrackets: true
      }
    }
  },

  created () {
    this.form.port = this.form.ports[0]
    this.loadData()
  },

  methods: {
    // 查询
    loadData () {
      this.$http.get(`/server/nginx/port/${this.form.port}`).then(res => {
        this.config_nginx = res.data
      })
    },

    // 保存
    save () {
      this.$http.put(`/server/nginx/port/${this.form.port}`, {
        port: this.form.port,
        configStr: this.config_nginx
      }).then(() => {
        this.$message.success('保存成功！')
        this.loadData()
      })
    }
  }
}
</script>

<style lang="less">
.nginx-header-opreate {
  position: absolute;
  right: 0;
  top: -40px;
}
.CodeMirror {
  height: calc(100vh - 200px);
}
</style>