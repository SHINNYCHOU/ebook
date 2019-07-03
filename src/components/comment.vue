<template>
<div>
  <div class="comment" v-for=" item in tableData.comments" :key="item">
    <div class="info" >
      <div class="name">{{item.user}}</div>
      <div class="date">{{item.time}}</div>
    </div>
    <div class="clear"></div>
    <div class="content">{{item.content}}</div>
    <div class="clear"></div>
    <div class="control">
      <span class="comment-reply" @click="showCommentInput(item)">
        <i class="iconfont icon-comment"></i>
        <span>回复</span>
      </span>
    </div>
    <div class="clear"></div>
    <div class="reply">
      <div class="item" v-for="children in item.children" :key="children">
        <div class="reply-content">
          <div class="name">{{children.user}}</div><span>: </span>
          <div class="to-name">@{{children.father}}</div>
          <div class="date">{{children.time}}</div>
          <div class="clear"></div>
          <span class="content">{{children.content}}</span>
        </div>
        <div class="clear"></div>
        <div class="comment-reply">
          <span class="reply-text" @click="showCommentInput(item, children)">
            <i class="iconfont icon-comment"></i>
            <span>回复</span>
          </span>
        </div>
      </div>
      <div class="clear"></div>
      <div class="write-reply" v-if="item.children.length < 0" @click="showCommentInput(item)">
        <i class="el-icon-edit"></i>
        <span class="add-comment">添加新评论</span>
      </div>
      <div class="input-wrapper" v-if="showItemId === item.id">
        <el-input class="gray-bg-input"
                  v-model="inputComment"
                  type="textarea"
                  :rows="3"
                  autofocus
                  placeholder="写下你的评论">
        </el-input>
        <div class="btn-control">
          <span class="cancel" @click="cancel">取消</span>
          <el-button class="btn" type="success" round @click="commitComment(item)">确定</el-button>
        </div>
      </div>
    </div>
  </div>
  <div class="comment">
    <div class="reply">
      <div class="write-reply" @click="showCommentInput()">
        <i class="el-icon-edit"></i>
        <span class="add-comment">添加新评论</span>
      </div>
      <transition name="fade">
        <div class="input-wrapper" v-if="clicked">
          <el-input class="gray-bg-input"
                    v-model="inputComment"
                    type="textarea"
                    :rows="3"
                    autofocus
                    placeholder="写下你的评论">
          </el-input>
          <div class="btn-control">
            <span class="cancel" @click="cancel">取消</span>
            <el-button class="btn" type="success" round @click="commitComment()">确定</el-button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'comment',
  props: {
    isbn: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      tableData: [],
      inputComment: '',
      showItemId: '',
      clicked: false
    }
  },
  created () {
    this.load()
  },
  methods: {
    cancel () {
      this.showItemId = ''
      this.clicked = false
    },
    /**
     * 提交评论
     */
    /* eslint-disable */
    commitComment (item) {
      var commentId
      if (this.$store.state.user.username === '') {
        this.$message({
          type: 'error',
          message: '请先登录！'
        })
        return
      } else if (item) {
        commentId = item.id
      } else {
        commentId = ''
      }
      var url = 'http://localhost:8080/comment/post/' + this.isbn
      var self = this
      var obj = {
        "father": commentId,
        "user": this.$store.state.user.username,
        "content": this.inputComment
      }
      console.log(obj);
      this.$http({
        url: url,
        method: 'post',
        headers: {
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': true,
          'Content-Type': 'application/json'
        },
        //dataType : 'json',
        params: {
          "father": commentId,
          "user": this.$store.state.user.username,
          "content": this.inputComment
        }
        //data: obj
        //data: JSON.stringify(obj)
      }).then((response) => {
        if (response.data.code === 0) {
          self.tableData = response.data.comments
          self.cancel()
        } else {
          this.$message({
            type: 'error',
            message: response.data.message
          })
        }
      }).catch(error => {
        JSON.stringify(error)
        console.log(error)
      })
    },
    showCommentInput (item, reply) {
      if (reply) {
        this.inputComment = '@' + reply.user + ' '
      } else if (item) {
        this.inputComment = ''
      } else {
        this.clicked = true
      }
      this.showItemId = item.id
    },
    load () {
      console.log('isbn:')
      console.log(this.isbn)
      var url = 'http://localhost:8080/comment/get/' + this.isbn
      this.$http.get(url, {
        headers: {
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': true
        }
      }).then((res) => {
        this.tableData = res.data
        console.log(res)
      }).catch(function (err) {
        alert(err)
      })
    }
  }
}
</script>

<style scoped>
  @import "../../static/style.css";
</style>
