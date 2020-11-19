<template>
  <div>
    <div class="comment-item">
      <!-- 子评论 -->
      <item
        v-if="secc.parent"
        :secc="secc.parent"
        @sendreply="replyhandle"
      ></item>
      <!-- 子评论 -->
      <div>
        <div class="top">
          <div class="top-l">
            <div class="u-head">
              <img
                :src="$axios.defaults.baseURL + secc.account.defaultAvatar"
                alt=""
              />
            </div>
            <span class="username">{{ secc.account.nickname }}</span>
            <span class="date">{{ secc.created_at | dateHandle }}</span>
          </div>
          <span class="num">{{ secc.level }}</span>
        </div>
        <div class="content">
          <p class="msg">{{ secc.content }}</p>
          <div class="pics" v-if="secc.pics.length > 0">
            <div
              class="pic-box"
              v-for="(value, index) in secc.pics"
              :key="index"
            >
              <el-image
                style="width: 80px; height: 80px"
                :src="$axios.defaults.baseURL + value.url"
                fit="cover"
                :preview-src-list="[$axios.defaults.baseURL + value.url]"
              ></el-image>
            </div>
          </div>
          <div
            class="btn"
            @mouseenter="show($event)"
            @mouseleave="hide($event)"
          >
            <span @click="replyhandle([secc.id, secc.account.nickname])"
              >回复</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dateHandle from "@/myapi/dateHandle";
export default {
  props: ["secc"],
  data() {
    return {};
  },
  filters: {
    dateHandle,
  },
  name: "item",
  methods: {
    show(e) {
      e.target.firstChild.style.display = "block";
    },
    hide(e) {
      e.target.firstChild.style.display = "none";
    },
    replyhandle(id) {
      this.$emit("sendreply", id);
    },
  },
};
</script>

<style lang="less" scoped>
.comment-item {
  border: 1px dotted #ddd;
  padding: 20px 20px 5px;
  margin: 15px 0;
  .top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    font-size: 12px;
    color: #666;
    .top-l {
      display: flex;
      .u-head {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        overflow: hidden;
        background-color: #ccc;
        img {
          width: 100%;
        }
      }
      .username {
        margin: 0 5px;
      }
      .date {
        color: #999;
      }
    }
  }

  .content {
    padding-left: 30px;
    .pics {
      display: flex;
      .pic-box {
        width: 80px;
        height: 80px;
        border-radius: 6px;
        overflow: hidden;
        margin-right: 5px;
        margin-top: 10px;
        padding: 5px;
        border: 1px dashed #ddd;
      }
    }
    .btn {
      display: flex;
      justify-content: flex-end;
      height: 20px;
      span {
        line-height: 20px;
        font-size: 12px;
        color: #1e50a2;
        cursor: pointer;
        display: none;
      }
    }
  }
}
</style>