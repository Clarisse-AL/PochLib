const form = document.getElementsByClassName('form');
const newBook = document.getElementsByClassName('newBook');

newBook.addEventListener('submit',function showForm(){

    if (form.style.display = 'none') {
        form.style.display = 'block';
        newBook.style.display = 'none';
    }
});

