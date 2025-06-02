import '../css/styles.css';
import {printList} from "./index.js";
import {Generator} from "./generator";

const poemEl = document.getElementById('poem-text');
const titleEl = document.getElementById('poem-title');
const lengthEl = document.getElementById('length');
const listEl = document.getElementById('poem-list');
const searchBtn = document.getElementById('newPoem');
const input = document.getElementById('key');
const searchType = document.getElementById("type").value;

function addEventHandlers(gen){
    const links = document.getElementsByClassName('poem-link');
    for (let link of links){
        link.onclick = (event) => {
            event.preventDefault();
            gen.search(link.innerHTML, "title")
                .then( searchResults => {
                    const poem = searchResults[0]
                    titleEl.innerHTML = `${poem.title}<br/>By ${poem.author}`;
                    lengthEl.innerHTML = `${poem.linecount} lines`;
                    printList(poem.lines, poemEl);
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
    const gen = new Generator();
    searchBtn.addEventListener('click', () => {
        clearSearchResults();
        gen.search(input.value, searchType).then( (searchResults) => {
            for (let title of searchResults) {
                listEl.innerHTML +=
                    `<p><a href="" class="poem-link p-5">${title}</a></p>`;
            }
            addEventHandlers(gen);
        });
    });

}