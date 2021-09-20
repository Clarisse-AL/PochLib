
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
                                        let booksList = document.querySelector('.booksList');
                                        booksList.innerHTML = "";
                                        data.items.forEach((book) => {
                                                createBook(book); // création des livres
                                        });
                                }
                        })
                        .catch(function (error) {
                                console.error("erreur :" + error);

                        })
        };

        fetchBook();
});


//*********Création des sections livres pour le résultat de la recherche*********/


function createBook(book) {
        let booksList = document.querySelector('.booksList');
        let booksCard = document.createElement('section');
        booksCard.className = 'bookCard';
        booksCard.setAttribute("id", book.id);

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


//***********AJOUTER DES LIVRES DANS LA POCHLIST******************/


const storageBook = (bookId) => {

        //enregistrer le livre dans le sessionStorage

        const apiGoogleBooks = `https://www.googleapis.com/books/v1/volumes?q=` + bookId;
        let setBooksInfo = sessionStorage.setItem(bookId, apiGoogleBooks);

        // remplacer le bookmark par une corbeille
        let bookCard = document.getElementById(bookId);
        let favoriteBook = document.createElement('section');
        let bookshelf = document.querySelector('.bookshelf');
        favoriteBook.className = 'favoriteBook';

        favoriteBook = document.querySelector('.favoriteBook');
        let iconBookmark = document.querySelector('.iconBookmark');
        let iconTrash = document.createElement('div');
        iconTrash.className = 'iconTrash';
        iconTrash.innerHTML = '<i class="fas fa-trash" onclick="removeFavoriteBook(bookId)"></i>';
        iconBookmark.replaceChild(iconTrash, iconBookmark);
        favoriteBook.appendChild(iconTrash);
        
        //cloner le bookCard dans la pochlist
        favoriteBook = bookCard.cloneNode(true);
        bookshelf.appendChild(favoriteBook);

        // alert("Ce livre fait déjà parti de votre sélection");             
};







//***********RETIRER UN LIVRE DE LA POCHLIST ******************/

function removeFavoriteBook(bookId) {
        let favoriteBook = document.querySelector(bookId);
        let bookshelf = document.querySelector('.bookshelf');

        sessionStorage.removeItem(bookId);
        bookshelf.removeChild(favoriteBook);

}


