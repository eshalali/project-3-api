const mongoose = require('mongoose')

// const commentSchema = require('./comment')

const { Schema, model } = mongoose

const bookSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        author: String,
        description: String,
        imageLink: String,
        // comment: [commentSchema],
        owner: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
    }, {
        timestamps: true,
    }
)

module.exports = model('Book', bookSchema)