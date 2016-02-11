#!/bin/bash

mkdir -p pages

scrape() {
  curl http://ohelo.org/japn/lang/genki_vocab_table.php?lesson=$1 > pages/$1.html
}

scrape 1 
scrape 2 
scrape 3 
scrape 4 
scrape 5 
scrape 6 
scrape 7 
scrape 8 
scrape 9 
scrape 10 
scrape 11
scrape 12 
scrape 13 
scrape 14 
scrape 15 
scrape 16 
scrape 17 
scrape 18 
scrape 19 
scrape 20
scrape 21
scrape 22
scrape 23
