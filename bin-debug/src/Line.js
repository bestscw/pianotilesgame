var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Created by easymobi_ on 2014/8/12.
*/
var Line = (function (_super) {
    __extends(Line, _super);
    function Line(row, cols_num, width, height) {
        _super.call(this);
        this.drawGrid(row, cols_num, width, height);
    }
    Line.prototype.drawGrid = function (row, cols_num, width, height) {
        this.row = row;

        this.graphics.drawRect(0, 0, width * cols_num, height);
        this.x = 0;
        this.y = this.row * this.height;
        this.width = width * cols_num;
        this.height = height;
        this.graphics.beginFill(0x666666, 1);
        this.graphics.endFill();

        var index = Math.floor(Math.random() * cols_num);

        for (var col = 0; col < 4; col++) {
            if (index == col) {
                this.block = col;
                var sp = new Square(1, row, col, width, height);
            } else {
                var sp = new Square(0, row, col, width, height);
            }

            this.addChild(sp);
        }
    };
    return Line;
})(egret.Sprite);
Line.prototype.__class__ = "Line";
