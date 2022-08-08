const express = require('express')
const passport = require('passport')

// pull in Mongoose model for pets
const Book = require('../models/book')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// POST - /comments/book_id - create comment
router.post('/comments/:bookId', requireToken, (req, res, next) => {
    // get our comment from req.body
    const comment = req.body.comment
    comment.owner = req.user.id
    // get the book id from params
    const bookId = req.params.bookId
    // find the book
    Book.findById(bookId)
        .then(handle404)
        .then(book => {
            console.log('this is the book', book)
            console.log('this is the comment', book)
            // push comment in book's comment array
            book.comments.push(comment)
            // save book
            return book.save()
        })
        // send the newly updated book as JSON
        .then(book => res.status(201).json({ book: book }))
        // handle error
        .catch(next)
})

// PATCH - /comments/book_id/comment_id - edit comment, must be owned by signed in user
router.patch('/comments/:bookId/:commentId', requireToken, removeBlanks, (req, res, next) => {
    // get book and comment ids saved to variables
    const bookId = req.params.bookId
    const commentId = req.params.commentId
    // find the book
    Book.findById(bookId)
        .then(handle404)
        .then(book => {
            // single out the comment
            const theComment = book.comments.id(commentId)
            // make sure the user sending request is the owner of the comment
            requireOwnership(req, theComment)
            // update comment with subdocument method
            theComment.set(req.body.comment)
            // return saved book
            return book.save()
        })
        .then(() => res.sendStatus(204))
        // handle error
        .catch(next)
})

// DELETE - /comments/book_id/comment_id
router.delete('/comments/:bookId/:commentId', requireToken, (req, res, next) => {
    // save ids to variables
    const bookId = req.params.bookId
    const commentId = req.params.commentId
    // find book
    Book.findById(bookId)
    // handle 404
        .then(handle404)
    // delete comment from book's comment array
        .then(book => {
            // can get subdoc the same way as update
            const theComment = book.comments.id(commentId)
            // make sure the user deleting toy is the owner
            requireOwnership(req, theComment)
            // call remove with subdocument method
            theComment.remove()
            // return saved book
            return book.save()
        })
        .then(() => res.sendStatus(204))
    // handle errors
        .catch(next)
})

// export router
module.exports = router