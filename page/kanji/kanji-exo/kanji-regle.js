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

    if (!nbKanjiSelect10 || !nbKanjiSelect20 || !nbKanjiSelect30 || !nbKanjiSelect40) {
        console.error('Un ou plusieurs éléments avec les identifiants nb-kanji-select-10, nb-kanji-select-20, nb-kanji-select-30, nb-kanji-select-40 sont introuvables.');
        return;
    }

    if (!difficultBtnLvl1 || !difficultBtnLvl2 || !difficultBtnLvl3) {
        console.error('Un ou plusieurs éléments avec les identifiants difficult-btn-lvl1, difficult-btn-lvl2, difficult-btn-lvl3 sont introuvables.');
        return;
    }

    if (!mode1 || !mode2 || !mode3) {
        console.error('Un ou plusieurs éléments avec les identifiants mode1, mode2, mode3 sont introuvables.');
        return;
    }

    const nbKanji = localStorage.getItem('Nb kanji');
    const difficulte = localStorage.getItem('Difficulté');
    const mode = localStorage.getItem('Mode');

    if (mode === '1') {
        mode1.style.backgroundColor = '#1E1E1E';
        mode2.style.backgroundColor = '';
        mode3.style.backgroundColor = '';
    } else if (mode === '2') {
        mode1.style.backgroundColor = '';
        mode2.style.backgroundColor = '#1E1E1E';
        mode3.style.backgroundColor = '';
    } else if (mode === '3') {
        mode1.style.backgroundColor = '';
        mode2.style.backgroundColor = '';
        mode3.style.backgroundColor = '#1E1E1E';
    } else {
        // Réinitialiser les styles si aucune correspondance
        mode1.style.backgroundColor = '';
        mode2.style.backgroundColor = '';
        mode3.style.backgroundColor = '';
    }

    if (nbKanji === '10') {
        nbKanjiSelect10.style.backgroundColor = '#1E1E1E';
        nbKanjiSelect20.style.backgroundColor = '';
        nbKanjiSelect30.style.backgroundColor = '';
        nbKanjiSelect40.style.backgroundColor = '';
    } else if (nbKanji === '20') {
        nbKanjiSelect10.style.backgroundColor = '';
        nbKanjiSelect20.style.backgroundColor = '#1E1E1E';
        nbKanjiSelect30.style.backgroundColor = '';
        nbKanjiSelect40.style.backgroundColor = '';
    } else if (nbKanji === '30') {
        nbKanjiSelect10.style.backgroundColor = '';
        nbKanjiSelect20.style.backgroundColor = '';
        nbKanjiSelect30.style.backgroundColor = '#1E1E1E';
        nbKanjiSelect40.style.backgroundColor = '';
    } else if (nbKanji === '40') {
        nbKanjiSelect10.style.backgroundColor = '';
        nbKanjiSelect20.style.backgroundColor = '';
        nbKanjiSelect30.style.backgroundColor = '';
        nbKanjiSelect40.style.backgroundColor = '#1E1E1E';
    } else {
        // Réinitialiser les styles si aucune correspondance
        nbKanjiSelect10.style.backgroundColor = '';
        nbKanjiSelect20.style.backgroundColor = '';
        nbKanjiSelect30.style.backgroundColor = '';
        nbKanjiSelect40.style.backgroundColor = '';
    }

    if (difficulte === '1') {
        difficultBtnLvl1.style.backgroundColor = '#1E1E1E';
        difficultBtnLvl2.style.backgroundColor = '';
        difficultBtnLvl3.style.backgroundColor = '';
    } else if (difficulte === '2') {
        difficultBtnLvl1.style.backgroundColor = '';
        difficultBtnLvl2.style.backgroundColor = '#1E1E1E';
        difficultBtnLvl3.style.backgroundColor = '';
    } else if (difficulte === '3') {
        difficultBtnLvl1.style.backgroundColor = '';
        difficultBtnLvl2.style.backgroundColor = '';
        difficultBtnLvl3.style.backgroundColor = '#1E1E1E';
    } else {
        // Réinitialiser les styles si aucune correspondance
        difficultBtnLvl1.style.backgroundColor = '';
        difficultBtnLvl2.style.backgroundColor = '';
        difficultBtnLvl3.style.backgroundColor = '';
    }
});

const nbKanjiSelectors = [nbKanjiSelect10, nbKanjiSelect20, nbKanjiSelect30, nbKanjiSelect40]; // Ajoutez d'autres éléments si nécessaire

nbKanjiSelectors.forEach(selector => {
    selector.addEventListener('click', () => {
        nbKanjiSelectors.forEach(sel => sel.style.backgroundColor = ''); // Réinitialise la couleur de tous les éléments
        selector.style.backgroundColor = '#1E1E1E'; // Changez la couleur selon vos besoins
    });
});

const difficultySelectors = [difficultBtnLvl1, difficultBtnLvl2, difficultBtnLvl3]; // Ajoutez d'autres éléments si nécessaire

