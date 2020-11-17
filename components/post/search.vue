<template>
  <div class="search">
      <el-input v-model="input" placeholder="请输入想去的地方，比如：'广州'" @keyup.enter.native
="handle(input)">
          <i slot="suffix" class="el-icon-search" @click="handle(input)"></i>
      </el-input>
      <p>推荐： 
          <span  @click="handle(value)" v-for="(value,index) in citys" :key="index"
         >{{value}}</span>
      </p>
  </div>
</template>

<script>
export default {
    data () {
        return {
            input:'',
            citys:[
                '广州',
                '上海',
                '北京'
            ]
        }
    },
    methods : {
        // 搜索框：根据搜索框内容请求相应的文章列表：接口：/posts
        // 功能实现：1.输入搜索城市回车请求文章 2.点击放大镜实现搜索，3.点击推荐的三个城市实现搜索
        handle(input){
            console.log(input);
            this.input=input
            let city=input
            this.$axios({
            url:'/posts',
            params:{city}
            }).then(res=>{
                console.log(res);
            })
        },
    }
    

}
</script>

<style lang="less" scoped>
.search{
     .el-input{
         border: 2px solid #ffa500;
        /deep/ input{
             border: none;
         }
     }   
    /deep/ .el-icon-search{
        font-size: 24px;
        color: orange;
        font-weight: 700;
        margin-right: 10px;
        margin-top: 8px;
        vertical-align: middle;
     }
     p{
         padding: 10px 0;
        font-size: 12px;
        color: #666;
        span{
            margin-right: 5px;
            &:hover{
               color: orange;
               cursor: pointer;
            }
        }
     }
    }
</style>