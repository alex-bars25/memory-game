const emojis = ['🚀', '🔥', '🎉', '💻', '🌐', '💾', '🔍', '🧠'];
function shuffle(emojis) {
  return [...emojis, ...emojis].sort(() => Math.random() - 0.5);
}

//header
const header = document.createElement('header');

const newGameBtn = document.createElement('button');
newGameBtn.textContent = 'Новая игра';

const leadersBtn = document.createElement('button');
leadersBtn.textContent = 'Таблица лидеров';

header.append(newGameBtn, leadersBtn);
document.body.prepend(header);

//main
const main = document.createElement('main');

const title = document.createElement('h1');
title.textContent = 'Memory game';

const score = document.createElement('div');
score.className = 'score';
const movesContainer = document.createElement('p');
const matchesContainer = document.createElement('p');
const movesCount = document.createElement('span');
movesCount.textContent = '0';
const matchesCount = document.createElement('span');
matchesCount.textContent = '0';
movesContainer.append('Число ходов: ', movesCount);
matchesContainer.append('Совпадения: ', matchesCount, '/8');
score.append(movesContainer, matchesContainer);

const cards = document.createElement('div');
cards.className = 'cards';
function drawCards(emojis) {
  cards.textContent = '';
  emojis.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    const emoji = document.createElement('span');
    card.append(emoji);
    emoji.textContent = item;
    cards.append(card); 
  });
}
drawCards(shuffle(emojis));

//modal
const modal = document.createElement('dialog');
modal.className = 'modal';

const message = document.createElement('div');
message.className = 'message';
const content = document.createElement('p');
content.className = 'content';

function drawNoResultMsg() {
  content.textContent = 'Пока нет результатов';
  message.append(content);
  return message;
}

function drawWinMsg(count) {
  content.textContent = '';
  const title = document.createElement('p');
  title.textContent = 'Вы победили! 🎉🎉🎉';
  const counter = document.createElement('p');
  counter.textContent = `Число ходов: ${count}`;
  content.append(title, counter);
  message.append(content);
  return message;
}

function getResults() {
  const results = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    results.push([key, value]);
  }
  return results.sort().sort((a, b) => a[1] - b[1]).slice(0, 10);
}

function drawTable(results) {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');
  const headRow = thead.insertRow();
  const headers = ['Место', 'Число ходов', 'Дата'];
  headers.forEach(item => {
    const cell = document.createElement('th');
    cell.textContent = item;
    headRow.append(cell);
  });
  results.forEach((item, index) => {
    const row = tbody.insertRow();
    const cell1 = document.createElement('td');
    cell1.textContent = index + 1;
    const cell2 = document.createElement('td');
    cell2.textContent = item[1];
    const cell3 = document.createElement('td');
    cell3.textContent = item[0];
    row.append(cell1, cell2, cell3);
    tbody.append(row);
  });
  table.append(thead, tbody);
  return table;
}

const modalBtns = document.createElement('div');
modalBtns.className = 'modal-buttons';
const newGameBtn2 = newGameBtn.cloneNode('deep');
const closeBtn = document.createElement('button');
closeBtn.textContent = 'Закрыть';
modalBtns.append(newGameBtn2, closeBtn);

function drawModal(content) {
  modal.replaceChildren(content, modalBtns);
}

main.append(title, score, cards);
header.after(main, modal);

//game
let lock = false;
let currentCard = null;
let currentEmoji = null;
let moves = 0;
let matches = 0;

function openCard(e) {
  if (lock) return;
  const card = e.target.closest('div');
  if (card.classList.contains('card')) {
    let emoji = card.querySelector('span').textContent;    
    if (!currentEmoji) {
      card.classList.add('open');
      currentCard = card;
      currentEmoji = emoji;
    } else {
      if (emoji == currentEmoji) {
        lock = true;
        card.classList.add('open');
        moves++;
        matches++;
        movesCount.textContent = moves;
        matchesCount.textContent = matches;
        if (matches == 8) {
          drawModal(drawWinMsg(moves));
          modal.showModal();
          localStorage.setItem(new Date().toLocaleString('ru-RU'), moves);
        }
        reset();
      } else {
        lock = true;
        card.classList.add('open');
        moves++;
        movesCount.textContent = moves;
        setTimeout(() => {
          card.classList.remove('open');
          currentCard.classList.remove('open');
          reset();
        }, 1000);
      }
    }
  }
}

function reset() {
  lock = false;
  currentCard = null;
  currentEmoji = null;
}

cards.addEventListener('click', (e) => openCard(e));

//buttons
leadersBtn.addEventListener('click', () => {
  if (localStorage.length > 0) {
    drawModal(drawTable(getResults()));
  } else {
    drawModal(drawNoResultMsg());
  }
  modal.showModal();
});

closeBtn.addEventListener('click', () => {
  modal.close();
});

function startNewGame() {
  lock = false;
  currentCard = null;
  currentEmoji = null;
  moves = 0;
  matches = 0;
  movesCount.textContent = moves;
  matchesCount.textContent = matches;
  drawCards(shuffle(emojis));
}

newGameBtn.addEventListener('click', () => {
  startNewGame();
});

newGameBtn2.addEventListener('click', () => {
  modal.close();
  startNewGame();
});
