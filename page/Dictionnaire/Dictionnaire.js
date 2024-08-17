document.addEventListener('DOMContentLoaded', function () {
    const dictionnaire = document.querySelector('.dictionnaire');
    const Recherche = document.querySelector('.recherche');
    const RechercheBar = document.querySelector('#rechercheInput');
    const Resultats = document.querySelector('.resultats');
    const RechercheContainer = document.querySelector('.recherche-container');
    let lastId = null;




    fetch('../../data/kanji/liste kanji.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Inspectez la structure de data

            // Accédez à la propriété correcte de l'objet JSON
            const kanjis = data.kanji;

            // Vérifiez si kanjis est un tableau
            if (!Array.isArray(kanjis)) {
                throw new Error('Expected an array but got ' + typeof kanjis);
            }

            // Récupérez le dernier id
            lastId = kanjis[kanjis.length - 1].id;

            // Affichez le dernier id dans un span
            const lastIdSpan = document.querySelector('#last-id');
            if (lastIdSpan) {
                lastIdSpan.textContent = ` ${lastId}/2000`;
            }



            // Traitez les données JSON ici
            let htmlContent = '';
            kanjis.forEach(item => {
                htmlContent += `<div class="kanji-item">
                <div class="kanji-meaning">
                    <span class="kanji" translate="no">${item.Kanji}</span>
                    <span class="meaning">${item.Meaning}</span>
                </div>
                    <span class="on-reading" translate="no"><p>On</p>${item.OnReading.join(', ')}</span>
                    <span class="kun-reading" translate="no"><p>Kun</p>${item.KunReading.join(', ')}</span>
                    <span class="jlpt-level"><p>JLPT</p>${item.JLPTLevel}</span>
                `;
                if (item.SecondaryMeaning) {
                    htmlContent += `<span class="secondary-meaning">${item.SecondaryMeaning}</span>`;
                }

                htmlContent += `</div>`;
            });
            dictionnaire.innerHTML = htmlContent;
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
});

const Recherche = document.querySelector('#recherche');
const RechercheBar = document.querySelector('#rechercheInput');
const Resultats = document.querySelector('.resultats');
const RechercheContainer = document.querySelector('.recherche-container');
const fermer = document.querySelector('.fermer');

Recherche.addEventListener('click', function () {
    if (RechercheContainer.style.display === 'flex') {
        RechercheContainer.style.display = 'none';
    } else {
        RechercheContainer.style.display = 'flex';
        RechercheBar.focus();
    }
});

fermer.addEventListener('click', function () {
    RechercheContainer.style.display = 'none';
});