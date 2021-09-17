
// ****************AFFICHER-MASQUER FORMULAIRE*****************//
const form = document.querySelector('.form');
const newBook = document.querySelector('.newBook');

const btnNewBook = document.querySelector('.btnNewBook');
const btnCancel = document.querySelector('.btnCancel')

//afficher formulaire
btnNewBook.addEventListener('click', function showForm() {
        form.style.display = 'block';
        newBook.style.display = 'none';
});

//revenir à l'accueil - masquer formulaire
btnCancel.addEventListener('click', function cancel() {
        form.style.display = 'none';
        newBook.style.display = 'block';
});


//*********LANCER UNE RECHERCHE*********/

const btnSearchBooks = document.querySelector('.btnSearchBooks');
let search = '';


btnSearchBooks.addEventListener('click', function (e) {
        e.preventDefault();
        fetchBook();
});

//*********FECTCH POUR ACCEDER A L'API*********/

const fetchBook = () => {
        let valueTitle = document.querySelector('.valueTitle').value;
        let valueAuthors = document.querySelector('.valueAuthor').value;
        search = valueTitle + '+inauthor:' + valueAuthors + '&key=AIzaSyBzPLXXa28wePRlPydq-cwJUNk1sP7W4Hg'
        const apiGoogleBooks = `https://www.googleapis.com/books/v1/volumes?q=${search}`;

        fetch(apiGoogleBooks)
                .then(function (res) {
                        if (res.ok) {
                                return res.json();
                        }
                })
                .then(function (data) {
                        console.log(data)
                        if (valueTitle == "" || valueTitle == undefined) {
                                alert("Merci de renseigner le titre du livre");
                        }
                        else if (data.totalItems === 0) {

                                alert("Aucun Résultat");
                        }
                        else {
                                data.items.forEach((book) => {
                                        createBook(book); // création des livres
                                });
                        }
                })
                .catch(function (error) {
                        console.error("erreur :" + error);

                })
};

//*********Création des sections livres pour le résultat de la recherche*********/


function createBook(book) {
        let booksList = document.querySelector('.booksList');
        let booksCard = document.createElement('section');
        booksCard.className = 'bookCard';
        let description = "";
        let imgBook = "";
        let authors = "";

        if (book)

                if (book.volumeInfo.authors === undefined || book.volumeInfo.authors === null
                        && book.volumeInfo.description === undefined || book.volumeInfo.description === null
                        && book.volumeInfo.imageLinks === undefined || book.volumeInfo.imageLinks === null) {
                        authors = "Information manquante";
                        description = "Information manquante";
                        imgBook = "image/unavailable.png";
                } else {
                        authors = book.volumeInfo.authors[0];
                        description = book.volumeInfo.description.substring(0, 200);
                        imgBook = book.volumeInfo.imageLinks.thumbnail;
                };

        booksCard.innerHTML = `
        <header>
        <div class="iconBookmark" ><i class="fas fa-bookmark" onclick = storageBook('${book.id}')></i></div>        
        <h3 class="title">${book.volumeInfo.title}</h3>   
        </header>
        <h4 class="authors">${authors}</h4>
        <p class="idBook" >ID : ${book.id}<p>
        <p class="description">${description}...</p><br>
        <img class="imgBook" src="${imgBook}" style="width: auto;">
        `;

        booksList.appendChild(booksCard);

};


//***********FETCH POUR SELECTIONNER LES LIVRES FAVORIS ******************/


const storageBook = (bookId) => {
        let search = bookId;
        const apiGoogleBooks = `https://www.googleapis.com/books/v1/volumes?q=${search}`;
        let setBooksInfo = sessionStorage.setItem(search, apiGoogleBooks);

        
        fetch(apiGoogleBooks)
                .then(function (res) {
                        if (res.ok) {
                                return res.json();
                        }
                })
                .then(function (data) {
                        console.log(data)

                        if (data.items.id === bookId) {
                                alert('Ce livre fait déjà partie de vos favoris')
                        } else {
                                data.items.forEach((book) => {
                                        favoriteBooks(book); //création des livres favoris
                                });
                        }
                })
                .catch(function (error) {
                        console.error("erreur :" + error);

                })
};

//***********CREATION DES LIVRES DANS LA POCH'LIST ******************/


function favoriteBooks(book) {
        let bookshelf = document.querySelector('.bookshelf');
        let favoriteBook = document.createElement('section');
        let description = "";
        let imgBook = "";
        let authors = "";

        if (book)

                if (book.volumeInfo.authors === undefined || book.volumeInfo.authors === null
                        && book.volumeInfo.description === undefined || book.volumeInfo.description === null
                        && book.volumeInfo.imageLinks === undefined || book.volumeInfo.imageLinks === null) {
                        authors = "Information manquante";
                        description = "Information manquante";
                        imgBook = "image/unavailable.png";
                } else {
                        authors = book.volumeInfo.authors[0];
                        description = book.volumeInfo.description.substring(0, 200);
                        imgBook = book.volumeInfo.imageLinks.thumbnail;
                };

        favoriteBook.innerHTML = `
        <header>
        <div class="iconTrash"><i class="fas fa-trash" onclick="removeFavoriteBook('${book.id}')"></i></div>        
        <h3 class="title">${book.volumeInfo.title}</h3>   
        </header>
        <h4 class="authors">${authors}</h4>
        <p class="idBook" >ID : ${book.id}<p>
        <p class="description">${description}...</p><br>
        <img class="imgBook" src="${imgBook}" style="width: auto;">
        `;

        bookshelf.appendChild(favoriteBook);

};

//***********RETIRER UN LIVRE DE LA POCHLIST ******************/

function removeFavoriteBook(bookId){
        let favoriteBook = document.querySelector('.favoriteBook');
        let bookshelf = document.querySelector('.bookshelf');

        sessionStorage.removeItem(bookId);
        bookshelf.removeChild(favoriteBook);
        
}


