<template>
	  <div>
	  	<el-tabs v-model="activeName" @tab-click="handleClick">
		    <el-tab-pane label="用户管理" name="first">
                    <v-task-manage-add></v-task-manage-add>
                    <v-task-manage-list></v-task-manage-list>
		    </el-tab-pane>
		    <el-tab-pane label="议题管理" name="second">
                    <v-stock-list></v-stock-list>
            </el-tab-pane>
		    <el-tab-pane label="方案管理" name="third">
                    <v-task-check-list></v-task-check-list>
            </el-tab-pane>
		    <el-tab-pane label="系统设置" name="fourth">
                    <v-task-list></v-task-list>

                    <v-community-list></v-community-list>
            </el-tab-pane>
		  </el-tabs>
	  </div>
</template>

<script>

export default {
		  components:{
		  	vUserList,
            vTaskList,vCommunityList,
            vStockList,
            vTaskCheckList,
            vTaskManageAdd,vTaskManageList
		  },
	    data() {
	      return {
	        activeName: 'first'
	      };
	    },
	    methods: {
	      handleClick(tab, event) {
//	        console.log(tab, event);
	      }
	    }
	  };
</script>

<style>
</style>
