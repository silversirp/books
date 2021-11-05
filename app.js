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

function addBook (event) {
    //get form input data
    const titleInput = document.querySelector('#title').value;
    const authorInput = document.querySelector('#author').value;
    const ISBNInput = document.querySelector('#ISBN').value;
    //let task = taskInput.value;
    //console.log(titleInput, authorInput, ISBNInput);

    const tr = document.createElement('tr');
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
        const ISBN = document.createTextNode(ISBNInput);
        // set href attribute
        link.setAttribute('href', '#');
        // add text content to <a>
        link.appendChild(document.createTextNode('X'));

        //console.log(title,author,ISBN,link);

        //add text to <li>
        td1.appendChild(title);
        td2.appendChild(author);
        td3.appendChild(ISBN);
        td4.appendChild(link);

        //console.log(td1,td2,td3,td4);


    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    const table = document.querySelector('table');
    table.appendChild(tr);
    //console.log(tr);

    //create book
    const book = [titleInput, authorInput, ISBNInput];
    console.log(book);

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
    console.log(book);
    let books;
    if (localStorage.getItem('books') === null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }
    books.push(book);
    console.log(books);
    localStorage.setItem('books', JSON.stringify(books));
}

function deleteBook (event) {
    if (event.target.textContent === 'X') {
        if (confirm('Do you really want to delete the book?')) {
            //console.log(event.target.parentNode);
            event.target.parentElement.parentElement.remove();
        }
    }

}