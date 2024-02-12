package main

import "testing"

func TestRepeat(t *testing.T) {

	expected := "aaa"
	repeated := Repeat("a", 3)

	assertCorrectMessage(t, expected, repeated)
}

func BenchmarkRepeat(b *testing.B) {
	for i := 0; i < b.N; i++ {
		Repeat("a", 5)
	}
}
