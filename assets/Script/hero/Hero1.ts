/*----------------------------------------------------------------
// 
// versions:1.0.0
// name：'Hero1' 
// description：'英雄1' 
// author：ysc
// time：'2018/11/26'
// 
//----------------------------------------------------------------*/
import Hero from "./Hero"
const {ccclass, property} = cc._decorator;
@ccclass
export default class Hero1 extends Hero {
    
    
    
    // onLoad () {}

    private weaponPool:cc.NodePool = new cc.NodePool();
    start () {
        super.start();
    }
    
    public Attack():void{
        console.log("攻击");
        
        if(this.weaponPrefab && this.isAttack){
            if(this.weaponPool.size()>0){
                console.log("对象池中获取");
                var weapon:cc.Node = this.weaponPool.get();
            }else{
                var weapon:cc.Node = cc.instantiate(this.weaponPrefab);
            }
            weapon.setPosition(cc.p(0,0));
            this.isAttack = false;
            this.scheduleOnce(()=>{
                this.isAttack = true;
            },1/this.attackSpeed);
            this.node.addChild(weapon);
            
            weapon.runAction(cc.sequence(
                cc.moveBy(1,cc.p(800,0)),
                cc.callFunc(()=>{
                    this.weaponPool.put(weapon);
                })
            ))
        }
    }

    
   
}