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
                    <el-input v-model="search_word" placeholder="输入关键词" class="handle-input mr10" id="select" @keyup.enter.native="enterPub"></el-input>
                    <el-button type="danger" icon="search" @click="search">搜索</el-button>
                </div>
            </div>
            <el-table :data="tableData3" border style="width: 100%" max-height="800">
                <el-table-column prop="id" label="ID" width="80"></el-table-column>
                <el-table-column prop="name" label="公众号名称" width="150"></el-table-column>
                <el-table-column prop="contact" label="联系人" width="100"></el-table-column>
                <el-table-column prop="mobile" label="电话" width="150"></el-table-column>
                <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
                <el-table-column label="粉丝数/人" width="120">
                	<template slot-scope="scope">
                        <input type="text" name="fanscount" class="fanscount" :id="scope.row.id+'fans'" v-model="scope.row.fansCount"
                        @blur="editfansCount(scope.$index, scope.row)">
                        <label :for="scope.row.id+'fans'" @click="getId(scope.row)">
                            <img src="../../../../static/img/edit.png" class="editimg">
                        </label>
                    </template>
                </el-table-column>
                <el-table-column label="去水粉丝/人" width="120">
                	<template slot-scope="scope">
                        <input type="text" name="lostfans" class="fanscount" :id="scope.row.id+'unfans'" v-model="scope.row.uniqueFansCount"
                         @blur="edituniqueFansCount(scope.$index, scope.row)">
                        <label :for="scope.row.id+'unfans'">
                            <img src="../../../../static/img/edit.png" class="editimg">
                        </label>
                    </template>
                </el-table-column>
                <el-table-column prop="userimg" label="头像" width="100">
                	<template slot-scope="scope">
                        <img :src="scope.row.thumb" class="userimg">
                        <a href="javascript:;"  class="file">
                            <form  enctype="multipart/form-data" class="formupload">
                                <input type="file" class="form-control upload" @change="onFileChange($event,scope.row)" ref="imgUpload">
                            </form>                            
                        </a>
                	</template>
                </el-table-column>
                <el-table-column label="报价/元" width="120">
                	<template slot-scope="scope">
                		<input type="text" name="price" class="fanscount" :id="scope.row.id+'price'" v-model="scope.row.price"
                        @blur="editPrice(scope.$index, scope.row)">
                    	<label :for="scope.row.id+'price'">
                            <img src="../../../../static/img/edit.png" class="editimg">
                        </label>
                	</template>
                </el-table-column>
                <el-table-column prop="log" label="日志" width="80">
                	<template slot-scope="scope" @click="look_screen" >
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
          // const self = this;
            return {
                num:1,
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
        	this.getData();
        	
        },
        methods:{
            look_screen(){
                // console.log("点击查看了")
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
	        	that.$axios.get("/users/pages?page="+that.pageInfo.page+"&role=2&auditStatus=1&per_page="+that.pageInfo.per_page+"&search="+that.search_word)
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
            enterPub(){
                this.getData();
            },
            //修改粉丝数
            editfansCount(index,row){
                console.log(row.id);
                console.log(row.fansCount);
                var that=this;
                that.$axios.put("/users/updateFansCount/"+row.id+"/"+row.fansCount)
                .then(function(res){
                    console.log(res.data);
                    that.getData();
                },function(err){
                    console.log(err);
                }).catch(function(error){
                    console.log(error);
                })
            },
            //修改去水粉丝数
            edituniqueFansCount(index,row){
                console.log(row.id);
                console.log(row.uniqueFansCount);
                var that=this;
                that.$axios.put("/users/updateUniqueFansCount/"+row.id+"/"+row.uniqueFansCount)
                .then(function(res){
                    console.log(res.data);
                    that.getData();
                },function(err){
                    console.log(err);
                }).catch(function(error){
                    console.log(error);
                })
            },
            //修改价格
            editPrice(index,row){
                console.log(row.id);
                console.log(row.price);
                var that=this;
                that.$axios.put("/users/updatePrice/"+row.id+"/"+row.price)
                .then(function(res){
                    console.log(res.data);
                    that.getData();
                },function(err){
                    console.log(err);
                }).catch(function(error){
                    console.log(error);
                })
            },
            //修改备注
            editRemark(index,row){
                // console.log(row);
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

            //上传图片 修改头像
            onFileChange(e,row) { 
                var formData = new FormData(); 
                console.log(e.target.files[0]);
                var file=e.target.files[0];
                formData.append('file', file,file.name);

                const that=this;
                var rowData=row;
                that.$axios.post("/users/upload",formData)
                .then(function(res){
                  console.log(res.data);
                  if(res.data.resultCode==1){
                    console.log(res.data.message);
                    console.log(rowData.id);
                    for(var i=0;i<that.tableData3.length;i++){
                        if(that.tableData3[i].id==rowData.id){
                            that.tableData3[i].thumb=res.data.message;
                        }
                    }
                  }
                  // alert("上传成功");
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

    .file {
        width:16px;
        height:16px;
        position: relative;
        display: inline-block;
        border-radius: 4px;
        overflow: hidden;
        margin-bottom:12px;
        background-image: url(../../../../static/img/edit.png);
        background-size: cover
    }
    .file input {
        width:100%;
        height:100%;
        position: absolute;
        font-size: 100px;
        right: 0;
        top: 0;
        opacity: 0;
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
  .el-pager li.active{
  	background-color:rgba(255, 0, 0, 1);
  	border-color:rgba(255, 0, 0, 1);
  }
  .el-pager li.hover{
  	color:#fff;
  }
</style>