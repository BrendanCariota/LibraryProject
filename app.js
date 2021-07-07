
// Form Values
const titleInput = document.querySelector('.titleInput')
const pagesInput = document.querySelector('.pagesInput')
const authorInput = document.querySelector('.authorInput')
const formRadio = document.getElementsByName('readStatus')

// Divs
const addBookContainer = document.querySelector('.container--input')
const bookContainer = document.querySelector('.container--book')
const bookForm = document.querySelector('.bookForm')

// Buttons
const newBookBtn = document.querySelector('.btn--newBook')
const addBookBtn = document.querySelector('.btn--addBook')
const readBookBtn = document.querySelector('.btn--readBook')
const removeBookBtn = document.querySelector('.btn--removeBook')
// Button EventListeners
newBookBtn.addEventListener('click', display)
addBookBtn.addEventListener('click', createBook)

// Global Variables
let readStatus
let myLibrary = [{
    title: 'The Hobbit',
    author: 'J.R.R Tolkein',
    pages: '549',
    read: 'Read'
}]

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function () {
        return title + ' by ' + author + ', ' + pages + ' pages' + ', ' + hasRead
    }
}

// Prototypes
Book.prototype.changeRead = function() {
    console.log(book)
}

// Functions
function display() {
    addBookContainer.classList.toggle('inactive')
}

function getValues() {
    // Radio Button value
    if (formRadio[0].checked) {
        readStatus = 'Read'
    } else {
        readStatus = 'Not Read'
    }

    const bookValues = {
        title: titleInput.value,
        pages: pagesInput.value,
        author: authorInput.value,
        read: readStatus
    }

    return bookValues
}

function createBook(e) {
    e.preventDefault()
    const allValues = getValues()
    const newBook = new Book(allValues.title, allValues.author, allValues.pages, allValues.read)
    myLibrary.push(newBook)
    bookContainer.innerHTML = ''
    displayBooks(myLibrary)
    display()
    bookForm.reset()
    console.log(allValues.title + ' created')
}

function buildBook(book) {

    const bookCard = document.createElement('div')
    bookCard.classList.add('book')
    bookContainer.appendChild(bookCard)

    const bookTitle = document.createElement('h2')
    bookTitle.classList.add('title')
    bookTitle.textContent = book.title
    bookCard.appendChild(bookTitle)

    const bookAuthor = document.createElement('p')
    bookAuthor.classList.add('author')
    bookAuthor.textContent = book.author
    bookCard.appendChild(bookAuthor)

    const bookPages = document.createElement('p')
    bookPages.classList.add('pages')
    bookPages.textContent = book.pages + ' Pages'
    bookCard.appendChild(bookPages)

    const bookReadStatus = document.createElement('p')
    bookReadStatus.classList.add('readStatus')
    bookReadStatus.innerText = book.read
    bookCard.appendChild(bookReadStatus)

    const bookReadBtn = document.createElement('button')
    bookReadBtn.classList.add('btn')
    bookReadBtn.classList.add('btn--read')
    bookReadBtn.innerText = 'Read?'
    bookReadBtn.addEventListener('click', () => {
        console.log(book)
        if(book.read === 'Read') {
            book.read = 'Not Read'
        } else {
            book.read = 'Read'
        }
        bookContainer.innerHTML = ''
        displayBooks(myLibrary)

    })
    bookCard.appendChild(bookReadBtn)

    const bookRemoveBtn = document.createElement('button')
    bookRemoveBtn.classList.add('btn')
    bookRemoveBtn.classList.add('btn--remove')
    bookRemoveBtn.innerText = 'Remove'
    bookRemoveBtn.addEventListener('click', () => {
        myLibrary.splice(myLibrary.indexOf(book),1)
        bookContainer.innerHTML = ''
        displayBooks(myLibrary)
    })
    bookCard.appendChild(bookRemoveBtn)

}

function displayBooks(library) {
    library.forEach(book => {
        buildBook(book)
    })
}

function setData() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
}


displayBooks(myLibrary)
