/*----------------------------------------------------------------
// 
// versions:1.0.0
// name：'CONFIG' 
// description：'配置' 
// author：ysc
// time：'2018/11/26'
// 
//----------------------------------------------------------------*/



// window["config"] = {
//     collisionType:{//碰撞类型
//         platform:"platform",//平台
//     }
// }

enum collisionType {
    platform="platform",//平台
    player="player",//玩家
    weapon="weapon",//武器
}

class CONFIG{
    static collisionType = collisionType;//碰撞类型
}
(<any>window).CONFIG = CONFIG;
