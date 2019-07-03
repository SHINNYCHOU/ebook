<template>
    <div>
      <div class="login-wrap" v-show="showLogin">
        <h3>登录</h3>
        <p v-show="showTishi">{{tishi}}</p>
        <input type="text" placeholder="请输入用户名" v-model="username">
        <input type="password" placeholder="请输入密码" v-model="password">
        <button v-on:click="login()">登录</button>
        <span v-on:click="ToRegister()">没有账号？马上注册</span>
      </div>
<div class="clear"></div>
      <div class="register-wrap" v-show="showRegister">
        <h3>注册</h3>
        <p v-show="showTishi">{{tishi}}</p>
        <input type="text" placeholder="请输入用户名" v-model="newUsername">
        <input type="text" placeholder="请输入用户邮箱" v-model="newUserMail">
        <input type="password" placeholder="请输入密码" v-model="newPassword">
        <input type="password" placeholder="请验证密码" v-model="newPasswordD">
        <button v-on:click="register()">注册</button>
        <span v-on:click="ToLogin()">已有账号？马上登录</span>
      </div>
    </div>
</template>

<script>
import common from '../components/common'
export default {
  name: 'login',
  created: function () {
    this.loadData()
  },
  methods: {
    loadData: function () {
      this.$http.get('http://localhost:8080/user/get/userlist').then((res) => {
        this.tableData = res.data
        console.log(this.tableData)
      }).catch(function (err) {
        alert(err)
      })
    },
    /* getPassword: function () {
      // 找不到用户id
      for (var i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].name === this.username) {
          if (this.tableData[i].password === this.password && this.checkState) {
            this.logflag = true
            alert('welcome')
            this.$router.push({path: '/home', query: {logflag: this.logflag}})
          } else alert('密码错误')
        }
      }
      alert('不存在用户')
      let that = this
      this.$http.get('http://localhost:8080/user/get/' + this.username).then((res) => {
        that.checkPassword = res.data.password
        that.checkState = res.data.state
        console.log(res.data.password)
      }).catch(function (err) {
        alert(err)
      })
    }, */
    ToRegister: function () {
      this.showRegister = true
      this.showLogin = false
      console.log(this.showLogin)
      console.log(this.showRegister)
    },
    ToLogin () {
      this.showRegister = false
      this.showLogin = true
    },
    register () {
      let that = this
      var url = 'http://localhost:8080/user/add/' + this.newUsername
      if (this.newUsername === '' || this.newPassword === '') {
        alert('请输入用户名或密码')
      } else if (this.newPassword !== this.newPasswordD) {
        alert('请输入相同密码')
      } else {
        // 不存在已有
        for (var i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].name === this.username) {
            alert('已存在该用户')
            return
          }
        }
        if (this.newUserMail.indexOf('@') === -1) {
          alert('邮箱格式不符合')
          return
        }
        // common.setUser(this.username)
        this.$http({
          method: 'post',
          url: url,
          headers: {
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': true
            // 'Content-Type': 'text/plain'
          },
          params: {
            'password': that.newPassword
          }
        })
          .then(response => {
            console.log(response.data)
            console.log('get response')
          })
          .catch(error => {
            JSON.stringify(error)
            console.log(error)
          })
        this.logstate = true
        alert(this.newUsername + ',欢迎您！')
        var userS = {'username': this.newUsername, 'usertype': 0}
        this.$store.commit('login', userS)
        this.$router.push({path: '/home'})
      }
    },
    login () {
      if (this.username === '' || this.password === '') {
        alert('请输入用户名')
      } else {
        // 找不到用户id
        var haveflag = false
        for (var i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].name === this.username) {
            haveflag = true
            if (this.tableData[i].password === this.password && this.tableData[i].state) {
              var t = this.tableData[i].type
              var userS = {'username': this.username, 'usertype': t}
              console.log('log:' + t)
              this.$store.commit('login', userS)
              console.log(this.$store.state.user)
              common.setUser(this.username)
              this.logstate = true
              this.$message({
                type: 'success',
                message: '登陆成功!'
              })
              if (t) {
                this.$router.push({path: '/adminUser'})
              } else {
                this.$router.push({path: '/home'})
              }
            } else if (this.tableData[i].password === this.password && !this.tableData[i].state) {
              alert('用户已禁用')
            } else alert('密码错误')
          }
        }
        if (!haveflag) alert('不存在用户')
      }
    }
  },
  data () {
    return {
      showLogin: true,
      showRegister: false,
      showTishi: false,
      tishi: '',
      username: '',
      password: '',
      newUsername: '',
      newPassword: '',
      newPasswordD: '',
      newUserMail: '',
      logstate: false,
      tableData: [],
      checkPassword: '',
      checkState: ''
    }
  }
}
</script>

<style scoped>
  .login-wrap{text-align:center;}
  .register-wrap{text-align:center;}
  input{display:block; width:250px; height:40px; line-height:40px; margin:0 auto; margin-bottom: 10px; outline:none; border:1px solid #888; padding:10px; box-sizing:border-box;}
  p{color:red;}
  button{display:block; width:250px; height:40px; line-height: 40px; margin:0 auto; border:none; background-color: #01a0b8; color:#fff; font-size:16px; margin-bottom:5px;}
  span{cursor:pointer;}
  span:hover{color: #01a0b8;}
</style>
