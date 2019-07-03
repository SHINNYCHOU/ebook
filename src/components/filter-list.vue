<template>
  <div>
    <el-input v-model="search" style="width: 300px"
              placeholder="请输入书名" prefix-icon="el-icon-search"/>
    <el-table :data="tableData.filter(data=>!search || data.name.includes(search))"
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
        ></el-table-column>
        <el-table-column
          prop="price"
          label="价格"
          sortable
        ></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'filter-list',
  props: {
    logstate: {
      type: Boolean,
      default: false
    },
    user: {
      type: String,
      default: ''
    }
  },
  created: function () {
    this.loadData()
  },
  methods: {
    handleClick: function (row) {
      this.$router.push({path: '/detail', query: {isbn: row.isbn}})
      /* this.$http.get('/TomcatTest/PageRedirect', {
        params: {
          isbn: row.isbn
        }
      }).then((res) => {
        this.tableData = res.data
        console.log(res)
      }).catch(function (err) {
        alert(err)
      }) */
      /* if (row.isbn === '9787559416735') {
        window.open = 'https://www.baidu.com'
      } else {
        window.location.href = 'https://localhost:8081/servlet_1/TomcatTest/PageRedirect'
      } */
    },
    loadData: function () {
      this.$http.get('http://localhost:8080/book/booklist').then((res) => {
        this.tableData = res.data
        console.log(res)
      }).catch(function (err) {
        alert(err)
      })
    }
  },
  data () {
    return {
      search: '',
      tableData: []
    }
  }
}
</script>

<style scoped>

</style>
