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
		    <el-tab-pane label="权限管理" name="fifth">
		    		<v-user-list></v-user-list>
		    </el-tab-pane>
		  </el-tabs>
	  </div>
</template>

<script>
// //    权限管理
// 	import vUserList from '../page/PermissionsManage/UserList.vue'
// //    报表
//     import vTaskList from '../page/ReportTable/TaskList.vue'
//     import vCommunityList from '../page/ReportTable/CommunityList.vue'
// //    库存查看
//     import vStockList from '../page/StockList/StockList.vue'
// //    任务审核
//     import vTaskCheckList from '../page/TaskList/TaskCheckList.vue'
// //    任务管理
//     import vTaskManageAdd from '../page/TaskManage/TaskManageAdd.vue'
//     import vTaskManageList from '../page/TaskManage/TaskManageList.vue'



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
