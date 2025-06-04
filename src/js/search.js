// Created by Rosa Lee Myers, 05-29-2025
import '../css/styles.css';
import {Page} from './page.js'
const input = document.getElementById('key');
const searchType = document.getElementById("type");

window.onload = () => {
    const search = new Page('search')
    search.apiBtn.addEventListener('click', () => {
        //clear the previous list of poems so that the new search replaces them
        search.clearSearchResults();
        // search based on input values from the form
        search.gen.search(input.value, searchType.value).then( (searchResults) => {
            // iterate over the results and print the titles to the poem list section
            for (let title of searchResults) {
                search.list.innerHTML +=
                    `<p><a href="" class="poem-link">${title}</a></p>`;
            }
            // add event handlers to each title to turn them into "links" that perform an api search based on their title
            search.addEventHandlers();
        });
    });
}