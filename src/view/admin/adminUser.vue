<template>
    <div>
      <adminTop></adminTop>
      <div>
        <el-table :data=tableData
                  stripe
                  style="width: 100%">
          <el-table-column>
            <!--<template slot="header"  scope="scope" >-->
            <!--<el-input v-model="search" style="width: 300px"-->
            <!--placeholder="请输入书名" prefix-icon="el-icon-search"/>-->
            <!--</template>-->
            <el-table-column
              type="index"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="用户名"
              sortable
            ></el-table-column>
            <el-table-column
              prop="type"
              label="类型"
              sortable
            ></el-table-column>
            <el-table-column
              prop="state"
              label="状态"
              sortable
            ></el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button @click="forbid(scope.row)" type="text" size="small" v-if="scope.row.state&&!scope.row.type">禁用</el-button>
                <el-button @click="release(scope.row)" type="text" size="small" v-if="!scope.row.state&&!scope.row.type">启用</el-button>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
      <foot></foot>
    </div>
</template>

<script>
import foot from '../../components/foot'
import adminTop from '../../components/adminTop'
export default {
  components: {foot, adminTop},
  name: 'adminUser',
  created: function () {
    this.loadData()
  },
  methods: {
    loadData: function () {
      this.$http.get('http://localhost:8080/user/get/userlist').then((res) => {
        this.tableData = res.data
        console.log(res.data)
      }).catch(function (err) {
        alert(err)
      })
    },
    forbid: function (row) {
      var url = 'http://localhost:8080/user/update/' + row.name
      this.$http({
        method: 'post',
        url: url,
        headers: {
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': true
        },
        params: {
          'state': 0
        }
      })
        .then(res => {
          console.log(res.data)
        }).catch(error => {
          JSON.stringify(error)
          console.log(error)
        })
    },
    release: function (row) {
      var url = 'http://localhost:8080/user/update/' + row.name
      this.$http({
        method: 'post',
        url: url,
        headers: {
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': true
        },
        params: {
          'state': 1
        }
      })
        .then(res => {
          console.log(res.data)
        }).catch(error => {
          JSON.stringify(error)
          console.log(error)
        })
    }
  },
  data () {
    return {
      tableData: []
    }
  }
}
</script>

<style scoped>
  @import "../../../static/style.css";
</style>
