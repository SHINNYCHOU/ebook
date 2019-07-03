<template>
  <div>
    <div id="guide" style="text-align:center">
      <button class="top" @click="tohome()">首页</button>
      <button class="top" @click="tobrief()">浏览</button>
      <button class="top" @click="tobrief()">查找</button>
      <button class="top" @click="tobrief()">排行</button>
      <button class="top" @click="tobrief()">分类</button>
    </div>
    <div id="top">
        <!--<div id="search">
          <input type="text" name="select" />
          <button type="button" class="normal"> 搜索 </button>
        </div>-->
        <div id="login">
          <router-link to="login"><button type="button" class="normal" v-if="!this.logstate">登陆</button></router-link>
          <button type="button" class="normal" v-if="this.logstate" @click="logoff()">登出</button>
          <button type="button" class="normal" v-if="this.logstate" @click="toorder()">订单中心</button>
          <button type="button" class="normal" @click="tobag()">购物车</button>
        </div>
    </div>
    <div class="clear"></div>
    </div>
</template>

<script>
export default {
  name: 'top',
  data () {
    return {
      showname: this.$store.state.user.usertype,
      user: this.$store.state.user.username,
      logstate: this.$store.state.logstate
    }
  },
  methods: {
    tobag: function () {
      if (this.logstate) this.$router.push({path: '/bag'})
      else {
        alert('请先登录')
        this.$router.push({path: '/login'})
      }
    },
    toorder: function () {
      if (this.logstate) this.$router.push({path: '/order'})
      else {
        alert('请先登录')
        this.$router.push({path: '/login'})
      }
    },
    tohome: function () {
      this.$router.push({path: '/home'})
    },
    tobrief: function () {
      this.$router.push({path: '/brief'})
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
