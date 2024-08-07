document.addEventListener('DOMContentLoaded', function () {
    const headerMenuKanjiDiv = document.querySelector('.header-nenu-kanji');
    const reponseTrueDiv = document.querySelector('.header-nenu-reponse-true');
    const reponseFalseDiv = document.querySelector('.header-nenu-reponse-false');
    const finDiv = document.querySelector('.fin');
    const nextButton = document.querySelector('.next');
    const questionNumberDiv = document.querySelector('.header-nenu-reponse-nb'); // Nouvelle div pour afficher le numéro de la question

    if (headerMenuKanjiDiv && reponseTrueDiv && reponseFalseDiv && finDiv && nextButton && questionNumberDiv) {
        const NbKanji = parseInt(localStorage.getItem('Nb kanji'), 10); // Récupérer le nombre de kanji
        const kanjiData = exerciceMode1(); // Récupérer les données des kanji
        const randomKanjiList = generateUniqueRandomNumbers(NbKanji).map(id => kanjiData.find(kanji => kanji.id === id));

        // Afficher la liste des kanji dans la div
        headerMenuKanjiDiv.innerHTML = randomKanjiList.map(kanji => `<span class="span">${kanji.kanji}</span>`).join(' ');

        // Initialiser le premier kanji
        let currentKanjiIndex = 0;
        displayCurrentKanji(randomKanjiList[currentKanjiIndex]);
        updateQuestionNumber(currentKanjiIndex, randomKanjiList.length); // Mettre à jour le numéro de la question

        // Ajouter un écouteur d'événement au bouton avec la classe 'valide-button'
        // const valideButton = document.querySelector('.valide-button');
        // if (valideButton) {
        //     valideButton.addEventListener('click', function () {
        //         const NbKanji = parseInt(localStorage.getItem('Nb kanji'), 10); // Récupérer la valeur réelle de NbKanji
        //         const randomNumbers = generateUniqueRandomNumbers(NbKanji);
        //         const kanjiData = exerciceMode1();
        //         const selectedKanjis = randomNumbers.map(id => kanjiData.find(kanji => kanji.id === id));
        //         currentKanjiIndex = 0;
        //         displayCurrentKanji(selectedKanjis[currentKanjiIndex]);
        //         updateQuestionNumber(currentKanjiIndex, selectedKanjis.length); // Mettre à jour le numéro de la question

        //         // Afficher la liste des kanji dans l'ordre dans la div
        //         headerMenuKanjiDiv.innerHTML = selectedKanjis.map(kanji => `<span>${kanji.kanji}</span>`).join(' ');
        //     });
        // } else {
        //     console.error('Button with class "valide-button" not found.');
        // }

        nextButton.addEventListener('click', function () {
            if (currentKanjiIndex < randomKanjiList.length - 1) {
                currentKanjiIndex++;
                displayCurrentKanji(randomKanjiList[currentKanjiIndex]);
                updateQuestionNumber(currentKanjiIndex, randomKanjiList.length); // Mettre à jour le numéro de la question
            } else {
                // Mettre à jour les réponses dans la <div class="fin">
                finDiv.querySelector('.header-nenu-reponse-true-fin').textContent = reponseTrueDiv.textContent;
                finDiv.querySelector('.header-nenu-reponse-false-fin').textContent = reponseFalseDiv.textContent;
                finDiv.querySelector('.header-nenu-reponse-nb-fin').textContent = randomKanjiList.length;

                // Mettre à jour le contenu de .header-nenu-kanji
                finDiv.querySelector('.header-nenu-kanji-fin').innerHTML = headerMenuKanjiDiv.innerHTML;

                // Rendre visible l'élément <div class="fin">
                finDiv.style.display = 'flex';
            }
        });
    } else {
        console.error('One or more required elements not found.');
    }

    function updateQuestionNumber(currentIndex, totalQuestions) {
        questionNumberDiv.textContent = ` ${currentIndex + 1} / ${totalQuestions}`;
    }
});

function exerciceMode1() {
    const selectedKanjis = JSON.parse(localStorage.getItem('selectedKanjis'));
    const extractedData = selectedKanjis.map(kanji => ({
        id: kanji.id,
        kanji: kanji.kanji,
        meaning: kanji.meaning,
        secondaryMeaning: kanji.secondaryMeaning
    }));
    return extractedData;
}

