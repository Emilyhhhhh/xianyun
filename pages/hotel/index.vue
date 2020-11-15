<template>
  <div class="container" title="机票模块首页文件">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>酒店</el-breadcrumb-item>
      <el-breadcrumb-item>广州市酒店预订</el-breadcrumb-item>
    </el-breadcrumb>
   <!-- 搜索表单  -->
    <el-form ref="form" :model="form" :inline="true" style="margin-top:20px" label="left">

      <el-form-item>
        <el-input v-model="form.city" placeholder="切换城市" ></el-input>
      </el-form-item>

      <el-form-item>
        <el-date-picker
          v-model="form.date"
          type="daterange"
          range-separator="-"
          start-placeholder="入住日期"
          end-placeholder="离店日期">
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-input
        placeholder="人数未定"
        suffix-icon="el-icon-user"
        v-model="form.userNum">
      </el-input>
      </el-form-item>
  
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查看价格</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form:{
        city:'',
        date:'',
        userNum:''
      }
    }
  },
  methods: {
    onSubmit(){
      console.log(this.form);
    }
  }

}
</script>

<style lang="less" scoped>

.container{
  width:1000px;
  margin:0 auto;
  padding-top: 20px;}

</style>