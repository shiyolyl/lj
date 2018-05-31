<template>
	<div class="container">
		<div class="modify_sidebar">
			<div class="modify_pw"><img class="pwimg" src="../../../static/img/pw.png">修改密码</div>
		</div>
		<div class="modify_content">
			<div class="modify_wrapper">
				<form>
					<div class="mp past_pw"><span class="space">旧密码：</span><input v-model="pwForm.oldPw" type="password" name="password" placeholder="请输入旧密码"></div>
					<div class="mp new_pw"><span class="space">新密码：</span><input v-model="pwForm.newPw" type="password" name="password" placeholder="请输入新密码"></div>
					<div class="mp confirm_pw"><span>确认密码：</span><input v-model="pwForm.confirmnewPw" type="password" name="password" placeholder="请再次确认新密码"></div>
				</form>
				<div class="save_btn" @click="save">保存</div>
				<div class="cancel_btn" @click="cancel">取消</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import axios from 'axios';
    export default{
    	data(){
    		return {
    			pwForm:{
    				id:window.sessionStorage.getItem("id"),
    				oldPw:"",
	    			newPw:"",
	    			confirmnewPw:"",
    			}
    		}
    	},
    	methods:{
    		save(){
    			for(var key in this.pwForm){
    				if(this.pwForm[key]==""){
    					alert("请填写完整信息");
    					return;
    				}
    			}
    			if(this.pwForm.confirmnewPw!=this.pwForm.newPw){
    				alert("两次输入的密码不一致！");
    				return;
    			}
    			const that=this;
    			that.$axios.put("/accounts/changePassword",{
    				id:that.pwForm.id,
    				oldPass:that.pwForm.oldPw,
    				newPass:that.pwForm.newPw,
    			}).then(function(res){
    				console.log(res.data);
    				if(res.data.code==1){
    					alert("旧密码错误！");
    					return;
    				}
    				if(res.data.code==0){
    					that.$router.push('/login');
    				}   				
    			},function(err){
    				console.log(err);
    				alert("密码修改失败！")
    			}).catch(function(error){
    				console.log(error);
    			})
    		},
    		cancel(){
    			this.$router.go(-1);
    		}
    	}
    }
</script>
<style type="text/css" scoped>
	.container{
		/*width:100%;*/
		height:974px;
		display:flex;
	}
	.modify_sidebar{
		/*width:20%;*/
		height:100%;
		border:1px solid #ccc;
		flex:1;
	}
	.modify_content{
		/*width:80%;*/
		height:100%;
		flex:4;
	}
	.modify_pw{
		width:100%;
		height:38px;
		background-color:rgb(255, 0, 0);
		font-family: PingFangSC-Regular, "PingFang SC";
    	font-weight: 650;
    	font-size: 14px;
    	color: rgb(255, 255, 255);
    	line-height: 38px;
    	margin-top:40px;

	}
	.pwimg{
		width:16px;
		height:16px;
		margin:0 10px;
	}
	.modify_wrapper{
		width:668px;
		height:269px;
		border:1px solid #ccc;
		margin-top:40px;
		margin-left: 40px;
		position:relative;

	}
	form{
		/*line-height:269px;*/
		margin-top:40px;
		margin-left:40px;
	}
	.space{
		letter-spacing: 4px;
	}
	.mp{
		height:31px;
		line-height:31px;
		margin-bottom: 30px;
	}
	.mp input{
		width: 198px;
		height:100%;
		border:1px solid rgb(204, 204, 204);
		border-radius:3px;
	}
	.mp span{
		font-family: PingFangSC-Semibold, "PingFang SC Semibold", "PingFang SC";
	    font-weight: 650;
	    font-style: normal;
	    font-size: 16px;
	    color: rgb(102, 102, 102);
	}
	.save_btn{
		width: 43px;
	    height: 22px;
	    line-height: 22px;
	    text-align:center;
	    font-family: PingFangSC-Regular, "PingFang SC";
        font-weight: 400;
	    color: rgb(255, 255, 255);
	    background-color:rgb(255, 0, 0);
	    border-radius:3px;
	    position:absolute;
	    right:100px;
	    bottom:20px;
	    cursor:pointer;
	}
	.cancel_btn{
		width: 43px;
	    height: 22px;
	    line-height: 22px;
	    text-align:center;
	    font-family: PingFangSC-Regular, "PingFang SC";
        font-weight: 400;
	    color: rgb(255, 0, 0);
	    /*background-color:rgb(255, 0, 0);*/
	    border-radius:3px;
	    border:1px solid rgb(255, 0, 0);
	    position:absolute;
	    right:30px;
	    bottom:20px;
	    margin-right:10px;
	    cursor: pointer;
	}
</style>