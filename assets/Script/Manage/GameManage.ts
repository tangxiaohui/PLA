

/*----------------------------------------------------------------
// 
// versions:1.0.0
// name：'GameManage' 
// description：'游戏管理' 
// author：ysc
// time：'2018/11/29'
// 
//----------------------------------------------------------------*/
const {ccclass, property} = cc._decorator;
import PlayerControl from "../control/PlayerControl";
import BackgroundControl from "../control/BackgroundControl";
import Hero from "../hero/Hero";
@ccclass
export default class GameManage extends cc.Component {

    @property(PlayerControl)
    playerControl:PlayerControl = null;//玩家控制器
    @property(BackgroundControl)
    backgroundControl:BackgroundControl = null;//环境控制器节点
    @property(cc.Node)
    playerNode:cc.Node = null;//玩家控制节点


    onLoad () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.LoadHero().then(res=>{
            this.Init();
        })
    }

    start () {

    }

    // update (dt) {}


    public Init():void{
        this.playerControl.Init();//激活控制器
        this.backgroundControl.Init();
    }

    //加载英雄
    public LoadHero():Promise<any>{
        return new Promise((resolve, reject)=>{
            cc.loader.loadRes("Prefab/hero/hero"+Director.curHeroType,(e,data)=>{
                if(data){
                    var hero:cc.Node = cc.instantiate(data);
                    this.playerNode.addChild(hero);
                    hero.setPosition(this.playerNode.getChildByName("pos").position);
                    Director.curHero = <Hero>hero.getComponent("Hero"+Director.curHeroType);
                    console.log('英雄加载完成');
                    resolve('英雄加载完成');
                }
            })
        })
        
    }
}
