const nbKanjiSelect10 = document.getElementById('nb-kanji-select-10');
const nbKanjiSelect20 = document.getElementById('nb-kanji-select-20');
const nbKanjiSelect30 = document.getElementById('nb-kanji-select-30');
const nbKanjiSelect40 = document.getElementById('nb-kanji-select-40');

const difficultBtnLvl1 = document.getElementById('difficult-btn-lvl1');
const difficultBtnLvl2 = document.getElementById('difficult-btn-lvl2');
const difficultBtnLvl3 = document.getElementById('difficult-btn-lvl3');

const mode1 = document.getElementById('mode-1');
const mode2 = document.getElementById('mode-2');

const mode3 = document.getElementById('mode-3');

const play = document.getElementById('play');

nbKanjiSelect10.addEventListener('click', function () {
    localStorage.setItem('Nb kanji', '10');
});

nbKanjiSelect20.addEventListener('click', function () {
    localStorage.setItem('Nb kanji', '20');
});

nbKanjiSelect30.addEventListener('click', function () {
    localStorage.setItem('Nb kanji', '30');
});

nbKanjiSelect40.addEventListener('click', function () {
    localStorage.setItem('Nb kanji', '40');
});

difficultBtnLvl1.addEventListener('click', function () {
    localStorage.setItem('Difficulté', '1');
});

difficultBtnLvl2.addEventListener('click', function () {
    localStorage.setItem('Difficulté', '2');
});

difficultBtnLvl3.addEventListener('click', function () {
    localStorage.setItem('Difficulté', '3');
});

mode1.addEventListener('click', function () {
    localStorage.setItem('Mode', '1');

    const ChoisirCesKanji = document.getElementById('ChoisirCesKanji');
    ChoisirCesKanji.style.display = 'flex';
});

mode2.addEventListener('click', function () {
    localStorage.setItem('Mode', '2');
});

mode3.addEventListener('click', function () {
    localStorage.setItem('Mode', '3');
});

document.addEventListener('DOMContentLoaded', function () {
    const fermerButton = document.querySelector('.fermer');
    const popup = document.getElementById('ChoisirCesKanji');

    if (fermerButton && popup) {
        fermerButton.addEventListener('click', function () {
            popup.style.display = 'none';
        });
    } else {
        console.error('Element with ID "fermer" or "popup" not found.');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const dictionnaire = document.getElementById('dictionnaire');
    const viderButton = document.getElementById('vider');
    const kanjiChoisiDiv = document.getElementById('kanji-choisi');
    const nbKanjiDiv = document.querySelector('.nb-kanji-selec');

    if (!dictionnaire) {
        console.error('Element with ID "dictionnaire" not found.');
        return;
    }

    fetch('../../../data/kanji/liste kanji.json')
        .then(response => response.json())
        .then(data => {
            const kanjis = data.kanji;

            if (!Array.isArray(kanjis)) {
                throw new Error('Expected an array but got ' + typeof kanjis);
            }

            let htmlContent = '';
            kanjis.forEach(item => {
                htmlContent += `<button class="kanji-item">
                <div class="kanji-meaning">
                    <span class="kanji" translate="no">${item.Kanji}</span>
                </div>
                <span class="jlpt-level"><p>JLPT</p>${item.JLPTLevel}</span>
               </button>`;
            });
            dictionnaire.innerHTML = htmlContent;

            const kanjiItems = document.querySelectorAll('.kanji-item');
            const maxKanjiSelectable = localStorage.getItem('Nb kanji') || 10;
            let selectedKanjis = JSON.parse(localStorage.getItem('selectedKanjis')) || [];

            // Fonction pour afficher les kanjis sélectionnés
            function afficherKanjisSelectionnes() {
                kanjiChoisiDiv.innerHTML = selectedKanjis.map(k => `<span>${k.kanji}</span>`).join(' ');
            }

            // Fonction pour mettre à jour le nombre de kanjis sélectionnés
            function mettreAJourNbKanji() {
                const lastId = selectedKanjis.length > 0 ? selectedKanjis[selectedKanjis.length - 1].id : 0;
                nbKanjiDiv.textContent = `${selectedKanjis.length}/${maxKanjiSelectable}`;
            }

            // Appliquer la couleur de bordure et de police aux kanjis déjà sélectionnés
            kanjiItems.forEach(item => {
                const kanji = item.querySelector('.kanji').textContent;
                if (selectedKanjis.some(k => k.kanji === kanji)) {
                    item.style.borderColor = '#9EFF9E';
                    item.querySelector('.kanji').style.color = '#9EFF9E';
                }
            });

            kanjiItems.forEach((item, index) => {
                item.addEventListener('click', function () {
                    const kanji = item.querySelector('.kanji').textContent;

                    // Vérifier si le kanji est déjà sélectionné
                    const kanjiIndex = selectedKanjis.findIndex(k => k.kanji === kanji);
                    if (kanjiIndex !== -1) {
                        // Retirer le kanji de la liste
                        selectedKanjis.splice(kanjiIndex, 1);
                        localStorage.setItem('selectedKanjis', JSON.stringify(selectedKanjis));
                        item.style.borderColor = ''; // Réinitialiser la couleur de la bordure
                        item.querySelector('.kanji').style.color = ''; // Réinitialiser la couleur de la police
                        afficherKanjisSelectionnes();
                        mettreAJourNbKanji();
                        return;
                    }

                    if (selectedKanjis.length >= maxKanjiSelectable) {
                        alert('Vous avez atteint le nombre maximum de kanjis sélectionnables.');
                        return;
                    }

                    fetch('../../../data/kanji/liste kanji.json')
                        .then(response => response.json())
                        .then(data => {
                            const kanjiInfo = data.kanji.find(k => k.Kanji === kanji);

                            if (kanjiInfo) {
                                const meaning = kanjiInfo.Meaning;
                                const secondaryMeaning = kanjiInfo.SecondaryMeaning;

                                const newKanji = {
                                    id: selectedKanjis.length + 1,
                                    kanji: kanji,
                                    meaning: meaning,
                                    secondaryMeaning: secondaryMeaning
                                };

                                selectedKanjis.push(newKanji);
                                localStorage.setItem('selectedKanjis', JSON.stringify(selectedKanjis));
                                item.style.borderColor = '#9EFF9E'; // Changer la couleur de la bordure
                                item.querySelector('.kanji').style.color = '#9EFF9E'; // Changer la couleur de la police
                                afficherKanjisSelectionnes();
                                mettreAJourNbKanji();
                            } else {
                                console.error('Kanji non trouvé dans les données JSON.');
                            }
                        })
                        .catch(error => {
                            console.error('Erreur lors de la récupération des informations du kanji:', error);
                        });
                });
            });

            // Ajouter l'écouteur d'événement pour le bouton "Vider"
            viderButton.addEventListener('click', function () {
                selectedKanjis = [];
                localStorage.setItem('selectedKanjis', JSON.stringify(selectedKanjis));
                kanjiItems.forEach(button => {
                    button.style.borderColor = ''; // Réinitialiser la couleur de la bordure
                    button.querySelector('.kanji').style.color = ''; // Réinitialiser la couleur de la police
                });
                afficherKanjisSelectionnes();
                mettreAJourNbKanji();
                alert('La liste des kanjis sélectionnés a été vidée.');
            });

            // Afficher les kanjis sélectionnés et mettre à jour le nombre de kanjis au chargement initial
            afficherKanjisSelectionnes();
            mettreAJourNbKanji();
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
});