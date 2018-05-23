<template>
	<div>
		<div class="table">
            <div class="handle-box">
                <div>
                    <span>每页展示：</span>
                    <el-select v-model="pageInfo.per_page" placeholder="5" class="handle-select mr10" @change="selectChange">
                        <el-option v-for="(item,index) in pageInfo.page_sizes"  :key="index" :label="item" :value="item">{{item}}</el-option>
                    </el-select>
                    <span>条</span>
                </div>
                <div>
                    <el-input v-model="search_word" placeholder="输入关键词" class="handle-input mr10" id="select" @keyup.enter.native="enterScheme"></el-input>
                    <el-button type="danger" icon="search" @click="search">搜索</el-button>
                </div>
            </div>
            <el-table :data="tableData3" border style="width: 100%" max-height="800">
                <el-table-column prop="id" label="方案ID" width="80"></el-table-column>
                <el-table-column prop="userName" label="广告主名称" width="150"></el-table-column>
                <el-table-column prop="brand" label="品牌名称" width="100"></el-table-column>
                <el-table-column prop="budget" label="预算/元" width="150"></el-table-column>
                <el-table-column prop="title" label="议题名称" width="200"></el-table-column>
                <el-table-column prop="event" label="事件名称" width="120"></el-table-column>
                <el-table-column prop="dt" label="日期" width="120" sortable></el-table-column>
                <el-table-column prop="price" label="方案价格/元" width="120"></el-table-column>
                <el-table-column prop="status" label="方案状态" width="250">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status==0">待付款 <el-button size="mini" type="primary" @click="handlePass(scope.$index, scope.row)">通过</el-button></span>
                        <span v-if="scope.row.status==1">购买成功</span>
                    </template>
                </el-table-column>
                <el-table-column label="方案详情" width="100">
                	<template slot-scope="scope" >
                        <router-link :to="{path:'/schemedetail',query:{ id:scope.row.id }}"><span class="look_detail">查看</span></router-link>
                    </template>
                </el-table-column>
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
          // const self = this;
            return {
	          	 pageInfo:{
                    page_sizes:[5,10,15,20,25,30], //每页显示多少条的用户选择数组
                    per_page:5, //每页显示几个 前端传 从用户页面获取  
                    page:1,//当前要渲染的第几页  前端传
                    

                    total:1,  //总条数 后台获取
                    current_page: 1, //当前页  后台获取
                  },
                search_word: '', //搜索关键词 前端传search
                src:'',
                file:'',
	          	tableData3:[],
	        }
	    },
	    created(){
            //获取所有方案
	    	this.getData(-1); 
	    },
	    methods:{
            //每页显示条数事件（表格上面）
            selectChange(val){
                // this.pageSizeChange(val);
                this.getData(-1);
            },
            //每页显示条数（分页器中自带的）
            pageSizeChange(val){
                console.log(val);
                this.pageInfo.per_page = val;
                this.getData(-1);
            },
            //分页按钮 点击上一页及下一页 或者指定页码
            handleCurrentChange(val){
                console.log(val);
                this.pageInfo.page = val;
                this.getData(-1);
            },
            //获取方案
	    	getData(status){
                var that=this;
                that.$axios.get("/topics/plans?page="+that.pageInfo.page+"&status="+status+"&per_page="+that.pageInfo.per_page+"&search="+that.search_word)
                .then(function(res){
                console.log(res.data);
                that.pageInfo.total=res.data.pagination.total;
                that.pageInfo.current_page=res.data.pagination.current_page;
                that.tableData3=res.data.data;
                console.log( that.tableData3);

              },function(err){
                console.log(err);
              }).catch(function(error){
                console.log(error);
              })
	    	},
            //搜索
            search(){
                this.getData(-1);
            },
            enterScheme(){
                this.getData(-1);
            },
            //审核方案
            handlePass(index,row){
                var that=this;
                that.$axios.put("/topics/auditPlan/"+row.id)
                .then(function(res){
                console.log(res.data);
                that.getData(-1);
              },function(err){
                console.log(err);
              }).catch(function(error){
                console.log(error);
              })
            },

            
            
	    },
	}    
</script>
<style type="text/css" scoped>
	.table{
        margin-top:10px;
    }
    .handle-box{
        margin-bottom: 5px;
        display:flex;
        justify-content:space-between;
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

    .look_screen{
        color: #009DDF;
        cursor: pointer;
    }
    .fanscount{
    	width:55px;
    	height:18px;
    	border-radius:3px;
    	border:1px solid #ccc;
    	text-align:center;
    }
    .editimg{
    	width:16px;
    	height:16px;
    }
    .userimg{
    	width:40px;
    	height:40px;
    }
    .remark_text{
      width:80%;
      height:60px;
      border:none;
      resize:none;
    }
    .look_detail{
        color:#0099D9;
    }
    
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
</style>