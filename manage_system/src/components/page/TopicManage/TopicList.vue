<template>
	<div>
		<div class="table clearfix">
			<div class="operation" clearfix>
				<!-- <el-button type="danger" @click="checkMore" class="create_topic">+新建议题</el-button> -->
        <el-button type="danger" @click="dialogFormVisible = true" class="create_topic">+新建议题</el-button>
        <el-dialog title="新建议题" :visible.sync="dialogFormVisible">
          <el-form>
            <el-form-item label="议题名称" :label-width="formLabelWidth">
              <el-input v-model="addtopic.title" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="议题日期" :label-width="formLabelWidth">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="addtopic.dt" style="width: 100%;"  @change="getallEvents"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="所属事件" :label-width="formLabelWidth">
              <el-select v-model="select.checkevent" placeholder="选择事件">
                <el-option v-for="(item,index) in events"  :key="index" :label="item.event" :value="item.id"></el-option>
                <!-- <el-option label="事件二" value="beijing"></el-option> -->
              </el-select>
              <el-input type="textarea" v-model="select.addevent" placeholder="新建事件" resize="none" class="newAdd"></el-input>
            </el-form-item>
            <el-form-item label="所属行业" :label-width="formLabelWidth">
              <el-select v-model="select.checktrade" placeholder="选择行业">
                <el-option v-for="(item,index) in alltrades"  :key="index" :label="item.name" :value="item.id"></el-option>
                <!-- <el-option label="行业二" value="beijing"></el-option> -->
              </el-select>
              <el-input v-model="select.othertrade" placeholder="其他行业" class="newAdd"></el-input>
            </el-form-item>
            <el-form-item label="议题说明" :label-width="formLabelWidth">
              <el-input type="textarea" v-model="addtopic.desc" resize="none"></el-input>
            </el-form-item>
            
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveCreatedTopic">保存</el-button>
          </div>
        </el-dialog>

				<el-button type="danger"  class="import">批量导入</el-button>
				<el-button type="danger"  class="export">批量导出</el-button>
				<div class="keywords_select">
            <el-input v-model="search_word" placeholder="输入关键词" class="handle-input mr10" id="select"  @keyup.enter.native="enterTopic"></el-input>
            <el-button type="danger" icon="search" @click="search">搜索</el-button>
        </div>
			</div>

      <div class="filter_form">
        <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="议题日期" class="date">
          <div class="block">
            <el-date-picker v-model="filterDt" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']" @change="filterBydate">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="所属行业" prop="region" class="trade">
          <el-select v-model="filterForm.tradeId"  placeholder="选择行业"  @change="filterBytrade">
            <el-option v-for="(item,index) in alltrades"  :key="index" :label="item.name" :value="item.id" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="议题来源" prop="name" class="origin" >
          <el-select v-model="filterForm.src" placeholder="选择来源" @change="filterBysrc">
            <el-option label="公社" value="公社"></el-option>
            <el-option label="KOL" value="KOL"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" prop="name">
          <el-select v-model="filterForm.titleorevent" placeholder="议题名称">
            <el-option label="议题名称" value="title"></el-option>
            <el-option label="事件名称" value="event"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" prop="name">
          <el-input v-model="filterForm.keywords" placeholder="包含关键字"></el-input>
        </el-form-item>
        <el-button type="danger" @click="filterTopic" class="filter_btn">筛选</el-button>
      </el-form>
    </div>
			
    <div class="handle-box">
        <div>
            <span>每页展示：</span>
            <el-select v-model="pageInfo.per_page" placeholder="5" class="handle-select mr10" @change="selectChange">
                <el-option v-for="(item,index) in pageInfo.page_sizes"  :key="index" :label="item" :value="item">{{item}}</el-option>
            </el-select>
            <span>条</span>
        </div>
    </div>
    <el-table :data="tableData3"  border style="width: 100%" max-height="800" :default-sort="{prop:'date', order:'descending'}">
    	<el-table-column type="selection"  :reserve-selection="true" width="50"> </el-table-column>
        <el-table-column prop="id" label="ID" width="80"></el-table-column>
        <el-table-column prop="createTime" label="议题日期" sortable width="150"></el-table-column>
        <el-table-column prop="title" label="议题名称" width="200"></el-table-column>
        <el-table-column prop="event" label="事件名称" width="200"></el-table-column>
        <el-table-column prop="star" label="点赞数" sortable width="100"></el-table-column>
        <el-table-column prop="tradeName" label="所属行业" width="100"></el-table-column>
        <el-table-column prop="topicOrigin" label="议题来源" width="130"></el-table-column>
        <el-table-column prop="creater" label="创建者" width="150"></el-table-column>
    </el-table>
    <el-pagination background layout="total, sizes, prev, pager, next, jumper"  @current-change ="handleCurrentChange"
            @size-change="pageSizeChange"
            :current-page="pageInfo.current_page"
            :total="pageInfo.total"
            :page-size="pageInfo.per_page"
            :page-sizes="pageInfo.page_sizes" class="pagination">
            </el-pagination>

