<template>
  <div>
    <top></top>
    <div>
      <p class="title" >购物车</p>
      <!--name,number-->
      <el-table :data="bagData"
                stripe
                style="width: 100%" @selection-change="selected">
        <el-table-column
          type="selection"
          width="50">
        </el-table-column>
        <el-table-column>
          <el-table-column
            prop="book"
            label="书名"
          >
          </el-table-column>
          <el-table-column
            prop="number"
            label="数量"
          >
          </el-table-column>
          <el-table-column
            label="数量"
            width="200">
            <template slot-scope="scope">
              <div>
                <el-input
                  v-model="scope.row.number" @change="handleInput(scope.row)">
                  <el-button slot="prepend" @click="del(scope.row)"><i class="el-icon-minus"></i></el-button>
                  <el-button slot="append" @click="add(scope.row)"><i class="el-icon-plus"></i></el-button>
                </el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="单价"
            width="150"
            prop="price">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">
                删除<i class="el-icon-delete2 el-icon--right"></i>
              </el-button>
              <el-button type="danger" @click="handleBuy(scope.$index, scope.row)">
                购买<i class="el-icon-delete2 el-icon--right"></i>
              </el-button>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
      <br>
      <el-button type="info" style="float: right" @click="handleBuyall()">{{"商品总额：" + moneyTotal}}</el-button>
    </div>
    <foot></foot>
  </div>
</template>

