import mongoose from 'mongoose'

const Schema = mongoose.Schema

const drinkSchema = new Schema({
  name: String,
  
})

const Drink = mongoose.model('', profileSchema)

export {
  Profile
}
