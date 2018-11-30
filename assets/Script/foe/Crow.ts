/*----------------------------------------------------------------
// 
// versions:1.0.0
// name：'Crow' 
// description：'乌鸦类' 
// author：ysc
// time：'2018/11/30'
// 
//----------------------------------------------------------------*/
const {ccclass, property} = cc._decorator;
import Foe from "./Foe"
@ccclass
export default class Crow extends Foe {



    // onLoad () {}

    public animation:cc.Animation = null;

    start () {
        this.animation  = this.node.getComponent(cc.Animation);
        this.animation.play();
    }

    


    
}
