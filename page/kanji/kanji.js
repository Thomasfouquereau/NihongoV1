document.addEventListener('DOMContentLoaded', function () {
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
            const lastId = kanjis[kanjis.length - 1].id;

            console.log(lastId);

            const lastIdSpan = document.querySelector('#last-id');
            if (lastIdSpan) {
                lastIdSpan.textContent = ` ${lastId}/2000`;
            }
            const lastIdSolo = document.querySelector('#last-id-solo');
            if (lastIdSolo) {
                lastIdSolo.textContent = ` ${lastId}`;
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
});