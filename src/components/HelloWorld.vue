<template>
  <div class="hello">
    <div><h1>{{msg}}</h1></div>
  </div>
</template>

<script>
import librarylist from './library_list'
export default {
  name: 'HelloWorld',
  components: {librarylist},
  data () {
    return {
      msg: 'Welcome to e-book!'
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../static/style.css";
</style>
