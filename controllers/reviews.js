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

function deleteOne(req, res) {
  Review.findById(req.params.id)
  .then(review => {
    if (review.author._id.equals(req.user.profile)) {
      Review.findByIdAndDelete(review._id)
      .then(deletedReview => {
        res.json(deletedReview)
      })
    } else {
      res.status(401).json({err: "Not authorized!"})
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

export {
  create,
  index,
  deleteOne as delete,
}