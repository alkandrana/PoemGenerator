// Created by Rosa Lee Myers, 06-02-2025
// library for generic I/O code


export function addEventHandlers(gen, linksList, titleEl, lengthEl, textEl) {
    for (let link of linksList) {
        link.onclick = (event) => {
            event.preventDefault();
            gen.getPoem(link.innerHTML)
                .then(result => {
                    const newPoem = result;
                    titleEl.innerHTML = `${newPoem.title}`;
                    lengthEl.innerHTML = `${newPoem.linecount} lines`;
                    printList(newPoem.lines, textEl);
                });
        };
    }
}

export function clearSearchResults(listEl, titleEl, lengthEl, poemEl){
    listEl.innerHTML = '';
    titleEl.innerHTML = '';
    lengthEl.innerHTML = '';
    poemEl.innerHTML = 'No results.';
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