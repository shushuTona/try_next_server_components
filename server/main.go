package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type GetTitle struct {
	Title string `json:"title"`
}

type GetToken struct {
	Token string `json:"token"`
}

const TOKEN = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("/gettitle", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json; charset=utf-8")
		w.WriteHeader(http.StatusOK)
		data := GetTitle{
			Title: "カウンター",
		}
		if err := json.NewEncoder(w).Encode(data); err != nil {
			log.Println(err)
		}
	})

	mux.HandleFunc("/gettoken", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json; charset=utf-8")
		w.WriteHeader(http.StatusOK)
		data := GetToken{
			Token: TOKEN,
		}
		if err := json.NewEncoder(w).Encode(data); err != nil {
			log.Println(err)
		}
	})

	mux.HandleFunc("/checktoken", func(w http.ResponseWriter, r *http.Request) {
		token := r.Header.Get("Authorization")

		fmt.Println(token)

		w.Header().Set("Content-Type", "application/json; charset=utf-8")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("TOKEN_OK\n"))
	})

	http.ListenAndServe(":8001", mux)
}
