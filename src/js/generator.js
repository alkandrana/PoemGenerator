// Created by Rosa Lee Myers, 05-28-2025

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
                    searchResults = data;
                } else {
                    searchResults.push("No results found.");
                }
                // returns a list of poem objects
                return searchResults;
            })
            .catch(error => console.log(error));
    }
    // return a list of all authors in the database
    getAuthors() {
        return fetch(`${this.apiUrl}author`)
        .then(res => res.json())
        .then(data => {
            return data.authors;
        })
        .catch(error => {
            console.log("There was a problem retrieving the data. Message: " + error);
        });
    }

    // takes in a poem object (return from api call) and saves it to the instance variable (object literal)
    savePoem(poemData){
        this.poem.author = poemData.author;
        this.poem.title = poemData.title;
        this.poem.size = poemData.linecount;
        this.poem.lines = poemData.lines;
    }


}