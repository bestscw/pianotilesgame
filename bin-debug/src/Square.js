var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by easymobi_ on 2014/8/12.
*/
var Square = (function (_super) {
    __extends(Square, _super);
    function Square(type, row, col, width, height) {
        _super.call(this);
        this.drawGrid(type, row, col, width, height);
    }
    Square.prototype.drawGrid = function (type, row, col, width, height) {
        this.type = type;
        this.row = row;
        this.col = col;
        this.width = width;
        this.height = height;
        this.x = col * this.width;
        this.y = 0;

        this.graphics.drawRect(0, 0, this.width, this.height);

        if (this.type == 0) {
            this.graphics.beginFill(0xFFFFFF);
        } else {
            this.graphics.beginFill(0x000000);
        }
        this.graphics.endFill();
    };
    return Square;
})(egret.Sprite);
Square.prototype.__class__ = "Square";
