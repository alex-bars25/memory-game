const emojis = ['🚀', '🔥', '🎉', '💻', '🌐', '💾', '🔍', '🧠'];
const pairs = [...emojis, ...emojis].sort(() => Math.random() - 0.5);

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
const moves = document.createElement('p');
const matches = document.createElement('p');
const movesCount = document.createElement('span');
movesCount.textContent = '0';
const matchesCount = document.createElement('span');
matchesCount.textContent = '0';
moves.append('Число ходов: ', movesCount);
matches.append('Совпадения: ', matchesCount);
score.append(moves, matches);

const cards = document.createElement('div');
cards.className = 'cards';
pairs.forEach(item => {
  const card = document.createElement('div');
  card.className = 'card';
  const emoji = document.createElement('span');
  card.append(emoji);
  emoji.textContent = item;
  cards.append(card); 
})

//modal
const modal = document.createElement('dialog');
modal.className = 'modal';

const message = document.createElement('div');
message.className = 'message';
const noResultMsg = document.createElement('p');
noResultMsg.textContent = 'Пока нет результатов';
const winMsg = document.createElement('p');
winMsg.textContent = 'Вы победили! 🎉 \n Число ходов: 10'
message.append(winMsg);

const table = document.createElement('table');
const thead = document.createElement('thead');
const tbody = document.createElement('tbody');
const headRow = thead.insertRow();
const headers = ['Место', 'Дата', 'Число ходов'];
headers.forEach(item => {
  const cell = document.createElement('th');
  cell.textContent = item;
  headRow.append(cell);
});
const results = [['06.10.2026', '10'], ['06.10.2026', '10'], ['06.10.2026', '10'], ['06.10.2026', '10'], ['06.10.2026', '10']]
results.forEach((item, index) => {
  const row = tbody.insertRow();
  const cell1 = document.createElement('td');
  cell1.textContent = index + 1;
  const cell2 = document.createElement('td');
  cell2.textContent = item[0];
  const cell3 = document.createElement('td');
  cell3.textContent = item[1];
  row.append(cell1, cell2, cell3);
  tbody.append(row);
});

table.append(thead, tbody);

const modalBtns = document.createElement('div');
modalBtns.className = 'modal-buttons';
const newGameBtn2 = newGameBtn.cloneNode('deep');
const closeBtn = document.createElement('button');
closeBtn.textContent = 'Закрыть';
modalBtns.append(newGameBtn2, closeBtn);
modal.append(table, modalBtns);

main.append(title, score, cards);
header.after(main, modal);

leadersBtn.addEventListener('click', () => {
  modal.showModal();
});

closeBtn.addEventListener('click', () => {
  modal.close();
});
