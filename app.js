//Book Class: Reptesents a Book
class Book{
    constructor( title, author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
};
//UI class: Handles UI tasks
class UI{
    static displayBooks(){
    const books=store.getBooks();
    books.forEach((book)=> UI.addBookToList(book));
}

    static addBookToList(book){
        const list=document.querySelector('#book-list');
        const row=document.createElement('tr');
        row.innerHTML=`
         <td>${book.title}</td>
         <td>${book.author}</td>
         <td>${book.isbn}</td>
         <td><a href="#" class="btn btn-danger btn-sm
         delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteTask(el){
        if(el.classList.contains="delete"){
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message,className){
        const div=document.createElement('div');
        div.className=`alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container=document.querySelector('.container');
        const form=document.querySelector('#book-form');
        container.insertBefore(div,form);
        //vanish
        setTimeout(()=>document.querySelector('.alert').remove(),
        3000);

    }

    static Clearfields(){
        title.value=" ";
        author.value=" ";
        isbn.value=" ";
    }
    

    
};
//Store Class: Hnadles storage
class store{
  static getBooks(){
      let books;
      if(localStorage.getItem('books') === null){
          books=[];
      }
      else{
          books=JSON.parse(localStorage.getItem('books'));

      }
      return books;
  }


  static addBooks(book){
      const books=store.getBooks();
      books.push(book);
      localStorage.setItem('books',JSON.stringify(books));
  }

  static deleteBooks(isbn){
      const books=store.getBooks();

      books.forEach((book,index) => {
          if(book.isbn===isbn){
              books.splice(index,1);
          }

      })
      localStorage.setItem('books',JSON.stringify(books))
  }
};
//Event:Display Books

document.addEventListener('DOMContentLoaded',UI.displayBooks());

//Event:Add a Book
document.querySelector('#book-form').addEventListener('submit',(e)=>{
    e.preventDefault();
    const title=document.querySelector('#title').value;
    const author=document.querySelector('#author').value;
    const isbn=document.querySelector('#isbn').value;

    //validate
    if(title===''||author===''||isbn===''){
       UI.showAlert('please enter all fields','danger');

    }else{
        const book= new Book(title,author,isbn);
        //add book UI
        UI.addBookToList(book);

        //add book to store
        store.addBooks(book);

        UI.showAlert('Book Added',"success");
        //clear field
        UI.Clearfields();
    
    }

   
});
//Event:Remove a Book
document.querySelector('#book-list').addEventListener('click',(e)=>{
    UI.deleteTask(e.target); 

    //remove book from store
    store.deleteBooks(e.target.parentElement.previousElementSibling.textContent);

    //show success from store
    UI.showAlert('Book Deleted','success')
})
