const puzzle = [
  [5, 3, '', '', 7, '', '', '', ''],
  [6, '', '', 1, 9, 5, '', '', ''],
  ['', 9, 8, '', '', '', '', 6, ''],
  [8, '', '', '', 6, '', '', '', 3],
  [4, '', '', 8, '', 3, '', '', 1],
  [7, '', '', '', 2, '', '', '', 6],
  ['', 6, '', '', '', '', 2, 8, ''],
  ['', '', '', 4, 1, 9, '', '', 5],
  ['', '', '', '', 8, '', '', 7, 9]
];

function createBoard() {
  const board = document.getElementById('sudoku-board');
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const input = document.createElement('input');
      input.type = 'text';
      input.maxLength = 1;
      input.dataset.row = row;
      input.dataset.col = col;

      const value = puzzle[row][col];
      if (value !== '') {
        input.value = value;
        input.disabled = true;
        input.classList.add('prefilled');
      }

      board.appendChild(input);
    }
  }
}

function checkSudoku() {
  const inputs = document.querySelectorAll('#sudoku-board input');
  let valid = true;

  // Reset invalid states
  inputs.forEach(i => i.classList.remove('invalid'));

  const board = Array.from({ length: 9 }, () => Array(9).fill(''));

  inputs.forEach(input => {
    const row = input.dataset.row;
    const col = input.dataset.col;
    board[row][col] = input.value;
  });

  // Validate rows, columns, and boxes
  for (let i = 0; i < 9; i++) {
    if (!isValid(getRow(board, i))) markInvalidRow(i, inputs), valid = false;
    if (!isValid(getCol(board, i))) markInvalidCol(i, inputs), valid = false;
  }

  for (let r = 0; r < 9; r += 3) {
    for (let c = 0; c < 9; c += 3) {
      if (!isValid(getBox(board, r, c))) markInvalidBox(r, c, inputs), valid = false;
    }
  }

  document.getElementById("message").textContent = valid
    ? "✅ أحسنت! الحل صحيح."
    : "❌ يوجد أخطاء في الجدول.";
}

function getRow(board, row) {
  return board[row];
}

function getCol(board, col) {
  return board.map(row => row[col]);
}

function getBox(board, row, col) {
  const box = [];
  for (let r = row; r < row + 3; r++) {
    for (let c = col; c < col + 3; c++) {
      box.push(board[r][c]);
    }
  }
  return box;
}

function isValid(array) {
  const nums = array.filter(n => n !== '');
  return new Set(nums).size === nums.length && nums.every(n => /^[1-9]$/.test(n));
}

function markInvalidRow(row, inputs) {
  inputs.forEach(input => {
    if (input.dataset.row == row && !input.disabled) input.classList.add('invalid');
  });
}

function markInvalidCol(col, inputs) {
  inputs.forEach(input => {
    if (input.dataset.col == col && !input.disabled) input.classList.add('invalid');
  });
}

function markInvalidBox(startRow, startCol, inputs) {
  inputs.forEach(input => {
    const row = input.dataset.row;
    const col = input.dataset.col;
    if (row >= startRow && row < startRow + 3 && col >= startCol && col < startCol + 3 && !input.disabled) {
      input.classList.add('invalid');
    }
  });
}

createBoard();
