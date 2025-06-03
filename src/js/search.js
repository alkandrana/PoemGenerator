import '../css/styles.css';
import * as io from './library.js'
import {Generator} from "./generator";

const poemEl = document.getElementById('poem-text');
const titleEl = document.getElementById('poem-title');
const lengthEl = document.getElementById('length');
const listEl = document.getElementById('poem-list');
const searchBtn = document.getElementById('newPoem');
const input = document.getElementById('key');
const searchType = document.getElementById("type").value;

window.onload = () => {
    const gen = new Generator();
    searchBtn.addEventListener('click', () => {
        io.clearSearchResults(listEl, titleEl, lengthEl, poemEl);
        gen.search(input.value, searchType).then( (searchResults) => {
            for (let title of searchResults) {
                listEl.innerHTML +=
                    `<p><a href="" class="poem-link">${title}</a></p>`;
            }
            io.addEventHandlers(gen, document.getElementsByClassName('poem-link'), titleEl, lengthEl, poemEl);
        });
    });

}