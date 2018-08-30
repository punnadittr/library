let myLibrary = [];
const display = document.getElementById('display');
const tableBody = document.getElementById('table-body');
const submitBtn = document.getElementById('submit');
var icons;

class Book {
    constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    }
    addToLibrary() {
        myLibrary.push(this);
    }
    toggleReadStatus() {
        this.read = this.read == true ? false : true;
    }
}

function render() {
    clearTable();
    tablerow = document.createElement('tr');
    for (let i = 0; i < myLibrary.length; i++) {
        tempBookRow = document.createElement('tr');
        tempBookRow.id = `book-row${i + 1}`;
        tempBookHead = document.createElement('th');
        tempBookHead.scope = 'row';
        tempBookHead.innerHTML = i + 1;

        title = document.createElement('td');
        author = document.createElement('td');
        pages = document.createElement('td');
        read = document.createElement('td');
        del = document.createElement('td');

        title.innerHTML = myLibrary[i].title;
        author.innerHTML = myLibrary[i].author;
        pages.innerHTML = myLibrary[i].pages;

        if ( myLibrary[i].read == true ) {
            read.innerHTML = `<i class="fas fa-check" data-index="${i}"></i>`;
        } else {
            read.innerHTML = `<i class="fas fa-times" data-index="${i}"></i>`;
        }

        del.innerHTML = '<button class="btn-sm btn-danger"/>Delete</button/>'
        del.dataset.index = i;

        tempBookRow.append(tempBookHead);
        tempBookRow.append(title, author, pages, read, del);        
        tableBody.append(tempBookRow);
    }
    addEventToDeleteBtn();
    addEventToIcons();
}

var deleteBtns = document.getElementsByClassName('btn-danger');

icons = document.getElementsByClassName('fas');
render();

function addEventToIcons() {
    if ( icons != undefined ) {
        for (let j = 0; j < icons.length; j++) {
            icons[j].addEventListener('click', () => {
                index = parseInt(icons[j].dataset.index);
                myLibrary[index].toggleReadStatus();
                saveLibrary();
                loadLibrary();
                icons = document.getElementsByClassName('fas');
            })
        }    
    }    
}

function clearTable() {
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }
}

function addEventToDeleteBtn () {
    if ( deleteBtns != undefined ) {
        for (let k = 0; k < deleteBtns.length; k++) {    
            deleteBtns[k].addEventListener('click', () => {
                index = parseInt(deleteBtns[k].parentElement.dataset.index, 10);
                myLibrary.splice(index, 1);            
                saveLibrary();
                loadLibrary();
                deleteBtns = document.getElementsByClassName('btn-danger');
            });
        }
    }
}

function saveLibrary() {
    localStorage.setItem('library', JSON.stringify(myLibrary));
}

function loadLibrary() {
    if ( localStorage.getItem('library') != null ) {
        loadedLibrary = JSON.parse(localStorage.getItem('library'));
        myLibrary = [];
        loadedLibrary.forEach(function(book) {           
            var tmpBook = new Book(book.title, book.author, book.pages, book.read);
            tmpBook.addToLibrary();
        });
        render();
    }
}

submitBtn.addEventListener('click', () => {
    var form = document.forms[0];
    var isTrueSet = form.elements['read'].value == 'true';
    var tempBook = new Book(form.elements["book-title"].value, 
                        form.elements['book-author'].value, 
                        form.elements['book-pages'].value, 
                        isTrueSet);
    tempBook.addToLibrary();
    saveLibrary();
    loadLibrary();
});

loadLibrary();