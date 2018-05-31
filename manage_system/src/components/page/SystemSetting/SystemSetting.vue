<template>
	<div>
		<div class="spread">
			<div class="title">开屏</div>
			<img :src="splash" class="spread_img">
			<a href="javascript:;"  class="file">
				<input type="file" class="form-control upload" @change="uploadSplash" accept="image/*">上传
			</a>
			<div class="solid"></div>
		</div>
		<!-- <hr /> -->

		<div class="contact">
			<div class="title">联系客服</div>
			<el-form>
		        <el-form-item label="客服电话：" label-width="formLabelWidth">
		        	<el-input v-model="tel" auto-complete="off" style="width: 200px;" ></el-input>
		        	<el-button type="danger"  @click="saveTelphone" class="save_btn" size="mini">保存</el-button>
	    	    </el-form-item>
	    	</el-form>
	    	<div class="solid"></div>
		</div>
		<div class="trade">
			<div class="title">行业类别</div>
			<div class="trade_item">
				<el-button  style="margin-right:10px;" @click="check_trade(item)"  size="mini" v-for="item in trades" :key="item.id" :class="item.visable==1?'trade_item_white':'trade_item_red'">{{item.name}}</el-button>
			</div>
			<div class="addTrade">
				<el-input v-model="addTradeName" auto-complete="off" style="width: 200px;" placeholder="输入新行业类别"></el-input>
		        <el-button type="danger"  @click="addTrade" class="save_btn" size="mini">+新增行业</el-button>
			</div>
			<div class="solid"></div>
		</div>
		<!-- <hr /> -->
		<div class="param">
			<div class="title">参数设置</div>
			<div class="paramSetting">
				<span class="text">议题趋势参数：</span>
				<div class="paramEdit">
					<el-form>
				        <el-form-item label="时间段T：" label-width="formLabelWidth">
				        	<el-input v-model="t" auto-complete="off" style="width: 72px;" ></el-input><span class="hour">小时</span>
			    	    </el-form-item>
			    	     <el-form-item label="系数n：" label-width="formLabelWidth" class="n_right">
				        	<el-input v-model="n" auto-complete="off" style="width: 72px;" ></el-input>
			    	    </el-form-item>
			    	</el-form>
				</div>
				<el-button type="danger"  @click="saveSystemparam" class="save_btn" size="mini">保存</el-button>
			</div>
		</div>

	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				tel:'',
				width:'300',
				splash:'',
				trades:[],
				t:'',
				n:'',
				addTradeName:'',
			
			}
		},
		created(){
			this.getData();
			this.getTrade();
		},
		methods:{
			//获取页面数据
			getData(){
				var that=this;
                that.$axios.get("/system/setting")
                .then(function(res){
                	console.log(res.data);
                	that.splash=res.data[0].splash;
                	console.log(that.splash)
                	that.tel=res.data[0].hotline;
                	that.t=res.data[0].t;
                	that.n=res.data[0].n;
                },function(err){
                	console.log(err);
                }).catch(function(error){
                	console.log(error);
                })
			},
			//获取所有行业
			getTrade(){
				var that=this;
                that.$axios.get("/system/alltrades")
                .then(function(res){
                	console.log(res.data);
                	that.trades=res.data;
                },function(err){
                	console.log(err);
                }).catch(function(error){
                	console.log(error);
                })
			},
			//修改行业(选中)
			check_trade(item){
				console.log(item.id);
				console.log(item.name);
				var that=this;
				var visable;
				if(item.visable==0){
					visable=1;
				}else{
					visable=0;
				}
                that.$axios.put("/system/visTrades/"+item.id+"/"+visable)
                .then(function(res){
                	console.log("修改成功")
                	console.log(res.data);
                	that.getTrade();
                },function(err){
                	console.log(err);
                }).catch(function(error){
                	console.log(error);
                })
			},
			//新增行业
			addTrade(){
				var that=this;
                that.$axios.post("/system",{
                	name:that.addTradeName,
                })
                .then(function(res){
                	console.log(res.data);
                	that.getTrade();
                	alert("添加行业成功");
                },function(err){
                	console.log(err);
                	alert("添加行业失败");
                }).catch(function(error){
                	console.log(error);
                })
			},
			//修改启动图片
			uploadSplash(e){
                var formData = new FormData(); 
                console.log(e.target.files[0]);
                var file=e.target.files[0];
                formData.append('file', file,file.name);
                const that=this;
                that.$axios.post("/users/upload",formData)
                .then(function(res){
                  console.log(res.data);
                  if(res.data.resultCode==1){
                    console.log(res.data.message);
                    var url=res.data.message;
                    // alert("获取url成功");
                    console.log(url);
                    that.$axios.put("/system/splash/?splash="+url)
	                .then(function(res){
	                  console.log(res.data);
	                  that.splash=res.data[0].splash;
	                  console.log(that.splash);
	                  alert("上传成功");
	                },function(err){
	                  console.log(err);
	                  console.log("上传失败");
	                }).catch(function(error){
	                  console.log(error);
	                })
                  }  
                },function(err){
                  console.log(err);
                }).catch(function(error){
                  console.log(error);
                })
			},
			//修改客服电话
			saveTelphone(){
				// console.log("修改电话");
				var that=this;
                that.$axios.put("/system/hotline/"+that.tel)
                .then(function(res){
                	alert("保存成功");
                	console.log(res.data);
                },function(err){
                	console.log(err);
                }).catch(function(error){
                	console.log(error);
                })
			},
			//修改系统参数
			saveSystemparam(){
				console.log("修改系统参数")
				var that=this;
                that.$axios.put("/system/params/"+that.n+"/"+that.t)
                .then(function(res){
                	console.log(res.data);
                	that.n=res.data[0].n;
                	that.t=res.data[0].t;
                	alert("保存成功")
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
	.spread_img{
		width:157px;
		height:274px;
	}
	.file {
		width:26px;
		height:18px;
	    position: relative;
	    display: inline-block;
	    background: rgba(255, 0, 0, 1);
	    /*border: 1px solid #99D3F5;*/
	    border-radius: 4px;
	    padding: 4px 12px;
	    overflow: hidden;
	    color: #fff;
	    text-decoration: none;
	    text-indent: 0;
	    line-height: 18px;
	    font-size:13px;
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
	.save_btn{
		background:rgba(255, 0, 0, 1);
	}
	.trade_item_red{
		color:#fff;
		background:rgba(255, 0, 0, 1);
		border-color:rgba(255, 0, 0, 1);
	}
	.trade_item_white{
		background-color: #fff;
		color:#333;
		border-color:rgba(153, 153, 153, 1);
	}
	.spread{
		margin-bottom:20px;
		padding-top:40px;
		position:relative;
	}
	.spread .title{
		position:absolute;
		left:-30px;
		top:-20px;
	}
	.contact{
		margin-bottom:20px;
		/*padding-top:40px;*/
		position:relative;
	}
	.contact .title{
		position:absolute;
		left:-30px;
		top:15px;
	}
	.contact .el-form{
		margin-top:50px;
	}
	.trade{
		margin-bottom:20px;
		/*padding-top:40px;*/
		position:relative;
	}
	.trade .title{
		position:absolute;
		left:-30px;
		top:15px;
	}
	.trade .trade_item{
		margin-top:50px;
	}
	.param{
		margin-bottom:20px;
		/*padding-top:40px;*/
		position:relative;
	}
	.param .title{
		position:absolute;
		left:-30px;
		top:15px;
	}
	.param .paramSetting{
		margin-top:50px;
	}
	.title{
		width:110px;
		height:35px;
		background-color: rgba(255, 0, 0, 1);
		font-size:13px;
		color:#fff;
		line-height: 35px;
		text-align: center;
		margin-bottom:28px;

		/*position:absolute;
		left:10px;
		top:0;*/
		/*left:-28px;
		top:-20px;*/
		
	}
	.contact{
		padding:20px 0;

	}
	.trade{
		padding-top:20px;
	}
	.trade_item .el-button--mini{
		width:auto;
		border-radius: 2px;
		margin-bottom:15px;
	}
	.el-button+.el-button{
		margin-left:0;
	}
	.addTrade{
		margin-top:30px;
		margin-bottom:40px;

	}
	.param{
		margin-bottom: 400px;
		padding-top:20px;
	}
	.paramSetting:after{  
	  content:"";  
	　height:0;  
	　visibility:hidden;  
	　display:block;  
	　clear:both;  
	}  
	.text{
		float:left;
		font-family: 'PingFangSC-Regular', 'PingFang SC';
		font-size:14px;
	}
	.paramEdit{
		width:413px;
		height:125px;
		border:1px solid rgba(204, 204, 204, 1);
		float: left;
	}
	.el-form{
		margin-top:10px;
		margin-left:10px;
	}
	.n_right{
		padding-left:15px;
	}
	.hour{
		margin-left:10px;
	}
	.paramSetting .save_btn{
		margin-top:105px;
		margin-left:10px;
	}

	.solid{
		width:100%;
		height:1px;
		box-shadow: 2px 2px 2px #ccc;
		position:absolute;
		left:-30px;
		margin-top:12px;
	}
	.contact .solid{
		margin-top:25px;
	}
	.trade .solid{
		margin-top:-10px;
	}
</style>
<style type="text/css" scoped>
	/*.content{
		margin:0;
		padding:0;
	}*/
</style>
