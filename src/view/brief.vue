<template>
<div>
  <top :logstate=this.$route.query.logstate :user=this.$route.query.user></top>
  <flist :logstate=this.$route.query.logstate :user=this.$route.query.user></flist>
  <foot></foot>
</div>
</template>

<script>
import foot from '../components/foot'
import top from '../components/top'
import flist from '../components/filter-list'
export default {
  name: 'brief',
  components: {foot, top, flist
  }
}
</script>

<style scoped>

</style>
