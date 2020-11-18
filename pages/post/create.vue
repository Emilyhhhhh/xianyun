<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="18">
        <div class="main">
          <el-form ref="form" :model="form" :rules="rules">
            <h2>发表新攻略</h2>
            <p>分享你的个人游记，让更多人看到哦！</p>

            <el-form-item prop="title">
              <el-input
                v-model="form.title"
                placeholder="请输入标题"
                @focus="clearRules('title')"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <client-only prop="content">
                <VueEditor
                  :editorToolbar="customToolbar"
                  v-model="form.content"
                />
              </client-only>
            </el-form-item>

            <el-form-item label="选择城市" prop="city">
              <!-- fetch-suggestions 返回输入建议的方法 -->
              <!-- select 点击选中建议项时触发 -->
              <el-autocomplete
                :fetch-suggestions="querySearch"
                placeholder="请搜索游玩城市"
                @select="handleSelect"
                class="el-autocomplete"
                v-model="form.city"
                :trigger-on-focus="false"
                :highlight-first-item="true"
                @focus="clearRules('city')"
              ></el-autocomplete>
              <!-- <el-input v-model="form.city" placeholder="请搜索游玩城市" style="width: 200px;"></el-input> -->
            </el-form-item>

            <el-form-item>
              <el-button type="primary" size="small" @click="submint"
                >发布</el-button
              >
              或者 <span @click="save" class="save">保存到草稿</span>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="aside">
          <el-row>
            <el-col :span="24" class="aside-title">
              <h3>草稿箱（{{ $store.state.post.posts.length }}）</h3>
            </el-col>
          </el-row>

          <el-row
            v-for="(value, index) in $store.state.post.posts"
            :key="index"
          >
            <div class="aside-content">
              <div class="content-title">{{ value.title }}</div>
            </div>
            <div class="content-footer">
              <span class="content-data"
                >{{ new Date().getFullYear() }}-{{
                  new Date().getMonth() + 1
                }}-{{ new Date().getDate() }}</span
              >
              <span @click="edit(index)"><i class="el-icon-edit"></i></span>
              <span @click="del(index)"><i class="el-icon-delete"></i></span>
            </div>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { airsSearch } from "@/myapi/user.js";
export default {
  data() {
    return {
      input: "",
      // 设置富文本器的功能
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["image", "code-block"],
      ],
      form: {
        title: "",
        content: "",
        city: "",
      },
      rules: {
        title: [
          {
            required: true,
            message: "请输入标题",
            trigger: "blur",
          },
        ],
        content: [
          {
            required: true,
            message: "请输入内容",
            trigger: "blur",
          },
        ],
        city: [
          {
            required: true,
            message: "请输入城市",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 聚焦清除规则
    clearRules(pp) {
      this.$refs.form.clearValidate(pp);
    },
    //选择选项时触发
    handleSelect(item) {
      console.log(item);
      this.form.city = item.value;
    },
    // 输入内容后触发
    querySearch(str, callback) {
      console.log(str);
      this.$axios({
        url: "/cities",
        params: { name: str },
      }).then((res) => {
        console.log(res);
        if (res) {
          // 这里记得是{value:v.name}，格式一定是value：值
          let showlist = res.data.data.map((v) => {
            return { value: v.name };
          });
          callback(showlist);
          if (showlist.length == 0) {
            this.$confirm("没有这个城市", "提示", {
              confirmButtonText: "确定",
              showCancelButton: false,
              type: "warning",
              closeOnClickModal: false,
            });
          }
        }
      });
    },

    // 提交发表文章
    submint() {
      console.log(this.form);
      let data = this.form;
      if (
        this.form.title == "" ||
        this.form.content == "" ||
        this.form.city == ""
      ) {
        this.$message({
          message: "请输入内容",
          type: "error",
        });
        return;
      }
      this.$axios({
        url: "/posts",
        method: "post",
        headers: {
          Authorization: "Bearer " + this.$store.state.userstore.userInfo.token,
        },
        data,
      }).then((res) => {
        console.log(res);
        if (res.data.message == "新增成功") {
          this.$message({
            message: res.data.message,
            type: "success",
          });
          this.$router.push({ path: "/post" });
        }
      });
    },

    // 保存草稿
    save() {
      console.log(this.form);
      let data = { ...this.form };
      this.$store.commit("post/setPosts", data);
    },

    // 删除
    del(index) {
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.$store.commit("post/delPosts", index);
        })
        .catch((err) => {});
    },

    // 编辑
    edit(index) {
      let data = this.$store.state.post.posts[index];
      console.log(data);
      this.form.title = data.title;
      this.form.content = data.content;
      this.form.city = data.city;
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  h2 {
    font-weight: normal;
    font-size: 22px;
  }
  p {
    font-size: 12px;
    margin: 10px 0;
    color: #a69999;
  }
  .save {
    color: orange;
    &:hover {
      cursor: pointer;
    }
  }
}

.aside {
  border: 1px solid #beb9b9;
  padding: 10px;
  font-size: 14px;
  h3 {
    font-weight: normal;
    font-size: 16px;
    margin-bottom: 10px;
  }
  .content-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &:hover {
      color: orange;
      text-decoration: underline;
    }
  }
  .content-data {
    margin-right: 100px;
    color: #666;
  }
  .el-icon-edit,
  .el-icon-delete {
    &:hover {
      cursor: pointer;
    }
  }
}
</style>