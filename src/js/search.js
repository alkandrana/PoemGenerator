import '../css/styles.css';

class Search {
    apiUrl = 'https://poetrydb.org/';
    searchResults = [];
    poem = null;


    titleSearch(title){
        return fetch(`${this.apiUrl}title/${title}`)
            .then(response => response.json())
            .then(data => {
                const searchResults = [];
                for (let poem of data) {
                    searchResults.push(poem.title);
                }
                console.log(this.searchResults);
                this.searchResults = searchResults;
            })
            .catch(error => console.log(error));
    }
}

window.onload = () => {
    const search = new Search();
    const searchBtn = document.getElementById('newPoem');
    const input = document.getElementById('key');
    searchBtn.addEventListener('click', () => {
        search.titleSearch(input.value).then( () => {
            for (let title of search.searchResults) {
                document.getElementById('poem-list').innerHTML +=
                    `<a href="${search.apiUrl}title/${title}">${title}</a>`;
            }
        });

    });
}