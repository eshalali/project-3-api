const express = require('express')
const passport = require('passport')
// this allows us to load our env variables
require('dotenv').config()
const apiKey = process.env.API_KEY

const bookApi = (query, key, num) => {
    return `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${key}&maxResults=${num}`;
}

// pull in Mongoose model for books
const Book = require ('../models/book')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()
const axios = require('axios');

router.get('/books', (req, res, next) => {
    // console.log(bookApi('top-seller', `${apiKey}, '5'`))
    axios.get(bookApi('top-seller', `${apiKey}`, '10'))
        .then(response => {
            Book.find()
                .populate('owner')
                .then(books => {
                    return books.map(book => book.toObject())
                })
                .then(books => {
                    res.status(200).json({data: response.data.items, books: books})
                })
                .catch(next)
        })
        .catch(next)
})

// router.get('/books/:id', (req, res, next) => {
// 	Book.findById(req.params.id)
// 		.populate('owner')
// 		.then(handle404)
// 		.then((book) => res.status(200).json({ book: book.toObject() }))
// 		.catch(next)
// })

router.post('/books/search', (req, res, next) => {
    const query = req.params.search
    axios.get(bookApi(`${query}`, `${apiKey}`, `10`))
        .then((response) => {
            Book.find()
                .populate('owner')
                .then((books) => {
                    return books.map((book) => book.toObject())
                })
                .then((books) => {
                    res.status(200).json({ data: response.data.items, books: books })
                })
                .catch(next)
        })
        .catch(next)
})

router.post('/books', requireToken, (req, res, next) => {
	req.body.book.owner = req.user.id

	Book.create(req.body.book)
		.then((book) => {
			res.status(201).json({ book: book.toObject() })
		})
		.catch(next)
})

router.patch('/books/:id', requireToken, removeBlanks, (req, res, next) => {
	delete req.body.book.owner

	Book.findById(req.params.id)
		.then(handle404)
		.then((book) => {
			requireOwnership(req, book)
			return book.updateOne(req.body.book)
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

router.delete('/books/:id', requireToken, (req, res, next) => {
	Book.findById(req.params.id)
		.then(handle404)
		.then((book) => {
			requireOwnership(req, Book)
			book.deleteOne()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})


module.exports = router