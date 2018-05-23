<template>
    <div id="test_3">
        <img src="../../../../static/img/domainthumb.png" @mousedown="start" @mouseup="stop" @mousemove="move" :style="style">
    </div>
</template>

<script>
    export default{
        data:function(){
            return{
                canDrag: false,
                x0:0,
                y0:0,
                x1:0,
                y1:0,
                style:null
            }
        },
        methods:{
            start:function(e){
                //鼠标左键点击
                console.log(e);
                if(e.button==0){
                    console.log("左键点击")
                    this.canDrag=true;
                    //记录鼠标指针位置
                    this.x0=e.clientX;
                    this.y0=e.clientY;
                }
            },
            stop:function(e){
                this.canDrag=false;
                console.log("停止拖动")
            },
            move:function(e){
                if(this.canDrag==true){
                    console.log("拖动了");
                    this.x1=e.clientX;
                    this.y1=e.clientX;

                    let x=this.x1-this.x0;
                    let y=this.y1-this.y0;

                    let img=document.querySelector("#test_3 img");
                    console.log(img.offsetLeft);
                    this.style=`left:${img.offsetLeft+x}px;top:${img.offsetTop+y}px`;
                    console.log(this.style);
                    this.x0=this.x1;
                    this.y0=this.y1;
                }
            }
        }
    }
</script>
<style type="text/css">
    body{
        position:relative;
    }
    #test_3 img{
        position:absolute;
        left:0;
        top:0;
        z-index: 9999;
    }

</style>

<!-- <template>
    <div id="box">
        <div v-drag :style="{width:'100px', height:'100px', border:'1px solid #ccc',background:'blue', position:'absolute', right:0, top:0}"></div>
        <div v-drag :style="{width:'100px', height:'100px', background:'red', position:'absolute', left:0, top:0}"></div>
    </div>
</template>
<script>
       /* vue-自定义指令-拖拽 */
        Vue.directive('drag',function(){
            var oDiv=this.el;
            oDiv.onmousedown=function(ev){
                var disX=ev.clientX-oDiv.offsetLeft;
                var disY=ev.clientY-oDiv.offsetTop;

                document.onmousemove=function(ev){
                    var l=ev.clientX-disX;
                    var t=ev.clientY-disY;
                    oDiv.style.left=l+'px';
                    oDiv.style.top=t+'px';
                };
                document.onmouseup=function(){
                    document.onmousemove=null;
                    document.onmouseup=null;
                };
            };
        });

        window.onload=function(){
            var vm=new Vue({
                el:'#box',
                data:{
                    msg:'welcome'
                }
            });
        };

    </script>
 -->
