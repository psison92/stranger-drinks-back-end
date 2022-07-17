import { Review } from "../models/review.js";

function create(req, res) {
  req.body.author = req.user.profile
  Review.create(req.body)
  .then(review => {
    Review.findById(review._id)
    .populate('author')
    .then(populatedReview => {
      res.json(review)
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

function index(req, res) {
  Review.find({})
  .populate('author')
  .then(reviews => {
    res.json(reviews)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

export {
  create,
  index,
}