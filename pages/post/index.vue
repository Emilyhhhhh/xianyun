<template>
  <div class="container" title="旅游攻略模块首页文件">
<<<<<<< HEAD
    <!-- <el-button
      type="primary"
      icon="el-icon-edit"
      @click="$router.push({ path: '/post/create' })"
      >写游记</el-button
    > -->
    <searchList></searchList>
=======
    
    <search/>
    <el-button type="primary" icon="el-icon-edit" @click="$router.push({path:'/post/create'})">写游记</el-button>
>>>>>>> jinting
  </div>
</template>

<script>
<<<<<<< HEAD
import searchList from "@/components/post/searchList";
export default {
  components: {
    searchList,
  },
};
=======
import search from '@/components/post/search.vue'
export default {
  components: { search },

}
>>>>>>> jinting
</script>

<style lang="less" scoped>
</style>