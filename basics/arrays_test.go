package main

import (
	"reflect"
	"testing"
)

func TestSum(t *testing.T) {

	t.Run("5 numbers", func(t *testing.T) {
		numbers := []int{1, 2, 3, 4, 5}
		got := Sum(numbers)
		want := 15
		assertError(got, want, t)

	})

	t.Run("3 numbers", func(t *testing.T) {
		numbers := []int{-1, 2, -1}
		got := Sum(numbers)
		want := 0
		assertError(got, want, t)

	})
}

func TestSumAll(t *testing.T) {
	got := SumAll([]int{1, 2}, []int{0, 19})
	want := []int{3, 19}
	if !reflect.DeepEqual(got, want) {
		t.Errorf("\ngot %dv\nwant %v\ngiven", got, want)

	}
}

func TestSumTails(t *testing.T) {
	got := SumTails([]int{1, 2}, []int{0, 19})
	want := []int{2, 19}
	if !reflect.DeepEqual(got, want) {
		t.Errorf("\ngot %dv\nwant %v\ngiven", got, want)

	}
}

func TestSumHeads(t *testing.T) {
	got := SumHeads([]int{1, 2}, []int{0, 19})
	want := []int{1, 0}
	if !reflect.DeepEqual(got, want) {
		t.Errorf("\ngot %dv\nwant %v\ngiven", got, want)

	}
}

func assertError(got, want int, t testing.TB) {
	if got != want {
		t.Errorf("\ngot %d\nwant %d\ngiven", got, want)

	}
}
