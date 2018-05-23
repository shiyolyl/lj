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
                    <el-input v-model="search_word" placeholder="输入关键词" class="handle-input mr10" id="select" @keyup.enter.native="enterTopic"></el-input>
                    <el-button type="danger" icon="search" @click="search">搜索</el-button>
                </div>
            </div>
            <el-button type="danger" @click="auditManyPass" class="checkmore_btn">批量通过</el-button>
            <el-button type="danger" @click="auditManyReject" class="checkmore_btn">批量拒绝</el-button>
            <el-table :data="tableData3" border style="width: 100%" max-height="800" :default-sort="{prop:'date', order:'descending'}" 
            @selection-change="handleSelectionChange">
            	<el-table-column type="selection"  :reserve-selection="true" width="50"></el-table-column>
                <el-table-column prop="id" label="ID" width="80"></el-table-column>
                <el-table-column prop="createTime" label="议题日期" sortable width="150"></el-table-column>
                <el-table-column prop="title" label="议题名称" width="200"></el-table-column>
                <el-table-column prop="event" label="事件名称" width="200"></el-table-column>
                <el-table-column prop="tradeName" label="所属行业" width="120">
                	<template slot-scope="scope">
                        <!-- <input type="text" name="industry" class="industry" id="fansc" v-model="scope.row.tradeName"> -->
                        <el-select v-model="scope.row.tradeName">
                          <el-option v-for="(item,index) in allTrades"  :key="index" :label="item.name" :value="item.name"></el-option>
                        </el-select>
                        <!-- <label for="fansc">
                            <img src="../../../../static/img/edit.png" class="editimg">
                        </label> -->
                    </template>
                </el-table-column>
                <el-table-column prop="topicOrigin" label="议题来源" width="120"></el-table-column>
                <el-table-column prop="creater" label="创建者" width="150"></el-table-column>
                <el-table-column prop="desc" label="议题说明"></el-table-column>
                <el-table-column prop="operation" label="操作" width="150">
	                <template slot-scope="scope">
	                    <el-button size="small" type="primary" @click="handlePass(scope.$index, scope.row)">通过</el-button>
	                    <el-button size="small" type="primary" @click="handleReject(scope.$index, scope.row)">拒绝</el-button>
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
          	  // total:1000,
          	  // page_sizes:[10,15,20,25,30],
          	  // cur_page: 1,
          	  // select_per:10,
             //  select_word: '',

            pageInfo:{
                page_sizes:[5,10,15,20,25,30], //每页显示多少条的用户选择数组
                per_page:5, //每页显示几个 前端传 从用户页面获取  
                page:1,//当前要渲染的第几页  前端传
                

                total:1,  //总条数 后台获取
                current_page: 1, //当前页  后台获取
            },
            search_word: '', //搜索关键词 前端传search

          	tableData3:[],
            allTrades:[],

          	multipleSelection: [],

              // tableData3: [{
              //     id: '0001',
              //     topicDate: '2018.04.01',
              //     topicName: '议题名称显示全部议题名称显示全部议题',
              //     eventName:'事件名称显示全部事件名称显示全部',
              //     industry:'汽车',
              //     topicOrigin:'KOL',
              //     creater:'公众号名称',
              //     topicDescr:'议题说明议题说明',
              //     operation:'',

              //   }, {
              //     id: '0001',
              //     topicDate: '2018.04.03',
              //     topicName: '议题名称显示全部议题名称显示全部议题',
              //     eventName:'事件名称显示全部事件名称显示全部',
              //     industry:'汽车',
              //     topicOrigin:'KOL',
              //     creater:'公众号名称',
              //     topicDescr:'议题说明议题说明',
              //     operation:'',
              //   },
              //   ],
            }
        },
        created(){
          this.getallTrades();
        	this.getData();
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


            //获取数据列表
            getData(){
            	var that=this;
                //请求未审核的公众号
                that.$axios.get("/topics/pages?page="+that.pageInfo.page+"&auditStatus=0&per_page="+that.pageInfo.per_page+"&search="+that.search_word)
                .then(function(res){
                    console.log(res.data);
                    console.log(that.pageInfo);
                    that.pageInfo.total=res.data.pagination.total;
                    that.pageInfo.current_page=res.data.pagination.current_page;
                    that.tableData3=res.data.data;
                    for(var i=0;i<that.tableData3.length;i++){
	                  var dataObj=that.tableData3[i];
	                  if(dataObj.userId==0){ 
	                    that.$set(dataObj,'topicOrigin','公社推荐议题')
	                  }else{
	                    that.$set(dataObj,'topicOrigin','KOL原创议题')
	                  }
	                }
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
            enterTopic(){
              this.getData();
            },
            //审核议题
            handlePass(index,row){
            	console.log(row.id);
                var that=this;
                that.$axios.put("/topics/audit/"+row.id+"/1")
                .then(function(res){
                    console.log(res.data);
                    //审核成功后刷新页面
                    that.getData();
                },function(err){
                    console.log(err);
                }).catch(function(error){
                    console.log(error);
                })
            },
            handleReject(index,row){
            	console.log(row.id);
                // console.log(row.remark);
                // if(row.remark==""){
                //     alert("请在备注中输入拒绝理由");
                //     return;
                // }
                var that=this;
                that.$axios.put("/topics/audit/"+row.id+"/2")
                .then(function(res){
                    console.log(res.data);
                    that.getData();
                },function(err){
                    console.log(err);
                }).catch(function(error){
                    console.log(error);
                })
            },
            //批量审核议题
            handleSelectionChange(val){
            	this.multipleSelection=val;
            	console.log(this.multipleSelection);
            },
            //获取选中的id
            getSelectedIds(){
                let ids=[];
                this.multipleSelection.map((item)=> {
                    ids.push(item.id)
                });
                var idsStr=ids.join(",");
                console.log(idsStr)
                return idsStr;
 			},
 			//点击批量审核通过
 			auditManyPass(){
 				if(this.getSelectedIds()==""){
	        		alert("请选择要批量审核的数据");
	        		return;
	        	};
 				this.$confirm('确定批量通过吗?', '批量通过', {
			        confirmButtonText: '确定',
			        cancelButtonText: '取消',
			        type: 'warning'
		        }).then(() => {

	 				var that=this;
	                that.$axios.put("/topics/batchAudit/"+this.getSelectedIds()+"/1")
	                .then(function(res){
	                    console.log(res.data);
	                    this.$message({
			            	type: 'success',
			            	message: '批量通过成功!'
			            });
	                },function(err){
	                    console.log(err);
	                    this.$message({
			            	type: 'success',
			            	message: '批量通过失败!'
			            });
	                }).catch(function(error){
	                    console.log(error);
	                })

		            
		        }).catch(() => {
		          	this.$message({
		            	type: 'info',
		            	message: '已取消批量审核'
		          });          
		        });

 				
 			},
 			//点击批量审核拒绝
 			auditManyReject(){
 				if(this.getSelectedIds()==""){
	        		alert("请选择要批量审核的数据");
	        		return;
	        	};
 				this.$prompt('请输入拒绝理由', '批量拒绝', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	// inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
		          	// inputErrorMessage: '邮箱格式不正确'
		        }).then(({ value }) => {
		          	// this.$message({
		           //  	type: 'success',
		           //  	message: '你的邮箱是: ' + value
		          	// });
		          	var that=this;
	                that.$axios.put("/topics/batchAudit/"+this.getSelectedIds()+"/2/"+value)
	                .then(function(res){
	                    console.log(res.data);
	                    alert("批量拒绝成功")
	                },function(err){
	                    console.log(err);
	                    alert("批量拒绝失败");
	                }).catch(function(error){
	                	console.log(error);
	                    
	                })


		        }).catch(() => {
		          	this.$message({
		            	type: 'info',
		            	message: '已取消批量审核'
		          	});       
		        });
 			},
     //获取所有行业
      getallTrades(){
        var that=this;
          that.$axios.get("/system/trades")
          .then(function(res){
            console.log(res.data);
            that.allTrades=res.data;
        },function(err){
          console.log(err);
        }).catch(function(error){
          console.log(error);
        })
      },


   //          handleSelectionChange(val,row){
			//     /* 1 => add ; 0 => remove*/
			//     let flag = 0;
			//     console.log(val);
			//     console.log(row);
			//     for(let i in val){
			//         if(row.id === val[i].id){
			//             flag = 1
			//             break;
			//         }
			//     }
			//     if(flag === 1){
			//         this.selectedArr.push(row);
			//     }else{
			//         for(let i in this.selectedArr){
			//             if(this.selectedArr[i].id == row.id)
			//                 this.selectedArr.splice(i, 1);
			//         }
			//     }
			// },
			// selectAll(val){
			//     var v = this;
			//     //remove
			//     if(val.length == 0){
			//         for(let i in v.tableData){
			//             for(let j in v.selectedArr){
			//                 if(v.selectedArr[j].id === v.tableData[i].id){
			//                     v.selectedArr.splice(j, 1);
			//                     break;
			//                 }
			//             }
			//         }
			//     }
			//     if(v.selectedArr.length == 0){
			//         for(let i in val){
			//             v.selectedArr.push(val[i]);
			//         }
			//     }
			//     else{
			//         for(let i in val){
			//             let flag = false;
			//             for(let j in v.selectedArr){
			//                 if(v.selectedArr[j].id === val[i].id){
			//                     flag = true;
			//                     break;
			//                 }
			//             }
			//             if(!flag)
			//                 v.selectedArr.push(val[i]);
			//         }
			//     }
			// },
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

    .industry{
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
  .checkmore_btn{
  	background-color:rgba(255, 0, 0, 1);
  	width:77px;
  	height:30px;
  	line-height:80%;
  	padding:0 10px;
  	border-radius: 2px;
  	margin-bottom:10px;
  }
  .sort-caret .ascending{
  	/*background-color:#fff;*/
  }
  .caret-wrapper i{
  	/*background-color:#fff;*/
  }
</style>