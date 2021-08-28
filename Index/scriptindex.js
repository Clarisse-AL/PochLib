
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

btnSearchBooks.addEventListener('click', function (e) {
        e.preventDefault();
        console.log("ok");

        const fetchBook = () => {
                let title = document.querySelector('.valueTitle').value;
                console.log(title);

                let authors = document.querySelector('.valueAuthor').value;
                console.log(authors);

                const apiGoogleBooks = `https://www.googleapis.com/books/v1/volumes?q=`
                        + title
                        + '+inauthor:'
                        + authors
                        + '&key=AIzaSyBzPLXXa28wePRlPydq-cwJUNk1sP7W4Hg';
                console.log(apiGoogleBooks);


                fetch(apiGoogleBooks)
                        .then(function (res) {
                                if (res.ok) {
                                        return res.json();
                                }
                        })
                        .then(function (data) {
                                console.log(data)
                                data.items.forEach((book) => {
                                        createBook(book);
                                });
                        })
                        .catch(function (error) {
                                console.error("erreur :" + error);

                        })
        }
        fetchBook();
});


let booksList = document.querySelector('.booksList');

function createBook(book) {

let bookCard = document.createElement('section');

bookCard.innerHTML = `
        <h3>${book.volumeInfo.title}</h3><br>
        <h4>${book.volumeInfo.authors}</h4><br>
        <p maxlength="200">${book.volumeInfo.description}</p><br>
        <img src="${book.volumeInfo.imageLinks.thumbnail}">
        `;

booksList.appendChild(bookCard);
console.log(booksList);

};