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
    search(keyword, type){
        return fetch(`${this.apiUrl}${type}/${keyword}`)
            .then(response => response.json())
            .then(data => {
                const searchResults = [];
                for (let p of data) {
                    searchResults.push(p.title);
                }
                return searchResults;
            })
            .catch(error => console.log(error));
    }
    getAuthor() {
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
    getPoem(){
        const randP = Math.floor(Math.random() * this.poem.poemList.length);
        return this.search(this.poem.poemList[randP], "title")
            .then(searchResults  => {
                return fetch(`${this.apiUrl}title/${searchResults[0]}`)
                    .then(res => res.json())
                    .then(data => {
                        const rawPoem = data[0];
                        this.poem.title = rawPoem.title;
                        this.poem.size = rawPoem.linecount;
                        this.poem.lines = rawPoem.lines;
                        console.log(this.poem);
                    }).catch(error => {console.log(error)});
            });
    }


}