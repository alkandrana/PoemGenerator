// Created by Rosa Lee Myers, 05-29-2025
import '../css/styles.css';
import {Page} from './page.js'

function insertSelect(search){
    // create select element
    const searchTypeEl = document.createElement("select");
    // set attributes
    searchTypeEl.id = "type";
    searchTypeEl.classList.add("form-select", "col-sm", "me-2");
    // set options
    searchTypeEl.innerHTML = `<option value="author">author</option>
            <option value="title" selected>title</option>
            <option value="lines">lines</option>`;
    // insert select element after input
    search.headerInput.insertAdjacentElement("afterend", searchTypeEl);
}
function setSearch(search){
    // set page title
    search.pageTitle.innerHTML = "Search";
    // fill header section
    search.headerLabel.innerHTML = "Search: ";
    search.headerInput.innerHTML = `<input type="text" id="key" class="form-control"/>`;
    insertSelect(search);
    search.apiBtn.innerHTML = "Search";
    // fill poem list
    search.listHeader.innerHTML = "Search Results";
    search.list.innerHTML = "No search results<br/>Try entering a keyword in the search box above. " +
        "You can search for all or part of a title, author name, or poem line.";
    // fill poem section with placeholder text
    search.title.innerHTML = "Poem Title";
    search.poemLength.innerHTML = "Line Count";
    search.text.innerHTML = "Select a title in the search results on the left to display the poem's text here";
}

window.onload = () => {
    // set up the page
    const search = new Page('search');
    setSearch(search);
    // get the form elements
    const input = document.getElementById('key');
    const searchType = document.getElementById("type");
    // perform an api search on button click
    search.apiBtn.addEventListener('click', () => {
        //clear the previous list of poems so that the new search replaces them
        search.clearSearchResults();
        // search based on input values from the form
        search.gen.search(input.value, searchType.value).then( (searchResults) => {
            if (typeof (searchResults) !== "object"){
                search.showError(searchResults);
            }
            else if (searchResults[0] === "No results found.")
            {
                search.list.innerHTML = searchResults[0];
                search.list.classList.add("text-danger");
            }
            else
            {
                // save the list of poems
                search.gen.poem.poemList = searchResults;
                // iterate over the results and print the titles to the poem list section
                search.printLinkList(searchResults);
                // add event handlers to each title to turn them into "links" that perform an api search based on their title
                search.addEventHandlers();
            }
        });
    });
}