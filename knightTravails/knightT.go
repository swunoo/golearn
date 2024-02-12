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
	colEnd   = 7
	rowStart = 1
	rowEnd   = 8
)

/*
* The knight travails
 */
func cliKnightT() {

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

	pathText := checkMoveWithNodes(start, goal)
	fmt.Printf("\nreached: %v\n", pathText)
}

// 1. USING 'NODE' STRUCT FOR BFS
type Node struct {
	value  [2]int8
	parent *Node
}

func checkMoveWithNodes(start, goal [2]int8) string {
	startNode := Node{value: start, parent: nil}
	currentNodes := []Node{startNode}
	nextNodes := []Node{}
	visited := [][2]int8{}

	for {
		for _, node := range currentNodes {

			moves := knightMovements(node.value)

			for _, move := range moves {

				if move == goal {
					finalNode := Node{value: move, parent: &node}
					return nodesToString(finalNode)

				} else if !isOutOfBound(move) && !sliceContains(visited, move) {
					nodified := Node{value: move, parent: &node}
					nextNodes = append(nextNodes, nodified)
					visited = append(visited, move)
				}
			}
		}
		currentNodes = nextNodes
		nextNodes = []Node{}
	}
}

func nodesToString(node Node) string {
	nodeValues := collectNodeValues(node)
	var strBuilder strings.Builder
	for i := len(nodeValues) - 1; i >= 0; i-- {
		strBuilder.WriteString(squareToText(nodeValues[i]))
		if i > 0 {
			strBuilder.WriteString("->")
		}
	}

	return strBuilder.String()
}

func collectNodeValues(node Node) (nodeValues [][2]int8) {
	fmt.Printf("\nTraversing for %q, its parents are ", squareToText(node.value))
	for {
		nodeValues = append(nodeValues, node.value)
		if node.parent == nil {
			fmt.Printf("\nParent of %q is nil.\n", squareToText(node.value))
			break
		}
		fmt.Printf("%q, ", squareToText(node.parent.value))
		node = *node.parent
	}
	fmt.Print("\n")
	return
}

// 2. BFS
func checkMoveBF(paths [][][2]int8, goal [2]int8) string {

	newPaths := [][][2]int8{}

	for _, path := range paths {

		moves := knightMovements(path[len(path)-1])

		for _, move := range moves {
			if reflect.DeepEqual(move, goal) {
				newPath := append(path, move)
				newPaths = nil
				return pathToText(newPath)

			} else if !isOutOfBound(move) && !sliceContains(path, move) {
				newPath := append(path, move)
				// fmt.Printf("\nnewPath: %v\n", pathToText(newPath))
				newPaths = append(paths, newPath)

			}
		}
	}

	if len(newPaths) > 0 {
		return checkMoveBF(newPaths, goal)
	}

	return ""
}

// UTILITIES
func knightMovements(square [2]int8) (moves [8][2]int8) {
	col := square[0]
	row := square[1]
	moves = [8][2]int8{
		{col + 2, row + 1},
		{col + 2, row - 1},
		{col + 1, row + 2},
		{col + 1, row - 2},
		{col - 2, row + 1},
		{col - 2, row - 1},
		{col - 1, row + 2},
		{col - 1, row - 2},
	}

	return moves
}

func squareToText(square [2]int8) (text string) {
	colIndex := square[0]
	row := square[1]
	return string(colIndex+'a') + strconv.Itoa(int(row))
}

func textToSquare(text string) (square [2]int8) {
	if len(text) == 2 {
		col := text[0]
		row := text[1]
		rowNum, err := strconv.ParseInt(string(row), 10, 8)
		if err == nil {
			return [2]int8{int8(col - 'a'), int8(rowNum)}
		}
	}
	return [2]int8{-1, -1}
}

func pathToText(path [][2]int8) string {
	var res string
	for _, square := range path {
		res += "->" + squareToText(square)
	}
	return res[2:]
}

func isOutOfBound(square [2]int8) bool {
	return (square[0] > colEnd || square[1] > rowEnd ||
		square[0] < colStart || square[1] < rowStart)
}

func sliceContains(elements [][2]int8, item [2]int8) bool {
	for _, e := range elements {
		if reflect.DeepEqual(e, item) {
			return true
		}
	}
	return false
}
