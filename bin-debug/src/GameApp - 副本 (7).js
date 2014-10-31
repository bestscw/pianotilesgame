/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

class GameApp extends egret.DisplayObjectContainer{

    /**
     * 加载进度界面
     */
    private loadingView:LoadingUI;

    /**stage宽*/
    private stageW:number;

    /**stage高*/
    private stageH:number;

    /**钢琴块方格引用*/
    private squareArr:egret.Sprite[];


    /**钢琴块方格引用*/
    private squareArr1:egret.Sprite[];
    /**钢琴块方格引用*/
    private squareArr2:egret.Sprite[];

    private shp:egret.Sprite;
    private shp1:egret.Sprite;
    private shp2:egret.Sprite;
    private spr:egret.Sprite;

    private progressBar:egret.Shape;

    private startScene:egret.Sprite;
    private about:egret.Sprite;
    private _gameOverLayout:egret.Sprite;

    private _gameOverFaoutLayout:egret.Sprite;

    private timer:egret.TextField;

    // 当前关的积分
    private currentScore:egret.TextField;
    // 当前关的积分
    private currentScore2:egret.TextField;

    // 当前关的积分
    private bestScore:egret.TextField;

    // 当前关的积分
    private rankTxt:egret.TextField;

    // 当前关的积分
    private currentScoreNumber:number = 0;

    // 经典模式最佳纪录
    private goodScore:egret.TextField;

    private actors:string[]=[];

    private lanague_zh:string[]=['尚未开放','时间到了','开始','经典','街机','禅','接力','极速','更多','失败了','炫耀','返回','重玩','排行','游戏加载中...','最佳','你上升了','名'];
    private lanague_tw:string[]=['尚未開放','時間到了','開始','經典','街機','禪','接力','极速','更多','失敗了','炫耀','返回','重玩','排行','遊戲加載中...','最佳','你上升了','名'];
    private lanague_jp:string[]=['オープンでない','時間になった','スタート','クラシック','アーケード','禅','リレー','急速','より多くの','失敗した','シェア','戻る','リプレイ','ランキング','ゲームの読み込み中...','ベスト','あなたが上昇した','名'];
    private lanague_en:string[]=['No open','Time is up','Go','Classic','Arcade','Zen','Realy','Rush','More','Failed','Share','Back','Replay','Rank','Game loading...','BEST','You rise',''];

    /**行数*/
    public rows:number = 4;

    /**列数*/
    public cols:number = 4;

    /**宽度*/
    public width:number = 40;

    /**宽度*/
    public move:number = -100;

    /**高度*/
    public height:number = 80;

    /**控制滚动速度*/
    private speed:number = 2000;

    /**经典模式最大步数*/
    private stepNumber:number = 50;

    /**经典模式当前步数*/
    private currStepNumber:number = 0;

    /**经典模式花费时间*/
    private costTime:number = 0;

    /**经典模式最佳纪录*/
    private goodRecord:number = 0;

    /**游戏开始时间**/
    private beginTime:number = 0;

    /**游戏结束时间**/
    private endTime:number = 0;

    /**游戏是否开始*/
    private _gameStart:boolean = false;

    // 操作计时器
    private _timer:egret.Timer ;

    // 音效
    private  sound:egret.Sound;

    private urlloader:egret.URLLoader;

    private gameOver:number = 0;

    // 字体大小
    private fontSize:number = 40;

    // 资源是否加载完毕
    private resourceLoadComplete:boolean = false;

    private lineNumber:number = 4;

    // 玩法模式
    private playMode:number = 1;

    // 禅模式时间限制(毫秒)
    private maxTime:number = 30000;

    // 接力模式时间限制(毫秒)
    private maxTime2:number = 10000;

    // 经典模式最佳纪录
    private resultText:egret.TextField;
    // 经典模式最佳纪录
    private resultText2:egret.TextField;

    private menu_1:egret.Sprite;
    private menu_2:egret.Sprite;
    private menu_3:egret.Sprite;
    private menu_4:egret.Sprite;
    private menu_5:egret.Sprite;
    private menu_6:egret.Sprite;
    private btn:egret.Sprite;
    private redOffset:number = 0;
    private redRand:number = 0;

    // 卡农单音版
    private music_1:String = "SQRSQRSLMNOPQRQOPQOPQJKLMNONMONMLKLKJKLMNOMONONONLMNOPQRSQRSQRSLMNOPQRQOPQOPQJKLMNONMONMLKLKJKLONOMONONONLMNOPQRS";

    // 《天空之城》
    private music_2:String = "MNONOQNJJMLMOLJJKJKOJOOONKKNNMNONOQNJJMLMOLJKONOPPQOONMMNLMOPQPQSPLLONOQQMNONOPOLLRQPOQQTSSQPOOPOPSQQTSSQPOOPOPNM";

    // 《梁祝》
    private music_3:String = "LJIHIGFENMNLMKJLIJLIJKJIHLGIFHEFHECEFHIFHELOMLJLIIJGFEFHICHFEFHEJLGIFHECECEFGIFEFHILJIJIHFECHFHFECEFHEJLIJIHGFE";

    // 夜曲
    private music_4:String = "MNOOOONQQTTTSRSOORRRSQNQPPONOONOOOONQQTTTSRSOORRRQPNOM";

    // 《会呼吸的痛》
    private music_5:String = "STVTXXTWWWVUVWXWSVVUTUVRRRVVWVSSSSYXWXXSTVTXXTWWWVUVWXWSVVVUTUVRRRVVWVSSSSTUVVUVV";

    // 《七里香》
    private music_6:String = "LONOOOONMNMLLLKJLLLIIKKJLONOOONNOPPOLONOOONNMMNML";

    // 《该死的温柔》
    private music_7:String = "HIJMMJIGHILLIHFGHKKHFGEFGHFHJIHIJMMJIGILLMJIHFGHKKHFGEHJIGEIH";

    // 《会呼吸的痛》
    private music_8:String = "STVTXXTWWWVUVWXWSVVUTUVRRRVVWVSSSSYXWXXSTVTXXTWWWVUVWXWSVVVUTUVRRRVVWVSSSSTUVVUVV";

    // 《东风破》
    private music_9:String = "IHIJIIHIHFFIIHIJIIHIHFFELLLJJJKLKKIIJHHFHMMMLLIHIJHHIHHFIIHIJIIHIJLJLLLLMLJKLKK IIHJIHFIHIH";

    // 《等一分钟》
    private music_10:String = "QQSTTTQQSTTTSQSTQSTQQSTTTTSQPQSPQQQSTTTQQSTTTSQSVUSQTQQPOPQPOPSPQM";

    private music_id:number = 1;
    private music_offset = -1;
    private music_len = 0;
    private type:number = 1;
    private exec:number = 0;
    private offset:number = 0;

    private tw1:egret.Tween;
    private tw2:egret.Tween;

    private lastTouchLine:string = 'line1';
    private lastTouchRow:number = 3;
    private clientLan:string = 'en';
    private currRank:number = 0;
    private lastRank:number = 0;
    private tweenPlaying:number = 0;
    private musicOpen:number = 1;
    private musicTxt:egret.TextField;
    private shareTips:egret.Bitmap;

    private _container2:egret.Sprite;
    private _container1:egret.Sprite;

    private _speed:number = 10;
    private isHttpReq:number = 0;
    private resultOp1:number = 0;
    private resultOp2:number = 0;
    private foucsname1:string;
    private foucsname2:string;
    private touched1:number = 0;

    private t1:number = 3000;


