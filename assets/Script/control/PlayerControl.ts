/*----------------------------------------------------------------
// 
// versions:1.0.0
// name：'PlayerControl' 
// description：'角色控制器' 
// author：ysc
// time：'2018/11/26'
// 
//----------------------------------------------------------------*/
const {ccclass, property} = cc._decorator;
import Hero from "../hero/Hero"
@ccclass
export default class PlayerControl extends cc.Component {


    @property(cc.Camera)
    camera: cc.Camera = null;

    public hero:Hero = null;//英雄
    public isStart:boolean = false;//是否开始
    private playerOriPosX:number = 0;//原始X位置
    

    onLoad () {
        
    }


    start () {
        
    }
    lateUpdate(){
        if(this.isStart){
            this.camera.node.x = this.hero.node.x-this.playerOriPosX;
        }
        
    }

    public Init():void{
        this.hero = Director.curHero;
        this.playerOriPosX = this.hero.node.x;
        this.isStart = true;
    }

    private OnJump(e:cc.EventTarget):void{//跳
        this.hero.Jump();
    }
    private OnAttack(e:cc.EventTarget):void{//攻击
        this.hero.Attack();
    }
    

    // update (dt) {}
}
