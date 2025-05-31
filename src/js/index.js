// Created by Rosa Lee Myers, 05-27-2025
import '../css/styles.css';

import {Generator} from "./generator";

// header section elements
const name = document.getElementById('name');
const image = document.getElementById('image');
const newBtn = document.getElementById('newPoem');
// poem section elements
const title = document.getElementById('poem-title');
const text = document.getElementById('poem-text');
// poem list section elements
const header = document.getElementById('sidebar-header');
const list = document.getElementById('sidebar-list');

function showPoem(gen){
    name.innerHTML = gen.author;
    header.innerHTML = `Other poems by ${gen.author}`;
    printList(gen.poemList, list);
    title.innerHTML = gen.poem.title;
    printList(gen.poem.lines, text);
}

function printList(list, outputEl){
    let output = '';
    for(let i = 0; i < list.length; i++){
        output += `<p>${list[i]}</p>`;
    }
    outputEl.innerHTML = output;
}
window.onload = () => {
    const gen = new Generator();
    newBtn.onclick = gen.getAuthor;
    showPoem(gen);
    console.log(gen);
    //console.log(gen);
}
