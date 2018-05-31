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
               
                
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        //修改密码
        {
            path: '/modifypw',
            component: resolve => require(['../components/page/ModifyPassword.vue'], resolve)
        },
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
            // alert("有token");
        }else{
            // alert("无token");
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