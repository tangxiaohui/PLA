/*----------------------------------------------------------------
// 
// versions:1.0.0
// name：'Director' 
// description：'导演类' 
// author：ysc
// time：'2018/11/26'
// 
//----------------------------------------------------------------*/
//游戏数据
class GameData{
    public curGold:number = 0;//本场游戏获得的金币
}


class Director{
    static curHeroType:number = 1;//当前选择的英雄类型
    static curHero:any = null;

    static gameData:GameData = new GameData();//游戏数据
    
}



(<any>window).Director = Director;
