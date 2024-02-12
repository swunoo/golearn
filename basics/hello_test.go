package main

import "testing"

func TestHello(t *testing.T) {
	t.Run("saying hello", func(t *testing.T) {
		got := Hello("Chris", "EN")
		want := "Hello, Chris"
		assertCorrectMessage(t, got, want)
	})

	t.Run("with empty string", func(t *testing.T) {
		got := Hello("", "EN")
		want := "Hello, World"
		assertCorrectMessage(t, got, want)
	})
}

func TestLangs(t *testing.T) {
	t.Run("in Spanish", func(t *testing.T) {
		got := Hello("Elodie", "ES")
		want := "Hola, Elodie"
		assertCorrectMessage(t, got, want)
	})
	t.Run("in French", func(t *testing.T) {
		got := Hello("Frank", "FR")
		want := "Bonjour, Frank"
		assertCorrectMessage(t, got, want)
	})
}

func assertCorrectMessage(t testing.TB, got, want string) {
	t.Helper()
	if got != want {
		t.Errorf("not the same")
	}
}
