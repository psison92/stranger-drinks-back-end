import mongoose from 'mongoose'

const Schema = mongoose.Schema

const measurementSchema = new Schema({
  quantity: {type: Number, required: true},
  unit: {type: String, required: true},
  ingredient: {
    type: Schema.Types.ObjectId, 
    ref: "Ingredient", 
    required: true
  },
}, {
  timestamps: true
})

const drinkSchema = new Schema({
  name: { type: String, required: true},
  alternateName: String,
  imageURL: String,
  owner: { type: Schema.Types.ObjectId, ref: 'Profile' },
  isAlcoholic: Boolean,
  recipe: [measurementSchema],
  reviews: [{type: Schema.Types.ObjectId, ref: "Review"}]
}, {
  timestamps: true
})

const Drink = mongoose.model('Drink', drinkSchema)

export { Drink }