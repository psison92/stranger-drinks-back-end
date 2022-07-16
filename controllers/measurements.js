import { Measurement } from '../models/measurement.js';

function create(req, res) {
  req.body.owner = req.user.profile
  Ingredient.create(req.body)
  .then(ingredient => {
    res.json(ingredient)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

export {
  create,
}