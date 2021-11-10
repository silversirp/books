// event elements
const form = document.querySelector('form');
const bookList = document.querySelector('.collection');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const ISBN = document.querySelector('#ISBN');
//console.log(title, author, ISBN);

// events
form.addEventListener('submit', addBook);
bookList.addEventListener('click', deleteBook);
document.addEventListener('DOMContentLoaded', getBooksFromLocalStorage);

function addBook (event) {
    //get form input data
    const titleInput = document.querySelector('#title').value;
    const authorInput = document.querySelector('#author').value;
    const isbnInput = document.querySelector('#ISBN').value;
    //let task = taskInput.value;
    //console.log(titleInput, authorInput, ISBNInput);

    // old robust table constructor
    /*
    let tr = document.createElement('tr');
    tr.className = 'collection-item';

        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        const td4 = document.createElement('td');
        const link = document.createElement('a');
        // add css class to link
        link.className = 'secondary-content';

        //create text element
        const title = document.createTextNode(titleInput);
        const author = document.createTextNode(authorInput);
        const isbn = document.createTextNode(isbnInput);
        // set href attribute
        link.setAttribute('href', '#');
        // add text content to <a>
        link.appendChild(document.createTextNode('X'));

        //console.log(title,author,ISBN,link);

        //add text to <li>
        td1.appendChild(title);
        td2.appendChild(author);
        td3.appendChild(isbn);
        td4.appendChild(link);

        //console.log(td1,td2,td3,td4);


    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    const table = document.querySelector('table');
    table.appendChild(tr);
    //console.log(tr);

     */

    //create book
    let book = [titleInput, authorInput, isbnInput];

    // try to populate the table with more elegant way
    // get book info for table from book array
    let trUus = document.createElement('tr');
    trUus.className = 'collection-item';
    for(let i=0; i<book.length;i++) {
        let td = document.createElement('td');
        let text = document.createTextNode(book[i]);
        td.appendChild(text);
        trUus.appendChild(td);
        // trUus.appendChild(td);
            // console.log(trUus.appendChild(td.appendChild(document.createTextNode(book[i]))));


    }
    td = document.createElement('td');
    let link1 = document.createElement('a');
    // add css class to link
    link1.className = 'secondary-content';
    // set href attribute
    link1.setAttribute('href', '#');
    // add text content to <a>
    link1.appendChild(document.createTextNode('X'));
    td.appendChild(link1);
    trUus.appendChild(td);
    let tableUus = document.querySelector('table');
    tableUus.appendChild(trUus);

    // end elegant way

    // console.log(book);

    // save to localStorage
    //tr tablerow on kogu raamatu info tr tagina
    //saveBook(tr);
    addBookToLocalStorage(book);

    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#ISBN').value = '';
    event.preventDefault();

}
/*
function saveBook(tr) {
    let books = [];
    books.push(tr);
    //console.log(books);
}
*/

function addBookToLocalStorage(book) {
    // console.log(book);
    let books;
    if (localStorage.getItem('books') === null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }
    books.push(book);
    // console.log(books);
    localStorage.setItem('books', JSON.stringify(books));
}

function deleteBook (event) {
    if (event.target.textContent === 'X') {
        if (confirm('Do you really want to delete the book?')) {
            // parentNode and parentElement give same results
            // console.log('parentNode: ', event.target.parentNode.parentNode);
            // console.log('parentElement: ', event.target.parentElement.parentElement);
            event.target.parentElement.parentElement.remove();
            // get book title from target to deleteFromLocalStorage by book title
            bookTitle = event.target.parentElement.parentElement.firstChild.textContent;
            console.log(bookTitle);
            deleteBookFromLocalStorage(bookTitle);
        }
    }
}

function deleteBookFromLocalStorage(bookTitle) {
    let books;
    if (localStorage.getItem('books') === null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
        // console.log(bookTitle);
        books.forEach(function (booksElement, index) {
            // localStorage stores book as array so I need to get title from booksElement, title is first element, so index [0]
            // and match it with bookTitle from event
            if(booksElement[0] === bookTitle) {
                books.splice(index, 1);
            }
        });
    }
    localStorage.setItem('books', JSON.stringify(books));
}

function getBooksFromLocalStorage() {
    let books;
    if (localStorage.getItem('books') === null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
        // console.log(bookTitle);
        books.forEach(function (booksElement, index) {
            let book = books[index];
            const tr = document.createElement('tr');
            for (let i=0; i<book.length;i++) {
                let td = document.createElement('td');
                let text = document.createTextNode(book[i]);
                td.appendChild(text);
                tr.appendChild(td);
                // tr.appendChild(td);
                // console.log(tr.appendChild(td.appendChild(document.createTextNode(book[i]))));


            }
            td = document.createElement('td');
            let link = document.createElement('a');
            // add css class to link
            link.className = 'secondary-content';
            // set href attribute
            link.setAttribute('href', '#');
            // add text content to <a>
            link.appendChild(document.createTextNode('X'));
            td.appendChild(link);
            tr.appendChild(td);
            let table = document.querySelector('table');
            table.appendChild(tr);
        });
    }
}