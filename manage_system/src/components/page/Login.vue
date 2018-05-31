<template>
    <div class="login-wrap">
        <div class="header">
            <div class="logo">议题公社管理系统</div>
        </div>
        <div class="ms-login">
            <div class="login_text">
                <div class="username_text">用户名：</div>
                <div class="password_text">密&nbsp;&nbsp;&nbsp;&nbsp;码：</div>
            </div>
            <el-form ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.name" placeholder="请输入用户名" error="true"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"  @keyup.enter.native="login('ruleForm')"></el-input>
                </el-form-item>
            </el-form>
            <div class="remember">
                <input type="checkbox" name="checkbox" value="checkbox" class="select_box"><span class="remember_text">记住密码</span>
            </div>
            <div class="login-btn">
                <el-button type="primary" @click="login">登录</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import * as types from "../../store/types";
    export default {
        data(){
            return {
                loginForm:{
                    id:'',
                    name: '',
                    password: '',
                    token:'',
                },
               
            }
        },
         
        methods: {
      //       submitForm(formName) {
      //           const self = this;
      //           self.$refs[formName].validate((valid) => {
      //               if (valid) {
      //                localStorage.setItem('ms_username',self.ruleForm.username);
                        
						// this.$axios.post("/accounts/login",{
      //                           id:0,
						// 		name:self.ruleForm.username,
      //                           password:self.ruleForm.password,
      //                           // token:"",
						// 	}).then(function(res){
      //                           console.log(res.data);

      //                           if(res.data.token){
      //                               //将拿到的token存放到状态管理对象里面
      //                               self.$store.commit(types.LOGIN,res.data);
      //                               // 然后跳转页面，需要做用户验证
      //                               self.$router.push('/home');
      //                           }else{
      //                               self.$message({
      //                                   message: res.message,
      //                                   type: 'warning'
      //                               });
      //                           }
						//     },function(err){
      //                           self.$message({
      //                                   message: err,
      //                                   type: 'warning'
      //                               });                               
      //                       }).catch(function(error){
      //                           console.log(error);
      //                       });

      //               } else {
      //                   console.log('error submit!!');
      //                   return false;
      //               }
      //           });
      //       }
            login(){
                const that=this;
                console.log(this.loginForm);
                that.$axios.post("/accounts/login",that.loginForm)
                .then(function(res){
                  console.log(res.data);
                  if(res.data.code==1){
                    alert(res.data.message);
                    // that.$alert(res.data.message, '登录错误提示', {
                    //     confirmButtonText: '确定',
                    //     callback: action => {
                    //         this.$message({
                    //             type: 'info',
                    //             message: `action: ${ action }`
                    //         });
                    //     }
                    // });

                  }else if(res.data.code==2){
                    alert(res.data.message);
                  }else{
                    window.sessionStorage.setItem("name",res.data.name);
                    window.sessionStorage.setItem("id",res.data.id);

                    //将拿到的token存放到状态管理对象里面
                    that.$store.commit(types.LOGIN,res.data);
                    // 然后跳转页面，需要做用户验证
                    that.$router.push('/home');
                  }
                },function(err){
                  console.log(err);
                }).catch(function(error){
                  console.log(error);
                })
            },

        },
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        /*height:160px;*/
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;

        border:1px solid #ccc;
        clear:both;

    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }



    .el-button--primary{
        background-color:rgba(255, 0, 0, 1);
        border:none;
    }
    .login-wrap{
        background-color:#fff;
    }
    .logo{
        width:100%;
        height:60px;
        line-height:60px;
        background-color:rgba(255, 0, 0, 1);
        font-family: PingFangSC-Semibold, "PingFang SC Semibold", "PingFang SC";
        font-weight: 650;
        font-style: normal;
        font-size: 28px;
        color: rgb(255, 255, 255);
        padding-left:30px;
    }
    .remember{
        width:100%;
        height:20px;
        line-height:20px;
        font-size:14px;
        margin-bottom:5px;
        clear:both;
        font-size: 12px;
        color: rgb(102, 102, 102);
    }
    .select_box{
        float:left;
        margin-top:3px;
    }
    .remember_text{
        height:20px;
        float:left;
        margin-left:2px;
    }
    .login_text{
        width:64px;
        height:100px;
        float:left;
        font-weight: 650;
        font-style: normal;
        font-size: 16px;
        color: rgb(102, 102, 102);
    }
    .username_text{
        width:100%;
        height:36px;
        line-height:36px;
        float:left;
    }
    .demo-ruleForm{
        float:right;
        width:70%;
    }
    .password_text{
        width:100%;
        float:left;
        height:36px;
        line-height:36px;
        margin-top:23px;
    }


    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        line-height: 70px;
        color: #fff;
        background-color:rgb(255, 0, 0);
    }
    .header .logo{
        float: left;
        width:250px;
        text-align: center;
    }

</style>