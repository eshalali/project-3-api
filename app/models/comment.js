const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
    {
        note: {
            type: String,
            required: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }, {
        timestamps: true
    }
)

module.exports = commentSchema