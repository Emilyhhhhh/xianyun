<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="17">
        <div class="main">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/post' }"
              >旅游攻略</el-breadcrumb-item
            >
            <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
          </el-breadcrumb>
          <h1>{{ article.title }}</h1>
          <div class="postinfo">
            <span>发布时间：{{ article.created_at | dateHandle }}</span>
            <span>阅读:{{ article.watch ? article.watch : 0 }}</span>
          </div>
          <div class="art" v-html="article.content"></div>
          <div class="postctrl">
            <div class="comm" @click="turnto">
              <i class="el-icon-edit-outline"></i>
              <span v-if="article.comments"
                >评论({{ article.comments.length }})</span
              >
            </div>
            <div class="share" @click="$message.warning('暂不支持分享')">
              <i class="el-icon-share"></i>
              <span>分享</span>
            </div>
          </div>
        </div>
        <!-- 评论 -->
        <div class="comment" id="target">
          <comments :data="article" @turnto="turnto"></comments>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="asides">
          <h4>相关攻略</h4>
          <div
            class="recommand-item"
            v-for="(item, key) in recommand"
            :key="key"
            @click="tothe(item.id)"
          >
            <div class="left" v-if="item.images.length > 0">
              <img :src="item.images[0]" alt="" />
            </div>
            <div class="right">
              <p>{{ item.title }}</p>
              <div class="bott">
                {{ item.updated_at | dateHandle }} 阅读
                {{ item.watch ? item.watch : 0 }}
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import comments from "@/components/post/comment";
import dateHandle from "@/myapi/dateHandle";
export default {
  components: {
    comments,
  },
  data() {
    return {
      article: "",
      recommand: "",
    };
  },
  filters: {
    dateHandle,
  },
  methods: {
    turnto() {
      let target = document.getElementById("target");
      window.scroll(0, target.offsetTop + 76);
    },
    tothe(id) {
      this.$router.push({ path: "/post/detail?id=" + id });
      setTimeout(() => {
        window.location.reload();
      }, 100);
    },
  },
  mounted() {
    let id = this.$route.query.id;
    //获取文章详情
    this.$axios({
      url: "/posts",
      params: { id },
    }).then((res) => {
      this.article = res.data.data[0];
      console.log(res);
    });
    //获取推荐文章
    this.$axios({
      url: "/posts/recommend",
      params: { id },
    }).then((result) => {
      this.recommand = result.data.data;
    });
  },
};
</script>

<style lang="less" scoped>
.main {
  h1 {
    padding: 20px 0;
    border-bottom: 1px solid #ddd;
  }
  .postinfo {
    color: #999;
    padding: 20px;
    text-align: right;
    span:first-child {
      margin-right: 15px;
    }
  }
  .art {
    width: 100%;

    /deep/img {
      width: 100%;
    }
  }
  .postctrl {
    display: flex;
    justify-content: center;
    padding: 50px 0 30px;
    .comm {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin-right: 30px;
      cursor: pointer;
      i {
        font-size: 44px;
        color: orange;
      }
      span {
        margin-top: 5px;
        font-size: 14px;
        color: #999;
      }
    }
    .share {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      cursor: pointer;
      span {
        margin-top: 5px;
        font-size: 14px;
        color: #999;
      }
      i {
        font-size: 44px;
        color: orange;
      }
    }
  }
}
.asides {
  h4 {
    font-weight: 400;
    font-size: 18px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
  }
  .recommand-item {
    display: flex;
    padding: 20px 0;
    border-bottom: 1px solid #ddd;
    cursor: pointer;
    .left {
      width: 100px;
      height: 80px;
      flex-shrink: 0;
      background: #ddd;
      overflow: hidden;
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: calc(100% - 110px);
      flex: 1;
      p {
        width: 100%;
        line-height: 1.4em;
        height: 2.8em;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .bott {
        margin-top: 20px;
        font-size: 12px;
        color: #999;
      }
    }
  }
}
</style>