function generateUniqueRandomNumbers(NbKanji) {
    const randomNumbers = new Set();
    while (randomNumbers.size < NbKanji) {
        randomNumbers.add(getRandomNumber(NbKanji));
    }
    return Array.from(randomNumbers);
}

function getRandomNumber(max) {
    return Math.floor(Math.random() * max) + 1;
}

function displayCurrentKanji(currentKanji) {
    const questionKanjiDiv = document.querySelector('.question-kanji');
    if (questionKanjiDiv) {
        questionKanjiDiv.innerHTML = currentKanji.kanji;
    }

    const reponseDiv = document.querySelector('.reponse');
    if (reponseDiv) {
        const correctAnswer = currentKanji.meaning;
        const falseAnswers = generateFalseAnswers(exerciceMode1(), correctAnswer);
        const allAnswers = shuffleArray([correctAnswer, ...falseAnswers]);
        console.log(allAnswers);

        reponseDiv.innerHTML = allAnswers.map(answer => `<button class="answer-button">${answer}</button>`).join(' ');

        let questionNbNow = 0;
        const totalQuestions = 10;

        document.querySelectorAll('.answer-button').forEach(button => {
            button.addEventListener('click', function () {
                const trueCounter = document.querySelector('.header-nenu-reponse-true');
                const falseCounter = document.querySelector('.header-nenu-reponse-false');

                if (this.textContent === correctAnswer) {
                    this.style.borderColor = '#9EFF9E';
                    this.classList.add('jello-horizontal');  // Correction ici
                    trueCounter.textContent = parseInt(trueCounter.textContent || '0', 10) + 1;

                    const kanjiElement = document.querySelector(`.header-nenu-kanji span[data-kanji="${correctAnswer}"]`);
                    if (kanjiElement) {
                        kanjiElement.classList.add('correct-answer');
                    }
                } else {
                    this.style.borderColor = '#FF9E9E';
                    falseCounter.textContent = parseInt(falseCounter.textContent || '0', 10) + 1;

                    const kanjiElement = document.querySelector(`.header-nenu-kanji span[data-kanji="${correctAnswer}"]`);
                    if (kanjiElement) {
                        kanjiElement.classList.add('incorrect-answer');
                    }

                    document.querySelectorAll('.answer-button').forEach(btn => {
                        if (btn.textContent === correctAnswer) {
                            btn.style.borderColor = '#9EFF9E';
                            btn.classList.add('shake-bottom'); // Correction ici
                        }
                    });
                }

                document.querySelectorAll('.answer-button').forEach(btn => {
                    btn.disabled = true;
                });

                setTimeout(() => {
                    questionNbNow++;
                    console.log(`Question actuelle: ${questionNbNow}`);

                    if (questionNbNow < totalQuestions) {
                        const nextButton = document.querySelector('.next');
                        if (nextButton) {
                            nextButton.click();
                        }
                    } else {
                        const finDiv = document.querySelector('.fin');
                        if (finDiv) {
                            finDiv.querySelector('.header-nenu-reponse-true').textContent = trueCounter.textContent;
                            finDiv.querySelector('.header-nenu-reponse-false').textContent = falseCounter.textContent;
                            finDiv.querySelector('.header-nenu-reponse-nb').textContent = totalQuestions;

                            const headerMenuKanjiDiv = document.querySelector('.header-nenu-kanji');
                            if (headerMenuKanjiDiv) {
                                finDiv.querySelector('.header-nenu-kanji').innerHTML = headerMenuKanjiDiv.innerHTML;
                            }

                            finDiv.style.display = 'flex';
                        }
                    }
                }, 1000);
            });
        });
    }
}

function generateFalseAnswers(kanjiData, correctAnswer) {
    const falseAnswers = [];
    while (falseAnswers.length < 2) {
        const randomKanji = kanjiData[Math.floor(Math.random() * kanjiData.length)];
        if (randomKanji.meaning !== correctAnswer && !falseAnswers.includes(randomKanji.meaning)) {
            falseAnswers.push(randomKanji.meaning);
        }
    }
    return falseAnswers;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
