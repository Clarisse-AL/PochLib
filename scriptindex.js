
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
        window.location.reload();
});


//*********ACCES API*********/

const btnSearchBooks = document.querySelector('.btnSearchBooks');

btnSearchBooks.addEventListener('click', function (e) {
        e.preventDefault();
        fetchBook();
});
const fetchBook = () => {
        let valueTitle = document.querySelector('.valueTitle').value;
        let valueAuthors = document.querySelector('.valueAuthor').value;

        const apiGoogleBooks = `https://www.googleapis.com/books/v1/volumes?q=`
                + valueTitle
                + '+inauthor:'
                + valueAuthors
                + '&key=AIzaSyBzPLXXa28wePRlPydq-cwJUNk1sP7W4Hg'
                ;

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
                                alert("Aucun livre n’a été trouvé");
                        }
                        else {
                                data.items.forEach((book) => {
                                        createBook(book);
                                });
                        }
                })
                .catch(function (error) {
                        console.error("erreur :" + error);

                })
};






function createBook(book) {

        //Création des sections livres pour le résultat de la recherche
        let booksList = document.querySelector('.booksList');
        let bookCard = document.createElement('section');
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

        bookCard.innerHTML = `
        <header>
        <div class="bookmark"><i class="far fa-bookmark"></i></div>        
        <h3 class="title">${book.volumeInfo.title}</h3>   
        <header>
        <h4 class="authors">${authors}</h4>
        <p class="idBook" >ID : ${book.id}<p>
        <p class="description">${description}...</p><br>
        <img class="imgBook" src="${imgBook}">
        `;

        booksList.appendChild(bookCard);

        // création des sections livres dans la pochlist

        let bookmark = document.querySelector('.bookmark');
        let bookshelf = document.querySelector('.bookshelf');
        let idBook = document.querySelector('.idBook');
        idBook.toString();
        

        bookmark.addEventListener('click', function () {

                // récupérer la clé
                let getIdBook = localStorage.getItem('idBook');
                console.log(getIdBook);

                if (getIdBook != null) {
                        bookCard.style.display = "none";
                        setBooksInfo();
                }

                // Enregistrer l'ensemble de clé valeur dans la bibliothèque
                function setBooksInfo() {

                        setBooksInfo = localStorage.setItem("idBook", "book.volumeInfo.title");
                        console.log(setBooksInfo);

                        bookCard.innerHTML = `
                                <header>
                                <div class="trash"><i class="fad fa-trash"></i></div>        
                                <h3 class="title">${book.volumeInfo.title}</h3>   
                                <header>
                                <h4 class="authors">${authors}</h4>
                                <p class="idBook" >ID : ${book.id}<p>
                                <p class="description">${description}...</p><br>
                                <img class="imgBook" src="${imgBook}">
                                `;
                        bookCard.appendChild(bookshelf);
                };
        });

        // supprimer le livre de la pochlist

        let trash = document.querySelector('.trash');

        trash.addEventListener('click', function trashBooks() {
                localStorage.removeItem();
        })

};


















