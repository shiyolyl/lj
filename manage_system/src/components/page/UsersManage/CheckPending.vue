<template>
    <div>
        <template>
            <div class="pubcount">
                <el-badge :value="pub.count" class="item">
                </el-badge>
            </div>
            <div class="advcount">
                <el-badge :value="adv.count" class="item" style="display:block;">
                </el-badge>
            </div>
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="待审核公众号" name="first">

                    <div class="table">
                        <div class="handle-box">
                            <div>
                                <span>每页展示：</span>
                                <el-select v-model="pub.pageInfo.per_page" placeholder="10" class="handle-select mr10" @change="selectChangePub">
                                    <el-option v-for="(item,index) in pub.pageInfo.page_sizes"  :key="index" :label="item" :value="item">{{item}}</el-option>
                                </el-select>
                                <span>条</span>
                            </div>
                            <div>
                                <el-input v-model="pub.search_word" placeholder="输入关键词" class="handle-input mr10" id="select" @keyup.enter.native="enterPub"></el-input>
                                <el-button type="danger" icon="search" @click="searchPub">搜索</el-button>
                            </div>
                        </div>
                        <el-table :data="pub.tableData3" border style="width: 100%" max-height="800">
                            <el-table-column prop="id" label="ID" width="80"></el-table-column>
                            <el-table-column prop="name" label="公众号名称" width="120"></el-table-column>
                            <el-table-column prop="contact" label="联系人" width="100"></el-table-column>
                            <el-table-column prop="mobile" label="电话" width="130"></el-table-column>
                            <el-table-column prop="email" label="邮箱" width="190"></el-table-column>
                            <el-table-column label="粉丝数/人" width="120">
                                <template slot-scope="scope">
                                    <input type="text" name="fanscount" class="fanscount" :id="scope.row.id+'fans'" v-model="scope.row.fansCount" 
                                    @blur="editfansCount(scope.$index, scope.row)">
                                    <label :for="scope.row.id+'fans'">
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
                            <el-table-column prop="userimg" label="头像" width="100" class="userimg_wrap">
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
                            <el-table-column  label="主页截图" width="100">
                                <template slot-scope="scope" >
                                    <span class="look_screen" @click="look_screen(scope.$index, scope.row)">查看</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="operation" label="操作" width="140">
                                <template slot-scope="scope">
                                    <el-button size="small" type="primary" @click="handlePass(scope, scope.row)">通过</el-button>
                                    <el-button size="small" type="primary" @click="handleReject(scope.$index, scope.row)">拒绝</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column prop="remark" label="备注" width="230">
                                <template slot-scope="scope">
                                    <textarea :id="scope.row.id+'pubremark'" class="remark_text" v-model="scope.row.remark" @blur="editRemark(scope.$index, scope.row)"></textarea>
                                    <label :for="scope.row.id+'pubremark'" class="editBtn">编辑</label>
                                </template>
                            </el-table-column>
                        </el-table>

                        <el-pagination background layout="total, sizes, prev, pager, next, jumper"  
                            @current-change ="handleCurrentChangePub"
                            @size-change="pageSizeChangePub"
                            :current-page="pub.pageInfo.current_page"
                            :total="pub.pageInfo.total"
                            :page-size="pub.pageInfo.per_page"
                            :page-sizes="pub.pageInfo.page_sizes" class="pagination">
                        </el-pagination>
                    </div>
                    <div class="domainthumb" id="domainthumb" v-if="showimg">
                        <img :src="domainthumbUrl" @mousedown="start" @mouseup="stop" @mousemove="move" :style="dragimg.style">
                    </div>
                </el-tab-pane>

                <el-tab-pane label="待审核广告主" name="second">
                    <div class="table">
                        <div class="handle-box">
                            <div>
                                <span>每页展示：</span>
                                <el-select v-model="adv.pageInfo.per_page" placeholder="10" class="handle-select mr10" @change="selectChangeAdv">
                                    <el-option v-for="(item,index) in adv.pageInfo.page_sizes"  :key="index" :label="item" :value="item">{{item}}</el-option>
                                </el-select>
                                <span>条</span>
                            </div>
                            <div>
                                <el-input v-model="adv.search_word" placeholder="输入关键词" class="handle-input mr10" id="select" @keyup.enter.native="enterAdv"></el-input>
                                <el-button type="danger" icon="search" @click="searchAdv">搜索</el-button>
                            </div>
                        </div>
                        <el-table :data="adv.tableData3" height="250" border style="width: 100%" max-height="800">
                            <el-table-column prop="id" label="ID" width="80"></el-table-column>
                            <el-table-column prop="name" label="广告主名称" width="150"></el-table-column>
                            <el-table-column prop="brand" label="品牌名称" width="100"></el-table-column>
                            <el-table-column prop="contact" label="联系人" width="100"></el-table-column>
                            <el-table-column prop="mobile" label="电话" width="150"></el-table-column>
                            <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
                            <el-table-column prop="operation" label="操作" width="150">
                                <template slot-scope="scope">
                                    <el-button size="small" type="primary" @click="handlePass(scope.$index, scope.row)">通过</el-button>
                                    <el-button size="small" type="primary" @click="handleReject(scope.$index, scope.row)">拒绝</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column prop="remark" label="备注" width="230">
                                <template slot-scope="scope">
                                    <textarea :id="scope.row.id+'advremark'" class="remark_text" v-model="scope.row.remark" @blur="editRemark(scope.$index, scope.row)"></textarea>
                                    <label :for="scope.row.id+'advremark'" class="editBtn">编辑</label>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination background layout="total, sizes, prev, pager, next, jumper"  
                            @current-change ="handleCurrentChangeAdv"
                            @size-change="pageSizeChangeAdv"
                            :current-page="adv.pageInfo.current_page"
                            :total="adv.pageInfo.total"
                            :page-size="adv.pageInfo.per_page"
                            :page-sizes="adv.pageInfo.page_sizes" class="pagination">
                        </el-pagination>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </template>
        
     
    </div>

