const inputs = document.querySelectorAll('.inputs__input'),
  btnAdd = document.querySelector('.inputs__btn-add'),
  inputEng = document.querySelector('.inputs__input_eng'),
  inputUa = document.querySelector('.inputs__input_ua'),
  table = document.querySelector('.vocabulary__table');

let words;
let btnsDelete;

words = JSON.parse(localStorage.getItem('words'));

function CreateWord(eng, ua) {
  this.eng = eng;
  this.ua = ua;
}

const renderTable = (item) => {
  table.innerHTML += `
        <tr class="tr">
            <td class="vocabulary__word-eng">
             ${item.eng}
            </td>
            <td class="vocabulary__word-ua">
                ${item.ua}
            </td>
            <td>
            <button class="vocabulary__btn-delete">
            </button>
            </td>
        </tr>
    `;
};

const createDeleteButton = () => {
  btnsDelete = document.querySelectorAll('.vocabulary__btn-delete');

  for (let btnDelete of btnsDelete) {
    btnDelete.addEventListener('click', (e) => {
      const rowIndex = e.target.parentNode.parentNode.rowIndex;
      e.target.parentNode.parentNode.parentNode.remove();
      words.splice(rowIndex, 1);
      localStorage.removeItem('words');
      localStorage.setItem('words', JSON.stringify(words));
    });
  }
};

window.addEventListener('load', () => {
  if (!words) {
    words = [];
  } else {
    words.forEach((item) => {
      renderTable(item);
      createDeleteButton();
    });
  }
});

btnAdd.addEventListener('click', () => {
  let engWord = inputEng.value;
  let uaWord = inputUa.value;
  if (
    engWord.length < 1 ||
    uaWord.length < 1 ||
    !isNaN(engWord) ||
    !isNaN(uaWord)
  ) {
    for (let inp of inputs) {
      inp.classList.add('error');
    }
  } else {
    for (let inp of inputs) {
      inp.classList.remove('error');
    }

    words.push(new CreateWord(engWord, uaWord));
    localStorage.setItem('words', JSON.stringify(words));
    renderTable(words[words.length - 1]);

    inputEng.value = null;
    inputUa.value = null;

    createDeleteButton();
  }
});
