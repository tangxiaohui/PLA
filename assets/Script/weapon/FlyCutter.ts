/*----------------------------------------------------------------
// 
// versions:1.0.0
// name：'FlyCutter' 
// description：'飞刀' 
// author：ysc
// time：'2018/11/26'
// 
//----------------------------------------------------------------*/
import Weapon from "./Weapon"
const {ccclass, property} = cc._decorator;
@ccclass
export default class FlyCutter extends Weapon {

    
    public animation:cc.Animation = null;
    // onLoad () {}

    start () {
        super.start();
        this.animation = this.node.getComponent(cc.Animation);
        this.animation.play();
    }

    
    
}