</template>

<script>
    import axios from 'axios';
    
    export default {

        data() {
          const self = this;
          return {
              activeName: 'first', //默认显示的tab

              pub:{
                pageInfo:{
                    page_sizes:[5,10,15,20,25,30], //每页显示多少条的用户选择数组
                    per_page:5, //每页显示几个 前端传 从用户页面获取  
                    page:1,//当前要渲染的第几页  前端传
                    total:1,  //总条数 后台获取
                    current_page: 1, //当前页  后台获取
                },
                search_word: '', //搜索关键词 前端传search
                tableData3:[],
                count:'1',
                
              },
              adv:{
                pageInfo:{
                    page_sizes:[5,10,15,20,25,30], //每页显示多少条的用户选择数组
                    per_page:5, //每页显示几个 前端传 从用户页面获取  
                    page:1,//当前要渲染的第几页  前端传
                    total:1,  //总条数 后台获取
                    current_page: 1, //当前页  后台获取
                },
                search_word: '', //搜索关键词 前端传search
                tableData3:[],
                count:'0',
              },

              //公众号主页截图：
              domainthumbUrl:"../../../../static/img/domainthumb.png",
              showimg:false,

              dragimg:{
                canDrag: false,
                x0:0,
                y0:0,
                x1:0,
                y1:0,
                style:null
              }


              // tableData3: [{
              //     id: '0001',
              //     name: '咪蒙',
              //     contact: '李瑞清',
              //     mobile:'18311341134',
              //     email:'15781919682@qq.com',
              //     fans:'300',
              //     lostfans:'100',
              //     userimg:'',
              //     price:'200',
              //     screenshot:'2222',
              //     operation:'',
              //     remark:'啦啦啦',

              //   }, {
              //     id: '0001',
              //     name: '咪蒙',
              //     contact: '李瑞清',
              //     mobile:'18311341134',
              //     email:'15781919682@qq.com',
              //     fans:'300',
              //     lostfans:'100',
              //     userimg:'',
              //     price:'200',
              //     screenshot:'2222',
              //     operation:'',
              //     remark:'啦啦啦',
              //   },
              //   ],
            }
        },
        created(){
            this.getDataPub();
            this.getDataAdv();
        },
        methods:{
            look_screen(index,row){
                console.log("点击查看了")
                console.log(index);
                console.log(row.domainThumb);
                this.domainthumbUrl=row.domainThumb;
                this.showimg=true;
            },

            handleClick(tab, event) {    //tab标签
                console.log(tab, event);
            },

           //每页显示条数事件（表格上面）
            selectChangePub(val){
                this.getDataPub();
            },
            //每页显示条数（分页器中自带的）
            pageSizeChangePub(val){
                console.log(val);
                this.pub.pageInfo.per_page = val;
                this.getDataPub();
            },
            //分页按钮 点击上一页及下一页 或者指定页码
            handleCurrentChangePub(val){
                console.log(val);
                this.pub.pageInfo.page = val;
                this.getDataPub();
            },
            //每页显示条数事件（表格上面）
            selectChangeAdv(val){
                this.getDataAdv();
            },
            //每页显示条数（分页器中自带的）
            pageSizeChangeAdv(val){
                console.log(val);
                this.adv.pageInfo.per_page = val;
                this.getDataAdv();
            },
            //分页按钮 点击上一页及下一页 或者指定页码
            handleCurrentChangeAdv(val){
                console.log(val);
                this.adv.pageInfo.page = val;
                this.getDataAdv();
            },

            //获取列表数据
            //请求未审核的公众号
            getDataPub(){
                var that=this;
                that.$axios.get("/users/pages?page="+that.pub.pageInfo.page+"&role=2&auditStatus=0&per_page="+that.pub.pageInfo.per_page+"&search="+that.pub.search_word)
                .then(function(res){
                    console.log(res.data);
                    console.log(that.pub.pageInfo);
                    that.pub.pageInfo.total=res.data.pagination.total;
                    that.pub.pageInfo.current_page=res.data.pagination.current_page;
                    that.pub.tableData3=res.data.data;
                    that.pub.count=res.data.data.length;
                    console.log(that.pub.tableData3);

                },function(err){
                    console.log(err);
                }).catch(function(error){
                    console.log(error);
                })
            },
            //请求未审核的广告主
            getDataAdv(){
                var that=this;
                that.$axios.get("/users/pages?page="+that.adv.pageInfo.page+"&role=1&auditStatus=0&per_page="+that.adv.pageInfo.per_page+"&search="+that.adv.search_word)
                .then(function(res){
                    console.log(res.data);
                    console.log(that.adv.pageInfo);
                    that.adv.pageInfo.total=res.data.pagination.total;
                    that.adv.pageInfo.current_page=res.data.pagination.current_page;
                    that.adv.tableData3=res.data.data; 
                    that.adv.count=res.data.data.length;
                    console.log(that.adv.tableData3);

                },function(err){
                    console.log(err);
                }).catch(function(error){
                    console.log(error);
                })
            },
            //搜索
            searchPub(){
                this.getDataPub();
            },
            enterPub(){
                // console.log("回车");
                this.getDataPub();
            },
            searchAdv(){
                this.getDataAdv();
            },
            enterAdv(){
                this.getDataAdv();
            },

            //审核（通过与拒绝）（公众号和广告主）
            handlePass(index,row){
                console.log(row.id);
                var that=this;
                that.$axios.put("/users/audit/"+row.id+"/1")
                .then(function(res){
                    console.log(res.data);
                    //审核成功后刷新页面
                    if(row.role==2){ 
                        that.getDataPub();
                    }else{
                        that.getDataAdv();
                    }
                    
                },function(err){
                    console.log(err);
                }).catch(function(error){
                    console.log(error);
                })
            },
            handleReject(index,row){
                console.log(row.id);
                console.log(row.remark);
                if(row.remark==""){
                    alert("请在备注中输入拒绝理由");
                    return;
                }
                var that=this;
                that.$axios.put("/users/audit/"+row.id+"/2/"+row.remark)
                .then(function(res){
                    console.log(res.data);
                    if(row.role==2){
                        that.getDataPub();
                    }else{
                        that.getDataAdv();
                    }
                },function(err){
                    console.log(err);
                }).catch(function(error){
                    console.log(error);
                })
            },

            //修改粉丝数（公众号）
            editfansCount(index,row){
                console.log(row.id);
                console.log(row.fansCount);
                var that=this;
                that.$axios.put("/users/updateFansCount/"+row.id+"/"+row.fansCount)
                .then(function(res){
                    console.log(res.data);
                    that.getDataPub();
                },function(err){
                    console.log(err);
                }).catch(function(error){
                    console.log(error);
                })
            },
            //修改去水粉丝数（公众号）
            edituniqueFansCount(index,row){
                console.log(row.id);
                console.log(row.uniqueFansCount);
                var that=this;
                that.$axios.put("/users/updateUniqueFansCount/"+row.id+"/"+row.uniqueFansCount)
                .then(function(res){
                    console.log(res.data);
                    that.getDataPub();
                },function(err){
                    console.log(err);
                }).catch(function(error){
                    console.log(error);
                })
            },
            //修改价格（公众号）
            editPrice(index,row){
                console.log(row.id);
                console.log(row.price);
                var that=this;
                that.$axios.put("/users/updatePrice/"+row.id+"/"+row.price)
                .then(function(res){
                    console.log(res.data);
                    that.getDataPub();
                },function(err){
                    console.log(err);
                }).catch(function(error){
                    console.log(error);
                })
            },
            //修改备注（公众号和广告主）
            editRemark(index,row){
                console.log(row.id);
                console.log(row.remark);
                var that=this;
                that.$axios.put("/users/updateRemark/"+row.id+"/"+row.remark)
                .then(function(res){
                    console.log(res.data);
                    if(row.role==2){
                        that.getDataPub();
                    }else{
                        that.getDataAdv();
                    }
                    
                },function(err){
                    console.log(err);
                }).catch(function(error){
                    console.log(error);
                })
            },
            //上传图片 修改头像（公众号）
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
                    for(var i=0;i<that.pub.tableData3.length;i++){
                        if(that.pub.tableData3[i].id==rowData.id){
                           that.pub.tableData3[i].thumb=res.data.message;
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


            


            //拖动图片
            start(e){
                //鼠标左键点击
                if(e.button==0){
                    this.dragimg.canDrag=true;
                    //记录鼠标指针位置
                    this.dragimg.x0=e.clientX;
                    this.dragimg.y0=e.clientY;
                }
            },
            stop(e){
                this.dragimg.canDrag=false;
            },
            move(e){
                if(this.dragimg.canDrag==true){
                    this.dragimg.x1=e.clientX;
                    this.dragimg.y1=e.clientX;

                    let x=this.dragimg.x1-this.dragimg.x0;
                    let y=this.dragimg.y1-this.dragimg.y0;

                    let imgdiv=document.querySelector("#domainthumb");
                    this.dragimg.style=`left:${imgdiv.offsetLeft+x}px;top:${imgdiv.offsetTop+y}px`;
                    this.dragimg.x0=this.dragimg.x1;
                    this.dragimg.y0=this.dragimg.y1;
                }
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
        margin:5px 0px;
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
        margin-top:5px;
    }
    .remark_text{
      width:80%;
      height:60px;
      border:none;
      resize:none;
    }
    .domainthumb{
        width:640px;
        height:348px;
        /*display:none;*/
        border:1px solid #ccc;

        position:absolute;
        left:0;
        right:0;
        z-index:9999;
    }
    body{
        position:relative;
    }
    .domainthumb img{
        width:100%;
        height:100%;
        display:block;
    }
    .pubcount{
        position:absolute;
        left:145px;
        top:30px;
        z-index:9999;
    }
    .advcount{
        position:absolute;
        left:260px;
        top:30px;
        z-index:9999;
        display:block;
    }
    /*.el-badge__content{
        display:block;
    }
    */
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
    
</style>
<style type="text/css">
    .el-table__footer-wrapper thead div, .el-table__header-wrapper thead div{
      background-color:rgba(255, 0, 0, 1);
      color:#fff;
      font-weight:normal;
    }
</style>
<style type="text/css">
    .el-tabs__item.is-active{
        color:rgb(255, 0, 0);
    }

</style>
<style type="text/css">
    .el-tabs__content{
        overflow: visible;
        
    }
</style>
<style type="text/css">
    .el-badge{
        display:block;
    }
    .el-badge sup{
        display:block!important;
    }
</style>



