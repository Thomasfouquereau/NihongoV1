function initExercice() {
    document.addEventListener('DOMContentLoaded', function () {
        const mode = localStorage.getItem('Mode');


        function getRandomNumber(max) {
            return Math.floor(Math.random() * max) + 1;
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


        const questionFurigana = document.querySelector('.question-furigana');
        const questionRomaji = document.querySelector('.question-romaji');
        console.log(localStorage.getItem('Difficulté'));

        if (localStorage.getItem('Difficulté') === '1') {
            questionRomaji.style.display = 'flex';
            questionFurigana.style.display = 'flex';
        } else if (localStorage.getItem('Difficulté') === '2') {
            questionRomaji.style.display = 'none';
            questionFurigana.style.display = 'flex';
        } else if (localStorage.getItem('Difficulté') === '3') {
            questionRomaji.style.display = 'none';
            questionFurigana.style.display = 'none';
        }


        if (mode === '1') {
            // Code pour le mode 1
            const headerMenuKanjiDiv = document.querySelector('.header-nenu-kanji');
            const reponseTrueDiv = document.querySelector('.header-nenu-reponse-true');
            const reponseFalseDiv = document.querySelector('.header-nenu-reponse-false');
            const finDiv = document.querySelector('.fin');
            const nextButton = document.querySelector('.next');
            const questionNumberDiv = document.querySelector('.header-nenu-reponse-nb');

            if (headerMenuKanjiDiv && reponseTrueDiv && reponseFalseDiv && finDiv && nextButton && questionNumberDiv) {
                const NbKanji = parseInt(localStorage.getItem('Nb kanji'), 10);
                const kanjiData = exerciceMode1();
                const randomKanjiList = generateUniqueRandomNumbers(NbKanji).map(id => kanjiData.find(kanji => kanji.id === id));

                headerMenuKanjiDiv.innerHTML = randomKanjiList.map(kanji => `<span class="span">${kanji.kanji}</span>`).join(' ');


                let currentKanjiIndex = 0;
                displayCurrentKanji(randomKanjiList[currentKanjiIndex]);
                updateQuestionNumber(currentKanjiIndex, randomKanjiList.length);

                nextButton.addEventListener('click', function () {
                    if (currentKanjiIndex < randomKanjiList.length - 1) {
                        currentKanjiIndex++;
                        displayCurrentKanji(randomKanjiList[currentKanjiIndex]);
                        updateQuestionNumber(currentKanjiIndex, randomKanjiList.length);
                    } else {
                        finDiv.querySelector('.header-nenu-reponse-true-fin').textContent = reponseTrueDiv.textContent;
                        finDiv.querySelector('.header-nenu-reponse-false-fin').textContent = reponseFalseDiv.textContent;
                        finDiv.querySelector('.header-nenu-reponse-nb-fin').textContent = randomKanjiList.length;
                        finDiv.querySelector('.header-nenu-kanji-fin').innerHTML = headerMenuKanjiDiv.innerHTML;
                        finDiv.style.display = 'flex';
                    }
                });
            } else {
                console.error('One or more required elements not found.');
            }

            function updateQuestionNumber(currentIndex, totalQuestions) {
                questionNumberDiv.textContent = ` ${currentIndex + 1} / ${totalQuestions}`;
            }

            function exerciceMode1() {
                const selectedKanjis = JSON.parse(localStorage.getItem('selectedKanjis'));
                return selectedKanjis.map(kanji => ({
                    id: kanji.id,
                    kanji: kanji.kanji,
                    meaning: kanji.meaning,
                    secondaryMeaning: kanji.secondaryMeaning,
                    PrincipalReading: kanji.PrincipalReading,
                    PrincipalReadingRomaji: kanji.PrincipalReadingRomaji
                }));
            }

            function generateUniqueRandomNumbers(NbKanji) {
                const randomNumbers = new Set();
                while (randomNumbers.size < NbKanji) {
                    randomNumbers.add(getRandomNumber(NbKanji));
                }
                return Array.from(randomNumbers);
            }

            function displayCurrentKanji(currentKanji) {
                const questionKanjiDiv = document.querySelector('.question-kanji');
                const questionFurigana = document.querySelector('.question-furigana');
                const questionRomaji = document.querySelector('.question-romaji');

                questionKanjiDiv.innerHTML = currentKanji.kanji;
                questionFurigana.innerHTML = currentKanji.PrincipalReading;
                questionRomaji.innerHTML = currentKanji.PrincipalReadingRomaji;


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
                            const kanji = document.querySelector('.question-kanji');

                            if (this.textContent === correctAnswer) {
                                this.style.borderColor = '#9EFF9E';
                                this.classList.add('jello-horizontal');
                                trueCounter.textContent = parseInt(trueCounter.textContent || '0', 10) + 1;
                                kanji.style.color = '#9EFF9E';
                                setTimeout(() => {
                                    kanji.style.color = '#F7F7F2';
                                }, 2000);
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
                                        btn.classList.add('shake-bottom');
                                        kanji.style.color = '#FF9E9E';
                                        setTimeout(() => {
                                            kanji.style.color = '#F7F7F2';
                                        }, 2000);
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
                            }, 2000);
                        });
                    });
                }
            }

            function shuffleArray(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
            }

        } if (mode === '2' || mode === '3') {

            function getRandomKanji(data) {
                const NbKanji = parseInt(localStorage.getItem('Nb kanji'), 10);
                const kanjis = data.kanji;
                const lastId = kanjis[kanjis.length - 1].id;

                const randomNumbers = new Set();
                while (randomNumbers.size < NbKanji) {
                    randomNumbers.add(getRandomNumber(lastId));
                }

                const randomKanjis = Array.from(randomNumbers).map(id => kanjis.find(kanji => kanji.id === id));
                return randomKanjis;
            }

            fetch('../../data/kanji/liste kanji.json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    const headerMenuKanjiDiv = document.querySelector('.header-nenu-kanji');
                    const finDiv = document.querySelector('.fin');
                    const questionNumberDiv = document.querySelector('.header-nenu-reponse-nb');
                    const questionKanjiDiv = document.querySelector('.question-kanji');
                    const questionFurigana = document.querySelector('.question-furigana');
                    const questionRomaji = document.querySelector('.question-romaji');
                    const reponseDiv = document.querySelector('.reponse');
                    const kanjis = data.kanji;


                    if (!Array.isArray(kanjis)) {
                        throw new Error('Expected an array but got ' + typeof kanjis);
                    }

                    let currentQuestionIndex = 0;
                    const randomKanjis = getRandomKanji(data);

                    // Générer le contenu HTML en vérifiant que chaque objet a bien une propriété Kanji
                    headerMenuKanjiDiv.innerHTML = randomKanjis.map(kanji => {
                        if (kanji && kanji.Kanji) {
                            return `<span class="span">${kanji.Kanji}</span>`;
                        } else {
                            return `<span class="span">undefined</span>`;
                        }
                    }).join(' ');

                    function displayQuestion() {
                        const currentKanji = randomKanjis[currentQuestionIndex];

                        questionKanjiDiv.innerHTML = `<span class="span">${currentKanji.Kanji}</span>`;
                        questionFurigana.innerHTML = `<span class="span">${currentKanji.PrincipalReading}</span>`;
                        questionRomaji.innerHTML = `<span class="span">${currentKanji.PrincipalReadingRomaji}</span>`;

                        const answers = [currentKanji.Meaning];
                        while (answers.length < 3) {
                            const randomKanji = kanjis[Math.floor(Math.random() * kanjis.length)];
                            if (!answers.includes(randomKanji.Meaning)) {
                                answers.push(randomKanji.Meaning);
                            }
                        }

                        answers.sort(() => Math.random() - 0.5);

                        reponseDiv.innerHTML = answers.map(answer => {
                            return `<button class="answer-button">${answer}</button>`;
                        }).join(' ');

                        // Mettre à jour le numéro de la question
                        questionNumberDiv.innerHTML = ` ${currentQuestionIndex + 1} / ${randomKanjis.length}`;

                        document.querySelectorAll('.answer-button').forEach(button => {
                            const trueCounter = document.querySelector('.header-nenu-reponse-true');
                            const falseCounter = document.querySelector('.header-nenu-reponse-false');
                            button.addEventListener('click', () => {
                                if (button.textContent === currentKanji.Meaning) {
                                    button.style.borderColor = '#9EFF9E';
                                    button.classList.add('jello-horizontal');
                                    trueCounter.textContent = parseInt(trueCounter.textContent || '0', 10) + 1;
                                    questionKanjiDiv.style.color = '#9EFF9E';
                                    setTimeout(() => {
                                        questionKanjiDiv.style.color = '#F7F7F2';
                                    }, 2000);
                                } else {
                                    falseCounter.textContent = parseInt(falseCounter.textContent || '0', 10) + 1;
                                    button.style.borderColor = '#FF9E9E';
                                    questionKanjiDiv.style.color = '#FF9E9E';
                                    setTimeout(() => {
                                        questionKanjiDiv.style.color = '#F7F7F2';
                                    }, 2000);
                                }

                                // Afficher la bonne réponse en vert
                                document.querySelectorAll('.answer-button').forEach(btn => {
                                    if (btn.textContent === currentKanji.Meaning) {
                                        btn.style.borderColor = '#9EFF9E';
                                    }
                                });

                                setTimeout(() => {
                                    currentQuestionIndex++;
                                    if (currentQuestionIndex < randomKanjis.length) {
                                        displayQuestion();
                                    } else {
                                        finDiv.style.display = 'flex';
                                    }
                                }, 2000);
                            });
                        });
                    }

                    displayQuestion();
                })
                .catch(error => {
                    console.error('Error:', error);
                });

        }
    });
}



initExercice();

