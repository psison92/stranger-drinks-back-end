import mongoose from 'mongoose'

const Schema = mongoose.Schema

const drinkSchema = new Schema({
  name: String,
  avatar: String,
}, {
  timestamps: true
})

const Drink = mongoose.model('', profileSchema)

export {
  Profile
}
