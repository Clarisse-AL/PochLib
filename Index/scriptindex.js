const form = document.getElementsByClassName('form');
const newBook = document.getElementsByClassName('newBook');
const btnNewBook = document.getElementsByClassName('btnNewBook');

newBook.addEventListener('submit',function(){

    if (form.style.display = 'none') {
        form.style.display = 'block';
        newBook.style.display = 'none';
    }
});

