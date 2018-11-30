/*----------------------------------------------------------------
// 
// versions:1.0.0
// name：'BackgroundControl' 
// description：'背景控制器' 
// author：ysc
// time：'2018/11/26'
// 
//----------------------------------------------------------------*/
const {ccclass, property} = cc._decorator;
import Hero from "../hero/Hero"
@ccclass
export default class BackgroundControl extends cc.Component {

    @property(cc.Node)
    bgView:cc.Node = null;//背景层
    @property(cc.Node)
    cloudView:cc.Node = null;//云层


    public speed:number = 0;//速度
    public isStart:boolean = false;//是否开始
    public hero:Hero = null;//英雄

    // onLoad () {}

    start () {

    }

    lateUpdate(){
        if(this.isStart){
            this.speed = this.hero.toSpeed.x;
        }
        
    }
    
    
    

    update (dt) {
        this.BgLoop(dt);//背景层
        this.CloudLoop(dt);
    }

    public Init():void{
        this.hero = Director.curHero;
        this.isStart = true;
    }

    //背景循环
    public BgLoop(dt:number):void{
        var speed = this.speed*dt*0.5;
        this.bgView.children.forEach((e,i)=>{
            
            if(e.x <= (cc.winSize.width*-0.5)+(e.width*-0.5)){
                var last;
                if(i == 0){
                    last = this.bgView.children[this.bgView.children.length-1];
                }else{
                    last = this.bgView.children[i-1];
                }
                e.x = last.x+(last.width*0.5)+(e.width*0.5)-2;
            }
            e.x -= speed;
        })
    }


    //云层
    public CloudLoop(dt:number):void{

        this.cloudView.children.forEach((e,i)=>{
            var speed = (this.speed*0.3+e.width)*dt*0.1;
            if(e.x <= (cc.winSize.width*-0.5)+(e.width*-0.5)){
                //重置云朵位置随机---Y：上半屏
                e.y = Math.random()*cc.winSize.height*0.5;
                e.x = Math.random()*cc.winSize.width*0.5+cc.winSize.width*0.5+(e.width*0.5);
            }
            e.x -= speed;
        })
        
        
    }


    
}
