package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

// Response struct for the API response
type Response struct {
	Result string `json:"result"`
}

func startServer() {
	// Handlers
	http.HandleFunc("/home", homeHandler)
	http.HandleFunc("/api/calc", calculateHandler)
	http.Handle("/", http.FileServer(http.Dir("./resources")))

	// Start the server on port 8080
	fmt.Printf("Server started.\n")
	http.ListenAndServe(":8080", nil)
}

func homeHandler(w http.ResponseWriter, r *http.Request) {
	htmlContent, err := ioutil.ReadFile("resources/index.html")
	if err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	w.Write(htmlContent)
}

func calculateHandler(w http.ResponseWriter, r *http.Request) {

	// Parse the query parameters
	params := r.URL.Query()
	start := params.Get("start")
	goal := params.Get("goal")

	// Use knightT
	startSquare := textToSquare(start)
	goalSquare := textToSquare(goal)
	if isOutOfBound(startSquare) || isOutOfBound(goalSquare) {
		http.Error(w, "Invalid parameters", http.StatusBadRequest)
		return
	}

	result := checkMoveWithNodes(startSquare, goalSquare)

	// Create JSON response
	response := Response{Result: result}
	jsonResponse, err := json.Marshal(response)
	if err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonResponse)
}
