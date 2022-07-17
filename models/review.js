import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reviewSchema = new Schema ({
  author: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"},
  content: 'String',
  drink: {type:mongoose.Schema.Types.ObjectId, ref: "Drink" },
}, {
  timestamps: true
})

const Review = mongoose.model('Review', reviewSchema)

export {
  Review
}