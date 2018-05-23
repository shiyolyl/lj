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
                    <el-input v-model="search_word" placeholder="输入关键词" class="handle-input mr10" id="select" @keyup.enter.native="enterAdv"></el-input>
                    <el-button type="danger" icon="search" @click="search">搜索</el-button>
                </div>
            </div>
            <el-table :data="tableData3" border style="width: 100%" max-height="800">
                <el-table-column prop="id" label="ID" width="80"></el-table-column>
                <el-table-column prop="name" label="广告主名称" width="150"></el-table-column>
                <el-table-column prop="brand" label="品牌名称" width="150"></el-table-column>
                <el-table-column prop="contact" label="联系人" width="100"></el-table-column>
                <el-table-column prop="mobile" label="电话" width="150"></el-table-column>
                <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
                <el-table-column prop="log" label="日志" width="100">
                	<template slot-scope="scope" @click="look_screen">
                        <span class="look_screen">查看</span>
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注" width="250">
                  <template slot-scope="scope">
                    <textarea class="remark_text" :id="scope.row.id+'remark'" v-model="scope.row.remark" @blur="editRemark(scope.$index, scope.row)"></textarea>
                    <label :for="scope.row.id+'remark'" class="editBtn">编辑</label>
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
          const self = this;
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

              
            }
        },
        created(){
          this.getData();
        },
        methods:{
            look_screen(){
                console.log("点击查看了")
            },

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
                var that=this;
                that.$axios.get("/users/pages?page="+that.pageInfo.page+"&role=1&auditStatus=1&per_page="+that.pageInfo.per_page+"&search="+that.search_word)
                .then(function(res){
                  console.log(res.data);
                that.pageInfo.total=res.data.pagination.total;
                that.pageInfo.current_page=res.data.pagination.current_page;
                that.tableData3=res.data.data;
                console.log(that.tableData3);

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
            enterAdv(){
                this.getData();
            },
            //修改备注
            editRemark(index,row){
                console.log(row.id);
                console.log(row.remark);
                var that=this;
                that.$axios.put("/users/updateRemark/"+row.id+"/"+row.remark)
                .then(function(res){
                    console.log(res.data);
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
<style type="text/css" >
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
        margin:5px 0px;
    }
    .butMargin{
        margin:5px 0px;
    }

    .look_screen{
        color: #009DDF;
        cursor: pointer;
    }
    .el-table th{
      background-color:rgba(255, 0, 0, 1);
    }
    .remark_text{
      width:80%;
      height:60px;
      border:none;
      resize:none;
    }
    .editBtn{
        width:24px;
        height:14px;
        color:#fff;
        background-color: #20a0ff;
        font-size:12px;
        border-radius: 4px;
        border:1px solid #20a0ff;
        line-height: 14px;
        text-align: center;
        float:right;
        margin-top:25px;
        cursor: pointer;
    }
</style>
<style type="text/css">
  .el-table__footer-wrapper thead div, .el-table__header-wrapper thead div{
      background-color:rgba(255, 0, 0, 1);
      color:#fff;
      font-weight:normal;
  }
</style>