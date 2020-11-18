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
    <div v-for="(item, index) in currentList" :key="index">
      <!-- 无相关攻略 -->
      <div class="noList" v-if="item.msg">
        {{ item.msg }}
      </div>
      <!-- 三图 -->
      <div class="tripleList" v-else-if="item.images.length == 3">
        <h4>{{ item.title }}</h4>
        <p>
          {{ item.summary }}
        </p>
        <div class="pic">
          <img :src="item.images[0]" alt="" />
          <img :src="item.images[1]" alt="" />
          <img :src="item.images[2]" alt="" />
        </div>
        <div class="footer">
          <div class="userdetail">
            <i class="el-icon-location-information"></i>
            <span>{{ item.cityName }}</span>
            <span>by</span>
            <div class="userstatus">
              <img
                :src="baseURL + item.account.defaultAvatar"
                alt=""
                class="user"
              />
              <span class="name">{{ item.account.nickname }}</span>
            </div>
            <i class="el-icon-view"></i>
            <span class="read">{{ item.watch }}</span>
          </div>
          <span class="like">{{ item.like }} 赞</span>
        </div>
      </div>

      <!-- 一图 -->
      <div class="singleList" v-else>
        <div class="left">
          <img :src="item.images[0]" alt="" />
        </div>
        <div class="right">
          <h4>{{ item.title }}</h4>
          <p>
            {{ item.summary }}
          </p>
          <div class="footer">
            <div class="userdetail">
              <i class="el-icon-location-information"></i>
              <span>{{ item.cityName }}</span>
              <span>by</span>
              <div class="userstatus">
                <img
                  :src="baseURL + item.account.defaultAvatar"
                  alt=""
                  class="user"
                />
                <span class="name">{{ item.account.nickname }}</span>
              </div>
              <i class="el-icon-view"></i>
              <span class="read">{{ item.watch }}</span>
            </div>
            <span class="like">{{ item.like }} 赞</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 分栏 -->
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3, 5, 10, 15]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="reList ? reList.length : articleList.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { http } from "@/plugins/myaxios.js";
export default {
  props: ["reList"],
  data() {
    return {
      articleList: "",
      baseURL: http.defaults.baseURL,
      //分页
      currentPage: 1,
      pageSize: 3,
      currentList: "",
    };
  },
  watch: {
    reList() {
      if (this.reList) {
        this.currentList = this.reList;
      } else {
        this.getlist(this.currentPage, this.pageSize);
      }
    },
  },
  methods: {
    getlist(currentPage, pageSize) {
      let origin = (currentPage - 1) * pageSize;
      let end = origin + pageSize;

      if (this.reList) {
        console.log(1);
        this.currentList = this.reList.slice(origin, end);
      } else {
        console.log(2);
        this.currentList = this.articleList.slice(origin, end);
      }
      console.log(this.currentList);
    },
    handleSizeChange(val) {
      //   console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.currentPage = 1;
      this.getlist(this.currentPage, this.pageSize);
    },
    handleCurrentChange(val) {
      //   console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getlist(this.currentPage, this.pageSize);
    },
  },
  mounted() {
    this.$axios({
      url: "/posts",
    }).then((res) => {
      console.log(res);
      this.articleList = res.data.data;
      this.getlist(this.currentPage, this.pageSize);
    });
  },
};
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
      //   background-color: red;
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
.singleList {
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  display: flex;
  .left {
    width: 220px;
    height: 150px;
    overflow: hidden;
    flex-shrink: 0;
    margin-right: 10px;
    // background-color: red;
    img {
      width: 100%;
    }
  }
  .right {
    width: calc(100% - 230px);
    h4 {
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
}
.noList {
  font-size: 24px;
  color: #666;
  text-align: center;
}
.pagination {
  display: flex;
  justify-content: center;
}
</style>