</div>
	</div>
</template>
<script type="text/javascript">
	import axios from 'axios';
    
    export default {

        data() {
          return {
          	  pageInfo:{
                page_sizes:[5,10,15,20,25,30], //每页显示多少条的用户选择数组
                per_page:5, //每页显示几个 前端传 从用户页面获取  
                page:1,//当前要渲染的第几页  前端传
                

                total:1,  //总条数 后台获取
                current_page: 1, //当前页  后台获取
              },
              search_word: '', //搜索关键词 前端传search
                
              tableData3:[],

              dialogFormVisible: false,
              //筛选的表单
              filterForm: {
                startDate:'',
                endDate:'',
                tradeId:'',
                src:'',
                keywords:'', 
                titleorevent:'',      
              },
              alltrades:[],
              filterDt:'',
              formLabelWidth: '120px',


              //新建议题表单
              select:{
                checkevent:'',
                addevent:'',
                checktrade:'',
                othertrade:'',
              },
              addtopic:{
                title:'',
                dt:'',
                // eventId:'', //选择的事件id
                // event:'',   //自己添加的事件名称
                // trade:'',   //选择的行业的id
                // tradeName:'', //自己添加的行业名称
                desc:'',
              },
              events:[], //日期对应的可供选择的事件



              ruleForm: {
                
              },
              rules: {
                name: [
                  // { required: true, message: '请输入活动名称', trigger: 'blur' },
                  // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                region: [
                  { required: true, message: '选择行业', trigger: 'change' }
                ],
                date1: [
                  { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                date2: [
                  { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ],
                type: [
                  { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                ],
                resource: [
                  { required: true, message: '请选择活动资源', trigger: 'change' }
                ],
                desc: [
                  { required: true, message: '请填写活动形式', trigger: 'blur' }
                ]
              }

            }
        },
        created(){
          this.getData();
          this.getallTrades();
          console.log(this.select.checkevent);
        },
        methods:{
            
            //每页显示条数事件（表格上面）
            selectChange(val){
                // this.pageSizeChange(val);
                this.getData();
            },
            //每页显示条数（分页器中自带的）
            pageSizeChange(val){
                console.log(val);
                this.pageInfo.per_page = val;
                this.getData();
            },
            //分页按钮 点击上一页及下一页 或者指定页码
            handleCurrentChange(val){
                console.log(val);
                this.pageInfo.page = val;
                this.getData();
            },

            //获取列表数据
            getData(){
                //处理默认日期：一个月前
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                // console.log(end);
                // console.log(start);
                this.filterDt=[start,end];
                // console.log(this.filterDt);
                const startDate=this.getDate(start);
                const endDate=this.getDate(end);
                // console.log(startDate);
                // console.log(endDate);
                var that=this;
                that.$axios.get("/topics/pages?page="+that.pageInfo.page+"&auditStatus=1&per_page="+that.pageInfo.per_page+"&startDate="+startDate+"&endDate="+endDate+"&search="+that.search_word)
                .then(function(res){
                  console.log(res.data);
                  that.pageInfo.total=res.data.pagination.total;
                  console.log(res.data.pagination.total);
                  that.pageInfo.current_page=res.data.pagination.current_page;
                  that.tableData3=res.data.data;
                  for(var i=0;i<that.tableData3.length;i++){
                    var dataObj=that.tableData3[i];
                    if(dataObj.userId==0){ 
                      that.$set(dataObj,'topicOrigin','公社')
                    }else{
                      that.$set(dataObj,'topicOrigin','KOL')
                    }
                  }
                  console.log( that.tableData3);
              },function(err){
                console.log(err);
              }).catch(function(error){
                console.log(error);
              })
            },
            //搜索
            search(){
              this.getData();
            },
            enterTopic(){
              this.getData();
            },
            //处理日期 格式化
            getDate(dt){
              var month=dt.getMonth()+1;
              var date=dt.getDate();
              if(month<10){
                month='0'+month;
              }
              if(date<10){
                date='0'+date;
              }
              let str=dt.getFullYear() + '-' +month+ '-' + date;
              return str;
            },
            //获取日期对应的事件 以供用户可选择
            getallEvents(){
              // console.log("选择了日期")
              // console.log(this.addtopic.dt);
              if(this.addtopic.dt){
                this.select.checkevent='';//清空之前选择的事件
                this.addtopic.dt=this.getDate(this.addtopic.dt);
                console.log(this.addtopic.dt);
                var that=this;
                that.$axios.get("/events?dt="+that.addtopic.dt)
                .then(function(res){
                  console.log(res.data);
                  that.events=res.data;
                  console.log(that.events);
                },function(err){
                  console.log(err);
                }).catch(function(error){
                  console.log(error);
                })
              }
            },

            //获取所有行业以供用户选择
            getallTrades(){
              var that=this;
              that.$axios.get("/system/trades")
              .then(function(res){
                console.log(res.data);
                that.alltrades=res.data;
                console.log(that.alltrades);
              },function(err){
                console.log(err);
              }).catch(function(error){
                console.log(error);
              })
            },

            //筛选
            //根据日期筛选
            filterBydate(){
              console.log("选定了")
              console.log(this.filterDt[0]);
              console.log(this.filterDt[1]);
              var startDate=this.getDate(this.filterDt[0]);
              var endDate=this.getDate(this.filterDt[1]);
              console.log(startDate);
              console.log(endDate);
              var that=this;
              that.$axios.get("/topics/pages?page="+that.pageInfo.page+"&per_page="+that.pageInfo.per_page+"&startDate="+startDate+"&endDate="+endDate)
              .then(function(res){
                console.log(res.data);
                that.pageInfo.total=res.data.pagination.total;
                that.pageInfo.current_page=res.data.pagination.current_page;
                that.tableData3=res.data.data;
                for(var i=0;i<that.tableData3.length;i++){
                  var dataObj=that.tableData3[i];
                  if(dataObj.userId==0){ 
                    that.$set(dataObj,'topicOrigin','公社')
                  }else{
                    that.$set(dataObj,'topicOrigin','KOL原创')
                  }
                }
                console.log( that.tableData3);
            },function(err){
              console.log(err);
            }).catch(function(error){
              console.log(error);
            })
          },
          //根据行业筛选
          filterBytrade(){
            console.log(this.filterForm.tradeId);
            var that=this;
            that.$axios.get("/topics/pages?page="+that.pageInfo.page+"&per_page="+that.pageInfo.per_page+"&tradeId="+that.filterForm.tradeId)
              .then(function(res){
                console.log(res.data);
                that.pageInfo.total=res.data.pagination.total;
                that.pageInfo.current_page=res.data.pagination.current_page;
                that.tableData3=res.data.data;
                for(var i=0;i<that.tableData3.length;i++){
                  var dataObj=that.tableData3[i];
                  if(dataObj.userId==0){ 
                    that.$set(dataObj,'topicOrigin','公社')
                  }else{
                    that.$set(dataObj,'topicOrigin','KOL')
                  }
                }
                console.log( that.tableData3);
            },function(err){
              console.log(err);
            }).catch(function(error){
              console.log(error);
            })
          },
          //根据议题来源筛选
          filterBysrc(){
            console.log(this.filterForm.src);
            if(this.filterForm.src=="公社"){
              var src=0;
            }else{
              var src=1;
            }
            var that=this;
            that.$axios.get("/topics/pages?page="+that.pageInfo.page+"&per_page="+that.pageInfo.per_page+"&src="+src)
              .then(function(res){
                console.log(res.data);
                that.pageInfo.total=res.data.pagination.total;
                that.pageInfo.current_page=res.data.pagination.current_page;
                that.tableData3=res.data.data;
                for(var i=0;i<that.tableData3.length;i++){
                  var dataObj=that.tableData3[i];
                  if(dataObj.userId==0){ 
                    that.$set(dataObj,'topicOrigin','公社')
                  }else{
                    that.$set(dataObj,'topicOrigin','KOL')
                  }
                }
                console.log( that.tableData3);
            },function(err){
              console.log(err);
            }).catch(function(error){
              console.log(error);
            })
          },
          //根据议题名称和关键字筛选
          // checkInx(){
          //   console.log(this.filterForm.titleorevent)
          // },
          filterTopic(){
            console.log(this.filterForm.titleorevent);
            if(this.filterForm.titleorevent=="title"){
              var inx=0;
            }else{
              var inx=1;
            }
            var that=this;
            that.$axios.get("/topics/pages?page="+that.pageInfo.page+"&per_page="+that.pageInfo.per_page+"&inx="+inx+"&search="+that.filterForm.keywords)
              .then(function(res){
                console.log(res.data);
                that.pageInfo.total=res.data.pagination.total;
                that.pageInfo.current_page=res.data.pagination.current_page;
                that.tableData3=res.data.data;
                for(var i=0;i<that.tableData3.length;i++){
                  var dataObj=that.tableData3[i];
                  if(dataObj.userId==0){ 
                    that.$set(dataObj,'topicOrigin','公社')
                  }else{
                    that.$set(dataObj,'topicOrigin','KOL')
                  }
                }
                console.log( that.tableData3);
            },function(err){
              console.log(err);
            }).catch(function(error){
              console.log(error);
            })
          },

            //保存新建的议题
            saveCreatedTopic(){
              console.log("点击保存");
              if(this.select.checkevent){
                this.$set(this.addtopic,"eventId",this.select.checkevent)
                // this.addtopic.event=this.select.checkevent;
              }else{
                this.$set(this.addtopic,"event",this.select.addevent)
              };
              if(this.select.checktrade){
                this.$set(this.addtopic,"trade",this.select.checktrade);
                // this.addtopic.trade=this.select.checktrade;
              }else{
                this.$set(this.addtopic,"tradeName",this.select.othertrade)
                // this.addtopic.trade=this.select.othertrade;
              }
              console.log(this.addtopic);
              for(var key in this.addtopic){
                if(this.addtopic[key]==""){
                  alert("表单不能为空");
                  return;
                }
              }
              var that=this;
              that.$axios.post("/topics",that.addtopic)
              .then(function(res){
                console.log(res.data);
                that.dialogFormVisible=false; //隐藏对话框
                alert("保存成功");
                that.getData();
                
              },function(err){
                console.log(err);
              }).catch(function(error){
                console.log(error);
              })
            },

        }
    }
</script>
<style type="text/css" scoped>
	.table{
        margin-top:10px;
    }
    .clearfix:before,.clearfix:after {
        content: "";
        display: block;
        clear: both;
    }
  	.clearfix{
  		zoom:1;
  	}
    .handle-box{
        margin-bottom: 5px;
        display:flex;
        justify-content:space-between;
        margin:10px 0;

    }
    .handle-select{
        width: 65px;
    }
    
    .handle-input{
        width:300px ;
        height:26px;
        display: inline-block;
    }
    /*分页*/
    .pagination{
        float:right;
        margin-top:50px;
        margin-right:200px;
    }
    .butMargin{
        margin:5px 0px;
    }

    .create_topic{
    	/*width:90px;
    	height:30px;
    	padding-bottom:1px 0;*/
    }
    .content{
    	padding-top:20px;
    }
    /*.filter div{
    	float: left;
    	margin-right:15px;
    }*/
    .filter_btn{
    	/*width:47px;
    	height:22px;
    	padding:0;*/
    }
    .operation{
    	margin-bottom:20px;
    }
    .keywords_select{
    	float:right;
    	margin-right:10%;
    }
    .newAdd{
      margin-top:5px;
    }

    .trade_input{
      /*float:left;*/
    }
    .filter_form el-form-item{
      margin-left:0;
    }
    /*.origin{
      width:150px;
    }
    .trade{
      width:150px;
    }
    .date{
      width:300px;
    }*/


    
</style>
<style type="text/css">
  .el-table__footer-wrapper thead div, .el-table__header-wrapper thead div{
      background-color:rgba(255, 0, 0, 1);
      color:#fff;
      font-weight:normal;
  }
  .el-pager li.active{
  	background-color:rgba(255, 0, 0, 1);
  	border-color:rgba(255, 0, 0, 1);
  }
  .el-pager li.hover{
  	color:#fff;
  }
  .sort-caret .ascending{
  	/*background-color:#fff;*/
  }
  .caret-wrapper i{
  	/*background-color:#fff;*/
  }
  .content{
    	padding-top:20px;
  }
 /* .el-form-item__content{
      width:80px;
    }*/

</style>