<script>
import foot from '../components/foot'
import top from '../components/top'
import common from '../components/common'
// import qs from 'qs'
export default {
  name: 'bag',
  components: {
    foot, top
  },
  methods: {
    handleBuy (index, row) {
      let that = this
      // var orderId = null
      // var getStore = 0
      var url = 'http://localhost:8080/order/add/' + this.$store.state.user.username
      this.$http({
        method: 'post',
        url: url,
        headers: {
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': true,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: {
          'price': row.price * row.number
        }
      })
        .then(response => {
          var orderId = response.data.id
          console.log(response.data.id)
          console.log('get response')
          var url2 = 'http://localhost:8080/orderDetail/insert/' + orderId
          that.$http({
            method: 'post',
            url: url2,
            headers: {
              'Access-Control-Allow-Credentials': true,
              'Access-Control-Allow-Origin': true,
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            params: {
              'book_isbn': row.book,
              'price': row.price,
              'number': row.number
            }
          })

            .then(response => {
              console.log(response.data)
              // console.log('get response')
            })
            .catch(error => {
              JSON.stringify(error)
              console.log(error)
            })
        })
        .catch(error => {
          JSON.stringify(error)
          console.log(error)
        })
      url = 'http://localhost:8080/book/changeNumber/' + row.book
      this.$http({
        method: 'put',
        url: url,
        headers: {
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': true
        },
        params: {
          'price': row.price,
          'store': -row.number
        }
      })
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          JSON.stringify(error)
          console.log(error)
        })
      url = 'http://localhost:8080/cart/delete'
      this.$http({
        method: 'delete',
        url: url,
        headers: {
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': true
        },
        params: {
          'name': row.name,
          'book': row.book
        }
      })
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          JSON.stringify(error)
          console.log(error)
        })
      alert('成功提交订单')
      this.bagData.splice(index, 1)
      this.$router.push({path: '/order'})
    },
    handleBuyall () {
      var books = null
      var prices = null
      var numbers = null
      for (var i = 0; i < this.multipleSelection.length; i++) {
        if (books != null) {
          books = books + ',' + this.multipleSelection[i].book
        } else {
          books = this.multipleSelection[i].book
        }
        if (prices != null) {
          prices = prices + ',' + this.multipleSelection[i].price
        } else {
          prices = this.multipleSelection[i].price
        }
        if (numbers != null) {
          numbers = numbers + ',' + this.multipleSelection[i].number
        } else {
          numbers = this.multipleSelection[i].number
        }
      }
      console.log(common.user)
      let that = this
      var url = 'http://localhost:8080/order/add/' + this.$store.state.user.username
      var orderId = null
      this.$http({
        method: 'post',
        url: url,
        headers: {
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': true,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: {
          'price': that.moneyTotal
        }
      })
        .then(response => {
          orderId = response.data.id
          console.log('get response')
          console.log(orderId)
          var url2 = 'http://localhost:8080/orderDetail/insertList/' + orderId
          that.$http({
            method: 'post',
            url: url2,
            headers: {
              'Access-Control-Allow-Credentials': true,
              'Access-Control-Allow-Origin': true,
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            params: {
              'book_isbn': books,
              'priceList': prices,
              'numberList': numbers
            }
          })
            .then(response => {
              console.log('get response detail size')
              console.log(response.data)
            })
            .catch(error => {
              JSON.stringify(error)
              console.log(error)
            })
          this.$router.push({path: '/order'})
        })
        .catch(error => {
          JSON.stringify(error)
          console.log(error)
        })
        // 修改库存和购物车
      for (i = 0; i < this.multipleSelection.length; i++) {
        url = 'http://localhost:8080/book/changeNumber/' + this.multipleSelection[i].book
        this.$http({
          method: 'put',
          url: url,
          headers: {
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': true
          },
          params: {
            'price': this.multipleSelection[i].price,
            'store': -this.multipleSelection[i].number
          }
        })
          .then(response => {
            console.log(response.data)
          })
          .catch(error => {
            JSON.stringify(error)
            console.log(error)
          })
        // cart修改
        console.log('before cart')
        url = 'http://localhost:8080/cart/delete'
        this.$http({
          method: 'delete',
          url: url,
          headers: {
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': true
          },
          params: {
            'name': this.multipleSelection[i].name,
            'book': this.multipleSelection[i].book
          }
        })
          .then(response => {
            console.log('enter delete')
            console.log(response.data)
          })
          .catch(error => {
            JSON.stringify(error)
            console.log(error)
          })
      }
      // alert('成功提交订单')
    },
    handleDelete (index, row) {
      this.$confirm('确定删除该商品？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除数组中指定的元素
        var url = 'http://localhost:8080/cart/delete'
        this.$http({
          method: 'delete',
          url: url,
          headers: {
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': true
          },
          params: {
            'name': row.name,
            'book': row.book
          }
        })
          .then(response => {
            console.log(response.data)
          })
          .catch(error => {
            JSON.stringify(error)
            console.log(error)
          })
        this.bagData.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    add: function (addGood) {
      // 输入框输入值变化时会变为字符串格式返回到js
      // 此处要用v-model，实现双向数据绑定
      if (typeof addGood.number === 'string') {
        addGood.number = parseInt(addGood.number)
      };
      addGood.number += 1
      addGood.goodTotal = addGood.number * addGood.price
      this.selected(this.multipleSelection)
    },
    del: function (delGood) {
      if (typeof delGood.number === 'string') {
        delGood.number = parseInt(delGood.number)
      };
      if (delGood.number > 1) {
        delGood.number -= 1
      }
      delGood.goodTotal = delGood.number * delGood.price
      this.selected(this.multipleSelection)
    },
    selected: function (selection) {
      this.multipleSelection = selection
      this.moneyTotal = 0
      // 此处不支持forEach循环，只能用原始方法了
      for (var i = 0; i < selection.length; i++) {
        this.moneyTotal += selection[i].goodTotal
      }
    },
    handleInput: function (value) {
      if (value.number === '') {
        value.number = 1
      }
      value.goodTotal = value.number * value.price// 保留两位小数
      // 增加商品数量也需要重新计算商品总价
      this.selected(this.multipleSelection)
    },
    loadData: function () {
      this.$http.get('http://localhost:8080/cart/list/' + this.$store.state.user.username).then((res) => {
        this.bagData = res.data
        console.log(res.data)
      }).catch(function (err) {
        alert(err)
      })
    }
  },
  mounted: function () {
    this.loadData()
  },
  data () {
    return {
      user: common.user,
      moneyTotal: 0,
      multipleSelection: [],
      // tableData: []
      bagData: [],
      orderId: null
    }
  }
}
</script>

<style scoped>
  @import "../../static/style.css";
</style>
