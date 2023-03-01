/**
 * File name: routes/index.js
 * Author's name: Chung Ping Mak
 * StudentID: 301281670
 * Web App name: COMP229-F2020-MidTerm
 */

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the game model
let book = require('../models/books');

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    books: ''
   });
});

module.exports = router;
