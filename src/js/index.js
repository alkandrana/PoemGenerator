// Created by Rosa Lee Myers, 05-27-2025
console.log("In index.js");

import '../css/styles.css';
import {Page} from './page.js';

function setHome(page){
    page.pageTitle.innerText = "Home";
    // fill the listHeader
    page.headerLabel.innerText = "Featured Poet:";
    page.headerInput.innerText = "William Wordsworth";
    page.headerInput.classList.add("h3");
    page.apiBtn.innerText = "New Poem";
    // fill poem list
    page.listHeader.innerText = "Other poems by William Wordsworth";
    page.list.innerHTML = `<p><a href="" class="poem-link">Lines Written in Early Spring</a>
                            <p><a href="" class="poem-link">I Wandered Lonely As A Cloud</a></p>`;
    page.title.innerText = "I Wandered Lonely As A Cloud";
    page.poemLength.innerText = `24 lines`;
    page.text.innerHTML = `
        <p>I wandered lonely as a cloud</p>
        <p>That floats on high o'er vales and hills,</p>
        <p>When all at once I saw a crowd,</p>
        <p>A host, of golden daffodils;</p>
        <p>Beside the lake, beneath the trees,</p>
        <p>Fluttering and dancing in the breeze.</p>
        <p>&nbsp;</p>
        <p>Continuous as the stars that shine</p>
        <p>And twinkle on the milky way,</p>
        <p>They stretched in never-ending line</p>
        <p>Along the margin of a bay:</p>
        <p>Ten thousand saw I at a glance,</p>
        <p>Tossing their heads in sprightly dance.</p>
        <p>&nbsp;</p>
        <p>The waves beside them danced, but they</p>
        <p>Out-did the sparkling leaves in glee;</p>
        <p>A poet could not be but gay,</p>
        <p>In such a jocund company!</p>
        <p>I gazed—and gazed—but little thought</p>
        <p>What wealth the show to me had brought:</p>
        <p>&nbsp;</p>
        <p>For oft, when on my couch I lie</p>
        <p>In vacant or in pensive mood,</p>
        <p>They flash upon that inward eye</p>
        <p>Which is the bliss of solitude;</p>
        <p>And then my heart with pleasure fills,</p>
        <p>And dances with the daffodils.</p>`
}
window.onload = () => {
    const home = new Page("home");
    setHome(home);
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
