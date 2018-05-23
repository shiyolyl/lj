<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo"  unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title" class="first_title" ><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" >
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
//                   
                    {
                        icon: 'el-icon-menu',
                        index: 'checkpending',
                        title: '用户管理'
                       ,
                       subs: [
                           {
                               index: 'checkpending',
                               title: '待审核认证'
                           },
                           {
                               index: 'pubnumlist',
                               title: '公众号列表'
                           },
                           {
                               index: 'advertiserlist',
                               title: '广告主列表'
                           }
                       ]
                    },
                    {
                        icon: 'el-icon-date',
                        index: 'checktopicpending',
                        title: '议题管理'
                       ,
                       subs: [
                           {
                               index: 'checktopicpending',
                               title: '待审核议题'
                           },
                           {
                               index: 'topiclist',
                               title: '议题列表'
                           },
                           
                       ]
                    },
                    {
                        icon: 'el-icon-star-on',
                        index: 'schemelist',
                        title: '方案管理',
                       subs: [
                           {
                               index: 'schemelist',
                               title: '方案列表'
                           },
                       ]
                    },
                    {
                        icon: 'el-icon-upload2',
                        index: 'systemsetting',
                        title: '系统设置',
                       //  subs: [
                       //     // {
                       //     //     index: 'spread',
                       //     //     title: '开屏'
                       //     // },
                       //     // {
                       //     //     index: 'contactservice',
                       //     //     title: '联系客服'
                       //     // },
                       //     // {
                       //     //     index: 'vueeditor',
                       //     //     title: '行业类别'
                       //     // },
                       //     // {
                       //     //     index: 'vueeditor',
                       //     //     title: '参数设置'
                       //     // },
                       // ]
                    },
                    
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        /*height:100%;*/
        left: 0;
        top: 70px;
        bottom:0;
        /*border:1px solid #ccc;*/
    }
    .el-menu--dark{
      background-color:#fff;
    }
    .sidebar > ul {
        height:100%;
        /*color:rgb(51, 51, 51);*/
        /*background-color:#fff;*/
        border:1px solid #ccc;
    }
    .sidebar > ul li{
        border:1px solid #ccc;
        font-family: PingFangSC-Semibold, "PingFang SC Semibold", "PingFang SC";
        font-weight: 650;
        font-size: 14px;
        border-right:none;
    }

    .first_title{
        border:1px solid #ccc;
    }
    .el-menu{
      background-color: #fff;
    }

    /*.el-menu-item, .el-submenu__title.is-active{
      background-color:red;
    }*/
    .el-submenu.is-active{
      /*color:#fff;*/
    }
    /*.el-submenu.is-active .el-submenu__title{
      background-color:red!important;
    }*/
    .el-submenu .el-menu-item{
      background-color: #fff;
    }
    /*二级菜单的样式*/
    .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active{
      background-color: #eee;
      color:#48576a;
      /*border:none;*/
    }
    /*二级菜单hover的时候*/
    .el-submenu .el-menu-item:hover, .el-submenu__title:hover{
      background-color: #eee;
    }
    /*一级菜单选中的时候*/
    /*.el-menu--horizontal.el-menu--dark .el-submenu.is-active .el-submenu__title{
      background-color: red;
      color:#fff;
    }*/
</style>
