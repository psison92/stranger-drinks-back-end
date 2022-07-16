import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reviewSchema = new Schema ({
  author: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"},
  content: {type: String, required: true},
  drink: {type:mongoose.Schema.Types.ObjectId, ref: "Drink" },
  title: {type: String, required: true},
  rating: {type: Number},
}, {
  timestamps: true
})

const Review = mongoose.model('Review', reviewSchema)

export {
  Review
}