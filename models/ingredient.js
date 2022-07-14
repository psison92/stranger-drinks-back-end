import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ingredientSchema = new Schema({
  name: {type: String, required: true},
  type: {type: String, required: true},
  quantity: {type: Number, required: true},
  typeOfMeasurement: {type: String},
  abv: {type: Number},
}, {
  timestamps: true
})

const Ingredient = mongoose.model('Ingredient', ingredientSchema)

export {
  Ingredient
}