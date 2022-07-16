import mongoose from 'mongoose'

const Schema = mongoose.Schema

const measurementSchema = new Schema({
  quantity: {type: Number, required: true},
  unit: {type: String, required: true},
  ingredient: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Measurement", 
    required: true
  },
}, {
  timestamps: true
})

const Measurement = mongoose.model('Measurement', measurementSchema)

export {
  Measurement
}