import '../css/styles.css';
import {printList} from "./index.js";

const poemEl = document.getElementById('poem-text');
const titleEl = document.getElementById('poem-title');
const lengthEl = document.getElementById('length');
const listEl = document.getElementById('poem-list');
class Search {
    apiUrl = 'https://poetrydb.org/';
    searchResults = [];
    poem = null;



    search(keyword, type){
        return fetch(`${this.apiUrl}${type}/${keyword}`)
            .then(response => response.json())
            .then(data => {
                const searchResults = [];
                for (let poem of data) {
                    searchResults.push(poem.title);
                }
                console.log(this.searchResults);
                this.searchResults = searchResults;
            })
            .catch(error => console.log(error));
    }

    refineSearch(title){
        return fetch(`${this.apiUrl}title/${title}`)
        .then(response => response.json())
        .then(data => {
            if (data.length === 1){
                this.poem = data[0];
            }
        })
            .catch(error => console.log(error));
    }
}

function addEventHandlers(gen){
    const links = document.getElementsByClassName('poem-link');
    for (let link of links){
        link.onclick = (event) => {
            event.preventDefault();
            gen.refineSearch(link.innerHTML)
                .then( _ => {
                    titleEl.innerHTML = `${gen.poem.title}<br/>By ${gen.poem.author}`;
                    lengthEl.innerHTML = `${gen.poem.linecount} lines`;
                    printList(gen.poem.lines, poemEl);
                });
        };
    }
}

function clearSearchResults(){
    listEl.innerHTML = 'Search Results:';
    titleEl.innerHTML = '';
    lengthEl.innerHTML = '';
    poemEl.innerHTML = 'No search results.';
}

window.onload = () => {
    const search = new Search();
    const searchBtn = document.getElementById('newPoem');
    const input = document.getElementById('key');
    searchBtn.addEventListener('click', () => {
        const searchType = document.getElementById("type").value;
        clearSearchResults();
        search.search(input.value, searchType).then( () => {
            for (let title of search.searchResults) {
                listEl.innerHTML +=
                    `<p><a href="" class="poem-link p-5">${title}</a></p>`;
            }
            addEventHandlers(search);
        });
    });

}