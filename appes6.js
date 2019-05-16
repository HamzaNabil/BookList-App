class Book {
    constructor(title,author,isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
class UI {
    addBookToList(book) {
        const list = document.getElementById('book-list');
        // create tr element 
        const row = document.createElement('tr')
    
        // insert cols
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="" class="delete">X</a></td>
        `;
    
        list.appendChild(row)
    }

    showAlert(msg,className) {
        // create Div
        const div =  document.createElement('div');
        // Add Classes 
        div.className = `alert ${className}`;
        // Add Text 
        div.appendChild(document.createTextNode(msg))
        // Get Parent
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        // Insert Alert
        container.insertBefore(div,form);
        // Timeout after 1 s
        setTimeout(function(){
            document.querySelector('.alert').remove()
        },1000)
    }

    deleteBook(target) {
        if(target.className == 'delete') {
            target.parentElement.parentElement.remove()
        }
    }

    clearFields() {
        document.getElementById('title').value='';
        document.getElementById('author').value='';
        document.getElementById('isbn').value='';
    }
}

class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books =[];
        }else {
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books;
    }
    static displayBooks() {
        const books = Store.getBooks();

        books.forEach(function(book){
            const ui = new UI();

            // Add Book
            ui.addBookToList(book)
        });
    }
    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books',JSON.stringify(books)) 
    }
    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach(function(book,i){
            if(book.isbn == isbn) {
                books.splice(i,1)
            }
        });

        localStorage.setItem('books',JSON.stringify(books)) 

    }
}


// Dom load Event 
document.addEventListener('DOMContentLoaded', Store.displayBooks)

// Event Listeners for Add Book

document.getElementById('book-form').addEventListener('submit',function(e){
    // Get Form Values
    const title = document.getElementById('title').value ,
          author = document.getElementById('author').value ,
          isbn = document.getElementById('isbn').value;

    // Instantiate book
    const book = new Book(title,author,isbn);

    // Instantiate ui
    const ui = new UI();

    // validate 
    if( title == '' || author == '' || isbn =='') {
        ui.showAlert('Please Fill All Fileds' , 'error')
    } else {
        // add book to list
        ui.addBookToList(book);

        // Add to LocalStorage
        Store.addBook(book)

        // show success
        ui.showAlert('Book Added' , 'success')

        // clear Fields
        ui.clearFields();
    }

    e.preventDefault();
});

// Event Listerner For Delete

document.getElementById('book-list').addEventListener('click',function(e){

    // Instantiate ui
    const ui = new UI();

    // delete book
    ui.deleteBook(e.target)

    // remove book from lc
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

    // show Alert
    ui.showAlert('Book Deleted !!' , 'success')

    e.preventDefault();
}); 