difficultySelectors.forEach(selector => {
    selector.addEventListener('click', () => {
        difficultySelectors.forEach(sel => sel.style.backgroundColor = ''); // Réinitialise la couleur de tous les éléments
        selector.style.backgroundColor = '#1E1E1E'; // Changez la couleur selon vos besoins
    });
});

const modeSelectors = [mode1, mode2, mode3]; // Ajoutez d'autres éléments si nécessaire

modeSelectors.forEach(selector => {
    selector.addEventListener('click', () => {
        modeSelectors.forEach(sel => sel.style.backgroundColor = ''); // Réinitialise la couleur de tous les éléments
        selector.style.backgroundColor = '#1E1E1E'; // Changez la couleur selon vos besoins
    });
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
                    <div class="PrincipalReadingContainer">
                        <span class="PrincipalReading">${item.OnPrincipalReading}</span>
                        <span class="PrincipalReading">${item.KunPrincipalReading}</span>
                    </div>
                    <span class="kanji" translate="no">${item.Kanji}</span>
                    <div class="PrincipalReadingRomajiContainer">
                        <span class="PrincipalReadingRomaji">${item.OnPrincipalReadingRomaji}</span>
                        <span class="PrincipalReadingRomaji">${item.KunPrincipalReadingRomaji}</span>
                    </div>
                </div>
                <span class="jlpt-level"><p>JLPT</p>${item.JLPTLevel}</span>
               </button>`;
            });
            dictionnaire.innerHTML = htmlContent;

            const kanjiItems = document.querySelectorAll('.kanji-item');

            let selectedKanjis = JSON.parse(localStorage.getItem('selectedKanjis')) || [];

            // Fonction pour afficher les kanjis sélectionnés
            function afficherKanjisSelectionnes() {
                kanjiChoisiDiv.innerHTML = selectedKanjis.map(k => `<span>${k.kanji}</span>`).join(' ');
            }

            // Fonction pour mettre à jour le nombre de kanjis sélectionnés
           // Fonction pour mettre à jour le nombre de kanjis sélectionnés
function mettreAJourNbKanji() {
    const maxKanjiSelectable = localStorage.getItem('Nb kanji') || 10;
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
        const maxKanjiSelectable = localStorage.getItem('Nb kanji') || 10;
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
                        secondaryMeaning: secondaryMeaning,
                        OnPrincipalReading: kanjiInfo.OnPrincipalReading,
                        KunPrincipalReading: kanjiInfo.KunPrincipalReading,
                    };

                    selectedKanjis.push(newKanji);
                    localStorage.setItem('selectedKanjis', JSON.stringify(selectedKanjis));
                    item.style.borderColor = '#9EFF9E'; // Appliquer la couleur de la bordure
                    item.querySelector('.kanji').style.color = '#9EFF9E'; // Appliquer la couleur de la police
                    afficherKanjisSelectionnes();
                    mettreAJourNbKanji();
                }
            });
    });
});

// Initialiser le nombre de kanjis sélectionnés au chargement de la page
mettreAJourNbKanji();

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


function playGame() {
    const difficulte = localStorage.getItem('Difficulté');
    const mode = localStorage.getItem('Mode');
    const selectedKanjis = JSON.parse(localStorage.getItem('selectedKanjis'));
    const NbKanji = localStorage.getItem('Nb kanji');

    if ( NbKanji === "0") {
        alert('Veuillez sélectionner Nombre de Kanji dans l exercice.');
        console.log('Veuillez sélectionner Nombre de Kanji dans l exercice.');
        return;
    } if (difficulte === '0') {
        alert('Veuillez sélectionner la difficulté dans l exercice.');
        console.log('Veuillez sélectionner la difficulté dans l exercice.');
        return;
    } if (mode === '0') {
        alert('Veuillez sélectionner le mode dans l exercice.');
        console.log('Veuillez sélectionner le mode dans l exercice.');
        return;
    } if (NbKanji === '10' && selectedKanjis.length < 10) {
        alert('Veuillez sélectionner 10 kanjis.');
        console.log('Veuillez sélectionner 10 kanjis.');
        return;
    } if (NbKanji === '20' && selectedKanjis.length < 20) {
        alert('Veuillez sélectionner 20 kanjis.');
        console.log('Veuillez sélectionner 20 kanjis.');
        return;
    } if (NbKanji === '30' && selectedKanjis.length < 30) {
        alert('Veuillez sélectionner 30 kanjis.');
        console.log('Veuillez sélectionner 30 kanjis.');
        return;
    } if (NbKanji === '40' && selectedKanjis.length < 40) {
        alert('Veuillez sélectionner 40 kanjis.');
        console.log('Veuillez sélectionner 40 kanjis.');
        return;
    } else {
        window.location.href = `../../exercice/exercice.html`;
    }

}

document.addEventListener('DOMContentLoaded', (event) => {
    const playButton = document.getElementById('play');
    if (playButton) {
        playButton.addEventListener('click', playGame);
    } else {
        console.error("L'élément avec l'ID 'play' n'existe pas.");
    }
});

