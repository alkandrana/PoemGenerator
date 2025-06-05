// Created by Rosa Lee Myers, 05-27-2025
console.log("In index.js");

import '../css/styles.css';
import {Page} from './page.js';

function setHome(page){
    page.pageTitle.innerText = "Home";
    // fill the listHeader
    page.headerLabel.innerText = "Featured Poet:";
    page.headerInput.classList.add("h3");
    page.apiBtn.innerText = "New Poem";
    // fill poem list
    page.listHeader.innerText = "Other poems by";
    page.list.innerHTML = "Loading...";
    page.title.innerText = "Poem Title";
    page.poemLength.innerText = `Line Count`;
    page.text.innerHTML = `Poem Text`
}
window.onload = () => {
    const home = new Page("home");
    setHome(home);
    // make an initial api call, save it to the object literal, and add it to localStorage
    home.loadPoem();
    home.showPoem();

    // convert the poem list already on the page to "links" that perform an api search based on the title
    home.addEventHandlers();
    home.apiBtn.onclick = () => {
        console.log("clicked");
        home.generatePoem().then(_ => home.showPoem());
        // clear the previous list of poems from the page
        home.clearSearchResults();

    };
}
