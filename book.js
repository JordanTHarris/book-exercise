function Book(title, author, pages, read, index) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.index = index;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}`;
  };
}

const myLibrary = [];

const newBookButton = document.querySelector('#add-button');

const dialog = document.querySelector('#dialog');
const form = document.querySelector('#book-form');
const titleInput = document.querySelector('#form-title');
const authorInput = document.querySelector('#form-author');
const pagesInput = document.querySelector('#form-pages');
const readCheckbox = document.querySelector('#form-read');
const submitButton = document.querySelector('#submit-btn');
const dismissButton = document.querySelector('#dismiss-btn');

newBookButton.addEventListener('click', () => {
  dialog.showModal();
});

submitButton.addEventListener('click', () => {
  if (form.checkValidity()) {
    addBookToLibrary();
    dialog.close();
    form.reset();
  } else {
    form.reportValidity();
  }
});

dismissButton.addEventListener('click', () => {
  dialog.close();
  form.reset();
});

dialog.addEventListener('close', () => {
  form.reset();
});

// dialog.addEventListener('click', (ev) => {
//   if (ev.target.nodeName === 'DIALOG') dialog.close('dismiss');
// });

function addBookToLibrary() {
  const title = titleInput.value;
  const author = authorInput.value;
  const pages = pagesInput.value;
  const read = readCheckbox.checked;
  myLibrary.push(new Book(title, author, pages, read, myLibrary.length));
  console.log(myLibrary);
  createBookCard();
}

const bookContainer = document.querySelector('.book-container');

function createBookCard() {
  const book = myLibrary[myLibrary.length - 1];

  const bookCard = document.createElement('div');
  bookCard.classList.add('book-card');

  const title = document.createElement('h3');
  title.classList.add('title');
  title.textContent = book.title;

  const author = document.createElement('p');
  author.classList.add('author');
  author.textContent = book.author;

  const pages = document.createElement('p');
  pages.classList.add('pages');
  pages.textContent = `${book.pages} pages`;

  const readDiv = document.createElement('div');
  readDiv.classList.add('read');

  const readCheckbox = document.createElement('input');
  readCheckbox.type = 'checkbox';
  readCheckbox.name = 'read';
  readCheckbox.checked = book.read;
  readCheckbox.classList.add('read-checkbox');

  const readLabel = document.createElement('label');
  readLabel.textContent = 'Read:';
  readLabel.htmlFor = 'read';

  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.classList.add('remove-button');

  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  readDiv.appendChild(readLabel);
  readDiv.appendChild(readCheckbox);
  bookCard.appendChild(readDiv);
  bookCard.appendChild(removeButton);
  bookContainer.appendChild(bookCard);

  readCheckbox.addEventListener('change', () => {
    book.read = readCheckbox.checked;
  });

  removeButton.addEventListener('click', () => {
    myLibrary.splice(book.index, 1);
    bookContainer.removeChild(bookCard);
  });
}
