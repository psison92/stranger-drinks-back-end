import mongoose from 'mongoose'

const hangoverTipSchema = new mongoose.Schema({
  title: String,
  text: String,
})

const profileSchema = new mongoose.Schema({
  email: { type: String, required: true, lowercase: true, unique: true },
  name: String,
  hangoverTip: [hangoverTipSchema],
  favoriteDrinks:[{type:mongoose.Schema.Types.ObjectId, ref:"Drink"}],
  drinkList: [{type:mongoose.Schema.Types.ObjectId, ref:"Drink"}]
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
