"use strict";
class Square {
    constructor(col, row) {
        this.col = col;
        this.row = row;
    }
    static sqFromText(txt) {
        if (txt.length !== 2)
            return null;
        return new Square(txt.toLowerCase().charCodeAt(0) - Square.charCodeOfA, parseInt(txt[1]) - 1);
    }
    textFromSq() {
        return (String.fromCharCode(this.col + Square.charCodeOfA)
            + (this.row + 1).toString());
    }
    equals(other) {
        return (this.col === other.col &&
            this.row === other.row);
    }
}
Square.charCodeOfA = "a".charCodeAt(0);
class Position {
    constructor(square, prev) {
        this.square = square;
        this.prev = prev;
    }
    static getPath(tail, separator) {
        const paths = [];
        let current = tail;
        while (current) {
            paths.push(current.square.textFromSq());
            current = current.prev;
        }
        return paths.reverse().join(separator);
    }
}
class Knight {
    constructor() {
        this.name = "Knight";
    }
    getMoves(square) {
        const moves = [];
        moves.push(new Square(square.col + 2, square.row + 1));
        moves.push(new Square(square.col + 2, square.row - 1));
        moves.push(new Square(square.col - 2, square.row + 1));
        moves.push(new Square(square.col - 2, square.row - 1));
        moves.push(new Square(square.col + 1, square.row + 2));
        moves.push(new Square(square.col + 1, square.row - 2));
        moves.push(new Square(square.col - 1, square.row + 2));
        moves.push(new Square(square.col - 1, square.row - 2));
        return moves;
    }
}
class Board {
    constructor(colMin, colMax, rowMin, rowMax) {
        this.colMin = colMin;
        this.colMax = colMax;
        this.rowMin = rowMin;
        this.rowMax = rowMax;
    }
    ;
    isOutOfBound(square) {
        return (square.col > this.colMax ||
            square.col < this.colMin ||
            square.row > this.rowMax ||
            square.row < this.rowMin);
    }
}
const getUserInput = (u) => u === "start" ? "a1" : "h8";
main();
function main() {
    // Create a standard board
    const board = new Board(0, 7, 0, 7);
    // Get start and goal squares
    const [start, goal] = getStartAndGoal(board);
    // Return if start===goal, build the tree otherwise.
    if (start.equals(goal))
        return;
    const finalPosition = findPath([new Position(start, null)], goal, board, new Knight());
    console.log(Position.getPath(finalPosition, " -> "));
}
// BFS
function findPath(leaves, goal, board, piece) {
    const newLeaves = [];
    for (const leaf of leaves) {
        const moves = piece.getMoves(leaf.square);
        for (const move of moves) {
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
    let start = null, goal = null;
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
