// Created by Rosa Lee Myers, 05-29-2025
import '../css/styles.css';
import * as io from './library.js'
import {Generator} from "./generator";

const poemEl = document.getElementById('poem-text');
const titleEl = document.getElementById('poem-title');
const lengthEl = document.getElementById('length');
const listEl = document.getElementById('poem-list');
const searchBtn = document.getElementById('newPoem');
const input = document.getElementById('key');
const searchType = document.getElementById("type");

window.onload = () => {
    const gen = new Generator();
    searchBtn.addEventListener('click', () => {
        //clear the previous list of poems so that the new search replaces them
        io.clearSearchResults(listEl);
        // search based on input values from the form
        gen.search(input.value, searchType.value).then( (searchResults) => {
            // iterate over the results and print the titles to the poem list section
            for (let title of searchResults) {
                listEl.innerHTML +=
                    `<p><a href="" class="poem-link">${title}</a></p>`;
            }
            // add event handlers to each title to turn them into "links" that perform an api search based on their title
            io.addEventHandlers(gen, document.getElementsByClassName('poem-link'), titleEl, lengthEl, poemEl);
        });
    });
}