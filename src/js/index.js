// Created by Rosa Lee Myers, 05-27-2025
import '../css/styles.css';

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

function showPoem(gen){
    name.innerHTML = gen.poem.author;
    header.innerHTML = `Other poems by ${gen.poem.author}`;
    removeCurrentTitle(gen.poem); // exclude the title of the displayed poem from the list of "other poems"
    printList(gen.poem.poemList, list);
    title.innerHTML = gen.poem.title;
    poemLength.innerHTML = `${gen.poem.size} lines`;
    printList(gen.poem.lines, text);
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
    } catch (error) {
        gen.search("The Raven", "title").then(searchResults => {
            const rawPoem = searchResults[0];
            gen.poem = {
                author: rawPoem.author,
                title: rawPoem.title,
                size: rawPoem.size,
                lines: rawPoem.lines
            };
            gen.search("Edgar Allan Poe", "author").then(searchResults => {
                gen.poem.poemList = searchResults;
            });
        });
        localStorage["poem"] = JSON.stringify(gen.poem);
    }
    showPoem(gen);
}

export function printList(list, outputEl){
    let output = '';
    for(let i = 0; i < list.length; i++){
        if (list[i] === ""){
            output += `<p class="p-1">${list[i]}</p>`;
        } else {
            output += `<p>${list[i]}</p>`;
        }

    }
    outputEl.innerHTML = output;
}
window.onload = () => {
    const poemGen = new Generator();
    setPage(poemGen);
    newBtn.onclick = () => {
        poemGen.getAuthor().then(authors => {
            poemGen.poem.date = new Date(Date.now());
            poemGen.poem.author = authors[Math.floor(Math.random() * authors.length)];
            poemGen.search(poemGen.poem.author, "author").then(searchResults => {
                poemGen.poem.poemList = searchResults;
                poemGen.getPoem().then(() => {
                    showPoem(poemGen);
                    localStorage["poem"] = JSON.stringify(poemGen.poem);
                });
            });
        });
    };
}