    // 排行分数提交接口
    private rankApi = 'http://app.easymobi.cn/pianotilesgame/setusernews.php';

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.loadResource,this);
    }

    //计时器完成
    private onTimerComplete():void
    {
        var timediff:number = egret.getTimer() - this.beginTime;

        if(this.playMode == 1)
        {
            this.costTime = timediff/1000;
            this.timer.text = String(timediff/1000)+"''";
        }
        else if(this.playMode == 2)
        {
            this.timer.text = String(this.currStepNumber);
        }
        else if(this.playMode == 4)
        {
            this.timer.text = String(this.t1/1000)+"''";
        }
        else if(this.playMode == 5 || this.playMode == 3)
        {
            var maxTime:number = 0;
            if(this.playMode == 3)
            {
                maxTime = this.maxTime;
            }
            else if(this.playMode == 5)
            {
                maxTime = this.maxTime2;
            }

            if(timediff <= maxTime)
            {
                var leftTime:number = maxTime - timediff;
                this.timer.text = String(leftTime/1000)+"''";
                this.currentScoreNumber = leftTime;
                egret.Tween.get(this.progressBar, { loop: false }).to({x:(this.stageW*(leftTime/maxTime)) }, 300);
            }
            else
            {
                this._timer.stop();
                if(this.currStepNumber > 0)
                {
                    var infoKey:string = "pianotilesgame_"+this.playMode;
                    var best:number = Number(window.localStorage.getItem(infoKey));
                    var curr:number = this.currStepNumber;
                    console.log('curr:'+curr+'best:'+best);

                    if(curr > best)
                    {
                        this.httpRequest();
                        window.localStorage.setItem(infoKey,String(curr));
                    }

                    if(this.musicOpen)
                    {
                        var sound:egret.Sound = RES.getRes("soundcheer");
                        sound.play();
                    }

                    //计时器
                    var textTimer:egret.Timer = new egret.Timer(1000,1);
                    textTimer.addEventListener(egret.TimerEvent.TIMER,this.onTextAnimation,this);
                    textTimer.start();

                    this.timer.text = this.getClientLang(1);
                    egret.Tween.get(this.timer, { loop: false }).to({ alpha: 0 }, 200).to({ alpha: 1 }, 200).to({ alpha: 0 }, 200).to({ alpha: 1 }, 200);
                }

            }
        }

    }

    //计时器完成
    private onTextAnimation():void
    {
        //var sound:egret.Sound = RES.getRes("soundcheer")
        //sound.play();

        this.timer.text = String(this.currentScoreNumber);
        this.gameStop();
        this.showGameOverLayout();
    }

    // 游戏开始
    private gameStart():void
    {

        this._gameStart = Boolean(true);
        this._timer.start();
        this.beginTime = egret.getTimer();

        if(this.playMode == 2 || this.playMode == 4)
        {
            this.modelStart();
        }
    }

    // 游戏终止
    private gameStop():void
    {
        this._gameStart = Boolean(false);
        this._timer.stop();
        this.endTime = egret.getTimer();
    }


    private loadResource(event:egret.Event)
    {
        //设置加载进度界面
        this.loadingView  = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //egret.Profiler.getInstance().run();

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onGroupComp,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
        RES.loadConfig("resource/resource.json","resource/");
        RES.loadGroup("soundRes");
    }

    private _setCanvas1()
    {
        this._container1.removeChildren();

        for(var row:number=0; row< this.rows; row++)
        {
            var index:number = Math.floor(Math.random() * this.cols);

            for (var col:number = 0; col < this.cols; col++)
            {
                if(index == col)
                {
                    var shp:egret.Sprite = new egret.Sprite();
                    shp.name = "block1_"+row+"_"+col+"_1";
                    shp.graphics.beginFill( 0x000000, 1);
                    shp.graphics.lineStyle(0.3,0x000000);
                    shp.graphics.drawRect( 0, 0, this.width, this.height );
                    shp.x = col*this.width;
                    shp.y = row*this.height;
                    shp.width = this.width;
                    shp.height = this.height;
                    shp.graphics.endFill();
                    this._container1.addChild( shp );
                }
                else
                {
                    var shp:egret.Sprite = new egret.Sprite();
                    shp.name = "block1_"+row+"_"+col;
                    shp.graphics.beginFill( 0xFFFFFF, 1);
                    shp.graphics.lineStyle(0.3,0x000000);
                    shp.graphics.drawRect( 0, 0, this.width, this.height );
                    shp.graphics.endFill();
                    shp.x = col*this.width;
                    shp.y = row*this.height;
                    shp.width = this.width;
                    shp.height = this.height;
                    this._container1.addChild( shp );
                }

            }
        }
    }

    private _setCanvas2()
    {
        this._container2.removeChildren();

        for(var row:number=0; row< this.rows; row++)
        {
            var index:number = Math.floor(Math.random() * this.cols);

            for (var col:number = 0; col < this.cols; col++)
            {
                if(index == col)
                {
                    var shp:egret.Sprite = new egret.Sprite();
                    shp.name = "block2_"+row+"_"+col+"_1";
                    shp.graphics.beginFill( 0x000000, 1);
                    shp.graphics.lineStyle(0.3,0x000000);
                    shp.graphics.drawRect( 0, 0, this.width, this.height );
                    shp.graphics.endFill();
                    shp.x = col*this.width;
                    shp.y = row*this.height;
                    shp.width = this.width;
                    shp.height = this.height;

                    this._container2.addChild( shp );

                }
                else
                {
                    var shp:egret.Sprite = new egret.Sprite();
                    shp.name = "block2_"+row+"_"+col;
                    shp.graphics.beginFill( 0xFFFFFF, 1);
                    shp.graphics.lineStyle(0.3,0x000000);
                    shp.graphics.drawRect( 0, 0, this.width, this.height );
                    shp.graphics.endFill();
                    shp.x = col*this.width;
                    shp.y = row*this.height;
                    shp.width = this.width;
                    shp.height = this.height;
                    this._container2.addChild( shp );
                }

            }
        }
    }

    private onTouchModel(evt:egret.TouchEvent)
    {
        if(this.tweenPlaying == 1)
        {
            return;
        }

        if(evt.stageY >= this._container1.y && evt.stageY <= (this._container1.y+(this.stageH)))
        {
            for(var row:number=0;row<(this.rows);row++)
            {
                var h1:number = this._container1.y+(row*this.height);
                var h2:number = h1+this.height;

                if(evt.stageY >= h1 && evt.stageY < h2)
                {
                    var blackCol:number = -1;
                    if(this._container1.getChildByName("block1_"+row+"_0_1"))
                    {
                        blackCol = 0;
                    }
                    else if(this._container1.getChildByName("block1_"+row+"_1_1"))
                    {
                        blackCol = 1;
                    }
                    else if(this._container1.getChildByName("block1_"+row+"_2_1"))
                    {
                        blackCol = 2;
                    }
                    else if(this._container1.getChildByName("block1_"+row+"_3_1"))
                    {
                        blackCol = 3;
                    }

                    var w1:number = (blackCol*this.width)-(this.width/2);
                    var w2:number = w1+this.width+(this.width/2);

                    if(evt.stageX >= w1 && evt.stageX <= w2)
                    {
                        if(this.lastTouchRow == 0)
                        {
                            if(row != 3)
                            {
                                return;
                            }
                        }
                        else
                        {
                            if(row != (this.lastTouchRow-1))
                            {
                                return;
                            }
                        }

                        var dp:egret.Sprite =  <egret.Sprite> this._container1.getChildByName("block1_"+row+"_"+blackCol+"_1");
                        dp.name = "block1_"+row+"_"+blackCol+"_2";

                        this.lastTouchRow = row;
                        this.lastTouchLine = "line1";

                        this.currStepNumber++;
                        this.music_offset++;


                        if(this.music_offset >= this.music_len)
                        {
                            this.music_offset = 0;
                        }

                        var soundLetter:string = '';
                        if(this.music_id == 1)
                        {
                            soundLetter = this.music_1.substr(this.music_offset,1);
                        }
                        else if(this.music_id == 2)
                        {
                            soundLetter = this.music_2.substr(this.music_offset,1);
                        }
                        else if(this.music_id == 3)
                        {
                            soundLetter = this.music_3.substr(this.music_offset,1);
                        }
                        else if(this.music_id == 4)
                        {
                            soundLetter = this.music_4.substr(this.music_offset,1);
                        }
                        else if(this.music_id == 5)
                        {
                            soundLetter = this.music_5.substr(this.music_offset,1);
                        }
                        else if(this.music_id == 6)
                        {
                            soundLetter = this.music_6.substr(this.music_offset,1);
                        }
                        else if(this.music_id == 7)
                        {
                            soundLetter = this.music_7.substr(this.music_offset,1);
                        }
                        else if(this.music_id == 8)
                        {
                            soundLetter = this.music_8.substr(this.music_offset,1);
                        }
                        else if(this.music_id == 9)
                        {
                            soundLetter = this.music_9.substr(this.music_offset,1);
                        }
                        else if(this.music_id == 10)
                        {
                            soundLetter = this.music_10.substr(this.music_offset,1);
                        }

                        if(this.musicOpen)
                        {
                            playMusic('sound'+soundLetter+".mp3");
                        }

                        var x:number = Number(this.width*0.25);
                        var y:number = 0;

                        var shp:egret.Sprite = new egret.Sprite();
                        shp.graphics.beginFill( 0x666666 );
                        shp.graphics.drawRect(0,0,this.width/2,this.height);
                        shp.x = x;
                        shp.y = 0;
                        shp.width = this.width/2;
                        shp.height = this.height;
                        shp.graphics.endFill();

                        var shp1:egret.Sprite = new egret.Sprite();
                        shp1.graphics.beginFill( 0x666666 );
                        shp1.graphics.drawRect(0,0,this.width/2,this.height);
                        shp1.x = x;
                        shp1.y = 0;
                        shp1.width = this.width/2;
                        shp1.height = this.height;
                        shp1.graphics.endFill();


                        dp.addChild(shp);
                        dp.addChild(shp1);

                        var x1:number = 0;
                        var x2:number = this.width/2;


                        egret.Tween.get(shp, { loop: false }).to({ x:x1 }, 150);
                        egret.Tween.get(shp1, { loop: false }).to({ x:x2}, 150);
                        return;
                    }
                    else
                    {
                        for(var j:number=0;j<this.cols;j++)
                        {
                            var offset1:number = j*this.width;
                            var offset2:number = offset1+this.width;

                            if(evt.stageX >= offset1 && evt.stageX < offset2)
                            {
                                if(this.lastTouchRow == 0)
                                {
                                    if(row != 3)
                                    {
                                        return;
                                    }
                                }
                                else
                                {
                                    if(row != (this.lastTouchRow-1))
                                    {
                                        return;
                                    }
                                }

                                this.tweenPlaying = 1;

                                if(this.musicOpen)
                                {
                                    var sound:egret.Sound = RES.getRes("soundover");
                                    sound.play();
                                }

                                this.removeEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);
                                var infoKey:string = "pianotilesgame_"+this.playMode;
                                var best:number = Number(window.localStorage.getItem(infoKey));
                                if(this.playMode == 2)
                                {
                                    var curr:number = this.currStepNumber;
                                }
                                else
                                {
                                    var curr:number = Number(this.timer.text);
                                }

                                if(curr > best)
                                {
                                    this.httpRequest();
                                    window.localStorage.setItem(infoKey,String(curr));
                                }

                                var shp:egret.Sprite = new egret.Sprite();
                                shp.graphics.beginFill( 0xFF0000);
                                shp.graphics.drawRect(0,0,this.width,this.height);
                                shp.width = this.width;
                                shp.height = this.height;
                                shp.graphics.endFill();
                                var whiteSprite:egret.Sprite =  <egret.Sprite> this._container1.getChildByName("block1_"+row+"_"+j);
                                whiteSprite.addChild(shp);

                                //计时器
                                var _timer:egret.Timer = new egret.Timer(600,1);
                                _timer.addEventListener(egret.TimerEvent.TIMER,this.onAlphaTimer,this);
                                _timer.start();

                                egret.Tween.get(shp, { loop: false }).to({ alpha: 0 }, 200).to({ alpha: 1 }, 200);

                                return;
                            }
                        }
                    }

                    break;
                }
            }
        }
        else
        {
            for(var row:number=0;row<(this.rows);row++)
            {
                var h1:number = this._container2.y+(row*this.height);
                var h2:number = h1+this.height;

                if(evt.stageY >= h1 && evt.stageY < h2)
                {
                    var blackCol:number = -1;
                    if(this._container2.getChildByName("block2_"+row+"_0_1"))
                    {
                        blackCol = 0;
                    }
                    else if(this._container2.getChildByName("block2_"+row+"_1_1"))
                    {
                        blackCol = 1;
                    }
                    else if(this._container2.getChildByName("block2_"+row+"_2_1"))
                    {
                        blackCol = 2;
                    }
                    else if(this._container2.getChildByName("block2_"+row+"_3_1"))
                    {
                        blackCol = 3;
                    }

                    var w1:number = (blackCol*this.width)-(this.width/2);
                    var w2:number = w1+this.width+(this.width/2);

                    if(evt.stageX >= w1 && evt.stageX <= w2)
                    {
                        if(this.lastTouchRow == 0)
                        {
                            if(row != 3)
                            {
                                return;
                            }
                        }
                        else
                        {
                            if(row != (this.lastTouchRow-1))
                            {
                                return;
                            }
                        }
                        var dp:egret.Sprite =  <egret.Sprite> this._container2.getChildByName("block2_"+row+"_"+blackCol+"_1");
                        dp.name = "block2_"+row+"_"+blackCol+"_2";

                        this.lastTouchRow = row;
                        this.lastTouchLine = "line2";

                        this.currStepNumber++;
                        this.music_offset++;


                        if(this.music_offset >= this.music_len)
                        {
                            this.music_offset = 0;
                        }

                        var soundLetter:string = '';
                        if(this.music_id == 1)
                        {
                            soundLetter = this.music_1.substr(this.music_offset,1);
                        }
                        else if(this.music_id == 2)
                        {
                            soundLetter = this.music_2.substr(this.music_offset,1);
                        }
                        else if(this.music_id == 3)
                        {
                            soundLetter = this.music_3.substr(this.music_offset,1);
                        }
                        else if(this.music_id == 4)
                        {
                            soundLetter = this.music_4.substr(this.music_offset,1);
                        }
                        else if(this.music_id == 5)
                        {
                            soundLetter = this.music_5.substr(this.music_offset,1);
                        }
                        else if(this.music_id == 6)
                        {
                            soundLetter = this.music_6.substr(this.music_offset,1);
                        }
                        else if(this.music_id == 7)
                        {
                            soundLetter = this.music_7.substr(this.music_offset,1);
                        }
                        else if(this.music_id == 8)
                        {
                            soundLetter = this.music_8.substr(this.music_offset,1);
                        }
                        else if(this.music_id == 9)
                        {
                            soundLetter = this.music_9.substr(this.music_offset,1);
                        }
                        else if(this.music_id == 10)
                        {
                            soundLetter = this.music_10.substr(this.music_offset,1);
                        }

                        if(this.musicOpen)
                        {
                            playMusic('sound'+soundLetter+".mp3");
                        }

                        var x:number = Number(this.width*0.25);
                        var y:number = 0;

                        var shp:egret.Sprite = new egret.Sprite();
                        shp.graphics.beginFill( 0x666666 );
                        shp.graphics.drawRect(0,0,this.width/2,this.height);
                        shp.x = x;
                        shp.y = 0;
                        shp.width = this.width/2;
                        shp.height = this.height;
                        shp.graphics.endFill();

                        var shp1:egret.Sprite = new egret.Sprite();
                        shp1.graphics.beginFill( 0x666666 );
                        shp1.graphics.drawRect(0,0,this.width/2,this.height);
                        shp1.x = x;
                        shp1.y = 0;
                        shp1.width = this.width/2;
                        shp1.height = this.height;
                        shp1.graphics.endFill();


                        dp.addChild(shp);
                        dp.addChild(shp1);

                        var x1:number = 0;
                        var x2:number = this.width/2;


                        egret.Tween.get(shp, { loop: false }).to({ x:x1 }, 150);
                        egret.Tween.get(shp1, { loop: false }).to({ x:x2}, 150);
                        return;
                    }
                    else
                    {
                        for(var j:number=0;j<this.cols;j++)
                        {
                            var offset1:number = j*this.width;
                            var offset2:number = offset1+this.width;

                            if(evt.stageX >= offset1 && evt.stageX < offset2)
                            {
                                if(this.lastTouchRow == 0)
                                {
                                    if(row != 3)
                                    {
                                        return;
                                    }
                                }
                                else
                                {
                                    if(row != (this.lastTouchRow-1))
                                    {
                                        return;
                                    }
                                }

                                this.tweenPlaying = 1;

                                if(this.musicOpen)
                                {
                                    var sound:egret.Sound = RES.getRes("soundover");
                                    sound.play();
                                }

                                this.removeEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);
                                var infoKey:string = "pianotilesgame_"+this.playMode;
                                var best:number = Number(window.localStorage.getItem(infoKey));
                                if(this.playMode == 2)
                                {
                                    var curr:number = this.currStepNumber;
                                }
                                else
                                {
                                    var curr:number = Number(this.timer.text);
                                }

                                if(curr > best)
                                {
                                    this.httpRequest();
                                    window.localStorage.setItem(infoKey,String(curr));
                                }

                                var shp:egret.Sprite = new egret.Sprite();
                                shp.graphics.beginFill( 0xFF0000);
                                shp.graphics.drawRect(0,0,this.width,this.height);
                                shp.width = this.width;
                                shp.height = this.height;
                                shp.graphics.endFill();
                                var whiteSprite:egret.Sprite =  <egret.Sprite> this._container2.getChildByName("block2_"+row+"_"+j);
                                whiteSprite.addChild(shp);

                                //计时器
                                var _timer:egret.Timer = new egret.Timer(600,1);
                                _timer.addEventListener(egret.TimerEvent.TIMER,this.onAlphaTimer,this);
                                _timer.start();

                                egret.Tween.get(shp, { loop: false }).to({ alpha: 0 }, 200).to({ alpha: 1 }, 200);

                                return;
                            }
                        }
                    }

                    break;
                }
            }
        }
    }

    private modelsInit()
    {
        //egret.Profiler.getInstance().run();

        var musicId:number =  Math.max(1,Math.floor(Math.random()*10));
        this.music_id = musicId;

        if(musicId == 1)
        {
            this.music_len = this.music_1.length;
        }
        else if(musicId == 2)
        {
            this.music_len = this.music_2.length;
        }
        else if(musicId == 3)
        {
            this.music_len = this.music_3.length;
        }
        else if(musicId == 4)
        {
            this.music_len = this.music_4.length;
        }
        else if(musicId == 5)
        {
            this.music_len = this.music_5.length;
        }
        else if(musicId == 6)
        {
            this.music_len = this.music_6.length;
        }
        else if(musicId == 7)
        {
            this.music_len = this.music_7.length;
        }
        else if(musicId == 8)
        {
            this.music_len = this.music_8.length;
        }
        else if(musicId == 9)
        {
            this.music_len = this.music_9.length;
        }
        else if(musicId == 10)
        {
            this.music_len = this.music_10.length;
        }

        this.music_offset = -1;

        var container2:egret.Sprite = new egret.Sprite();
        container2.name = 'container2';
        container2.graphics.beginFill(0xFFFFFF, 1);
        container2.graphics.drawRect(0,0,this.stageW,this.stageH);
        container2.x = 0;
        container2.y = -this.stageH;
        container2.width = this.stageW;
        container2.height = this.stageH;
        container2.graphics.endFill();
        container2.touchEnabled = true;
        container2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchModel, this,false);

        this._container2 = container2;
        this.addChild(container2);

        for(var row:number=0; row< this.rows; row++)
        {
            var index:number = Math.floor(Math.random() * this.cols);

            for (var col:number = 0; col < this.cols; col++)
            {
                var spr:egret.Sprite = new egret.Sprite();
                if(index == col)
                {
                    spr.name = "block2_"+row+"_"+col+"_1";
                    spr.graphics.beginFill( 0x000000, 1);
                    spr.graphics.lineStyle(0.3,0x000000);
                    spr.graphics.drawRect( 0, 0, this.width, this.height );
                    spr.graphics.endFill();
                    spr.x = col*this.width;
                    spr.y = row*this.height;
                    spr.width = this.width;
                    spr.height = this.height;
                    container2.addChild( spr );

                }
                else
                {
                    spr.name = "block2_"+row+"_"+col;
                    spr.graphics.beginFill( 0xFFFFFF, 1);
                    spr.graphics.lineStyle(0.3,0x000000);
                    spr.graphics.drawRect( 0, 0, this.width, this.height );
                    spr.graphics.endFill();
                    spr.x = col*this.width;
                    spr.y = row*this.height;
                    spr.width = this.width;
                    spr.height = this.height;
                    container2.addChild( spr );
                }
            }
        }


        var container1:egret.Sprite = new egret.Sprite();
        container1.name = 'container1';
        container1.graphics.beginFill(0xFFFFFF, 1);
        container1.graphics.drawRect(0,0,this.stageW,this.stageH);
        container1.x = 0;
        container1.y = 0;
        container1.width = this.stageW;
        container1.height = this.stageH;
        container1.graphics.endFill();
        container1.touchEnabled = true;
        container1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchModel, this,false);
        this._container1 = container1;
        this.addChild(container1);

        for(var row:number=0; row< this.rows; row++)
        {
            var index:number = Math.floor(Math.random() * this.cols);

            for (var col:number = 0; col < this.cols; col++)
            {
                if(row == 3)
                {
                    var shp:egret.Sprite = new egret.Sprite();
                    shp.name = "block1_"+row+"_"+col+"_2";
                    shp.x = col*this.width;
                    shp.y = row*this.height;
                    shp.width = this.width;
                    shp.height = this.height;
                    shp.graphics.beginFill( 0xFFFF00, 1);
                    shp.graphics.lineStyle(0.3,0x000000);
                    shp.graphics.drawRect( 0, 0, this.width, this.height );
                    shp.graphics.endFill();
                    container1.addChild( shp );
                }
                else if(row == 2)
                {
                    if(index == col)
                    {
                        var shp2:egret.Sprite = new egret.Sprite();
                        shp2.name = "block1_"+row+"_"+col+"_1";
                        shp2.graphics.beginFill(0x000000, 1);
                        shp2.graphics.lineStyle(0.3,0x000000);
                        shp2.graphics.drawRect(0,0,this.width,this.height);
                        shp2.graphics.endFill();
                        shp2.x = col*this.width;
                        shp2.y = row*this.height;
                        shp2.width = this.width;
                        shp2.height = this.height;
                        shp2.touchEnabled = true;
                        shp2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameStart, this);

                        var btnBack:egret.Bitmap = new egret.Bitmap;
                        btnBack.texture = RES.getRes('button_back');
                        shp2.addChild(btnBack);
                        btnBack.x = this.width/2 - (btnBack.width/2);
                        btnBack.y = this.height/5;

                        var label:egret.TextField = new egret.TextField();
                        shp2.addChild(label);
                        label.width = this.width;
                        label.height = this.height;
                        label.size = this.fontSize;
                        label.text = this.getClientLang(2);
                        label.fontFamily = "微软雅黑";
                        label.textColor = 0xFFFFFF;
                        label.textAlign = egret.HorizontalAlign.CENTER;
                        label.y = this.height/2;
                        container1.addChild( shp2 );
                    }
                    else
                    {
                        var shp:egret.Sprite = new egret.Sprite();
                        shp.name = "block1_"+row+"_"+col;
                        shp.graphics.beginFill( 0xFFFFFF, 1);
                        shp.graphics.lineStyle(0.3,0x000000);
                        shp.graphics.drawRect( 0, 0, this.width, this.height );
                        shp.graphics.endFill();
                        shp.x = col*this.width;
                        shp.y = row*this.height;
                        shp.width = this.width;
                        shp.height = this.height;
                        container1.addChild( shp );
                    }
                }
                else
                {
                    if(index == col)
                    {
                        var shp:egret.Sprite = new egret.Sprite();
                        shp.name = "block1_"+row+"_"+col+"_1";
                        shp.graphics.beginFill( 0x000000, 1);
                        shp.graphics.lineStyle(0.3,0x000000);
                        shp.graphics.drawRect( 0, 0, this.width, this.height );
                        shp.graphics.endFill();
                        shp.x = col*this.width;
                        shp.y = row*this.height;
                        shp.width = this.width;
                        shp.height = this.height;
                        container1.addChild( shp );
                    }
                    else
                    {
                        var shp:egret.Sprite = new egret.Sprite();
                        shp.name = "block1_"+row+"_"+col;
                        shp.graphics.beginFill( 0xFFFFFF, 1);
                        shp.graphics.lineStyle(0.3,0x000000);
                        shp.graphics.drawRect( 0, 0, this.width, this.height );
                        shp.graphics.endFill();
                        shp.x = col*this.width;
                        shp.y = row*this.height;
                        shp.width = this.width;
                        shp.height = this.height;
                        container1.addChild( shp );
                    }
                }


            }
        }

        var lbl:egret.TextField = new egret.TextField();

        lbl.size = 40;
        lbl.x = (this.stage.stageWidth/2)-100;
        lbl.y = 20;
        lbl.width=200;
        lbl.height = 40;
        lbl.text = "0";
        lbl.fontFamily = "Arial";
        lbl.stroke = 2;
        lbl.italic = true;
        lbl.textColor = 0xff0000;
        lbl.strokeColor = 0xFFFF00;
        lbl.textAlign = egret.HorizontalAlign.CENTER;
        lbl.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(lbl);
        this.timer = lbl;

        var stageW:number = this.stage.stageWidth;
        var stageH:number = this.stage.stageHeight;

        var topMask6:egret.Shape = new egret.Shape();
        topMask6.graphics.beginFill(0xFFFF00, 1);
        topMask6.graphics.drawRect(0, 0, stageW, 4);
        topMask6.graphics.lineStyle( 3, 0xd9d6c3, 1, true );
        topMask6.graphics.endFill();
        topMask6.width = stageW;
        topMask6.height = 3;

        if(this.playMode == 1)
        {
            topMask6.x = -stageW;
        }
        else if(this.playMode == 3 || this.playMode == 5)
        {
            topMask6.x = -stageW;
        }
        topMask6.y = 0;
        this.progressBar = topMask6;
    }

    private gameViewUpdate():void
    {

        if(this.playMode == 4)
        {
            var t1:number = egret.getTimer();
        }


        if((this.stageH >= this._container1.y && this.stageH <= (this._container1.y+(this.stageH))) || (this._container1.y >= this.stageH))
        {
            for (var row:number = 0; row < (this.rows); row++)
            {
                var h1:number = this._container1.y + (row * this.height);
                var h2:number = h1 + this.height;

                if ((this.stageH) <= h1)
                {
                    console.log('h1:'+h1);
                    var blackCol:number = -1;
                    if (this._container1.getChildByName("block1_" + row + "_0_2")) {
                        blackCol = 0;
                    }
                    else if (this._container1.getChildByName("block1_" + row + "_1_2")) {
                        blackCol = 1;
                    }
                    else if (this._container1.getChildByName("block1_" + row + "_2_2")) {
                        blackCol = 2;
                    }
                    else if (this._container1.getChildByName("block1_" + row + "_3_2")) {
                        blackCol = 3;
                    }

                    if(blackCol < 0)
                    {
                        console.log('row1:'+row+",col:"+blackCol+",h1:"+h1);

                        this.removeEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);

                        if (this._container1.getChildByName("block1_" + row + "_0_1")) {
                            blackCol = 0;
                        }
                        else if (this._container1.getChildByName("block1_" + row + "_1_1")) {
                            blackCol = 1;
                        }
                        else if (this._container1.getChildByName("block1_" + row + "_2_1")) {
                            blackCol = 2;
                        }
                        else if (this._container1.getChildByName("block1_" + row + "_3_1")) {
                            blackCol = 3;
                        }

                        this.foucsname1 = "block1_" + row + "_"+blackCol+"_1";
                        this.tw1 = egret.Tween.get(this._container1, {loop: !1});
                        this.tw1.to({y: (this._container1.y-(2*this.height))},200);

                        this.tw2 = egret.Tween.get(this._container2, {loop: !1});



                        if(row == 3) {
                            var index:number = Math.floor(Math.random() * this.cols);

                            for (var col:number = 0; col < this.cols; col++) {
                                var square:egret.Sprite = new egret.Sprite();
                                if (index == col) {
                                    square.graphics.beginFill(0x666666, 1);
                                }
                                else {
                                    square.graphics.beginFill(0xFFFFFF, 1);
                                }
                                square.graphics.lineStyle(0.3, 0x000000, 1, true);

                                var x:number = col * this.width;
                                var y:number = 4 * this.height;

                                square.graphics.drawRect(0, 0, this.width, this.height);
                                square.x = x;
                                square.y = y;
                                square.width = this.width;
                                square.height = this.height;
                                square.graphics.endFill();

                                this._container2.addChild(square);
                            }
                        }
                            //this.tw2.to({y: (this._container2.y-(2*this.height))},200).wait(200).call(this.focusBlock,this);
                        this._container2.height = this.stageH+this.height;

                        this.tw2.to({y: (this._container2.y-(2*this.height))},200).wait(200).call(this.focusBlock,this);


                        if(this.musicOpen)
                        {
                            var sound:egret.Sound = RES.getRes("soundcheer");
                            sound.play();
                        }

                        var infoKey:string = "pianotilesgame_"+this.playMode;
                        var best:number = Number(window.localStorage.getItem(infoKey));
                        if(this.playMode == 2)
                        {
                            var curr:number = this.currStepNumber;
                        }
                        else
                        {
                            var curr:number = Number(this.timer.text);
                        }

                        if(curr > best)
                        {
                            this.httpRequest();
                            window.localStorage.setItem(infoKey,String(curr));
                        }
                        return;

                    }
                }
            }
        }
        else
        {
            for (var row:number = 0; row < (this.rows); row++)
            {
                var h1:number = this._container2.y + (row * this.height);
                var h2:number = h1 + this.height;

                if ((this.stageH) <= h1)
                {
                    console.log('h2:'+h1);

                    var blackCol:number = -1;
                    if (this._container2.getChildByName("block2_" + row + "_0_2")) {
                        blackCol = 0;
                    }
                    else if (this._container2.getChildByName("block2_" + row + "_1_2")) {
                        blackCol = 1;
                    }
                    else if (this._container2.getChildByName("block2_" + row + "_2_2")) {
                        blackCol = 2;
                    }
                    else if (this._container2.getChildByName("block2_" + row + "_3_2")) {
                        blackCol = 3;
                    }

                    if(blackCol < 0)
                    {
                        console.log('row2:'+row+",col2:"+blackCol+",h2:"+h1);

                        this.removeEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);

                        if (this._container2.getChildByName("block2_" + row + "_0_1")) {
                            blackCol = 0;
                        }
                        else if (this._container2.getChildByName("block2_" + row + "_1_1")) {
                            blackCol = 1;
                        }
                        else if (this._container2.getChildByName("block2_" + row + "_2_1")) {
                            blackCol = 2;
                        }
                        else if (this._container2.getChildByName("block2_" + row + "_3_1")) {
                            blackCol = 3;
                        }
                        this.foucsname2 = "block2_" + row + "_"+blackCol+"_1";

                        this.tw1 = egret.Tween.get(this._container2, {loop: !1});
                        this.tw1.to({y: (this._container2.y-(2*this.height))},200);

                        this.tw2 = egret.Tween.get(this._container1, {loop: !1});

                        if(row == 3) {
                            var index:number = Math.floor(Math.random() * this.cols);

                            for (var col:number = 0; col < this.cols; col++) {
                                var square:egret.Sprite = new egret.Sprite();
                                if (index == col) {
                                    square.graphics.beginFill(0x666666, 1);
                                }
                                else {
                                    square.graphics.beginFill(0xFFFFFF, 1);
                                }
                                square.graphics.lineStyle(0.3, 0x000000, 1, true);

                                var x:number = col * this.width;
                                var y:number = 4 * this.height;

                                square.graphics.drawRect(0, 0, this.width, this.height);
                                square.x = x;
                                square.y = y;
                                square.width = this.width;
                                square.height = this.height;
                                square.graphics.endFill();

                                this._container1.addChild(square);
                            }
                        }

                        this._container1.height = this.stageH+this.height;
                        this.tw2.to({y: (this._container1.y-(2*this.height))},200).wait(200).call(this.focusBlock2,this);


                        if(this.musicOpen)
                        {
                            var sound:egret.Sound = RES.getRes("soundcheer");
                            sound.play();
                        }

                        var infoKey:string = "pianotilesgame_"+this.playMode;
                        var best:number = Number(window.localStorage.getItem(infoKey));
                        if(this.playMode == 2)
                        {
                            var curr:number = this.currStepNumber;
                        }
                        else
                        {
                            var curr:number = Number(this.timer.text);
                        }

                        if(curr > best)
                        {
                            this.httpRequest();
                            window.localStorage.setItem(infoKey,String(curr));
                        }

                        return;
                    }
                }
            }
        }

        if(this.playMode == 4)
        {
            this._speed += 0.0005;
        }

        this._container1.y += this._speed;
        if(this._container1.y >= (this.stageH))
        {
            this._setCanvas1();
            this._container1.y = -this.stageH+this._speed;
        }

        this._container2.y += this._speed;
        if(this._container2.y >= (this.stageH))
        {
            this._setCanvas2();
            this._container2.y = -this.stageH+this._speed;
        }

        if(this.playMode == 4)
        {
            var diff:number = egret.getTimer() - t1;
            this.t1 += diff;
        }

    }

    private setCanvasY():void
    {
        this._container1.y = this.stageH;
    }
    private setCanvasY2():void
    {
        this._container2.y = this.stageH;
    }

    private focusBlock2():void
    {
        var shp:egret.Sprite = new egret.Sprite();
        shp.graphics.beginFill( 0xF5F5F5);
        shp.graphics.drawRect(0,0,this.width,this.height);
        shp.x = 0;
        shp.y = 0;
        shp.width = this.width;
        shp.height = this.height;
        shp.graphics.endFill();
        console.log('focusname2:'+this.foucsname2);
        var sp:egret.Sprite = <egret.Sprite> this._container2.getChildByName(this.foucsname2);
        sp.addChild(shp);

        var _timer:egret.Timer = new egret.Timer(1000,1);
        _timer.addEventListener(egret.TimerEvent.TIMER,this.onAlphaFinish,this);
        _timer.start();

        //egret.Tween.removeTweens(this.tw1);
        //egret.Tween.removeTweens(this.tw2);

        egret.Tween.get(shp, { loop: false }).to({ alpha: 0 }, 200).to({ alpha: 1 }, 200).to({ alpha: 0 }, 200).to({ alpha: 1 }, 200);
    }

    private focusBlock():void
    {
        var shp:egret.Sprite = new egret.Sprite();
        shp.graphics.beginFill( 0xF5F5F5);
        shp.graphics.drawRect(0,0,this.width,this.height);
        shp.x = 0;
        shp.y = 0;
        shp.width = this.width;
        shp.height = this.height;
        shp.graphics.endFill();
        console.log('focusname1:'+this.foucsname1);

        var sp:egret.Sprite = <egret.Sprite> this._container1.getChildByName(this.foucsname1);
        sp.addChild(shp);

        var _timer:egret.Timer = new egret.Timer(1000,1);
        _timer.addEventListener(egret.TimerEvent.TIMER,this.onAlphaFinish,this);
        _timer.start();

        //egret.Tween.removeTweens(this.tw1);
        //egret.Tween.removeTweens(this.tw2);


        egret.Tween.get(shp, { loop: false }).to({ alpha: 0 }, 200).to({ alpha: 1 }, 200).to({ alpha: 0 }, 200).to({ alpha: 1 }, 200);
    }

    private modelStart():void
    {
        this.addEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);
    }

    private onAlphaFinish():void
    {
        this.showGameOverLayout();
    }

    private onAboutBack()
    {
        this.startScene.y = this.stageH;
        this.startScene.alpha = 0;
        this.addChild(this.startScene);

        this.tw1 = egret.Tween.get(this.about, {
            loop: !1
        });
        this.tw1.to({
                y: -this.stageH,
                alpha: 0
            },
            300, egret.Ease.circInOut).call(this.removeAboutScene, this)

        this.tw2 = egret.Tween.get(this.startScene, {
            loop: !1
        });
        this.tw2.to({
                y: 0,
                alpha: 1
            },
            300, egret.Ease.circInOut);

    }

    private aboutApp()
    {
        this.about.y = this.stageH;
        this.about.alpha = 0;
        this.addChild(this.about);
        this.weixin2();

        this.tw1 = egret.Tween.get(this.startScene, {
            loop: !1
        });
        this.tw1.to({
                y: -this.stageH,
                alpha: 0
            },
            300, egret.Ease.circInOut).call(this.removeStartScene, this)

        this.tw2 = egret.Tween.get(this.about, {
            loop: !1
        });
        this.tw2.to({
                y: 0,
                alpha: 1
            },
            300, egret.Ease.circInOut);
    }

    private removeStartScene()
    {
        egret.Tween.removeTweens(this.tw1);
        egret.Tween.removeTweens(this.tw2);
        this.removeChild(this.startScene);
    }

    private removeAboutScene()
    {
        egret.Tween.removeTweens(this.tw1);
        egret.Tween.removeTweens(this.tw2);
        this.removeChild(this.about);
    }

    private onSetMusic()
    {
        if(this.musicOpen == 1)
        {
            this.musicOpen = 0;
            this.musicTxt.text = "音效关";
        }
        else
        {
            this.musicOpen = 1;
            this.musicTxt.text = "音效开";
        }
    }

    private onRest()
    {
        this.addChild(this.shareTips);
    }

    private closeShareTips()
    {
        if(this.shareTips.parent)
        {
            this.shareTips.parent.removeChild(this.shareTips);
        }
    }

    private onClickRank()
    {
        this.openWin();
    }

    private onOpenMore()
    {
        window.location.href = "http://app.easymobi.cn/";
    }

    private onClickAbout()
    {
        window.location.href = "http://www.easymobi.cn/";
    }

    private createAboutApp()
    {
        var about:egret.Sprite = new egret.Sprite();
        about.graphics.drawRect(0,0,this.stage.stageWidth,this.stage.stageHeight);
        about.x = 0;
        about.y = 0;
        about.name = 'aboutScene';
        about.width = this.stage.stageWidth;
        about.height = this.stage.stageHeight;
        this.about = about;
        about.graphics.beginFill(0x000000, 2);

        var w:number = this.stage.stageWidth/2;
        var h:number = this.stage.stageHeight/3;
        for(var row:number=0; row< 3; row++)
        {
            var index:number = Math.floor(Math.random()*2);
            for(var col:number=0; col< 2; col++)
            {
                var block:egret.Sprite = new egret.Sprite();
                var label:egret.TextField = new egret.TextField();
                block.addChild(label);
                label.width = w;
                label.height = h;
                label.size = this.fontSize;
                label.fontFamily = "微软雅黑";
                label.textAlign = egret.HorizontalAlign.CENTER;
                label.verticalAlign = egret.VerticalAlign.MIDDLE;
                if(index == col)
                {
                    block.graphics.beginFill(0x000000, 1);
                    label.textColor = 0xffffff;
                }
                else
                {
                    block.graphics.beginFill(0xFFFFFF, 1);
                    label.textColor = 0x000000;
                }

                block.touchEnabled=true;
                if(row == 0 && col == 0)
                {
                    label.text = "返回";
                    block.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAboutBack, this,false,1 );
                }
                else if(row == 0 && col == 1)
                {
                    label.text = "音效开";
                    this.musicTxt = label;
                    block.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSetMusic, this,false,1 );
                }
                else if(row == 1 && col == 0)
                {
                    label.text = "微信分享";
                    block.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRest, this,false,1 );
                }
                else if(row == 1 && col == 1)
                {
                    label.text = "排行榜";
                    block.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickRank, this,false,1 );
                }
                else if(row == 2 && col == 0)
                {
                    label.text = "更多游戏";
                    block.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenMore, this,false,1 );
                }
                else if(row == 2 && col == 1)
                {
                    label.text = "关于我们";
                    block.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickAbout, this,false,1 );
                }

                block.graphics.lineStyle( 0.3, 0x000000, 1 );

                var x:number =col*w;
                var y:number = row*h;

                block.graphics.drawRect(0,0,w,h);
                block.x = x;
                block.y = y;
                block.width = w;
                block.height = h;

                block.graphics.endFill();
                this.about.addChild(block);
            }
        }
    }

    private gameMain()
    {
        //egret.Profiler.getInstance().run();
        //console.log(this.stage.stageWidth+"_"+this.stage.stageHeight);

        var musicId:number =  Math.max(1,Math.floor(Math.random()*10));
        this.music_id = musicId;

        if(musicId == 1)
        {
            this.music_len = this.music_1.length;
        }
        else if(musicId == 2)
        {
            this.music_len = this.music_2.length;
        }
        else if(musicId == 3)
        {
            this.music_len = this.music_3.length;
        }
        else if(musicId == 4)
        {
            this.music_len = this.music_4.length;
        }
        else if(musicId == 5)
        {
            this.music_len = this.music_5.length;
        }
        else if(musicId == 6)
        {
            this.music_len = this.music_6.length;
        }
        else if(musicId == 7)
        {
            this.music_len = this.music_7.length;
        }
        else if(musicId == 8)
        {
            this.music_len = this.music_8.length;
        }
        else if(musicId == 9)
        {
            this.music_len = this.music_9.length;
        }
        else if(musicId == 10)
        {
            this.music_len = this.music_10.length;
        }

        this.music_offset = -1;


        var spr2:egret.Sprite = new egret.Sprite();
        spr2.graphics.drawRect(0,0,this.stage.stageWidth,this.stage.stageHeight);
        spr2.x = 0;
        spr2.y = 0;
        spr2.name = 'spr2';
        spr2.width = this.stage.stageWidth;
        spr2.height = this.stage.stageHeight;
        this.spr = spr2;
        spr2.graphics.beginFill(0xffffff, 2);
        spr2.graphics.lineStyle( 2, 0xffffff, 1, true );
        spr2.graphics.endFill();

        this.addChild(spr2);

        var lbl:egret.TextField = new egret.TextField();

        lbl.size = 40;
        lbl.x = (this.stage.stageWidth/2)-100;
        lbl.y = 20;
        lbl.width=200;
        lbl.height = 40;
        lbl.text = "0.000";
        lbl.fontFamily = "Arial";
        lbl.stroke = 2;
        lbl.italic = true;
        lbl.textColor = 0xff0000;
        lbl.strokeColor = 0xFFFF00;
        lbl.textAlign = egret.HorizontalAlign.CENTER;
        lbl.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(lbl);
        this.timer = lbl;

        this.stageW = this.stage.stageWidth;
        this.stageH = this.stage.stageHeight;
        this.width = this.stageW/this.cols;
        this.height = this.stageH/this.rows;

        this.squareArr = [];
        var maxRows:number = this.rows - 1;
        var endRow:number = maxRows - 1;
        var btnCol:number = -100;

        for(var row:number=-1; row< maxRows; row++)
        {
            var index:number = Math.floor(Math.random()*this.cols);
            for(var col:number=0; col< this.cols; col++)
            {
                var square:egret.Sprite = new egret.Sprite();
                if(index == col)
                {
                    square.name = row+"_"+col+"_1";
                    square.graphics.beginFill(0x000000, 1);
                    square.touchEnabled=true;
                    if(this.playMode == 2)
                    {
                        square.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBlack, this,false,1 );
                    }
                    else
                    {
                        square.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBlack, this,false,1 );
                    }

                    if(row == endRow)
                    {

                        var btnBack:egret.Bitmap = new egret.Bitmap;
                        btnBack.texture = RES.getRes('button_back');
                        square.addChild(btnBack);
                        btnBack.x = this.width/2 - (btnBack.width/2);
                        btnBack.y = this.height/5;
                        var label:egret.TextField = new egret.TextField();
                        square.addChild(label);
                        label.width = this.width;
                        label.height = this.height;
                        label.size = this.fontSize;
                        label.text = this.getClientLang(2);
                        label.fontFamily = "微软雅黑";
                        label.textColor = 0xffffff;
                        label.textAlign = egret.HorizontalAlign.CENTER;
                        label.y = this.height/2;
                        //label.verticalAlign = egret.VerticalAlign.MIDDLE;
                        square.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameStart, this,false,2 );

                    }
                }
                else
                {
                    square.name = row+"_"+col;
                    square.touchEnabled=true;
                    square.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchWhite, this );
                    square.graphics.beginFill(0xffffff, 1);
                }

                var x:number = col*this.width;
                var y:number = row*this.height;

                /**
                square.graphics.drawRect(x, y, this.width, this.height);
                square.graphics.endFill();

                square.graphics.beginFill(0x000000, 1);
                //topMask.graphics.lineStyle( 0.3, 0x000000, 1 );

                var _y:number = y+this.height-1;
                square.graphics.drawRect(x, y, 1, this.height);
                square.graphics.endFill();
                square.graphics.beginFill(0x000000, 1);
                //topMask.graphics.drawRect(x+20, y, 1, this.height);

                square.graphics.drawRect(x, _y, this.width, 1);
                square.graphics.endFill();
                square.name = row+"_"+col;
                    **/

                square.graphics.lineStyle( 0.3, 0x000000, 1 );

                var x:number = col*this.width;
                var y:number = row*this.height;

                square.graphics.drawRect(0,0,this.width,this.height);
                //square.name = row+"_"+col;
                square.x = x;
                square.y = y;
                square.width = this.width;
                square.height = this.height;

                square.graphics.endFill();


        this.squareArr[row +  "_"+ col] = square;

        if(btnCol >= 0)
        {
            //square.addChild(label);
            //btnCol = -100;
        }


        this.spr.addChild(square);

    }
}


        for(var col:number=0; col< this.cols; col++) {
            var square:egret.Sprite = new egret.Sprite();
            square.graphics.beginFill(0xFFFF00, 1);
            square.graphics.lineStyle( 0.3, 0x000000, 1, true );

            var x:number = col*this.width;
            var y:number = maxRows*this.height;

            square.graphics.drawRect(0,0,this.width,this.height);
            square.x = x;
            square.y = y;
            square.width = this.width;
            square.height = this.height;
            square.graphics.endFill();

            this.squareArr[row +  "_"+ col] = square;
            this.spr.addChild(square);
        }

        var stageW:number = this.stage.stageWidth;
        var stageH:number = this.stage.stageHeight;

        var topMask:egret.Shape = new egret.Shape();
        topMask.graphics.beginFill(0xFFFF00, 1);
        topMask.graphics.drawRect(0, 0, stageW, 4);
        topMask.graphics.lineStyle( 3, 0xd9d6c3, 1, true );
        topMask.graphics.endFill();
        topMask.width = stageW;
        topMask.height = 3;

        if(this.playMode == 1)
        {
            topMask.x = -stageW;
        }
        else if(this.playMode == 3 || this.playMode == 5)
        {
            if(this.playMode == 3)
            {
                this.timer.text = String(this.maxTime/1000)+"''";;
            }
            if(this.playMode == 5)
            {
                this.timer.text = String(this.maxTime2/1000)+"''";;
            }
            topMask.x = -stageW;
        }
        topMask.y = 0;
        this.progressBar = topMask;
        this.addChild(topMask);

    }

    // 点击白块
    private onTouchWhite( evt:egret.TouchEvent ) {

        if(!this._gameStart)
        {
            return;
        }

        if(this.resultOp1)
        {
            return;
        }

        if (evt.stageY < ((this.rows-2)*this.height) || evt.stageY > ((this.rows-1)*this.height)) {

            var a:number = this.height + (this.height*0.5);
            var b:number = this.height*2;

            var c:number = this.height*3;
            var d:number = this.height*4;

            if(evt.stageY >= a && evt.stageY <= b)
            {
                this.onTouchBlack(evt);
                return;
            }

            return;
        }

        if(this.tweenPlaying == 1)
        {
            return;
        }

        this.tweenPlaying = 1;

        if(this.musicOpen)
        {
            var sound:egret.Sound = RES.getRes("soundover");
            sound.play();
        }

        var name:string = evt.target.name;
        var str:string[] =  name.split('_');

        var x:number = Number(str[1])*this.width;
        var y:number =2*this.height;

        var shp:egret.Sprite = new egret.Sprite();
        shp.graphics.beginFill( 0xFF0000);
        shp.graphics.drawRect(0,0,this.width,this.height);
        shp.x = 0;
        shp.y = 0;
        shp.width = this.width;
        shp.height = this.height;
        shp.graphics.endFill();

        var spr:egret.Sprite =  <egret.Sprite> evt.target;
        spr.addChild(shp);

        //计时器
        var mytimer:egret.Timer = new egret.Timer(600,1);
        mytimer.addEventListener(egret.TimerEvent.TIMER,this.onAlphaTimer,this);
        mytimer.start();

        egret.Tween.get(shp, { loop: false }).to({ alpha: 0 }, 200).to({ alpha: 1 }, 200);
        return;
    }

    //计时器完成
    private onAlphaTimer():void
    {
        this.gameStop();
        this.showGameOverFaoutLayout();
    }

    // 提交分数
    private httpRequest()
    {
        this.isHttpReq = 1;
        var top:String = '';
        if(this.playMode == 4)
        {
            top = this.timer.text;
        }
        else if(this.playMode == 1)
        {
            top = String(this.costTime);
        }
        else
        {
            top = String(this.currStepNumber);
        }

        var params:string = "?id=pinaotilesgameweb&name=pinaotilesgameweb&top="+top+"&difficulty="+this.playMode+"&game=pinaotilesgameweb";

        //创建GET请求
        var url:string = this.rankApi + params;

        var loader:egret.URLLoader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        loader.addEventListener(egret.Event.COMPLETE,this.onGetComplete,this);
        loader.load(new egret.URLRequest(url));
    }

    //GET请求完成
    private onGetComplete(event:egret.Event):void
    {
        var ret:string = event.target.data.toString();
        var lastRank:string = ret.substring(12,(ret.indexOf(',')));
        var curRank:string = ret.substring((ret.lastIndexOf(':')+1),(ret.length-3));
        this.lastRank = Number(lastRank);
        this.currRank = Number(curRank);
    }

    private removeEndRow()
    {
    }

    // 点击黑块触发操作
    private onTouchBlack( evt:egret.TouchEvent )
    {
        if(!this._gameStart)
        {
            return;
        }

        var name:string = evt.target.name;
        var str:string[] =  name.split('_');
        var mx:number = Number(str[0]);
        var my:number = Number(str[1]);

        var touchArea:number = 0;
        var touchstr:string = "";

        if (evt.stageY < ((this.rows-2)*this.height) || evt.stageY > ((this.rows-1)*this.height))
        {
            var a:number = this.height + (this.height*0.5);
            var b:number = this.height*2;

            var c:number = this.height*3;
            var d:number = this.height*4;

            if(evt.stageY >= a && evt.stageY <= b)
            {
                var blackCol:number = -1;
                if(this.squareArr['2_0'].name.split('_').length == 3)
                {
                    blackCol = 0;
                }
                else if(this.squareArr['2_1'].name.split('_').length == 3)
                {
                    blackCol = 1;
                }
                else if(this.squareArr['2_2'].name.split('_').length == 3)
                {
                    blackCol = 2;
                }
                else if(this.squareArr['2_3'].name.split('_').length == 3)
                {
                    blackCol = 3;
                }

                var startX1:number = (blackCol*this.width) - (this.width/2);
                var startX2:number = (blackCol*this.width) +this.width + (this.width/2);
                if(evt.stageX >= startX1 && evt.stageX <= startX2)
                {
                    touchArea = 1;
                    touchstr = "2_"+blackCol+"_1"
                }
            }

            if(!touchArea)
            {
                return;
            }
        }

        if(touchArea)
        {
            var name:string = touchstr;
            var str:string[] =  name.split('_');
            var mx:number = Number(str[0]);
            var my:number = Number(str[1]);
        }

        if(this.tweenPlaying == 1)
        {
            return;
        }

        if(this.playMode == 3 || this.playMode == 5)
        {
            if(!this._timer.running)
            {
                return;
            }
        }

        this.currStepNumber++;
        this.music_offset++;

        if(this.music_offset >= this.music_len)
        {
            this.music_offset = 0;
        }

        var soundLetter:string = '';
        if(this.music_id == 1)
        {
            soundLetter = this.music_1.substr(this.music_offset,1);
        }
        else if(this.music_id == 2)
        {
            soundLetter = this.music_2.substr(this.music_offset,1);
        }
        else if(this.music_id == 3)
        {
            soundLetter = this.music_3.substr(this.music_offset,1);
        }
        else if(this.music_id == 4)
        {
            soundLetter = this.music_4.substr(this.music_offset,1);
        }
        else if(this.music_id == 5)
        {
            soundLetter = this.music_5.substr(this.music_offset,1);
        }
        else if(this.music_id == 6)
        {
            soundLetter = this.music_6.substr(this.music_offset,1);
        }
        else if(this.music_id == 7)
        {
            soundLetter = this.music_7.substr(this.music_offset,1);
        }
        else if(this.music_id == 8)
        {
            soundLetter = this.music_8.substr(this.music_offset,1);
        }
        else if(this.music_id == 9)
        {
            soundLetter = this.music_9.substr(this.music_offset,1);
        }
        else if(this.music_id == 10)
        {
            soundLetter = this.music_10.substr(this.music_offset,1);
        }

        if(this.musicOpen)
        {
            playMusic('sound'+soundLetter+".mp3");
        }

        if(this.currStepNumber >= 2)
        {
            this.spr.removeChild(this.squareArr['4_0']);
            this.spr.removeChild(this.squareArr['4_1']);
            this.spr.removeChild(this.squareArr['4_2']);
            this.spr.removeChild(this.squareArr['4_3']);

        }
        else
        {
            //var dp:egret.Sprite = <egret.Sprite> evt.target;
            //dp.removeChildren();
        }

        if(touchArea)
        {
            var dp:egret.Sprite = <egret.Sprite>this.spr.getChildByName(touchstr);
            //var dp:egret.Sprite = this.squareArr[touchstr];
        }
        else
        {
            var dp:egret.Sprite = <egret.Sprite> evt.target;
        }

        var x:number = Number(this.width*0.25);
        var y:number = 0;

        var shp:egret.Sprite = new egret.Sprite();
        shp.graphics.beginFill( 0x666666 );
        shp.graphics.drawRect(0,0,this.width/2,this.height);
        shp.x = x;
        shp.y = 0;
        shp.width = this.width/2;
        shp.height = this.height;
        shp.graphics.endFill();

        var shp1:egret.Sprite = new egret.Sprite();
        shp1.graphics.beginFill( 0x666666 );
        shp1.graphics.drawRect(0,0,this.width/2,this.height);
        shp1.x = x;
        shp1.y = 0;
        shp1.width = this.width/2;
        shp1.height = this.height;
        shp1.graphics.endFill();

        dp.addChild(shp);
        dp.addChild(shp1);

        var x1:number = 0;
        var x2:number = this.width/2;

        egret.Tween.get(shp, { loop: false }).to({ x:x1 }, 100);
        egret.Tween.get(shp1, { loop: false }).to({ x:x2}, 100);


        var tmp:number=this.rows-1;
        var tmp2:number=this.cols-1;
        for(var row:number=tmp; row>=-1; row--)
        {
            for (var col:number = tmp2; col >=0; col--)
            {
                var a:number = this.squareArr[row+"_"+col].y + this.height;

                if(row == tmp)
                {
                    egret.Tween.get(this.squareArr[row+"_"+col], { loop: false }).to({ y: this.squareArr[row+"_"+col].y }, 40).to({ y: a }, 40,egret.Ease.sineIn).call(this.removeEndRow,this);
                }
                else
                {
                    egret.Tween.get(this.squareArr[row+"_"+col], { loop: false }).to({ y: this.squareArr[row+"_"+col].y }, 40).to({ y: a }, 40,egret.Ease.sineIn);
                }
            }
        }

        if(this.playMode == 1)
        {
            if(this.currStepNumber >= this.stepNumber)
            {
                var infoKey:string = "pianotilesgame_"+this.playMode;
                var best:number = Number(window.localStorage.getItem(infoKey));
                var curr:number = Number(this.costTime);
                if(curr < best || best == 0)
                {
                    this.httpRequest();
                    window.localStorage.setItem(infoKey,String(curr));
                }

                if(this.musicOpen)
                {
                    var sound:egret.Sound = RES.getRes("soundcheer");
                    sound.play();
                }

                this.gameStop();
                this.showGameOverLayout();

                return;
            }
        }

        this.squareArr['4_0'] = this.squareArr['3_0'];
        this.squareArr['4_1'] = this.squareArr['3_1'];
        this.squareArr['4_2'] = this.squareArr['3_2'];
        this.squareArr['4_3'] = this.squareArr['3_3'];

        this.squareArr['3_0'] = this.squareArr['2_0'];
        this.squareArr['3_1'] = this.squareArr['2_1'];
        this.squareArr['3_2'] = this.squareArr['2_2'];
        this.squareArr['3_3'] = this.squareArr['2_3'];

        this.squareArr['3_0'].name = (this.squareArr['3_0'].name.split('_').length == 3) ? '3_0_1' : '3_0';
        this.squareArr['3_1'].name = (this.squareArr['3_1'].name.split('_').length == 3) ? '3_1_1' : '3_1';
        this.squareArr['3_2'].name = (this.squareArr['3_2'].name.split('_').length == 3) ? '3_2_1' : '3_2';
        this.squareArr['3_3'].name = (this.squareArr['3_3'].name.split('_').length == 3) ? '3_3_1' : '3_3';

        this.squareArr['2_0'] = this.squareArr['1_0'];
        this.squareArr['2_1'] = this.squareArr['1_1'];
        this.squareArr['2_2'] = this.squareArr['1_2'];
        this.squareArr['2_3'] = this.squareArr['1_3'];

        this.squareArr['2_0'].name = (this.squareArr['2_0'].name.split('_').length == 3) ? '2_0_1' : '2_0';
        this.squareArr['2_1'].name = (this.squareArr['2_1'].name.split('_').length == 3) ? '2_1_1' : '2_1';
        this.squareArr['2_2'].name = (this.squareArr['2_2'].name.split('_').length == 3) ? '2_2_1' : '2_2';
        this.squareArr['2_3'].name = (this.squareArr['2_3'].name.split('_').length == 3) ? '2_3_1' : '2_3';

        this.squareArr['1_0'] = this.squareArr['0_0'];
        this.squareArr['1_1'] = this.squareArr['0_1'];
        this.squareArr['1_2'] = this.squareArr['0_2'];
        this.squareArr['1_3'] = this.squareArr['0_3'];

        this.squareArr['1_0'].name = (this.squareArr['1_0'].name.split('_').length == 3) ? '1_0_1' : '1_0';
        this.squareArr['1_1'].name = (this.squareArr['1_1'].name.split('_').length == 3) ? '1_1_1' : '1_1';
        this.squareArr['1_2'].name = (this.squareArr['1_2'].name.split('_').length == 3) ? '1_2_1' : '1_2';
        this.squareArr['1_3'].name = (this.squareArr['1_3'].name.split('_').length == 3) ? '1_3_1' : '1_3';

        this.squareArr['0_0'] = this.squareArr['-1_0'];
        this.squareArr['0_1'] = this.squareArr['-1_1'];
        this.squareArr['0_2'] = this.squareArr['-1_2'];
        this.squareArr['0_3'] = this.squareArr['-1_3'];

        this.squareArr['0_0'].name = (this.squareArr['0_0'].name.split('_').length == 3) ? '0_0_1' : '0_0';
        this.squareArr['0_1'].name = (this.squareArr['0_1'].name.split('_').length == 3) ? '0_1_1' : '0_1';
        this.squareArr['0_2'].name = (this.squareArr['0_2'].name.split('_').length == 3) ? '0_2_1' : '0_2';
        this.squareArr['0_3'].name = (this.squareArr['0_3'].name.split('_').length == 3) ? '0_3_1' : '0_3';

        var index:number = Math.floor(Math.random()*this.cols);
        for(var col:number=0; col< this.cols; col++)
        {
            var square:egret.Sprite = new egret.Sprite();
            if(index == col)
            {
                square.name = "-1_"+col+"_1";
                if(this.playMode == 1)
                {
                    if(this.currStepNumber + this.lineNumber > this.stepNumber)
                    {
                        square.graphics.beginFill(0x7CFC00, 1);
                    }
                    else
                    {
                        square.touchEnabled=true;
                        square.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBlack, this );
                        square.graphics.beginFill(0x000000, 1);
                        square.graphics.lineStyle( 0.3, 0x000000, 1, true );

                    }
                }
                else if(this.playMode == 3 || this.playMode == 5)
                {
                    square.touchEnabled=true;
                    square.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBlack, this );
                    square.graphics.beginFill(0x000000, 1);
                    square.graphics.lineStyle( 0.3, 0x000000, 1, true );

                }
            }
            else
            {
                square.name = "-1_"+col;
                if(this.playMode == 1)
                {
                    if(this.currStepNumber + this.lineNumber > this.stepNumber)
                    {
                        square.graphics.beginFill(0x7CFC00, 1);
                    }
                    else
                    {
                        square.touchEnabled=true;
                        square.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchWhite, this );
                        square.graphics.beginFill(0xffffff, 1);
                        square.graphics.lineStyle( 0.3, 0x000000, 1, true );
                    }
                }
                else if(this.playMode == 3  || this.playMode == 5)
                {
                    square.touchEnabled=true;
                    square.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchWhite, this );
                    square.graphics.beginFill(0xffffff, 1);
                    square.graphics.lineStyle( 0.3, 0x000000, 1, true );
                }
            }

            var x:number = col*this.width;
            var y:number = -1*this.height;

            square.graphics.drawRect(0,0,this.width,this.height);
            //square.name = "-1_"+col;
            square.x = x;
            square.y = y;
            square.width = this.width;
            square.height = this.height;

            square.graphics.endFill();
            this.squareArr["-1_"+col] = square;


            if(this.getChildByName('spr2'))
            {
                this.spr.addChild(square);
            }
            else
            {
                alert('chid error');
            }

        }

        if(this.playMode == 1)
        {
            var barWidth:number = (this.stageW /this.stepNumber)*this.currStepNumber;
            var offset:number =  -this.stageW + barWidth;
            egret.Tween.get(this.progressBar, { loop: false }).to({x:offset }, 300);
        }
        else if(this.playMode == 3  || this.playMode == 5)
        {
            var timediff:number = egret.getTimer() - this.beginTime;
            var leftTime:number = this.maxTime - timediff;
            egret.Tween.get(this.progressBar, { loop: false }).to({x:(this.stageW*(leftTime/this.maxTime)) }, 300);
        }

    }

    //加载完成
    private onGroupComp():void
    {
        this.stage.removeChild(this.loadingView);
        var self:any = this;

        var a:egret.Bitmap = new egret.Bitmap;
        a.texture = RES.getRes('shareTips');
        a.width = this.stageW;
        a.height = this.stageH;
        a.touchEnabled = true;
        a.alpha = 50;
        a.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeShareTips, this );
        this.shareTips = a;

        var language = window.navigator.userLanguage || window.navigator.language;
        this.clientLan == "en";
        if(language != undefined)
        {
            if(language.toLowerCase() == "zh-cn")
            {
                this.clientLan = "zh";
            }
            else if(language.toLowerCase() == "ja-jp")
            {
                this.clientLan = "jp";
            }
            else if(language.toLowerCase() == "zh-tw")
            {
                this.clientLan = "tw";
            }
            else
            {
                this.clientLan = "en";
            }
        }

        this.stageW = this.stage.stageWidth;
        this.stageH = this.stage.stageHeight;
        this.width = this.stageW/this.cols;
        this.height = this.stageH/this.rows;

         this.createGameScene();
         this.createGameOverLayout();
         this.createGameOverFaoutLayout();
         this.createAboutApp();
         this.addChildAt(this.startScene,0);
    }

    // 获取多语言
    private getClientLang(index)
    {
        if(this.clientLan == 'zh')
        {
            return this.lanague_zh[index];
        }
        else if(this.clientLan == 'tw')
        {
            return this.lanague_tw[index];
        }
        else if(this.clientLan == 'jp')
        {
            return this.lanague_jp[index];
        }

        return this.lanague_en[index];
    }


    /**
     * 配置文件加载完成,开始预加载preload资源组。
     */
    private onConfigComplete(event:RES.ResourceEvent):void{

        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
        RES.loadGroup("soundRes");
    }

    /**
     * preload资源组加载完成
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if(event.groupName=="soundRes"){
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);

            //this.sound = new egret.Sound();
            //this.sound.audio = RES.getRes("sound2");
            //this.sound.play();

            this.createGameScene();
            this.createGameOverLayout();
            this.createGameOverFaoutLayout();
            this.addChild(this.startScene);

        }
    }

    /**
     * preload资源组加载进度
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        this.loadingView.setProgress(this.getClientLang(14),event.itemsLoaded,event.itemsTotal);
    }

    private textContainer:egret.Sprite;

    private createGameOverFaoutLayout():void
    {
        var _gameOverLayout:egret.Sprite = new egret.Sprite();
        _gameOverLayout.graphics.beginFill(0xFF0000, 1);
        _gameOverLayout.graphics.drawRect(0,0,this.stage.stageWidth,this.stage.stageHeight);
        _gameOverLayout.x = 0;
        _gameOverLayout.y = 0;
        _gameOverLayout.name = '_gameOverLayout';
        _gameOverLayout.width = this.stage.stageWidth;
        _gameOverLayout.height = this.stage.stageHeight;
        _gameOverLayout.graphics.endFill();

        this._gameOverFaoutLayout = _gameOverLayout;

        var label:egret.TextField = new egret.TextField();
        _gameOverLayout.addChild(label);
        label.width = this.stage.stageWidth;
        label.height =this.stage.stageHeight*0.3;
        label.size = this.fontSize;
        label.text = this.getClientLang(3);
        label.fontFamily = "微软雅黑";
        label.textColor = 0xffffff;
        label.x = 0;
        label.y = 0;
        label.textAlign = egret.HorizontalAlign.CENTER;
        label.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.resultText2 = label;

        var score:egret.TextField = new egret.TextField();
        _gameOverLayout.addChild(score);
        score.width = this.stage.stageWidth;
        score.height = this.stage.stageHeight*0.3;
        score.size = 60;
        score.text = this.getClientLang(9);
        score.italic = true
        score.lineSpacing = 3;
        score.fontFamily = "微软雅黑";
        score.textColor = 0x000000;
        score.x = 0;
        score.y = 1*(this.stage.stageHeight*0.3);
        score.textAlign = egret.HorizontalAlign.CENTER;
        score.verticalAlign = egret.VerticalAlign.MIDDLE;

        var score:egret.TextField = new egret.TextField();
        _gameOverLayout.addChild(score);
        score.width = this.stage.stageWidth;
        score.height = this.stage.stageHeight*0.3;
        score.size = 80;
        score.text = "0.000'";
        score.textColor = 0x000000;
        score.x = 0;
        score.y = 1*(this.stage.stageHeight*0.2);
        score.textAlign = egret.HorizontalAlign.CENTER;
        score.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.currentScore2 = score;

        var shareText:egret.TextField = new egret.TextField();
        _gameOverLayout.addChild(shareText);
        shareText.width = this.stage.stageWidth/4;
        shareText.height = this.stage.stageHeight*0.3;
        shareText.size = this.fontSize;
        shareText.text =this.getClientLang(10);
        shareText.fontFamily = "微软雅黑";
        shareText.textColor = 0xffffff;
        shareText.x = 0;
        shareText.y = 2*(this.stage.stageHeight*0.3);
        shareText.textAlign = egret.HorizontalAlign.CENTER;
        shareText.verticalAlign = egret.VerticalAlign.MIDDLE;
        shareText.touchEnabled = true;
        shareText.addEventListener(egret.TouchEvent.TOUCH_TAP, this._share, this,false,1 );

        var backText:egret.TextField = new egret.TextField();
        _gameOverLayout.addChild(backText);
        backText.width = this.stage.stageWidth/4;
        backText.height = this.stage.stageHeight*0.3;
        backText.size = this.fontSize;
        backText.fontFamily = "微软雅黑";
        backText.text = this.getClientLang(11);
        backText.textColor = 0xffffff;
        backText.x = this.stage.stageWidth/4;
        backText.y = 2*(this.stage.stageHeight*0.3);
        backText.textAlign = egret.HorizontalAlign.CENTER;
        backText.verticalAlign = egret.VerticalAlign.MIDDLE;
        backText.touchEnabled = true;
        backText.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showGameLayout, this,false,1 );


        var replayText:egret.TextField = new egret.TextField();
        _gameOverLayout.addChild(replayText);
        replayText.width = this.stage.stageWidth/4;
        replayText.height = this.stage.stageHeight*0.3;
        replayText.size = this.fontSize;
        replayText.fontFamily = "微软雅黑";
        replayText.text = this.getClientLang(12);
        replayText.textColor = 0xffffff;
        replayText.x = (this.stage.stageWidth/4)*2;
        replayText.y = 2*(this.stage.stageHeight*0.3);
        replayText.textAlign = egret.HorizontalAlign.CENTER;
        replayText.verticalAlign = egret.VerticalAlign.MIDDLE;
        replayText.touchEnabled = true;
        replayText.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameRestart, this,false,1 );

        var rankText:egret.TextField = new egret.TextField();
        _gameOverLayout.addChild(rankText);
        rankText.width = this.stage.stageWidth/4;
        rankText.height = this.stage.stageHeight*0.3;
        rankText.size = this.fontSize;
        rankText.fontFamily = "微软雅黑";
        rankText.text = this.getClientLang(13);
        rankText.textColor = 0xffffff;
        rankText.x = (this.stage.stageWidth/4)*3;
        rankText.y = 2*(this.stage.stageHeight*0.3);
        rankText.textAlign = egret.HorizontalAlign.CENTER;
        rankText.verticalAlign = egret.VerticalAlign.MIDDLE;
        rankText.touchEnabled = true;
        rankText.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openWin, this,false,1 );
    }

    private _share():void
    {
        this.onRest();
    }

    private createGameOverLayout():void
    {
        var _gameOverLayout:egret.Sprite = new egret.Sprite();
        _gameOverLayout.graphics.beginFill(0x7CFC00, 1);
        _gameOverLayout.graphics.drawRect(0,0,this.stage.stageWidth,this.stage.stageHeight);
        _gameOverLayout.x = 0;
        _gameOverLayout.y = 0;
        _gameOverLayout.name = '_gameOverLayout';
        _gameOverLayout.width = this.stage.stageWidth;
        _gameOverLayout.height = this.stage.stageHeight;
        _gameOverLayout.graphics.endFill();

        this._gameOverLayout = _gameOverLayout;

        var label:egret.TextField = new egret.TextField();
        _gameOverLayout.addChild(label);
        label.width = this.stage.stageWidth;
        label.height =this.stage.stageHeight*0.3;
        label.size = this.fontSize;
        label.text = this.getClientLang(3);
        label.fontFamily = "微软雅黑";
        label.textColor = 0xffffff;
        label.x = 0;
        label.y = 0;
        label.textAlign = egret.HorizontalAlign.CENTER;
        label.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.resultText = label;

        var score:egret.TextField = new egret.TextField();
        _gameOverLayout.addChild(score);
        score.width = this.stage.stageWidth;
        score.height = this.stage.stageHeight*0.3;
        score.size = 80;
        score.text = "0.000'";
        score.textColor = 0x000000;
        score.x = 0;
        score.y = 1*(this.stage.stageHeight*0.2);
        score.textAlign = egret.HorizontalAlign.CENTER;
        score.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.currentScore = score;

        var bestScore:egret.TextField = new egret.TextField();
        _gameOverLayout.addChild(bestScore);
        bestScore.width = this.stage.stageWidth;
        bestScore.height = this.stage.stageHeight*0.3;
        bestScore.size = 40;
        bestScore.text = "0.000'";
        bestScore.textColor = 0xFF0000;
        bestScore.x = 0;
        bestScore.y = 1*(this.stage.stageHeight*0.3);
        bestScore.textAlign = egret.HorizontalAlign.CENTER;
        bestScore.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.bestScore = bestScore;

        var rankTxt:egret.TextField = new egret.TextField();
        _gameOverLayout.addChild(rankTxt);
        rankTxt.width = this.stage.stageWidth;
        rankTxt.height = this.stage.stageHeight*0.3;
        rankTxt.size = 40;
        rankTxt.text = "";
        rankTxt.textColor = 0xFFFFFF;
        rankTxt.x = 0;
        rankTxt.y = 1*(this.stage.stageHeight*0.3)+80;
        rankTxt.textAlign = egret.HorizontalAlign.CENTER;
        rankTxt.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.rankTxt = rankTxt;

        var shareText:egret.TextField = new egret.TextField();
        _gameOverLayout.addChild(shareText);
        shareText.width = this.stage.stageWidth/4;
        shareText.height = this.stage.stageHeight*0.3;
        shareText.size = this.fontSize;
        shareText.text = this.getClientLang(10);
        shareText.fontFamily = "微软雅黑";
        shareText.textColor = 0xffffff;
        shareText.x = 0;
        shareText.y = 2*(this.stage.stageHeight*0.3);
        shareText.textAlign = egret.HorizontalAlign.CENTER;
        shareText.verticalAlign = egret.VerticalAlign.MIDDLE;
        shareText.touchEnabled = true;
        shareText.addEventListener(egret.TouchEvent.TOUCH_TAP, this._share, this,false,1 );

        var backText:egret.TextField = new egret.TextField();
        _gameOverLayout.addChild(backText);
        backText.width = this.stage.stageWidth/4;
        backText.height = this.stage.stageHeight*0.3;
        backText.size = this.fontSize;
        backText.fontFamily = "微软雅黑";
        backText.text = this.getClientLang(11);
        backText.textColor = 0xffffff;
        backText.x = this.stage.stageWidth/4;
        backText.y = 2*(this.stage.stageHeight*0.3);
        backText.textAlign = egret.HorizontalAlign.CENTER;
        backText.verticalAlign = egret.VerticalAlign.MIDDLE;
        backText.touchEnabled = true;
        backText.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showGameLayout, this,false,1 );


        var replayText:egret.TextField = new egret.TextField();
        _gameOverLayout.addChild(replayText);
        replayText.width = this.stage.stageWidth/4;
        replayText.height = this.stage.stageHeight*0.3;
        replayText.size = this.fontSize;
        replayText.fontFamily = "微软雅黑";
        replayText.text = this.getClientLang(12);
        replayText.textColor = 0xffffff;
        replayText.x = (this.stage.stageWidth/4)*2;
        replayText.y = 2*(this.stage.stageHeight*0.3);
        replayText.textAlign = egret.HorizontalAlign.CENTER;
        replayText.verticalAlign = egret.VerticalAlign.MIDDLE;
        replayText.touchEnabled = true;
        replayText.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameRestart, this,false,1 );

        var rankText:egret.TextField = new egret.TextField();
        _gameOverLayout.addChild(rankText);
        rankText.width = this.stage.stageWidth/4;
        rankText.height = this.stage.stageHeight*0.3;
        rankText.size = this.fontSize;
        rankText.fontFamily = "微软雅黑";
        rankText.text = this.getClientLang(13);
        rankText.textColor = 0xffffff;
        rankText.x = (this.stage.stageWidth/4)*3;
        rankText.y = 2*(this.stage.stageHeight*0.3);
        rankText.textAlign = egret.HorizontalAlign.CENTER;
        rankText.verticalAlign = egret.VerticalAlign.MIDDLE;
        rankText.touchEnabled = true;
        rankText.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openWin, this,false,1 );

    }

    // 打开排行
    private openWin()
    {
        var sort:string = "desc";
        if(this.playMode == 1)
        {
            sort = "asc";
        }
        var url:string = "http://app.easymobi.cn/pianotilesgame/index.php?id=pinaotilesgameweb&difficulty="+this.playMode+"&sort="+sort+"&game=pinaotilesgameweb&page=1&display=20&packages=cn.easymobi.pinaotiles#home";
        window.location.href = url;
    }

    //显示游戏结束画面
    private showGameOverFaoutLayout()
    {
        if(this.resultOp1)
        {
            return;
        }

        this.t1 =3000;
        this.resultOp2 = 1;
        this.tweenPlaying = 0;
        this.touched1 = 0;
        this._speed = 10;
        if(this.playMode == 1 || this.playMode == 4)
        {
            this.currentScore2.text = String(this.timer.text);
        }
        else
        {
            this.currentScore2.text = String(this.currStepNumber);
        }
        this.weixin1();

        this.currStepNumber = 0;
        this.music_id = 0;
        this.music_len = 0;
        this.music_offset = 0;
        this.gameOver = 0;
        this.progressBar.x = -this.stageW;

        if(this.playMode == 2 || this.playMode == 4)
        {
            this._container1.removeChildren();
            this._container2.removeChildren();
            //this.removeChild(this._container1);
            //this.removeChild(this._container2);
        }
        else
        {
           this.removeChild(this.spr);
        }

        if(this.timer.parent)
        {
            this.timer.parent.removeChild(this.timer);
        }
        this._timer.reset();

        this._gameOverFaoutLayout.scaleX = this._gameOverFaoutLayout.scaleY = 0.5;
        this._gameOverFaoutLayout.alpha = 1;
        this._gameOverFaoutLayout.anchorX = this._gameOverFaoutLayout.anchorY = 0.5;
        this._gameOverFaoutLayout.x = (this.stageW - this._gameOverFaoutLayout.width) / 2 + this._gameOverFaoutLayout.width / 2;
        this._gameOverFaoutLayout.y = this.stageH / 2;
        if(!this.getChildByName('_gameOverLayout'))
        {
            this.addChild( this._gameOverFaoutLayout);
        }

        this.tw1 = egret.Tween.get(this._gameOverFaoutLayout, {
            loop: !1
        });

        this.tw1.to({
                scaleX: 1,
                scaleY: 1
                //alpha: 1
            },
            200, egret.Ease.circInOut).call(this.removeTw, this)
    }

    private removeTw():void
    {
        egret.Tween.removeTweens(this.tw1);
    }

    //显示游戏结束画面
    private showGameOverLayout()
    {
        if(this.resultOp2)
        {
            return;
        }

        this.gameOver = 1;
        this.resultOp1 = 1;
        this.tweenPlaying = 0;
        this.touched1 = 0;
        this.t1 = 3000;

        if(this.playMode == 1)
        {
            this.removeChild(this.spr);
            this.currentScore.text = String(this.timer.text);
        }
        else if(this.playMode == 4)
        {
            if(this._container1.parent)
            {
                this._container1.parent.removeChild(this._container1);
            }
            if(this._container2.parent)
            {
                this._container2.parent.removeChild(this._container2);
            }

            this.currentScore.text = String(this.timer.text);
        }
        else if(this.playMode == 2)
        {
            if(this._container1.parent)
            {
                this._container1.parent.removeChild(this._container1);
            }
            if(this._container2.parent)
            {
                this._container2.parent.removeChild(this._container2);
            }
            this.currentScore.text = String(this.currStepNumber);
        }
        else if(this.playMode == 3 || this.playMode == 5)
        {
            this.removeChild(this.spr);
            this.currentScore.text = String(this.currStepNumber);
        }

        var infoKey:string = "pianotilesgame_"+this.playMode;
        var val:number = Number(window.localStorage.getItem(infoKey));
        this.bestScore.text = this.getClientLang(15) + " " + String(val);
        this.rankTxt.text = '';
        if(this.isHttpReq)
        {
            var up:number = this.lastRank - this.currRank;
            if(up > 0)
            {
                this.rankTxt.text = this.getClientLang(16) + String(up) + this.getClientLang(17);
            }
            this.isHttpReq = 0;
        }
        this.weixin1();

        this.currStepNumber = 0;
        this.music_id = 0;
        this.music_len = 0;
        this.music_offset = 0;
        this.lastTouchLine = "line1";
        this.lastTouchRow = 3;
        this.progressBar.x = -this.stageW;


        this._timer.reset();
        if(this.timer.parent)
        {
            this.timer.parent.removeChild(this.timer);
        }

        this._gameOverLayout.scaleX = this._gameOverLayout.scaleY = 0.5;
        //this._gameOverLayout.alpha = 1;
        this._gameOverLayout.anchorX = this._gameOverLayout.anchorY = 0.5;
        this._gameOverLayout.x = (this.stageW - this._gameOverLayout.width) / 2 + this._gameOverLayout.width / 2;
        this._gameOverLayout.y = this.stageH / 2;
        this.addChild( this._gameOverLayout );

        this.tw1 = egret.Tween.get(this._gameOverLayout, {
            loop: !1
        });

        this.tw1.to({
                scaleX: 1,
                scaleY: 1
                //alpha: 1
            },
            300, egret.Ease.circInOut).call(this.removeTw, this)

    }

    // 重玩
    private gameRestart()
    {
        this.closeShareTips();
        if(this.gameOver == 1)
        {
            this.removeChild(this._gameOverLayout);
        }
        else
        {
            this.removeChild(this._gameOverFaoutLayout);
        }

        this.resultOp1 = 0;
        this.resultOp2 = 0;
        this.currStepNumber = 0;
        this.music_id = 0;
        this.music_len = 0;
        this.music_offset = 0;
        this.progressBar.x = -this.stageW;
        this.lastTouchLine = "line1";
        this.lastTouchRow = 3;
        this.redRand = Math.ceil(Math.random()*9);
        this.redOffset = 0;
        if(this.playMode == 2 ||  this.playMode == 4)
        {
            this.modelsInit();
        }
        else
        {
            this.gameMain();
        }

        this._timer.reset();

    }


    // 开始游戏
    private startGame(evt:egret.TouchEvent)
    {

        this.resultOp1 = 0;
        this.resultOp2 = 0;
        this.removeChild(this.startScene);

        //计时器
        this._timer = new egret.Timer(50);
        this._timer.addEventListener(egret.TimerEvent.TIMER,this.onTimerComplete,this);

        if(evt.target.name == '0_0')
        {
            this.resultText.text = this.getClientLang(3);
            this.resultText2.text = this.getClientLang(3);
            this.playMode = 1;
            //this.gameOk();
            this.gameMain();
        }
        else if(evt.target.name == '0_1')
        {
            this.playMode = 2;
            this.resultText.text = this.getClientLang(4);
            this.resultText2.text = this.getClientLang(4);
            this.modelsInit();
        }
        else if(evt.target.name == '1_0')
        {
            this.resultText.text = this.getClientLang(5);
            this.resultText2.text = this.getClientLang(5);
            this.playMode = 3;
            //this.gameOk();
            this.gameMain();
        }
        else if(evt.target.name == '1_1')
        {
            this.resultText.text = this.getClientLang(7);
            this.resultText2.text = this.getClientLang(7);
            this.playMode = 4;
            this.redRand = Math.ceil(Math.random()*9);
            this.redOffset = 0;
            //this.gameOk();
            this.modelsInit();
        }
        else if(evt.target.name == '0_2')
        {
            this.resultText.text = this.getClientLang(6);
            this.resultText2.text = this.getClientLang(6);
            this.playMode = 5;
            //this.gameOk();
            this.gameMain();

        }

        /**
         egret.Tween.get(this.menu_1, { loop: false }).to({ x:this.menu_1.x }, 200).to({ x:-this.menu_1.width }, 200);
         egret.Tween.get(this.menu_2, { loop: false }).to({ x:this.menu_2.x }, 220).to({ x:(this.menu_2.width*2) }, 220);
         egret.Tween.get(this.menu_3, { loop: false }).to({ x:this.menu_3.x }, 240).to({ x:-this.menu_3.width }, 240);
         egret.Tween.get(this.menu_4, { loop: false }).to({ x:this.menu_4.x }, 260).to({ x:(this.menu_4.width*2) }, 260);
         egret.Tween.get(this.menu_5, { loop: false }).to({ x:this.menu_5.x }, 280).to({ x:-this.menu_5.width }, 280);
         egret.Tween.get(this.menu_6, { loop: false }).to({ x:this.menu_6.x }, 300).to({ x:(this.menu_6.width*2) }, 300);
         **/
    }

    // 开始游戏
    private notOpen()
    {
        alert(this.getClientLang(0));
    }

    private removeGameOverLayout():void
    {
        this.removeChild(this._gameOverLayout);
        egret.Tween.removeTweens(this.tw1);
    }

    private removeGameOverFaoutLayout():void
    {
        if(this._gameOverFaoutLayout.parent)
        {
            this._gameOverFaoutLayout.parent.removeChild(this._gameOverFaoutLayout);
        }
        egret.Tween.removeTweens(this.tw1);
    }

    private weixin2():void
    {
        if(this.clientLan == "zh") {
            WeixinApi.ready(function (Api) {

                // 微信分享的数据
                var wxData = {
                    "appId": "", // 服务号可以填写appId
                    "imgUrl": 'http://app.easymobi.cn/pianotilesgame/launcher/icon.png',
                    "link": 'http://app.easymobi.cn/pianotilesgame/launcher/release.html',
                    "desc": '我们只给你黑白两块儿，踩下黑块儿，别踩白块儿，在你下班疲累时，黑白的世界，纯净的音乐，消除你一天的烦忧',
                    "title": "和我一起玩别踩白块儿吧!"
                };

                // 分享的回调
                var wxCallbacks = {
                    // 分享操作开始之前
                    ready: function () {
                        // 你可以在这里对分享的数据进行重组
                        //alert("准备分享");
                    },
                    // 分享被用户自动取消
                    cancel: function (resp) {
                        // 你可以在你的页面上给用户一个小Tip，为什么要取消呢？
                        //alert("分享被取消");
                    },
                    // 分享失败了
                    fail: function (resp) {
                        // 分享失败了，是不是可以告诉用户：不要紧，可能是网络问题，一会儿再试试？
                        //alert("分享失败");
                    },
                    // 分享成功
                    confirm: function (resp) {
                        //创建GET请求

                        //alert("分享成功");
                    },
                    // 整个分享过程结束
                    all: function (resp) {
                        // 如果你做的是一个鼓励用户进行分享的产品，在这里是不是可以给用户一些反馈了？
                        //alert("分享结束");
                    }
                };

                // 用户点开右上角popup菜单后，点击分享给好友，会执行下面这个代码
                Api.shareToFriend(wxData, wxCallbacks);

                // 点击分享到朋友圈，会执行下面这个代码
                Api.shareToTimeline(wxData, wxCallbacks);

                // 点击分享到腾讯微博，会执行下面这个代码
                Api.shareToWeibo(wxData, wxCallbacks);
            });
        }
    }
    private weixin1():void
    {
        var mode:string;
        var score:string;
        if(this.playMode == 1)
        {
            mode = this.getClientLang(3);
            score = this.timer.text;
        }
        else if(this.playMode == 2)
        {
            mode = this.getClientLang(4)
            score = String(this.currStepNumber);
        }
        else if(this.playMode == 3)
        {
            mode = this.getClientLang(5);
            score = String(this.currStepNumber);

        }
        else if(this.playMode == 4)
        {
            mode = this.getClientLang(7);
            score = String(this.timer.text);

        }
        else if(this.playMode == 5)
        {
            mode = this.getClientLang(6);
            score = String(this.currStepNumber);
        }
        if(this.clientLan == "zh")
        {
            WeixinApi.ready(function(Api) {

                // 微信分享的数据
                var wxData = {
                    "appId": "", // 服务号可以填写appId
                    "imgUrl" : 'http://app.easymobi.cn/pianotilesgame/launcher/icon.png',
                    "link" : 'http://app.easymobi.cn/pianotilesgame/launcher/release.html',
                    "desc" : "我在别踩白块儿"+mode+"模式中获得"+score+"，快来挑战我吧！我们只给你黑白两块儿，踩下黑块儿，别踩白块儿，在你下班疲累时，黑白的世界，纯净的音乐，消除你一天的烦忧",
                    "title" : "我在别踩白块儿"+mode+"模式中获得"+score+"，快来挑战我吧！"
                };

                // 分享的回调
                var wxCallbacks = {
                    // 分享操作开始之前
                    ready : function() {
                        // 你可以在这里对分享的数据进行重组
                        //alert("准备分享");
                    },
                    // 分享被用户自动取消
                    cancel : function(resp) {
                        // 你可以在你的页面上给用户一个小Tip，为什么要取消呢？
                        //alert("分享被取消");
                    },
                    // 分享失败了
                    fail : function(resp) {
                        // 分享失败了，是不是可以告诉用户：不要紧，可能是网络问题，一会儿再试试？
                        //alert("分享失败");
                    },
                    // 分享成功
                    confirm : function(resp) {

                        //alert("分享成功");
                    },
                    // 整个分享过程结束
                    all : function(resp) {
                        // 如果你做的是一个鼓励用户进行分享的产品，在这里是不是可以给用户一些反馈了？
                        //alert("分享结束");
                    }
                };

                // 用户点开右上角popup菜单后，点击分享给好友，会执行下面这个代码
                Api.shareToFriend(wxData, wxCallbacks);

                // 点击分享到朋友圈，会执行下面这个代码
                Api.shareToTimeline(wxData, wxCallbacks);

                // 点击分享到腾讯微博，会执行下面这个代码
                Api.shareToWeibo(wxData, wxCallbacks);
            });
        }

    }

    private showGameLayout()
    {
        this.resultOp1 = 0;
        this.resultOp2 = 0;

        this.closeShareTips();
        this.lastTouchLine = "line1";
        this.lastTouchRow = 3;
        this.currStepNumber = 0;
        this.music_id = 0;
        this.music_len = 0;
        this.music_offset = 0;
        this._timer.reset();
        this.progressBar.x = -this.stageW;
        this.startScene.y = this.stageH;
        //this.startScene.alpha = 0;
        this.addChild(this.startScene);
        if(this.gameOver == 1)
        {
            this.tw1 = egret.Tween.get(this._gameOverLayout, {
                loop: !1
            });
            this.tw1.to({
                    y: -this.stageH
                    //alpha: 0
                },
                200, egret.Ease.circInOut).call(this.removeGameOverLayout, this)
        }
        else
        {
            this.tw1 = egret.Tween.get(this._gameOverFaoutLayout, {
                loop: !1
            });
            this.tw1.to({
                    y: -this.stageH,
                    alpha: 0
                },
                200, egret.Ease.circInOut).call(this.removeGameOverFaoutLayout, this)
        }

        this.tw2 = egret.Tween.get(this.startScene, {
            loop: !1
        });
        this.tw2.to({
                y: 0
                //alpha: 1
            },
            300, egret.Ease.circInOut);
    }

    private createGameScene():void{

        var startScene:egret.Sprite = new egret.Sprite();
        startScene.graphics.drawRect(0,0,this.stage.stageWidth,this.stage.stageHeight);
        startScene.x = 0;
        startScene.y = 0;
        startScene.name = 'startScene';
        startScene.width = this.stage.stageWidth;
        startScene.height = this.stage.stageHeight;
        this.startScene = startScene;
        startScene.graphics.beginFill(0x000000, 2);
        startScene.graphics.lineStyle( 0.1, 0xffffff, 1, true );

        var square1:egret.Sprite = new egret.Sprite();
        this.menu_1 = square1;
        square1.graphics.beginFill(0x000000, 1);
        square1.touchEnabled=true;
        square1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this,false,1 );
        square1.graphics.lineStyle( 0.3, 0xFFFFFF, 1 );

        var x:number = 0;
        var y:number = 0;

        var width:number = this.stage.stageWidth/2;
        var height:number = this.stage.stageWidth/2;

        square1.graphics.drawRect(0,0,width,height);
        square1.name = '0_0';
        square1.x = x;
        square1.y = y;
        square1.width = width;
        square1.height = height;

        square1.graphics.endFill();

        var label:egret.TextField = new egret.TextField();
        square1.addChild(label);
        label.width = width;
        label.height = height;
        label.size = this.fontSize;
        label.text = this.getClientLang(3);
        label.fontFamily = "微软雅黑";

        label.textColor = 0xFFFFFF;
        label.textAlign = egret.HorizontalAlign.CENTER;
        label.verticalAlign = egret.VerticalAlign.MIDDLE;

        var square2:egret.Sprite = new egret.Sprite();
        this.menu_2 = square2;
        square2.graphics.beginFill(0xFFFFFF, 1);
        square2.touchEnabled=true;
        square2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this,false,1 );
        square2.graphics.lineStyle( 0.3, 0xFFFFFF, 1 );

        var x:number = 1*width;
        var y:number = 0;

        square2.graphics.drawRect(0,0,width,height);
        square2.name = '0_1';
        square2.x = x;
        square2.y = y;
        square2.width = width;
        square2.height = height;

        square2.graphics.endFill();

        var label:egret.TextField = new egret.TextField();
        square2.addChild(label);
        label.width = width;
        label.height = height;
        label.size = this.fontSize;
        label.text = this.getClientLang(4);
        label.fontFamily = "微软雅黑";
        label.textColor = 0x000000;
        label.textAlign = egret.HorizontalAlign.CENTER;
        label.verticalAlign = egret.VerticalAlign.MIDDLE;

        var square3:egret.Sprite = new egret.Sprite();
        this.menu_3 = square3;
        square3.graphics.beginFill(0xffffff, 1);
        square3.touchEnabled=true;
        square3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this,false,1 );
        square3.graphics.lineStyle( 0.3, 0xFFFFFF, 1 );

        var x:number = 0;
        var y:number = 1*height;

        square3.graphics.drawRect(0,0,width,height);
        square3.name = '1_0';
        square3.x = x;
        square3.y = y;
        square3.width = width;
        square3.height = height;

        square3.graphics.endFill();

        var label:egret.TextField = new egret.TextField();
        square3.addChild(label);
        label.width = width;
        label.height = height;
        label.size = this.fontSize;
        label.text = this.getClientLang(5);
        label.fontFamily = "微软雅黑";
        label.textColor = 0x000000;
        label.textAlign = egret.HorizontalAlign.CENTER;
        label.verticalAlign = egret.VerticalAlign.MIDDLE;

        var square4:egret.Sprite = new egret.Sprite();
        this.menu_4 = square4;
        square4.graphics.beginFill(0x000000, 1);
        square4.touchEnabled=true;
        square4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this,false,1 );
        square4.graphics.lineStyle( 0.3, 0xFFFFFF, 1 );

        var x:number = 1*width;
        var y:number = 1*height;

        square4.graphics.drawRect(0,0,width,height);
        square4.name = '1_1';
        square4.x = x;
        square4.y = y;
        square4.width = width;
        square4.height = height;

        square4.graphics.endFill();

        var label:egret.TextField = new egret.TextField();
        square4.addChild(label);
        label.width = width;
        label.height = height;
        label.size = this.fontSize;
        label.text = this.getClientLang(7);
        label.fontFamily = "微软雅黑";
        label.textColor = 0xFFFFFF;
        label.textAlign = egret.HorizontalAlign.CENTER;
        label.verticalAlign = egret.VerticalAlign.MIDDLE;

        var square5:egret.Sprite = new egret.Sprite();
        square5.graphics.beginFill(0x000000, 1);
        square5.touchEnabled=true;
        square5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this,false,1 );
        square5.graphics.lineStyle( 0.3, 0xFFFFFF, 1 );

        var x:number = 0;
        var y:number = 2*height;

        square5.graphics.drawRect(0,0,width,height);
        this.menu_5 = square5;
        square5.name = '0_2';
        square5.x = x;
        square5.y = y;
        square5.width = width;
        square5.height = height;

        square5.graphics.endFill();

        var label:egret.TextField = new egret.TextField();
        square5.addChild(label);
        label.width = width;
        label.height = height;
        label.size = this.fontSize;
        label.text = this.getClientLang(6);
        label.fontFamily = "微软雅黑";
        label.textColor = 0xFFFFFF;
        label.textAlign = egret.HorizontalAlign.CENTER;
        label.verticalAlign = egret.VerticalAlign.MIDDLE;

        var square6:egret.Sprite = new egret.Sprite();
        square6.graphics.beginFill(0xffffff, 1);
        square6.touchEnabled=true;
        square6.addEventListener(egret.TouchEvent.TOUCH_TAP, this.aboutApp, this,false,1 );
        square6.graphics.lineStyle( 0.3, 0xFFFFFF, 1 );

        var x:number = 1*width;
        var y:number = 2*height;

        square6.graphics.drawRect(0,0,width,height);
        this.menu_6 = square6;
        square6.name = '2_2';
        square6.x = x;
        square6.y = y;
        square6.width = width;
        square6.height = height;

        square6.graphics.endFill();

        var label:egret.TextField = new egret.TextField();
        square6.addChild(label);
        label.width = width;
        label.height = height;
        label.size = this.fontSize;
        label.text = this.getClientLang(8);
        label.fontFamily = "微软雅黑";
        label.textColor = 0x000000;
        label.textAlign = egret.HorizontalAlign.CENTER;
        label.verticalAlign = egret.VerticalAlign.MIDDLE;

        this.startScene.addChild(square1);
        this.startScene.addChild(square2);
        this.startScene.addChild(square3);
        this.startScene.addChild(square4);
        this.startScene.addChild(square5);
        this.startScene.addChild(square6);

    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    private createBitmapByName(name:string):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 描述文件加载成功，开始播放动画
     */
    private startAnimation(result:Array<any>):void{
        var textContainer:egret.Sprite = this.textContainer;
        var count:number = -1;
        var self:any = this;
        var change:Function = function() {
            count++;
            if (count >= result.length) {
                count = 0;
            }
            var lineArr = result[count];

            self.changeDescription(textContainer, lineArr);

            var tw = egret.Tween.get(textContainer);
            tw.to({"alpha":1}, 200);
            tw.wait(2000);
            tw.to({"alpha":0}, 200);
            tw.call(change, this);
        }

        change();
    }

    /**
     * 切换描述内容
     */
    private changeDescription(textContainer:egret.Sprite, lineArr:Array<any>):void {
        textContainer.removeChildren();
        var w:number = 0;
        for (var i:number = 0; i < lineArr.length; i++) {
            var info:any = lineArr[i];
            var colorLabel:egret.TextField = new egret.TextField();
            colorLabel.x = w;
            colorLabel.anchorX = colorLabel.anchorY = 0;
            colorLabel.textColor = parseInt(info["textColor"]);
            colorLabel.text = info["text"];
            colorLabel.size = 40;
            textContainer.addChild(colorLabel);

            w += colorLabel.width;
        }
    }
}


