

/*----------------------------------------------------------------
// 
// versions:1.0.0
// name：'Gold' 
// description：'金币' 
// author：ysc
// time：'2018/12/10'
// 
//----------------------------------------------------------------*/
const {ccclass, property} = cc._decorator;
@ccclass
export default class Gold extends cc.Component {


    @property(Number)
    value:number = 1;


    private isPickup:boolean = false;//是否拾取

    onLoad () {
       
    }

    start () {
       
    }

    public onCollisionEnter(other:cc.BoxCollider, self:cc.BoxCollider) {
        if(other.node.group == 'player'){
           if(!this.isPickup){
               this.isPickup = true;
                Director.gameData.curGold += this.value;
                this.node.destroy();
           }
            
        }
    }

}
