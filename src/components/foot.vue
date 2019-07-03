<template>
  <div class="foot">
    <p class="pageft" >{{message1}} </p>
  </div>
</template>

<script>  /* eslint-disable */
  export default {
    name: 'foot',
    data (){
      return{
      message1: '© 2019 xinyizhou All rights reserved. 版权所有' }
    }
  }
</script>

<style scoped>
  @import "../../static/style.css";
</style>
