class BookDao {
  constructor(db) {
    this._db = db;
  }

  add(book) {
    return new Promise((resolve, reject) => {
      this._db.run(`
        INSERT INTO books (
          title,
          price,
          description
        ) values(?,?,?)
        `,[
            book.title,
            book.price,
            book.description
        ],
        function (err) {
          if (err) {
            console.log(err);
            return reject('Unable to add book.');
          }

          resolve();
        }
      )
    });
  }

  list() {
    return new Promise((resolve, reject) => {
      this._db.all (
        'SELECT * FROM books',
        (error, result) => {
          if (error) return reject('Unable to list books.');

          return resolve(result);
        }
      )
    });
  }


  searchForId(id) {

    return new Promise((resolve, reject) => {
        this._db.get(
            `
                SELECT *
                FROM books
                WHERE id = ?
            `,
            [id],
            (error, book) => {
                if (error) {
                    return reject('Could not find book!');
                }
                return resolve(book);
            }
        );
    });
  }

  update(book) {
    return new Promise((resolve, reject) => {
        this._db.run(`
            UPDATE books SET
            title = ?,
            price = ?,
            description = ?
            WHERE id = ?
        `,
        [
            book.title,
            book.price,
            book.description,
            book.id
        ],
        error => {
            if (error) {
                return reject('Could not update book!');
            }
  
            resolve();
        });
    });
  }
  
  remove(id) {
  
    return new Promise((resolve, reject) => {
        this._db.run(
            `
                DELETE 
                FROM books
                WHERE id = ?
            `,
            [id],
            (error) => {
                if (error) {
                    return reject('Could not remove book!');
                }
                return resolve();
            }
        );
    });
  }
}



module.exports = BookDao;