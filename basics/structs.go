package main

import "math"

func main() {

}

type Circle struct {
	Radius int
}

func (c Circle) Area() float64 {
	return math.Pi * float64(c.Radius)
}

type Shape interface {
	Area() float64
}
