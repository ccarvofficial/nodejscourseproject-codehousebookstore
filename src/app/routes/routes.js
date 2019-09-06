const BookDao = require('../infra/book-dao');
const db = require('../../config/database');

module.exports = (app) => {
  app.get('/', function(req, resp) {
    resp.send(
      `
        <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body>
            <h1>Code House</h1>
          </body>
        </html> 
      `
    );
  });
  
  app.get('/books', function(req, resp) {

    const bookDao = new BookDao(db);
    bookDao.list()
           .then(books => resp.marko(
            require('../views/books/list/list.marko'), 
            {
              books: books
            }
          ))
          .catch(error => console.log(error));
  });

  app.get('/books/form', function(req, resp) {
    resp.marko(require('../views/books/form/form.marko'), 
      { book: {
        'title': '',
        'price': '',
        'description': ''
      } 
    });
  });


  app.get('/books/form/:id', function(req, resp) {
    const id = req.params.id;
    const bookDao = new BookDao(db);

    bookDao.searchForId(id)
        .then(book => 
            resp.marko(
                require('../views/books/form/form.marko'),
                { book: book }
            )
        )
        .catch(error => console.log(error));

  });



  app.post('/books', function(req, resp) {
    console.log(req.body);
    const bookDao = new BookDao(db);

    bookDao.add(req.body)
          .then(resp.redirect('/books'))
          .catch(error => console.log(error));
  });


  app.put('/books', function(req, resp) {
    console.log(req.body);
    const bookDao = new BookDao(db);

    bookDao.update(req.body)
          .then(resp.redirect('/books'))
          .catch(error => console.log(error));
  });



  app.delete('/books/:id', function(req, resp) {
    const id = req.params.id;

    const bookDao = new BookDao(db);
    bookDao.remove(id)
           .then(() => resp.status(200).end())
           .catch(error => console.log(error));
  });
};

