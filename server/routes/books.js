/**
 * File name: routes/books.js
 * Author's name: Chung Ping Mak
 * StudentID: 301281670
 * Web App name: COMP229-F2020-MidTerm
 */

// modules required for routing
let express = require('express');
let router = express.Router();

// define the book model
let book = require('../models/books');

function isNum(str) {
  return /^-?\d+\.?\d*$/.test(str);
}

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  book.find( (err, books) => {
    console.log(books)
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  res.render('books/details', {
    title: 'Books',
    books: {
      "Title": null,
      "Description": null,
      "Price": null,
      "Author": null,
      "Genre": null
    }
  });
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
  let newBook = book({
    "Title": req.body.Title,
    "Description": req.body.Description,
    "Price": (isNum(req.body.Price)) ? parseInt(req.body.Price) : 0,
    "Author": req.body.Author,
    "Genre": req.body.Genre
  });
  book.create(newBook, (err, Book) => {
      if (err) {
          console.log(err);
          res.end(err);
      }
      else {
          res.redirect('/books');
      }
  });
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  book.findById(id, (err, bookToEdit) => {
      if (err) {
          console.log(err);
          res.end(err);
      }
      else {
        res.render('books/details', {
          title: 'Books',
          books: bookToEdit
        });
      }
  });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {
  let id = req.params.id;
  let updatedBook = book({
      _id: id,
      "Title": req.body.Title,
      "Description": req.body.Description,
      "Price": (isNum(req.body.Price)) ? parseInt(req.body.Price) : 0,
      "Author": req.body.Author,
      "Genre": req.body.Genre
  });
  book.findOneAndUpdate({ _id: id }, updatedBook, (err) => {
      if (err) {
          console.log(err);
          res.end(err);
      }
      else {
          res.redirect('/books');
      }
  });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
  let id = req.params.id;
  book.remove({ _id: id }, (err) => {
      if (err) {
          console.log(err);
          res.end(err);
      }
      else {
          res.redirect('/books');
      }
  });
});


module.exports = router;
