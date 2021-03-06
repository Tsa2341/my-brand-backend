import mongoose from 'mongoose'

const schema = mongoose.Schema({
 description: { type: String, required: true},
 date: { type: Date, default: new Date().toISOString()}
})

export default mongoose.model('CommentModel', schema)