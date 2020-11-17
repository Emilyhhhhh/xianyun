<template>
  <div class="container" title="旅游攻略模块首页文件">
    <!-- <el-button
      type="primary"
      icon="el-icon-edit"
      @click="$router.push({ path: '/post/create' })"
      >写游记</el-button
    > -->
    <searchList></searchList>
  </div>
</template>

<script>
import searchList from "@/components/post/searchList";
export default {
  components: {
    searchList,
  },
};
</script>

<style lang="less" scoped>
</style>