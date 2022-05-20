const addBookEl = document.querySelector('#addBook');
addBookEl.addEventListener('click', showBookForm);
const contentEl = document.querySelector('#content');
const booksEl = document.querySelector('#books');
const bookForm = document.createElement('form')
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
        <button class='bookRead' data-name="${book.title}">Read</button>
        <button class='bookRemove' onclick='removeBook("${book.title}")'>Remove</button>
        `
        booksEl.append(bookCard)
        bookCard.setAttribute('class', 'card')
        const bookReadBtn = document.querySelector('.bookRead');
        const bookRemoveBtn = document.querySelector('.bookRemove');
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
    
    bookForm.innerHTML = 
    `<h2>Add Book</h2>
    <input type='text' id='title' placeholder='Title' required>
    <input type='text' id='author' placeholder='Author' required>
    <input type='number' min='1' id='pages' placeholder='Pages' required>
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
    window.addEventListener('click', checkClick);
    submit.addEventListener('click', () => {
        if (bookPages.value > 0 && bookTitle.value.length > 0 && bookAuthor.value.length > 0){
            const addBook = new book(bookTitle.value, bookAuthor.value, bookPages.value, bookRead.checked)
            myLibrary.push(addBook)
            localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
        }
    })
}

function toogleRead() {
    const current = this.classList[0]
    const bookTitle = this.getAttribute('data-name')
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

function removeBook(title) {
    let j = 0
    for (let i=0;i<myLibrary.length;i++) {
        if (myLibrary[i].title == title) {
           i=myLibrary.length
        }
        else j++
    }
    myLibrary.splice(j,1)
    console.log(myLibrary)
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary)) 
    window.location.reload(false)
}

function checkClick(e) {
    console.log(e.path.indexOf(addBookEl))
    if (e.path.indexOf(addBookEl) == -1 && e.path.indexOf(bookForm) == -1) {
        window.location.reload(false)
    }
}