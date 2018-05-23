<template>
	<div class="container">
		<div class="detail">
			<span class="title right_four">事件名称&nbsp;:</span>
			<span class="detailValue">{{detailInfo.eventName}}</span>
		</div>
		<div class="detail">
			<span class="title right_four">议题名称&nbsp;:</span>
			<span class="detailValue">{{detailInfo.topicTitle}}</span>
		</div>
		<div class="detail">
			<span class="title right_two">日期&nbsp;:</span>
			<span class="red_num">{{detailInfo.dt}}</span>
		</div>
		<div class="detail">
			<span class="title right_two">预算&nbsp;:</span>
			<span class="detailValue"><span class="red_num">{{detailInfo.budget}}</span>人民币</span>
		</div>
		<div class="detail">
			<span class="title right_four">方案价格&nbsp;:</span>
			<span class="detailValue"><span class="red_num">{{detailInfo.price}}</span>人民币</span>
		</div>
		<div class="detail">
			<span class="title right_three">广告主&nbsp;:</span>
			<span class="detailValue">{{detailInfo.userName}}</span>
		</div>
		<div class="detail">
			<span class="title right_four">方案状态&nbsp;:</span>
			<span class="red_num" v-if="detailInfo.status==0">待付款</span>
			<span class="red_num" v-if="detailInfo.status==1">购买成功</span>
		</div>
		<div class="detail">
			<span class="title right_three">受众数&nbsp;:</span>
			<span class="detailValue"><span class="red_num groups">{{detailInfo.groups}}</span>人</span>
		</div>
		<div class="detail">
			<span class="title">公众号个数&nbsp;:</span>
			<span class="detailValue"><span class="red_num groupCount">{{detailInfo.groupCount}}</span>个</span>
		</div>
		<div class="detail pub">
			<span class="title pub_title">公众号详情&nbsp;:&nbsp;&nbsp;</span>
			<div class="imginfo" v-for="(item, index) in detailInfo.details" :key="item.id">
				<img :src="item.thumb">
				<p>{{item.name}}</p>
			</div>
			
		</div>
	</div>
</template>
<script type="text/javascript">
import axios from 'axios';
	export default{
		data(){
			return{
				detailInfo:{},
			}
		},
		created(){
			this.getSchemeDetail(this.$route.query.id);
			console.log(this.detailInfo);
			
		},
		methods:{
			//查看方案详情
            getSchemeDetail(pid){
                var that=this;
                that.$axios.get("/topics/plans/"+pid)
                .then(function(res){
                	console.log(res.data);
                	that.detailInfo=res.data;
                	console.log(that.detailInfo);
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
	.title{
		display:inline-block;
	}
	.detail{
		font-family: 'PingFangSC-Regular', 'PingFang SC';
		font-size:14px;
		margin-bottom:15px;
	}
	.red_num{
		color:#FF0000;
	}
	.groups{
		font-size:18px;
		padding-right:5px;
	}
	.groupCount{
		font-size:18px;
		padding-right:5px;
	}
	.right_three{
		padding-left:28px;
	}
	.right_four{
		padding-left:14px;
	}
	.right_two{
		padding-left:41px;
	}
	.detailValue{
		color:#666666;
	}
	img{
		width:40px;
		height:40px;
	}
	.pub:after{  
	  content:"";  
	　height:0;  
	　visibility:hidden;  
	　display:block;  
	　clear:both;  
	}  
	.pub_title{
		float:left;
	}
	.imginfo{
		float:left;
		margin-right:20px;
	}
	.imginfo p{
		text-align:center;
	}
</style>