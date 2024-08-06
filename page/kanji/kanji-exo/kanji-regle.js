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

nbKanjiSelect10.addEventListener('click', function() {
    localStorage.setItem('Nb kanji', '10');
});

nbKanjiSelect20.addEventListener('click', function() {
    localStorage.setItem('Nb kanji', '20');
});

nbKanjiSelect30.addEventListener('click', function() {
    localStorage.setItem('Nb kanji', '30');
});

nbKanjiSelect40.addEventListener('click', function() {
    localStorage.setItem('Nb kanji', '40');
});

difficultBtnLvl1.addEventListener('click', function() {
    localStorage.setItem('Difficulté', '1');
});

difficultBtnLvl2.addEventListener('click', function() {
    localStorage.setItem('Difficulté', '2');
});

difficultBtnLvl3.addEventListener('click', function() {
    localStorage.setItem('Difficulté', '3');
});

mode1.addEventListener('click', function() {
    localStorage.setItem('Mode', '1');
});

mode2.addEventListener('click', function() {
    localStorage.setItem('Mode', '2');
});

mode3.addEventListener('click', function() {
    localStorage.setItem('Mode', '3');
});
