package main

import (
	"bufio"
	"fmt"
	"os"
	"reflect"
	"strconv"
	"strings"
)

// 1. Initialize the board
const (
	colStart = 0
	colEnd   = 8
	rowStart = 0
	rowEnd   = 8
)

/*
* The knight travails
 */
func main() {

	// 2. Add Knight movement logic

	// 3. Add Path finding logic

	// 4. Ask for userinputs
	var start [2]int8
	var goal [2]int8

	for {
		fmt.Print("Start from (e.g. 'e3'): ")
		scanner := bufio.NewScanner(os.Stdin)
		scanner.Scan()
		start = textToSquare(scanner.Text())
		if !isOutOfBound(start) {
			break
		}
		fmt.Print("Invalid square.")
	}

	for {
		fmt.Print("\nGo to (e.g. 'f7'): ")
		scanner := bufio.NewScanner(os.Stdin)
		scanner.Scan()
		goal = textToSquare(scanner.Text())
		if !isOutOfBound(goal) || reflect.DeepEqual(start, goal) {
			break
		}
		fmt.Print("Invalid square.")
	}

	checkMoveDF(start, goal, squareToText(start))
}

// Depth-first search
var found bool = false

func checkMoveDF(square, goal [2]int8, path string) {

	moves := knightMovements(square)

	for _, move := range moves {

		if reflect.DeepEqual(square, goal) {
			fmt.Printf("\nreached: %q\n", path)
			found = true
			return

		} else if !isOutOfBound(square) && !found {
			moveText := squareToText(move)
			if !strings.Contains(path, moveText) {
				fmt.Printf("\nchecking: %q to %v", path, move)
				checkMoveDF(move, goal, path+"->"+moveText)
			}
		}

	}
}

func knightMovements(square [2]int8) (moves [8][2]int8) {
	col := square[0]
	row := square[1]
	moves = [8][2]int8{
		{col + 2, row + 1},
		{col + 2, row - 1},
		{col + 1, row + 2},
		{col - 1, row + 2},
		{col - 2, row + 1},
		{col - 2, row - 1},
		{col + 1, row - 2},
		{col - 1, row - 2},
	}
	return moves
}

func squareToText(square [2]int8) (text string) {
	colIndex := square[0] - 1
	row := square[1]
	return string(colIndex+'a') + strconv.Itoa(int(row))
}

func textToSquare(text string) (square [2]int8) {
	if len(text) == 2 {
		col := text[0]
		row := text[1]
		rowNum, err := strconv.ParseInt(string(row), 10, 8)
		if err == nil {
			return [2]int8{int8(col - 'a' + 1), int8(rowNum)}
		}
	}
	return [2]int8{-1, -1}
}

func isOutOfBound(square [2]int8) bool {
	return (square[0] > colEnd || square[1] > rowEnd ||
		square[0] < colStart || square[1] < rowStart)
}
