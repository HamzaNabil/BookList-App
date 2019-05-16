// Book Constructor 
function Book(title,author,isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor

function UI(){}

// Add Book To List
UI.prototype.addBookToList = function (book) {
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

// Delete Book
UI.prototype.deleteBook = function (target) {
    if(target.className == 'delete') {
        target.parentElement.parentElement.remove()
    }
}


// Clear Fields 
UI.prototype.clearFields = function () {
    document.getElementById('title').value='';
    document.getElementById('author').value='';
    document.getElementById('isbn').value='';
} 

// Show Alert 
UI.prototype.showAlert = function (msg , className) {
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

    // show Alert
    ui.showAlert('Book Deleted !!' , 'success')

    e.preventDefault();
});