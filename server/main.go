package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"slices"
	"time"
)

type GetTitle struct {
	Title string `json:"title"`
}

type GetToken struct {
	Token string `json:"token"`
}

type CheckLogin struct {
	OK bool `json:"ok"`
}

const CSRF_TOKEN = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const SESSION_ID = "XXXXXXXXXX"

var storage = []string{}

func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("/api/getcsrftoken", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("/api/getcsrftoken")

		fmt.Printf("%#v\n", r)

		w.Header().Set("Content-Type", "application/json; charset=utf-8")
		w.WriteHeader(http.StatusOK)
		data := GetToken{
			Token: CSRF_TOKEN,
		}
		if err := json.NewEncoder(w).Encode(data); err != nil {
			log.Println(err)
		}
	})

	mux.HandleFunc("/api/login", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("/api/login")

		fmt.Printf("%#v\n", r)

		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "*")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			w.Write([]byte("OPTIONS"))
			return
		}

		if checktoken(r) {
			fmt.Println("CSRF_TOKEN_OK")

			http.SetCookie(w, &http.Cookie{
				Name:    "session_id",
				Value:   SESSION_ID,
				Expires: time.Now().Add(24 * time.Hour),
				Path:    "/",
			})

			storage = append(storage, SESSION_ID)

			w.WriteHeader(http.StatusOK)
			w.Write([]byte("LOGIN_SUCCESS"))
		} else {
			fmt.Println("CSRF_TOKEN_FAILD")
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("CSRF_TOKEN_FAILD"))
		}
	})

	mux.HandleFunc("/api/checklogin", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("/api/checklogin")

		fmt.Printf("%#v\n", r)

		cookie, err := r.Cookie("session_id")
		if err != nil {
			fmt.Printf("%s\n", err.Error())
			fmt.Println("SESSION_ID_NOT_FOUND")
			w.WriteHeader(http.StatusUnauthorized)
			data := CheckLogin{
				OK: false,
			}
			if err := json.NewEncoder(w).Encode(data); err != nil {
				log.Println(err)
			}
			return
		}
		fmt.Println(cookie)

		w.Header().Set("Content-Type", "application/json; charset=utf-8")

		if !slices.Contains(storage, cookie.Value) {
			w.WriteHeader(http.StatusUnauthorized)
			data := CheckLogin{
				OK: false,
			}
			if err := json.NewEncoder(w).Encode(data); err != nil {
				log.Println(err)
			}
			return
		}

		w.WriteHeader(http.StatusOK)
		data := CheckLogin{
			OK: true,
		}
		if err := json.NewEncoder(w).Encode(data); err != nil {
			log.Println(err)
		}
	})

	fmt.Println("server start")
	http.ListenAndServe(":8080", mux)
}

func checktoken(r *http.Request) bool {
	token := r.Header.Get("Csrf-Token")
	return token == CSRF_TOKEN
}
