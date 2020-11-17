<template>
  <div class="container" title="旅游攻略模块首页文件">
    
    <search/>
    <el-button type="primary" icon="el-icon-edit" @click="$router.push({path:'/post/create'})">写游记</el-button>
  </div>
</template>

<script>
import search from '@/components/post/search.vue'
export default {
  components: { search },

}
</script>

<style lang="less" scoped>
</style>