/*----------------------------------------------------------------
// 
// versions:1.0.0
// name：'Hero1' 
// description：'英雄' 
// author：ysc
// time：'2018/11/26'
// 
//----------------------------------------------------------------*/
const {ccclass, property} = cc._decorator;
@ccclass
export default class Hero extends cc.Component {

    

    @property
    public jumpTimes:number = 2;//跳跃次数
    @property
    public speed:number = 300;//前进速度
    @property
    public speedJump:number = 300;//跳跃速度
    @property
    public attackSpeed:number = 1;//速度
    @property
    public gravity:number = -498;//重力
    @property(cc.Prefab)
    public weaponPrefab:cc.Prefab = null;//武器
    
    public toSpeed:cc.Vec2 = cc.p(0,0);
    public animation:cc.Animation = null;//动画控制 
    public isAttack:boolean = true;//是否可以攻击

    private _jumpTimes:number = 0;
    private isG:boolean = true;//是否使用重力
    private platform:any = true;//站台
    
 

    start () {
        this.Init();
    }
    
    update(dt:number) {
        if(this.isG){
            this.toSpeed.y += this.gravity*dt;
        }
        this.node.y += this.toSpeed.y*dt;
        this.node.x += this.toSpeed.x*dt;
    }

    private Init():void{
        this.animation = this.node.getComponent(cc.Animation);
        this._jumpTimes = this.jumpTimes;
        
    }
   //跳
    public Jump():void{
        if(this._jumpTimes > 0){
            this._jumpTimes --;
            this.animation.play("player_jump");
            this.toSpeed.y = this.speedJump;
            this.toSpeed.x = this.speed;
        }
        
    }

    
    public Run():void{
        this.animation.play("player_run");
        this.toSpeed.x = this.speed;
    }

    //攻击
    public Attack():void{
        
    }

    public onCollisionEnter(other:cc.BoxCollider, self:cc.BoxCollider) {
        console.log(other.node.group);
        switch (other.node.group){
            case CONFIG.collisionType.platform:
                this.PlatformEnter(other,self);
                break;
        }
        
    }
    
    public onCollisionStay(other:cc.BoxCollider, self:cc.BoxCollider) {
        
    }
    
    public onCollisionExit(other:cc.BoxCollider, self:cc.BoxCollider) {
        
        switch (other.node.group){
            case CONFIG.collisionType.platform:
                this.PlatformExit(other,self);
                break;
        }
    }


    // //碰撞方向
    public ConllisionDirection(other:any, self:any):number{
        var type:number = 0;
        var otherAabb = other.world.aabb;
        var otherPreAabb = other.world.preAabb.clone();

        var selfAabb = self.world.aabb;
        var selfPreAabb = self.world.preAabb.clone();
        if (cc.Intersection.rectRect(selfAabb, otherAabb)) {
            if (selfPreAabb.yMax > otherPreAabb.yMax) {//下
                type = 3;
            }else if (selfPreAabb.xMax > otherPreAabb.xMax) {//右
                type = 2;
                
            }else if (selfPreAabb.xMin < otherPreAabb.xMin) {//左
                type = 1;
            }
            else if (selfPreAabb.yMin < otherPreAabb.yMin) {//上
                
                type = 4;
            }
            
        }  
        console.log(type);
        return type;
    }

    //碰撞方向
    public ConllisionTag(other:any, self:any):number{
        var type = self.tag;
        return type;
    }


    //接触平台
    public PlatformEnter(other:any, self:any):void{
        
        switch(this.ConllisionTag(other,self)){
            case 1://右边
                if(this.ConllisionDirection(other,self) == 1){
                    console.log("右边卡住");
                    this.toSpeed.x = 0;
                }
                break;
            case 2://下方
                if(this.ConllisionDirection(other,self) == 3){
                    console.log("落地关闭重力");
                    this._jumpTimes = this.jumpTimes;
                    this.isG = false;
                    this.toSpeed.y = 0;
                    this.Run();
                    if(this.platform && this.platform.isLow)
                    this.platform.isLow = false;
                    other.isLow = true;
                    this.platform = other;
                }
                break;
        }
    }
    //离开平台
    public PlatformExit(other:any, self:any):void{
        
        switch(this.ConllisionTag(other,self)){
            case 1://右边
                
                break;
            case 2://下方
                if(other.isLow){
                    console.log("离开平台使用重力");
                    this.animation.play("player_down");
                    this.isG = true;
                }
                break;
        }
        
    }



}



