console.log("In Generator: ")
export class Generator {
    poem = null;
    authors = [];
    apiUrl = 'https://poetrydb.org/';
    author = "";
    poemList = [];


    constructor() {
        this.getAuthor();
    }

    async getAuthor() {
        console.log(`Starting fetch: ${this.apiUrl}`);
        await fetch(`${this.apiUrl}author`)
        .then(res => res.json())
        .then(data => {
            this.authors = data.authors;
            this.getPoem(data);
            this.getPoemList();
        })
        .catch(error => {
            console.log("There was a problem retrieving the data. Message: " + error);
        });
    }
    getPoem(data){
        const author = data.authors[Math.floor(Math.random() * data.authors.length)];
        this.author = author;
        fetch(`${this.apiUrl}author/${author}`)
        .then(res => res.json())
        .then(data => {
            const randP = Math.floor(Math.random() * data.length);
            const rawPoem = data[randP];
            console.log(rawPoem);
            this.poem = {
                title: rawPoem.title,
                size: rawPoem.linecount,
                lines: rawPoem.lines
            };
            console.log(this.poem);
        });
    }

    getPoemList(){
        fetch(`${this.apiUrl}author/${this.author}/title`)
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                this.poemList.push(data[i].title);
            }
            console.log(this.poemList);
        });
    }


}