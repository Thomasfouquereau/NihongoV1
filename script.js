// info deroulant infini
const content = document.getElementById('info-content');
content.innerText = 'Bienvenu sur la beta de NIHONGO (日本語) ! vous pouvez apprendre les kanji ici !';document.addEventListener('DOMContentLoaded', function () {
    // Sélectionner le premier enfant de l'élément avec l'ID 'menu'
    const menu = document.getElementById('menu');
    if (menu && menu.firstElementChild) {
        const firstChild = menu.firstElementChild;

        // Ajouter un écouteur d'événement 'click' à cet élément
        firstChild.addEventListener('click', function () {
            // Ajouter le type de kanji au local storage
            localStorage.setItem('type', 'Kanji');
        });
    } 
});