<template>
    <div class="topFilter" title="酒店搜索头部组件">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>酒店</el-breadcrumb-item>
      <el-breadcrumb-item>{{$route.query.cityName?$route.query.cityName:'广州市'}}酒店预订</el-breadcrumb-item>
    </el-breadcrumb>
   <!-- 搜索表单  -->
    <el-form ref="form" :model="form" :inline="true" style="margin-top:20px" label="left">
      <el-form-item>
        <el-autocomplete
      class="inline-input"
      v-model="form.city"
      :fetch-suggestions="querySearch"
      placeholder="切换城市"
      :trigger-on-focus="false"
      :highlight-first-item='true'
      @select="handleSelect"
    ></el-autocomplete>
      </el-form-item>

      <el-form-item>
        <el-date-picker
          v-model="form.date"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="入住日期"
          end-placeholder="离店日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
<!-- -------人数-------- -->
      <el-form-item>       
      <el-popover
  placement="bottom-start"
  width="300"
  v-model="visible"
   :visible-arrow="false">
<el-row class="top">
  <el-col :span="8"><div class="room">每间</div></el-col>
  <el-col :span="8"  style="padding-right:5px"><div class="adult" >
     <el-select v-model="adult" placeholder="请选择" size='mini' @change="adultChange(adult)">
    <el-option
      v-for="item in adultList"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      >
    </el-option>
  </el-select>

    </div>
    </el-col>
  <el-col :span="8"  style="padding-left:5px"><div class="children">
     <el-select v-model="child" placeholder="请选择" size='mini' @change="childChange(child)" >
    <el-option
      v-for="item in childList"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      >
    </el-option>
  </el-select>
    </div>
    </el-col>
</el-row>
  <div  class="primary-btn">
    <el-button type="primary" size="mini" @click="showSelect">确定</el-button>
  </div>
 <el-input
        placeholder="人数未定"
        suffix-icon="el-icon-user"
        v-model="userNum"
        slot="reference"
        >
      </el-input>
</el-popover>
      </el-form-item>
<!-- -------人数-------- -->
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
      //设置可选的日期
       pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now()- 8.64e7;
          }
       },
      form:{
        city:'',
        date:'',
      },
      userNum:'',
      visible: false,  //显示和隐藏
      adultList: [{
          value: '1',
          label: '1'
        }, {
          value: '2',
          label: '2'
        }, {
          value: '3',
          label: '3'
        }, {
          value: '4',
          label: '4'
        }, {
          value: '5',
          label: '5'
        }, {
          value: '6',
          label: '6'
        }, {
          value: '7',
          label: '7'
        }],
      childList: [ {
          value: '0',
          label: '0'
        },{
          value: '1',
          label: '1'
        }, {
          value: '2',
          label: '2'
        }, {
          value: '3',
          label: '3'
        }, {
          value: '4',
          label: '4'
        }],
      adult: "2 成人",
      child: "0 儿童",
    }
  },
  methods: {
    // 点击人数的确认时
  showSelect(){
    if(this.child.indexOf('0')!=-1){
      this.userNum=this.adult
    }else{
      this.userNum=this.adult +'   ' +this.child
    }
    this.visible = false
  },


  // 下拉选项改变时
  adultChange(value){
    this.adult=value+' 成人'

  },

  // 下拉选项改变时
  childChange(value){
    this.child=value+' 儿童'
  },

   //查看价格
    onSubmit(){
      console.log(this.form);
      this.$axios({
        url:'/hotels'
      }).then(res=>{
        console.log(res);
      })
    },

    // 筛选城市
    querySearch(value,cb){
      console.log(value);
     //发送查看城市的请求
     this.$axios({
        url:'/cities',
        params:{
          name:value
        }
      }).then(res=>{
        console.log(res);
        // 拼接需要显示的数组
        let showList=res.data.data.filter(city=>{
          console.log(city);
          return city.sort
        }).map(v=>{
          return {value:v.name}
        })
        cb(showList)
         if(showList.length==0){
          this.$confirm('没有这个城市', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning',
          closeOnClickModal:false
          })
         }
      })
    },
    
    handleSelect(item){
      this.form.city=item.value 
      console.log(this.form.city);
      this.$router.push({ path: "/hotel?cityName="+this.form.city})
    }
  },
}
</script>

<style lang="less" scoped>
  .primary-btn{
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #ddd;
    text-align: right;
  }

  .el-popover {
    left: 837px;
  }
</style>