let bookTable = document.querySelector('#books');
bookTable.addEventListener('click', (event) => {
    let clickedElement = event.target;

    if (clickedElement.dataset.type == 'remove') {
        let bookId = clickedElement.dataset.ref;
        fetch(`http://localhost:3000/books/${bookId}`, { method: 'DELETE' })
            .then(answer => {

                let tr = clickedElement.closest(`#book_${bookId}`);
                tr.remove();

            })
            .catch(error => console.log(error));

    }

});