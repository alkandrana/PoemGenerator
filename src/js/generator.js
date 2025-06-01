console.log("In Generator: ")
export class Generator {
    poem = null;
    authors = [];
    apiUrl = 'https://poetrydb.org/';


    constructor() {
        this.apiFetch = this.getAuthor();
    }

    getAuthor() {
        console.log(`Starting fetch: ${this.apiUrl}`);
        return fetch(`${this.apiUrl}author`)
        .then(res => res.json())
        .then(data => {
            this.authors = data.authors;
            this.poem.date = new Date(Date.now());
            console.log("Authors:")
            console.log(this.authors);
            this.getPoem();
        })
        .catch(error => {
            console.log("There was a problem retrieving the data. Message: " + error);
        });
    }
    getPoem(){
        fetch(`${this.apiUrl}author/${this.poem.author}`)
        .then(res => res.json())
        .then(data => {
            const randP = Math.floor(Math.random() * data.length);
            const rawPoem = data[randP];
            console.log("Poem:")
            console.log(rawPoem);
            this.poem = {
                author: rawPoem.author,
                title: rawPoem.title,
                size: rawPoem.linecount,
                lines: rawPoem.lines,
                poemList: []
            };
            this.getPoemList();
            console.log(this.poem);
        });
    }

    getPoemList(){
        fetch(`${this.apiUrl}author/${this.poem.author}/title`)
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                this.poem.poemList.push(data[i].title);
            }
            console.log("List of Poems");
            console.log(this.poem.poemList);
        });
    }


}