package main

var ()

type vocab struct {
	Kana    string `json:"kana"`
	Kanji   string `json:"kanji"`
	English string `json:"english"`
}

//
// func main() {
// 	for i := 1; i <= 23; i++ {
// 		data, err := ioutil.ReadFile(fmt.Sprintf("./vocab/%d.txt", i))
// 		if err != nil {
// 			log.Panic(err)
// 		}
//
// 		var vocabs []vocab
// 		lines := strings.Split(string(data), "\n")
//
// 		for j := 0; j+2 < len(lines); j += 3 {
// 			row := vocab{lines[j], lines[j+1], lines[j+2]}
// 			vocabs = append(vocabs, row)
// 		}
//
// 		jsonData, _ := json.Marshal(vocabs)
// 		ioutil.WriteFile(fmt.Sprintf("./data/%d.json", i), jsonData, 0644)
// 	}
// }
