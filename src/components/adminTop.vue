<template>
  <div>
    <div id="guide" style="text-align:center">
      <button class="top" @click="toUser()">用户管理</button>
      <button class="top" @click="toOrder()">订单处理</button>
      <button class="top" @click="toBook()">库存管理</button>
    </div>
    <div id="top">
      <!--<div id="search">
        <input type="text" name="select" />
        <button type="button" class="normal"> 搜索 </button>
      </div>-->
      <div id="login">
        <router-link to="login"><button type="button" class="normal" v-if="!this.logstate">登陆</button></router-link>
        <button type="button" class="normal" v-if="this.logstate" @click="logoff()">{{this.user}},登出</button>
      </div>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
export default {
  name: 'adminTop',
  data () {
    return {
      showname: this.$store.state.user.usertype,
      user: this.$store.state.user.username,
      logstate: this.$store.state.logstate
    }
  },
  methods: {
    toUser: function () {
      if (this.logstate) this.$router.push({path: '/adminUser'})
      else {
        alert('请先登录')
        this.$router.push({path: '/login'})
      }
    },
    toOrder: function () {
      if (this.logstate) this.$router.push({path: '/adminOrder'})
      else {
        alert('请先登录')
        this.$router.push({path: '/login'})
      }
    },
    toBook: function () {
      this.$router.push({path: '/adminBook'})
    },
    logoff: function () {
      this.$store.commit('logout')
      this.logstate = false
    }
  }
}
</script>

<style scoped>
  @import "../../static/style.css";
</style>
