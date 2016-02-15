package main

import (
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/StephanDollberg/go-json-rest-middleware-jwt"
	"github.com/ant0ine/go-json-rest/rest"
)

var secretKey = "secret key2"
var realm = "jwt auth"

var jwtMiddleware = &jwt.JWTMiddleware{
	Key:        []byte(secretKey),
	Realm:      realm,
	Timeout:    time.Hour,
	MaxRefresh: time.Hour * 24,
	Authenticator: func(username string, password string) bool {
		logpw := strings.Map(func(rune) rune { return '*' }, password)
		log.Println(username, logpw)
		return username == "admin" && password == "admin"
	},
}

func main() {
	api := rest.NewApi()
	api.Use(rest.DefaultDevStack...)

	// if /api/* then require jwt authentication
	api.Use(&rest.IfMiddleware{
		Condition: func(request *rest.Request) bool {
			return request.URL.Path != "/login"
		},
		IfTrue: jwtMiddleware,
	})

	apiRouter, _ := rest.MakeRouter(
		rest.Post("/login", jwtMiddleware.LoginHandler),
		rest.Get("/refresh_token", jwtMiddleware.RefreshHandler),
		rest.Get("/cards", getAPICards),
	)

	api.SetApp(apiRouter)

	http.Handle("/api/", http.StripPrefix("/api", api.MakeHandler()))
	http.Handle("/", http.FileServer(http.Dir("./dist")))
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func handleAuth(w rest.ResponseWriter, r *rest.Request) {
	w.WriteJson(map[string]string{
		"authed": r.Env["REMOTE_USER"].(string),
	})
}

func getCards(w rest.ResponseWriter, r *rest.Request) {
	w.WriteJson(map[string]string{
		"hello": "guest",
	})
}

func getAPICards(w rest.ResponseWriter, r *rest.Request) {
	w.WriteJson(map[string]string{
		"hello": "api",
	})
}
