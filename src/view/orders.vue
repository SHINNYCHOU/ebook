<template>
    <div>
      <top></top>
      <div><p class="title">订单中心</p></div>
      <div>
        <el-input v-model="search" style="width: 300px"
                  placeholder="请输入时间" prefix-icon="el-icon-search"/>
        <el-table :data="tableData.filter(data=>!search || data.time.includes(search))"
                  stripe
                  style="width: 100%">
          <el-table-column>
            <el-table-column
              type="index"
            >
            </el-table-column>
            <el-table-column
              prop="id"
              label="订单号"
            >
            </el-table-column>
            <el-table-column
              prop="buyerId"
              label="买家"
              sortable
            ></el-table-column>
            <el-table-column
              prop="price"
              label="总价"
              sortable
            ></el-table-column>
            <el-table-column
              prop="state"
              label="状态"
              sortable
            ></el-table-column>
            <el-table-column
              prop="time"
              label="交易时间"
              width="300"
            ></el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="40">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="showDetail">
        <el-table :data="detailData"
                  stripe
                  style="width: 100%">
          <el-table-column>
            <el-table-column
            prop="orderId"
            lable="订单号">
            </el-table-column>
            <el-table-column
              prop="book_isbn"
              lable="书isbn">
            </el-table-column>
            <el-table-column
              prop="number"
              lable="数量">
            </el-table-column>
            <el-table-column
              prop="price"
              lable="价格">
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
      <foot></foot>
    </div>
</template>

<script>
import foot from '../components/foot'
import top from '../components/top'
export default {
  name: 'orders',
  components: {foot, top},
  data () {
    return {
      search: '',
      tableData: [],
      detailData: [],
      showDetail: false
    }
  },
  mounted: function () {
    this.loadData()
  },
  methods: {
    handleClick: function (row) {
      var that = this
      var url = 'http://localhost:8080/orderDetail/' + row.id
      this.$http.get(url, {
        headers: {
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': true
        }
      })
        .then(res => {
          that.detailData = res.data
          that.showDetail = true
          console.log(res.data)
          console.log(that.showDetail)
        }).catch(error => {
          JSON.stringify(error)
          console.log(error)
        })
    },
    loadData: function () {
      var url = 'http://localhost:8080/order/list/' + this.$store.state.user.username
      this.$http.get(url, {
        headers: {
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': true
        }
      })
        .then(res => {
          this.tableData = res.data
          console.log(res.data)
          for (var i = 0; i < this.tableData.length; i++) {
            var d = new Date(this.tableData[i].time)
            this.tableData[i].time = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
          }
        }).catch(error => {
          JSON.stringify(error)
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
  @import "../../static/style.css";
</style>
