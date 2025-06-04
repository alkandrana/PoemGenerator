// Created by Rosa Lee Myers, 06-02-2025

import {Generator} from "./generator";

export class Page {


    constructor(page) {
        console.log("Constructing...");
        this.generateHtml();
        // HTML elements
        this.pageTitle = document.getElementsByTagName("title")[0];
        // listHeader section elements
        this.headerLabel = document.getElementById('descr');
        this.headerInput = document.getElementById('input')
        this.apiBtn = document.getElementById('apiBtn');
        // poem section elements
        this.title = document.getElementById('poem-title');
        this.poemLength = document.getElementById('poem-length');
        this.text = document.getElementById('poem-text');
        // poem list section elements
        this.listHeader = document.getElementById('sidebar-list');
        this.list = document.getElementById('sidebar-list');
        this.links = document.getElementsByClassName('poem-link');
        // api class
        this.gen = new Generator();
        this.page = page;
    }

    addEventHandlers() {
        for (let link of this.links) {
            link.onclick = (event) => {
                event.preventDefault();
                this.gen.getPoem(link.innerHTML)
                    .then(result => {
                        const newPoem = result;
                        this.title.innerHTML = `${newPoem.title}`;
                        this.poemLength.innerHTML = `${newPoem.linecount} lines`;
                        this.printList(newPoem.lines, this.text);
                    });
            };
        }
    }

    loadPoem(){
        try {
            this.gen.poem = JSON.parse(localStorage["poem"]);
            this.showPoem(this.gen);
        } catch (error) {
            this.generatePoem();
        }
    }
    generatePoem(){
        this.gen.getAuthors().then(authors => {
            this.gen.poem.author = authors[Math.floor(Math.random() * authors.length)];
            this.gen.search(this.gen.poem.author, "author").then(searchResults => {
                this.gen.poem.poemList = searchResults;
                const title = this.gen.poem.poemList[Math.floor(Math.random() * this.gen.poem.poemList.length)];
                this.gen.getPoem(title).then((result) => {
                    this.gen.savePoem(result);
                    localStorage["poem"] = JSON.stringify(this.gen.poem);
                });
            });
        });
    }

    showPoem(){
        this.headerInput.innerHTML = this.gen.poem.author;
        this.listHeader.innerHTML = this.page === "home" ? `Other poems by ${this.gen.poem.author}` : 'Search Results: ';
        this.removeCurrentTitle(); // exclude the title of the displayed poem from the list of "other poems"
        this.printLinkList();
        this.addEventHandlers();
        this.title.innerHTML = this.gen.poem.title;
        this.poemLength.innerHTML = `${this.gen.poem.size} lines`;
        this.printList();
    }

    printList(){
        let output = '';
        for(let i = 0; i < this.gen.poem.lines.length; i++){
            if (this.gen.poem.lines[i] === ""){
                output += `<p class="p-1">${this.gen.poem.lines[i]}</p>`;
            } else {
                output += `<p>${this.gen.poem.lines[i]}</p>`;
            }
        }
        this.text.innerHTML = output;
    }

    printLinkList(){
        for (let i = 0; i < this.gen.poem.poemList.length; i++){
            this.list.innerHTML += `<li class="p-3"><a href="" class="poem-link">${this.gen.poem.poemList[i]}</a></li>`;
        }
    }

    removeCurrentTitle(){
        let index = this.gen.poem.poemList.indexOf(this.gen.poem.title);
        if (index !== -1) {
            this.gen.poem.poemList.splice(index, 1);
        }
    }

    clearSearchResults(){
        this.list.innerHTML = '';
    }

    generateHtml(){
        const headSkeleton = `
            <meta charset="UTF-8">
            <!-- Bootstrap cdns -->
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
        
            <!--Google font-->
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Inknut+Antiqua:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">`;
        document.getElementsByTagName("head")[0].innerHTML += headSkeleton;
        const content = document.getElementsByTagName("body")[0];
        const navbar = `
            <nav class="navbar navbar-expand-sm navbar-dark">
                <div class="container-fluid">
                    <ul class="navbar-nav row w-100">
                        <li class="navbar-brand col"><a href="./index.html" class="navbar-brand contrast"> Poet's Corner</a></li>
                        <li class="nav-item col">
                            <a class="btn btn-primary" href="./index.html" id="home">Home</a>
                        </li>
                        <li class="nav-item col">
                            <a class="btn btn-primary" href="search.html" id="about">Search</a>
                        </li>
                    </ul>
                </div>
            </nav>`;
        content.classList.add("bg-dark", "text-primary", "inknut-antiqua-black");
        content.innerHTML += navbar;

        const mainSkeleton = `
            <div class="container-fluid">
                <main class="bg-dark text-primary mx-auto">
                    <div class="row p-5 align-items-end">
                        <h2 class="col-sm" id="descr">Placeholder</h2>
                        <div class="col-sm h3" id="input">William Wordsworth</div>
                        <button type="button" class="btn btn-primary col-md-2" id="apiBtn">Fetch</button>
                    </div>
                    <div class="row">
                        <div class="col-4 custom-border" id="sidebar">
                            <h6 id="sidebar-header" class="pt-3"></h6>
                            <div id="sidebar-list" class="ps-3 contrast h6 pt-3">
                                <p><a href="" class="poem-link"></a></p>
                            </div>
                        </div>
                        <div class="col text-center custom-border" id="poem">
                            <h3 id="poem-title" class="py-5 mx-auto"></h3>
                            <p id="poem-length"></p>
                            <div class="contrast" id="poem-text"></div>
                        </div>
                    </div>
                </main>
            </div>`
        content.innerHTML += mainSkeleton;
    }

}