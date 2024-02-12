"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.travail = void 0;
var Square = /** @class */ (function () {
    function Square(col, row) {
        this.col = col;
        this.row = row;
    }
    Square.sqFromText = function (txt) {
        if (txt.length !== 2)
            return null;
        return new Square(txt.toLowerCase().charCodeAt(0) - Square.charCodeOfA, parseInt(txt[1]) - 1);
    };
    Square.prototype.textFromSq = function () {
        return (String.fromCharCode(this.col + Square.charCodeOfA)
            + (this.row + 1).toString());
    };
    Square.prototype.equals = function (other) {
        return (this.col === other.col &&
            this.row === other.row);
    };
    Square.charCodeOfA = "a".charCodeAt(0);
    return Square;
}());
var Position = /** @class */ (function () {
    function Position(square, prev) {
        this.square = square;
        this.prev = prev;
    }
    Position.getPath = function (tail, separator) {
        var paths = [];
        var current = tail;
        while (current) {
            paths.push(current.square.textFromSq());
            current = current.prev;
        }
        return paths.reverse().join(separator);
    };
    return Position;
}());
var Knight = /** @class */ (function () {
    function Knight() {
        this.name = "Knight";
    }
    Knight.prototype.getMoves = function (square) {
        var moves = [];
        moves.push(new Square(square.col + 2, square.row + 1));
        moves.push(new Square(square.col + 2, square.row - 1));
        moves.push(new Square(square.col - 2, square.row + 1));
        moves.push(new Square(square.col - 2, square.row - 1));
        moves.push(new Square(square.col + 1, square.row + 2));
        moves.push(new Square(square.col + 1, square.row - 2));
        moves.push(new Square(square.col - 1, square.row + 2));
        moves.push(new Square(square.col - 1, square.row - 2));
        return moves;
    };
    return Knight;
}());
var Board = /** @class */ (function () {
    function Board(colMin, colMax, rowMin, rowMax) {
        this.colMin = colMin;
        this.colMax = colMax;
        this.rowMin = rowMin;
        this.rowMax = rowMax;
    }
    ;
    Board.prototype.isOutOfBound = function (square) {
        return (square.col > this.colMax ||
            square.col < this.colMin ||
            square.row > this.rowMax ||
            square.row < this.rowMin);
    };
    return Board;
}());
var getUserInput = function (u) { return u === "start" ? "a1" : "h8"; };
var _a = getStartAndGoal(new Board(0, 7, 0, 7)), start = _a[0], goal = _a[1];
// travail(start, goal);
function travail(startText, goalText) {
    var _a = [Square.sqFromText(startText), Square.sqFromText(goalText)], start = _a[0], goal = _a[1];
    if (!start || !goal)
        return null;
    // Create a standard board
    var board = new Board(0, 7, 0, 7);
    // Get start and goal squares
    // Return if start===goal, build the tree otherwise.
    if (start.equals(goal))
        return start.textFromSq();
    var finalPosition = findPath([new Position(start, null)], goal, board, new Knight());
    return Position.getPath(finalPosition, "->");
}
exports.travail = travail;
// BFS
function findPath(leaves, goal, board, piece) {
    var newLeaves = [];
    for (var _i = 0, leaves_1 = leaves; _i < leaves_1.length; _i++) {
        var leaf = leaves_1[_i];
        var moves = piece.getMoves(leaf.square);
        for (var _a = 0, moves_1 = moves; _a < moves_1.length; _a++) {
            var move = moves_1[_a];
            if (move.equals(goal)) {
                return new Position(move, leaf);
            }
            if (!board.isOutOfBound(move)) {
                newLeaves.push(new Position(move, leaf));
            }
        }
    }
    return findPath(newLeaves, goal, board, piece);
}
function getStartAndGoal(board) {
    var start = null, goal = null;
    while (!start) {
        start = Square.sqFromText(getUserInput("start"));
        if (!start || board.isOutOfBound(start))
            start = null;
    }
    while (!goal) {
        goal = Square.sqFromText(getUserInput("goal"));
        if (!goal || board.isOutOfBound(goal))
            goal = null;
    }
    return [start, goal];
}
