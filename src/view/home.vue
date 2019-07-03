<template>
<div>
  <top></top>
  <HelloWorld></HelloWorld>
  <library></library>
  <foot></foot>
</div>
</template>

<script>
import HelloWorld from '../components/HelloWorld'
import foot from '../components/foot'
import top from '../components/top'
import library from '../components/library_list'
export default {
  name: 'home',
  components: {HelloWorld, foot, top, library}
}
</script>

<style scoped>
  @import "../../static/style.css";
</style>
