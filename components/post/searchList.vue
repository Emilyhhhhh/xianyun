<template>
  <div class="searchList">
    <div class="header">
      <h4>推荐攻略</h4>
      <el-button
        type="primary"
        icon="el-icon-edit"
        @click="$router.push({ path: '/post/create' })"
        >写游记</el-button
      >
    </div>
    <div class="tripleList">
      <h4>塞班贵？一定是你的打开方式不对！6000块玩转塞班</h4>
      <p>
        大家对塞班岛总存在着这样的误解，知道它是美属地盘，就理所当然地觉得这里的花费一定很高，花费高有高的玩法，那如果只有6000块的预算呢？要怎么玩？关于旅行这件事，我们要让钱花得更有道理，收下这份攻略，带你6000块花式玩转塞班。图：塞班岛。
        by第5季旅游一、怎样用6000块玩转塞班？大多数出境游客人不做预算或111111111111111111
      </p>
      <div class="pic">
        <img src="#" alt="" />
        <img src="#" alt="" />
        <img src="#" alt="" />
      </div>
      <div class="footer">
        <div class="userdetail">
          <i class="el-icon-location-information"></i>
          <span>北京市</span>
          <span>by</span>
          <div class="userstatus">
            <img src="#" alt="" class="user" />
            <span class="name">地球发动机</span>
          </div>
          <i class="el-icon-view"></i>
          <span class="read">14961</span>
        </div>
        <span class="like">79 赞</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.searchList {
  width: 700px;
}
.header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
  h4 {
    width: 72px;
    display: inline-block;
    color: orange;
    font-weight: 400;
    font-size: 18px;
    &::after {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 72px;
      height: 2px;
      content: "";
      background-color: orange;
    }
  }
}
.tripleList {
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  /deep/h4 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 15px;
    font-size: 18px;
    font-weight: normal;
  }
  p {
    margin-bottom: 15px;
    line-height: 1.5;
    font-size: 14px;
    height: 63px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    color: #666;
  }
  .pic {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
    img {
      display: block;
      width: 220px;
      height: 150px;
      background-color: red;
    }
  }
  .footer {
    display: flex;
    justify-content: space-between;

    .userdetail {
      width: 220px;
      font-size: 12px;
      color: #999;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      .user {
        display: inline-block;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: orange;
        vertical-align: middle;
      }
      .name {
        color: orange;
      }
    }
    .like {
      color: orange;
    }
  }
}
</style>