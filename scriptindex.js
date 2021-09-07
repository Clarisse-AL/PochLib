
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

        const fetchBook = () => {
                let valueTitle = document.querySelector('.valueTitle').value;
                let valueAuthors = document.querySelector('.valueAuthor').value;

                const apiGoogleBooks = `https://www.googleapis.com/books/v1/volumes?q=`
                        + valueTitle
                        + '+inauthor:'
                        + valueAuthors
                        + '&key=AIzaSyBzPLXXa28wePRlPydq-cwJUNk1sP7W4Hg';

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
        }
        fetchBook();
});

//*****************Création des sections livres*************************//


function createBook(book) {
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
        <div class="iconFavorite"><i class="far fa-bookmark"></i></div>        
        <h3 class="title">${book.volumeInfo.title}</h3>   
        <header>
        <h4 class="authors">${authors}</h4>
        <p class="idBook" >ID : ${book.id}<p>
        <p class="description">${description}...</p><br>
        <img class="imgBook" src="${imgBook}">
        `;

        booksList.appendChild(bookCard);

};


//*****Ajout dans les favoris *********//
let iconFavorite = document.querySelector('.header');
console.log(iconFavorite);

iconFavorite.addEventListener('click', function addPochlist(e){
        e.preventDefault();


        console.log("ok");
        iconFavorite.innerHTML = `<i class="fas fa-bookmark"></i>`;
        alert("Ce livre à correctement été ajouté dans votre Poch'List");
});








//*******trash*********//
{/* <i class="fa-solid fa-trash"></i>
<i class="fa-regular fa-trash"></i> */}

