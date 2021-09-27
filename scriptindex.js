window.onload

// ****************AFFICHER-MASQUER FORMULAIRE*****************//
const form = document.querySelector('.form');
const newBook = document.querySelector('.newBook');

const btnNewBook = document.querySelector('.btnNewBook');
const btnCancel = document.querySelector('.btnCancel')

//afficher formulaire
btnNewBook.addEventListener('click', function showForm() {
        form.style.display = 'block';
        newBook.style.display = 'none';
        booksList.innerHTML = "";
});

//revenir à l'accueil - masquer formulaire
btnCancel.addEventListener('click', function cancel() {
        form.style.display = 'none';
        newBook.style.display = 'block';

});

//*********LANCER UNE RECHERCHE*********/

const btnSearchBooks = document.querySelector('.btnSearchBooks');
let booksList = document.querySelector('.booksList');

btnSearchBooks.addEventListener('click', function (e) {
        e.preventDefault();

        const fetchBook = () => {
                let valueTitle = document.querySelector('.valueTitle').value;
                let valueAuthors = document.querySelector('.valueAuthor').value;

                const apiGoogleBooks = `https://www.googleapis.com/books/v1/volumes?q=` +
                        valueTitle +
                        '+inauthor:' +
                        valueAuthors +
                        '&key=AIzaSyBzPLXXa28wePRlPydq-cwJUNk1sP7W4Hg';

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
        </header>
        <div class="title"><h3>${book.volumeInfo.title}</h3></div> 
        <div class="authors"><h4>${authors}</h4></div>
        <div class="idBook"><p>ID : ${book.id}<p></div>
        <div class="description"><p>${description}...</p></div>
        <div class="imgBook"><img src="${imgBook}"></div>
        `;

        booksList.appendChild(booksCard);

};


//***********FONCTION POUR ENREGISTRER LES LIVRES FAVORIS ******************/

function storageBook(bookId) {

        // const apiGoogleBooks = `https://www.googleapis.com/books/v1/volumes?q=` + bookId;


        if (sessionStorage.getItem(bookId)) {
                alert('Vous ne pouvez ajouter deux fois le même livre')
        } else {

                //cloner le bookCard dans la pochlist
                let favoriteBook = document.createElement('section');
                favoriteBook.setAttribute("id", bookId);
                favoriteBook = document.getElementById(bookId);
                let booksCard = document.getElementById(bookId);
                let bookshelf = document.querySelector('.bookshelf');

                favoriteBook = booksCard.cloneNode(true);
                bookshelf.appendChild(favoriteBook);

                // remplacer le bookmark par une corbeille
                let iconBookmark = favoriteBook.querySelector('.iconBookmark');
                let iconTrash = document.createElement('div');
                iconTrash.className = 'iconTrash';
                iconTrash.innerHTML = `<i class="fas fa-trash"></i>`;
                iconBookmark.replaceWith(iconTrash);

                sessionStorage.setItem(bookId, favoriteBook.innerHTML);

                //supprimer le favoriteBook de la pochlist et du sessionStorage
                iconTrash.addEventListener('click', function removeFavoriteBook() {
                        favoriteBook.parentElement.removeChild(favoriteBook);
                        sessionStorage.removeItem(bookId);
                });
        }

};

window.onload = function () {

        let bookshelf = document.querySelector('.bookshelf');
        

        for (var i = 0; i < sessionStorage.length; i++){
        
                let value = sessionStorage.getItem(sessionStorage.key(i));
                let bookId = sessionStorage.key(i);

                if(bookId != "IsThisFirstTime_Log_From_LiveServer"){
                        let favoriteBook = document.createElement('section');
                        favoriteBook.setAttribute("id", bookId);
                        favoriteBook.innerHTML = value;
                        bookshelf.appendChild(favoriteBook);
                        
                }

                

                console.log("onload:"+i+"/"+bookId);
            }
        

        
}
