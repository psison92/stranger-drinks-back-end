import mongoose from 'mongoose'

const Schema = mongoose.Schema

const drinkSchema = new mongoose.Schema({
  name: String,
  imageURL: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  isAlcoholic: Boolean,
  ingredients: [{type: mongoose.Schema.Types.ObjectId, ref: "Ingredient"}],
  reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "Review"}]
}, {
  timestamps: true
})

const Drink = mongoose.model('Drink', drinkSchema)

export {
  Drink
}
