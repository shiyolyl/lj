import Vuex from "vuex";
import Vue  from "vue";
import * as types from "./types";

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        // 存放token
        token:null,
        
        // title
        title:'',

        // 存放目前登录的用户信息
        user:{},
        // 判断用户添加部分的弹出框
        userDialog:false,
        /*
          用来判定弹出框由谁调用：
             0：默认值
             1：添加用户
             2：查看用户
             3：修改用户
             ...
        
        */ 
        userDialogNum:0,
        // 存放查看用户按钮的信息
        readUser:null,
        // 修改用户的id
        updateId:null
        
    },
    mutations:{
        [types.LOGIN]:(state,data)=>{
            localStorage.token = data.token;
            state.token = data.token;
            state.user = data.user;
        },
        [types.LOGOUT]:(state)=>{
            localStorage.removeItem('token');
            state.token = null;
        },
        [types.TITLE]:(state,data)=>{
            state.title = data;
        },
        //用户管理模块的弹出框控制
        userDialog:(state,data)=>{
            state.userDialog = data.flag;
            state.userDialogNum = data.userDialogNum
            state.updateId = data.updateId || null;
        },
        // 查看按钮的用户信息
        readUsers:(state,data)=>{
            state.readUser = data;
        }


    }
}); 




