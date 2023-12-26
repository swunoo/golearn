class Square {
    constructor(
        public col: number,
        public row: number){}
    
    static charCodeOfA = "a".charCodeAt(0);
    
    static sqFromText(txt: string): Square | null{
        if(txt.length !== 2) return null;
        return new Square(
            txt.toLowerCase().charCodeAt(0) - Square.charCodeOfA,
            parseInt(txt[1]) - 1
        );
    }

    textFromSq(): string {
        return (
            String.fromCharCode(this.col + Square.charCodeOfA)
            + (this.row + 1).toString()
        );
    }

    equals(other: Square): boolean {
        return (
            this.col === other.col &&
            this.row === other.row
        );
    }
}

class Position {
   constructor(
    public square: Square,
    public prev: Position | null
   ){}

   static getPath(tail: Position, separator: string): string {
    const paths: string[] = [];
    let current: Position | null = tail;
    while(current){
        paths.push(current.square.textFromSq());
        current = current.prev;
    }
    return paths.reverse().join(separator);
   }
}

class Knight {
    name = "Knight";

    getMoves (square: Square): Square[] {
        const moves: Square[] = [];
        moves.push(new Square(square.col+2, square.row+1));
        moves.push(new Square(square.col+2, square.row-1));
        moves.push(new Square(square.col-2, square.row+1));
        moves.push(new Square(square.col-2, square.row-1));
        moves.push(new Square(square.col+1, square.row+2));
        moves.push(new Square(square.col+1, square.row-2));
        moves.push(new Square(square.col-1, square.row+2));
        moves.push(new Square(square.col-1, square.row-2));
        return moves;
    }
}

class Board {
    constructor(
        public colMin: number,
        public colMax: number,
        public rowMin: number,
        public rowMax: number){};

    isOutOfBound(square: Square): boolean {
        return (
            square.col > this.colMax ||
            square.col < this.colMin ||
            square.row > this.rowMax ||
            square.row < this.rowMin
        );
    }
}

type usage = "start" | "goal";
const getUserInput = (u: usage) => u === "start" ? "a1" : "h8";
const [start, goal] = getStartAndGoal(new Board(0, 7, 0, 7));
// travail(start, goal);

export function travail(startText: string, goalText: string): string | null {

    const [start, goal] = [Square.sqFromText(startText), Square.sqFromText(goalText)];
    if(!start || !goal) return null;
    // Create a standard board
    const board = new Board(0, 7, 0, 7);
    // Get start and goal squares
    // Return if start===goal, build the tree otherwise.
    if(start.equals(goal)) return start.textFromSq();
    const finalPosition: Position = findPath([new Position(start, null)], goal, board, new Knight());
    return Position.getPath(finalPosition, "->");
    
}

// BFS
function findPath(leaves: Position[], goal: Square, board: Board, piece: Knight): Position{
    const newLeaves: Position[] = [];
    for(const leaf of leaves){
        const moves = piece.getMoves(leaf.square);
        for(const move of moves){
            if(move.equals(goal)){
                return new Position(move, leaf);
            }
            if(!board.isOutOfBound(move)){
                newLeaves.push(new Position(move, leaf));
            }
        }
    }
    return findPath(newLeaves, goal, board, piece);
}


function getStartAndGoal(board: Board): Square[]{
    let start: Square | null = null, goal: Square | null = null;
    while(!start){
        start = Square.sqFromText(getUserInput("start"));
        if(!start || board.isOutOfBound(start))
            start = null;
    }
    while(!goal){
        goal = Square.sqFromText(getUserInput("goal"));
        if(!goal || board.isOutOfBound(goal))
            goal = null;
    }
    return [start, goal];
}

