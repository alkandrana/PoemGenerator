// Created by Rosa Lee Myers, 05-28-2025
console.log("In Generator: ")
export class Generator {
    poem = {
        author: "",
        title: "",
        size: 0,
        lines: [],
        poemList: [],
        date: new Date()
    };
    authors = [];
    apiUrl = 'https://poetrydb.org/';

    // basic API code

    // perform any type of search (title, author, line...);
    search(keyword, type){
        return fetch(`${this.apiUrl}${type}/${keyword}`)
            .then(response => response.json())
            .then(data => {
                let searchResults = [];
                if (!data.status) {
                    for (let p of data) {
                        searchResults.push(p.title);
                    }
                } else {
                    searchResults.push("No results found.");
                }
                // returns a list of titles that represent the poems that resulted from the search
                return searchResults;
            })
            .catch(error => console.log(error));
    }
    // return a list of all authors in the database
    getAuthors() {
        console.log(`Starting fetch: ${this.apiUrl}`);
        return fetch(`${this.apiUrl}author`)
        .then(res => res.json())
        .then(data => {
            return data.authors;
        })
        .catch(error => {
            console.log("There was a problem retrieving the data. Message: " + error);
        });
    }

    // search the database for a specific poem by title; returns the poem object
    getPoem(title){
        return fetch(`${this.apiUrl}title/${title}`)
            .then(res => res.json())
            .then(data => {
                return data[0];
            }).catch(error => {console.log(error)});
    }

    // takes in a poem object (return from api call) and saves it to the instance variable (object literal)
    savePoem(poemData){
        this.poem.author = poemData.author;
        this.poem.title = poemData.title;
        this.poem.size = poemData.linecount;
        this.poem.lines = poemData.lines;
        console.log("Next Poem:")
        console.log(this.poem);
    }


}