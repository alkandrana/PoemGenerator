// Created by Rosa Lee Myers, 05-27-2025
console.log("In index.js");

import '../css/styles.css';
import {Page} from './page.js';

function setHome(page){

}
window.onload = () => {
    console.log('Loading...')
    const home = new Page("home");
    // make an initial api call, save it to the object literal, and add it to localStorage
    home.loadPoem();
    // convert the poem list already on the page to "links" that perform an api search based on the title
    home.addEventHandlers();
    home.apiBtn.onclick = () => {
        // clear the previous list of poems from the page
        home.clearSearchResults();
        // display the contents of the poem object literal on the page
        home.showPoem();
        // perform another api search and save the result to the object literal and localStorage
        home.generatePoem();
    };
}
