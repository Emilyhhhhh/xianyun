<template>
  <div class="container" title="机票模块首页文件">
    <searchHotel/>

  </div>
</template>

<script>
import SearchHotel from '@/components/hotel/searchHotel.vue'
export default {
  components: {
    SearchHotel
  }

}

</script>

<style lang="less" scoped>

.container{
  width:1000px;
  margin:0 auto;
  padding-top: 20px;

}
</style>