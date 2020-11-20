<template>
  <div class="comment" v-if="data">
    <h4>评论</h4>
    <el-tag closable type="info" @close="hideTag" v-if="replyid">
      回复@{{ nickname }}
    </el-tag>
    <el-input
      type="textarea"
      :rows="3"
      placeholder="请输入内容"
      v-model="input"
      resize="none"
      style="margin-top: 5px"
      ref="input"
    >
    </el-input>
    <div class="submit">
      <!-- 上传图片 -->
      <div class="uploadImg">
        <el-upload
          :action="$axios.defaults.baseURL + '/upload'"
          name="files"
          :on-success="uploadImg"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-exceed="handleFile"
          :on-error="handleError"
          :before-upload="handleLaw"
          list-type="picture-card"
          :limit="3"
          ref="upload"
        >
          <i slot="default" class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </div>
      <!-- 上传图片 -->
      <div class="button">
        <el-button type="primary" @click="submitCom">提交</el-button>
      </div>
    </div>
    <div class="content-box">
      <!-- 评论项 -->
      <div class="comment-item" v-for="(item, key) in comList" :key="key">
        <div>
          <!-- 子评论 -->
          <secondcom
            :secc="item.parent"
            v-if="item.parent"
            @sendreply="getreply"
          ></secondcom>
          <!-- 子评论 -->
          <div class="top">
            <div class="top-l">
              <div class="u-head">
                <img
                  :src="$axios.defaults.baseURL + item.account.defaultAvatar"
                  alt=""
                />
              </div>
              <span class="username">{{ item.account.nickname }}</span>
              <span class="date">{{ item.created_at | dateHandle }}</span>
            </div>
            <span class="num">{{ item.level }}</span>
          </div>
          <div class="content">
            <p class="msg">{{ item.content }}</p>
            <div class="pics" v-if="item.pics.length > 0">
              <div
                class="pic-box"
                v-for="(value, index) in item.pics"
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
              <span @click="getreply([item.id, item.account.nickname])"
                >回复</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3, 5, 10, 15]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="comTotal"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import secondcom from "@/components/post/secondcom";
import dateHandle from "@/myapi/dateHandle";
export default {
  props: ["data"],
  components: {
    secondcom,
  },
  filters: {
    dateHandle,
  },
  data() {
    return {
      comList: "",
      comTotal: 0,
      replyid: "",
      nickname: "",
      //输入框
      input: "",
      pics: [],
      // 上传
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      myfileList: [],
      // 分页
      currentPage: 1,
      pageSize: 3,
      start: 0,
      currentList: "",
    };
  },
  methods: {
    //回复
    getreply(data) {
      if (data) {
        this.replyid = data[0];
        this.nickname = data[1];
      }
      this.$refs.input.focus();
      this.$emit("turnto");
    },
    //回复框
    hideTag() {
      this.replyid = "";
    },
    show(e) {
      e.target.firstChild.style.display = "block";
    },
    hide(e) {
      e.target.firstChild.style.display = "none";
    },
    // 上传
    //放大
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //上传图片
    uploadImg(res, file) {
      this.pics.push(res[0]);
    },
    //删除处理
    handleRemove(file) {
      if (file.response) {
        this.pics.forEach((item, key) => {
          if (item.id === file.response[0].id) {
            this.pics.splice(key, 1);
          }
        });
      }
    },
    handleError() {
      this.$message.error("上传失败，请重新上传");
    },
    //超出文件个数时
    handleFile() {
      this.$confirm("图片数量不能超过三张", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then()
        .catch();
    },
    //上传文件限制
    handleLaw(file) {
      let result = true;
      //判断文件格式
      if (
        file.type != "image/gif" &&
        file.type != "image/jpeg" &&
        file.type != "image/png"
      ) {
        this.$confirm("请上传jpg、png或gif格式的图片", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then()
          .catch();
        result = false;
      }
      //判断同名同大小照片
      this.pics.forEach((item) => {
        if (
          file.name == item.name &&
          Math.floor(file.size / 1000) == Math.floor(item.size)
        ) {
          this.$confirm("不能上传重复的图片", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then()
            .catch();
          result = false;
        }
      });
      //判断图片大小
      if (file.size > 5242880) {
        this.$confirm("请上传5MB以下的图片", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then()
          .catch();
        result = false;
      }
      return result;
    },
    // 分页
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.currentPage = 1;
      this.getcom(this.start, this.pageSize);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.start = (val - 1) * this.pageSize;
      this.getcom(this.start, this.pageSize);
    },
    //提交评论
    submitCom() {
      if (!this.input.trim()) {
        this.$message.warning("请输入评论");
        return;
      }
      this.$axios({
        method: "post",
        url: "/comments",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$store.state.userstore.userInfo.token,
        },
        data: this.replyid
          ? {
              content: this.input,
              post: this.data.id,
              pics: this.pics,
              follow: this.replyid,
            }
          : {
              content: this.input,
              post: this.data.id,
              pics: this.pics,
            },
      }).then((res) => {
        console.log(res);
        if (res.data.message == "提交成功") {
          this.$message.success("提交成功");
          this.getcom(this.start, this.pageSize);
          this.input = "";
          this.replyid = "";
          this.pics = [];
          this.$refs.upload.clearFiles();
        }
      });
    },
    // 获取评论
    getcom(start, size) {
      console.log(this.data.id);
      this.$axios({
        url: "/posts/comments",
        params: {
          post: this.data.id,
          _limit: size,
          _start: start,
        },
      }).then((res) => {
        console.log(res);
        this.comTotal = res.data.total;
        this.comList = res.data.data;
      });
    },
  },
  mounted() {
    // 获取评论
    setTimeout(() => {
      this.getcom(this.start, this.pageSize);
    }, 200);
  },
};
</script>

<style lang="less" scoped>
.comment {
  h4 {
    font-weight: 400;
    font-size: 18px;
    margin-bottom: 20px;
  }
  /deep/ .el-upload-list__item,
  /deep/.el-upload--picture-card {
    width: 110px;
    height: 110px;
    line-height: 110px;
    div {
      width: 100%;
      height: 100%;
    }
  }
  /deep/.el-upload-list__item-actions {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    span {
      margin: 0;
    }
  }
  /deep/.el-upload-list__item-thumbnail {
    object-fit: cover;
  }
  /deep/.el-icon-check {
    position: absolute;
    top: -1px;
    right: 39%;
  }
  .submit {
    display: flex;
    justify-content: space-between;
    margin: 10px 0 30px;
  }
  .pagination {
    display: flex;
    justify-content: center;
  }
  .content-box {
    border: 2px solid #ddd;
  }
  .comment-item {
    border-bottom: 1px dashed #ddd;
    padding: 20px 20px 5px;
    &:last-child {
      border-bottom: none;
    }
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
}
</style>