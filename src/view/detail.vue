<template>
  <div>
    <top></top>
    <!--<div v-for="item in bookData" :key="item.isbn">-->
    <div>
      <div class="detail_title">
        <p class="title" >{{name}}</p>
      </div>
      <div class="detail_main">
        <div class="detail_cover">
          <img  class="cover" :src="cover" alt="" ><!--150*140px-->
        </div>
        <div class="detail_info">
          <p class="content" > <span style="font-weight: bold">ISBN:</span>{{isbn}}<br/></p>
          <p class="content" > <span style="font-weight: bold">作者：</span>{{author}}<br/></p>
          <p class="content" ><span style="font-weight: bold">语种：</span>{{language}}<br/></p>
          <p class="content" ><span style="font-weight: bold">库存:</span>{{store}}<br/></p>
          <p class="content" ><span style="font-weight: bold">单价:</span>{{price}}<br/></p>
        </div>
        <div class="detail_right"><!--购物车-->
          <br/>
          <br/>
          数量:
          <input type="text" name="add_number" placeholder="请输入数字" v-model="addnum"><br/>
          <button type="button" class="top" @click="addtobag (name,addnum,store,logstate,user)"> 加入购物车 </button>
          <button type="button" class="top"> 直接购买 </button>
        </div>
    </div>
    </div>
    <comment :isbn=this.$route.query.isbn></comment>
    <foot></foot>
  </div>
</template>

<script>
import foot from '../components/foot'
import top from '../components/top'
import comment from '../components/comment'
export default {
  name: 'detail',
  components: {foot, top, comment
  },
  data () {
    return {
      addnum: 0,
      name: '北欧众神',
      author: '尼尔•盖曼',
      language: '简体中文',
      isbn: 9787559416735,
      store: 1,
      price: 9.9,
      cover: '../../static/photos/北欧众神.jpg',
      user: '',
      logstate: ''
    }
  },
  watch: {
    '$route': {
      handler (route) {
        const that = this
        if (route.name === 'Report') {
          that.match()
        }
      },
      deep: true
    }
  },
  created: function () {
    this.match()
  },
  methods: {
    addtobag (book, addnum, store, log, user) {
      if (addnum > store || isNaN(addnum)) {
        alert('加入数目超过库存')
      } else {
        var url = 'http://localhost:8080/cart/insert/'
        this.$http({
          method: 'post',
          url: url,
          headers: {
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': true,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          params: {
            'uid': this.$store.state.user.username,
            'book': this.isbn,
            'price': this.price,
            'number': addnum
          }
        })
          .then(response => {
            console.log('get response addToBag')
            console.log(response.data)
            this.$router.push({path: '/bag'})
            alert('成功添加到购物车')
          })
          .catch(error => {
            JSON.stringify(error)
            console.log(error)
          })
      }
    },
    match () {
      let that = this
      this.user = this.$store.state.user.username
      this.logstate = this.$store.state.logstate
      var url = 'http://localhost:8080/book/get/' + this.$route.query.isbn
      this.$http.get(url, {
        headers: {
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': true
        }
      })
        .then(res => {
          console.log(res.data)
          // console.log(this)
          that.store = res.data.store
          that.price = res.data.price
          that.name = res.data.name
          that.author = res.data.author
          that.language = res.data.language
          that.isbn = res.data.isbn
          that.cover = res.data.cover
          console.log(res.data.store)
          // console.log(that.isbn)
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
