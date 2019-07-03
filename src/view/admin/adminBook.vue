<template>
    <div>
      <adminTop></adminTop>
      <div>
        <el-input v-model="search" style="width: 300px"
                  placeholder="请输入书名" prefix-icon="el-icon-search"/>
        <el-table :data="tableData.filter(data=>!search || data.name.includes(search))"
                  stripe
                  style="width: 100%">
          <el-table-column>
            <el-table-column
              type="index"
            >
            </el-table-column>
            <el-table-column
              prop="cover"
              label="封面"
            >
              <template slot-scope="scope">
                <img  :src="scope.row.cover" alt="" style="width: 50px;height: 60px">
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="书名"
              sortable
            ></el-table-column>
            <el-table-column
              prop="author"
              label="作者"
              sortable
            ></el-table-column>
            <el-table-column
              prop="language"
              label="语言"
              sortable
            ></el-table-column>
            <el-table-column
              prop="isbn"
              label="ISBN编号"
              sortable
            ></el-table-column>
            <el-table-column
              prop="store"
              label="库存"
              sortable
            >
              <template slot-scope="scope">
                <div>
                  <el-input v-model="scope.row.store"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="price"
              label="价格"
              sortable
            >
              <template slot-scope="scope">
                <div>
                  <el-input v-model="scope.row.price"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="change(scope.row)">提交</el-button>
                <el-button type="text" size="small" @click="deleteone(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
      <div>
          <el-input placeholder="isbn" v-model="inputIsbn" clearable></el-input>
          <el-input placeholder="name" v-model="inputname" clearable></el-input>
          <el-input placeholder="price" v-model="inputprice" clearable></el-input>
          <el-input placeholder="store" v-model="inputstore" clearable></el-input>
          <el-input placeholder="cover url" v-model="inputcover" clearable></el-input>
          <el-input placeholder="author" v-model="inputauthor" clearable></el-input>
          <button class="top" @click="add">提交</button>
      </div>
      <foot></foot>
    </div>
</template>

<script>
import foot from '../../components/foot'
import adminTop from '../../components/adminTop'
export default {
  name: 'adminBook',
  components: {foot, adminTop},
  created: function () {
    this.loadData()
  },
  methods: {
    add: function () {
      var url = 'http://localhost:8080/book/insert/' + this.inputIsbn
      this.$http({
        method: 'post',
        url: url,
        headers: {
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': true
        },
        params: {
          'name': this.inputname,
          'store': this.inputstore,
          'price': this.inputprice,
          'author': this.inputauthor,
          'cover': this.inputcover
        }
      })
        .then(res => {
          console.log(res.data)
          alert('成功增加')
        }).catch(error => {
          JSON.stringify(error)
          console.log(error)
        })
    },
    loadData: function () {
      this.$http.get('http://localhost:8080/book/booklist').then((res) => {
        this.tableData = res.data
        console.log(res)
      }).catch(function (err) {
        alert(err)
      })
    },
    change: function (row) {
      var url = 'http://localhost:8080/book/update/' + row.isbn
      this.$http({
        method: 'post',
        url: url,
        headers: {
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': true
        },
        params: {
          'store': row.store,
          'price': row.price
        }
      })
        .then(res => {
          console.log(res.data)
          alert('成功更新')
        }).catch(error => {
          JSON.stringify(error)
          console.log(error)
        })
    },
    deleteone: function (row) {
      var url = 'http://localhost:8080/book/delete/'
      this.$http({
        method: 'delete',
        url: url,
        headers: {
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': true
        },
        params: {'isbn': row.isbn}
      })
        .then(response => {
          console.log(response.data)
          alert('已删除')
        })
        .catch(error => {
          JSON.stringify(error)
          console.log(error)
        })
    }
  },
  data () {
    return {
      search: '',
      tableData: [],
      showAdd: false,
      inputIsbn: '',
      inputname: '',
      inputstore: '',
      inputauthor: '',
      inputprice: '',
      inputcover: ''
    }
  }
}
</script>

<style scoped>
  @import "../../../static/style.css";
</style>
