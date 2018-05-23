import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/store'
import * as types from '../store/types'

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },

        // {
        //     path:'/modifypw',  //修改密码
        //     component:resolve => require(['../components/page/ModifyPassword.vue'],resolve)
        // },

        {
            path: '/home', 
            // 使用meta属性来设置页面是否需要登录权限
            meta:{
                requireAuth:true,
            },
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',
					redirect:'/checkpending'
                },

                // {
                // 	path:"/readme",
                // 	component:resolve => require(['../components/page/Readme.vue'],resolve)
                // },
                {
                    path: '/checkpending',
                    component: resolve => require(['../components/page/UsersManage/CheckPending.vue'], resolve)
                },
                {
                    path: '/pubnumlist',
                    component: resolve => require(['../components/page/UsersManage/PubnumList.vue'], resolve)
                },
                {
                    path: '/advertiserlist',
                    component: resolve => require(['../components/page/UsersManage/Advertiserlist.vue'], resolve)
                },
                {
                    path: '/checktopicpending',
                    component: resolve => require(['../components/page/TopicManage/ChecktopicPending.vue'], resolve)
                },
                {
                    path: '/topiclist',
                    component: resolve => require(['../components/page/TopicManage/TopicList.vue'], resolve)
                },
                {
                    path: '/schemelist',
                    component: resolve => require(['../components/page/SchemeManage/SchemeList.vue'], resolve),
                },
                {
                    path:'/schemedetail',
                    component: resolve => require(['../components/page/SchemeManage/SchemeDetail.vue'], resolve),
                },
                {
                    path: '/systemsetting',
                    component: resolve => require(['../components/page/SystemSetting/SystemSetting.vue'], resolve)
                },
                {
                    path: '/modifypw',
                    component: resolve => require(['../components/page/ModifyPassword.vue'], resolve)
                },
                // {
                //     path: '/spread',
                //     component: resolve => require(['../components/page/SystemSetting/Spread.vue'], resolve)
                // },
                // {
                //     path: '/contactservice',
                //     component: resolve => require(['../components/page/SystemSetting/ContactService.vue'], resolve)
                // },
                // {
                //     path: '/testdrag',
                //     component: resolve => require(['../components/page/UsersManage/testdrag.vue'], resolve)
                // },
                // {
                //     path: '/datasource',
                //     component: resolve => require(['../components/page/PermissionsManage/rUserTableDataSource.vue'], resolve)
                // },
                // {
                //     path: '/vuetable',
                //     component: resolve => require(['../components/page/VueTable.vue'], resolve)     // vue-datasource组件
                // },
                // {
                //     path: '/baseform',
                //     component: resolve => require(['../components/page/BaseForm.vue'], resolve)
                // },
                // {
                //     path: '/vueeditor',
                //     component: resolve => require(['../components/page/VueEditor.vue'], resolve)    // Vue-Quill-Editor组件
                // },
                // {
                //     path: '/markdown',
                //     component: resolve => require(['../components/page/Markdown.vue'], resolve)     // Vue-Quill-Editor组件
                // },
                // {
                //     path: '/upload',
                //     component: resolve => require(['../components/page/Upload.vue'], resolve)       // Vue-Core-Image-Upload组件
                // },
                // {
                //     path: '/basecharts',
                //     component: resolve => require(['../components/page/BaseCharts.vue'], resolve)   // vue-schart组件
                // },
                // {
                //     path: '/drag',
                //     component: resolve => require(['../components/page/DragList.vue'], resolve)    // 拖拽列表组件
                // },
                // {
                //     path: '/basetable',
                //     component: resolve => require(['../components/page/TaskManage/TaskManage.vue'], resolve)    // 任务管理组件
                // },
                // {
                //     path: '/baseform',
                //     component: resolve => require(['../components/page/StockList/StockList.vue'], resolve)    // 库存查看组件
                // },
                // {
                //     path: '/basecharts',
                //     component: resolve => require(['../components/page/TaskList/TaskCheckList.vue'], resolve)    // 任务审核组件
                // },
                // {
                //     path: '/drag',
                //     component: resolve => require(['../components/page/ReportTable/ReportTable.vue'], resolve)    // 报表组件
                // },
                // {
                //     path: '/manage',
                //     component: resolve => require(['../components/page/PermissionsManage/UserList.vue'], resolve)    // 用户管理组件
                // },
                // {
                //     path: '/addtask',
                //     component: resolve => require(['../components/page/TaskManage/NewTaskPictures.vue'], resolve)    // 新建投放任务组件
                // }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        }
    ]
});
// 
if(window.localStorage.getItem('token')){
    store.commit(types.LOGIN,{token:window.localStorage.getItem('token')});
}
router.beforeEach((to,from,next)=>{
    if(to.matched.some(r=>r.meta.requireAuth)){
        if(store.state.token){
            next();
        }else{
            next({
                path:"/login",
                // query:{redirect:to.fullPath}
            });
        }
    }else{
        next();
    }
    
});



export default router;