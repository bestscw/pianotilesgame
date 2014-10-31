var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by easymobi_ on 2014/8/12.
*/
var Block = (function (_super) {
    __extends(Block, _super);
    function Block() {
        _super.call(this);
        var index = 1;
        var row_num = 8;
        var cols_num = 4;
        var width = 480;
        var height = 1600;
        this.drawGrid(index, row_num, cols_num, width, height);
    }
    Block.prototype.drawGrid = function (index, row_num, cols_num, width, height) {
        for (var row = 0; row < row_num; row++) {
            var sp = new Line(row, cols_num, width, height);

            //console.log('row:'+row);
            this.addChild(sp);
        }
    };
    return Block;
})(egret.Sprite);
Block.prototype.__class__ = "Block";
