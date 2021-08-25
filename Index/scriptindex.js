
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


//*********ACCES API*********/

const btnSearchBooks = document.querySelector('.btnSearchBooks');
const apiGoogleBooks = "https://www.googleapis.com/books/v1/volumes?q=search+terms";

let bookList = document.querySelector('.bookList');
let valueAuthor = document.querySelector('.valueAuthor');
let valueTitle = document.querySelector('.valueTitle');



valueTitle.addEventListener('input',
        fetch(apiGoogleBooks, function (response) {
                console.log(response)
        })
                .then(function (res) {
                        if (res.ok) {
                                return res.json();
                        }
                })
                .then(function (data) {
                        console.log(data);
                        bookList.innerHTML =
                                `<h1>Résultat de la recherche</h1>
                                <ul>
                                        <li>Auteur : ${data.items[""].volumeInfo.authors}</li >
                                        <li>Titre : ${data.items[""].volumeInfo.title}</li>
                                </ul > `;

                        
                })
                .catch(function (err) {

                })
);


