<template>
  <div class="container">
      <el-row :gutter="20">
      <el-col :span="18">
          <div class="main">
            <h2>发表新攻略</h2>
            <p> 分享你的个人游记，让更多人看到哦！</p>
            <el-input class='post-title' v-model="input" placeholder="请输入标题"></el-input>
           <client-only>
            <VueEditor :editorToolbar='customToolbar' />
            </client-only>
            <div class="search">
                <div class="select">
                    选择城市
                <el-input class='post-search' v-model="input" placeholder="请搜索游玩城市"></el-input>
                </div>
                <el-button type="primary" size="small">发布</el-button>

                 或者 <span>保存到草稿</span>
            </div>
          </div>
      </el-col>
  <el-col :span="6">
      <div class="aside">
          <el-row>
            <el-col :span="24"><div class="aside-titile">
                <h3>草稿箱（5）</h3>
                </div>
            </el-col>
          </el-row>

           <el-row>
            <el-col :span="24"><div class="aside-content">
                这里是填写的内容
                </div>
            </el-col>
          </el-row>
            
        <el-row>
            <el-col :span="18">
                <div class="aside-data">2020-11-15</div>
            </el-col>
            <el-col :span="6" class="aside-icon">
                <span ><i class="el-icon-edit"></i></span>
                <span ><i class="el-icon-delete"></i></span>
            </el-col>
        </el-row>
      </div></el-col>
</el-row>
   

  </div>
</template>

<script>
// import {VueEditor} from 'vue2-editor'
export default {
    // components: {
    //     VueEditor
    // },
    data () {
        return {
            input:'',
            // 设置富文本器的功能
            customToolbar: [["bold", "italic", "underline"], [{ list: "ordered" }, { list: "bullet" }], ["image", "code-block"]]
        }
    }

}
</script>

<style lang="less" scoped>
  .main{
      h2{
          font-weight: normal;
          font-size: 22px;
      }
      p{
          font-size: 12px;
          margin: 10px 0;
          color: #a69999;

      }
      .post-title{
          margin-bottom: 20px;
      }

 }
 .aside{
     border: 1px solid #beb9b9;
     padding: 10px;
     font-size: 14px;
     h3{
          font-weight: normal;
          font-size: 16px;
          margin-bottom: 10px;
     }

 }
 
</style>