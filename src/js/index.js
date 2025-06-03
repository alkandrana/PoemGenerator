// Created by Rosa Lee Myers, 05-27-2025
import '../css/styles.css';
import * as io from './library.js';
import {Generator} from "./generator";

// header section elements
const name = document.getElementById('name');
const image = document.getElementById('image');
const newBtn = document.getElementById('newPoem');
// poem section elements
const title = document.getElementById('poem-title');
const poemLength = document.getElementById('length');
const text = document.getElementById('poem-text');
// poem list section elements
const header = document.getElementById('sidebar-header');
const list = document.getElementById('sidebar-list');
const links = document.getElementsByClassName('poem-link');

function showPoem(gen){
    name.innerHTML = gen.poem.author;
    header.innerHTML = `Other poems by ${gen.poem.author}`;
    removeCurrentTitle(gen.poem); // exclude the title of the displayed poem from the list of "other poems"
    printLinkList(gen.poem.poemList, list);
    io.addEventHandlers(gen, document.getElementsByClassName('poem-link'), title, poemLength, text);
    title.innerHTML = gen.poem.title;
    poemLength.innerHTML = `${gen.poem.size} lines`;
    io.printList(gen.poem.lines, text);
}
function removeCurrentTitle(poem){
    let index = poem.poemList.indexOf(poem.title);
    if (index !== -1) {
        poem.poemList.splice(index, 1);
    }
}

function setPage(gen){
    try {
        gen.poem = JSON.parse(localStorage["poem"]);
        showPoem(gen);
    } catch (error) {
        gen.getAuthors().then(authors => {
            gen.poem.author = authors[Math.floor(Math.random()*authors.length)];
            gen.search(gen.poem.author, "author").then(searchResults => {
                console.log("Got Poem List:");
                gen.poem.poemList = searchResults;
                const title = gen.poem.poemList[Math.floor(Math.random()*gen.poem.poemList.length)];
                gen.getPoem(title).then(result => {
                    console.log("Got poem: ");
                    gen.savePoem(result);
                    localStorage["poem"] = JSON.stringify(gen.poem);
                });
            });
        });
    }
}
function generatePoem(gen){
    gen.getAuthors().then(authors => {
        gen.poem.date = new Date(Date.now());
        gen.poem.author = authors[Math.floor(Math.random() * authors.length)];
        gen.search(gen.poem.author, "author").then(searchResults => {
            gen.poem.poemList = searchResults;
            const title = gen.poem.poemList[Math.floor(Math.random()*gen.poem.poemList.length)];
            gen.getPoem(title).then((newPoem) => {
                gen.savePoem(newPoem);
                localStorage["poem"] = JSON.stringify(gen.poem);
            });
        });
    });
}

function printLinkList(list, outputEl){
    for (let i = 0; i < list.length; i++){
        outputEl.innerHTML += `<li class="p-3"><a href="" class="poem-link">${list[i]}</a></li>`;
    }
}
window.onload = () => {
    const poemGen = new Generator();
    // make an initial api call, save it to the object literal, and add it to localStorage
    setPage(poemGen);
    // convert the poem list already on the page to "links" that perform an api search based on the title
    io.addEventHandlers(poemGen, links, title, poemLength, text);
    newBtn.onclick = () => {
        // clear the previous list of poems from the page
        io.clearSearchResults(list);
        // display the contents of the poem object literal on the page
        showPoem(poemGen);
        // perform another api search and save the result to the object literal and localStorage
        generatePoem(poemGen);
    };
}
