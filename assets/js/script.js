const addBookEl = document.querySelector('#addBook');
addBookEl.addEventListener('click', showBookForm);
const contentEl = document.querySelector('#content');
const booksEl = document.querySelector('#books');
const myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];

function book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

(() => {
    myLibrary.forEach(book => {
        const bookCard = document.createElement('div')
        bookCard.innerHTML = 
        `<h3>"${book.title}"</h3>
        <h3>by: ${book.author}</h3> 
        <h3>${book.pages} Pages</h3>
        <button class='bookRead' id="${book.title}">Read</button>
        <button>Remove</button>
        `
        booksEl.append(bookCard)
        bookCard.setAttribute('class', 'card')
        const bookReadBtn = document.querySelector('.bookRead');
        if (book.read == true) {
            bookReadBtn.setAttribute('class', 'green')
        }
        else {
            bookReadBtn.setAttribute('class', 'red')
        }
        bookReadBtn.addEventListener('click', toogleRead)
    })
})()


function showBookForm() {
    const bookForm = document.createElement('form')
    bookForm.innerHTML = 
    `<h2>Add Book</h2>
    <input type='text' id='title' placeholder='Title'>
    <input type='text' id='author' placeholder='Author'>
    <input type='number' id='pages' placeholder='Pages'>
    <div>
    Have You read it?<input type='checkbox' id='read'>
    </div>
    <button id='submit'>Submit</button>
    `
    bookForm.setAttribute('id', 'bookForm')
    contentEl.append(bookForm)
    const bookTitle = document.querySelector('#title');
    const bookAuthor = document.querySelector('#author');
    const bookPages = document.querySelector('#pages');
    const bookRead = document.querySelector('#read');
    const submit = document.querySelector('#submit')
    submit.addEventListener('click', () => {
        const addBook = new book(bookTitle.value, bookAuthor.value, bookPages.value, bookRead.checked)
        myLibrary.push(addBook)
        localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
        
    })
}


function toogleRead() {
    const current = this.classList[0]
    const bookTitle = this.getAttribute('id')
    let j = 0
    for (let i=0;i<myLibrary.length;i++) {
        if (myLibrary[i].title == bookTitle) {
           i=myLibrary.length
        }
        else j++
    }
    if (current == 'green') {
        this.setAttribute('class', 'red');
        myLibrary[j].read = false
    }
    else {
        this.setAttribute('class', 'green');
        myLibrary[j].read = true
    }
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
    
}