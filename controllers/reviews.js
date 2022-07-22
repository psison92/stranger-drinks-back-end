import { Review } from "../models/review.js";

function create(req, res) {
  req.body.author = req.user.profile
  req.body.drink = req.params.drinkId
  Review.create(req.body)
  .then(review => {
    Review.findById(review._id)
    .populate([
      {
        path: 'author'
      }, {
        path: 'drink'
      }
    ])
    .then(populatedReview => {
      res.json(populatedReview)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({err: err.errmsg})
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

function index(req, res) {
  Review.find({})
  .populate([
    {
      path: 'author'
    }, {
      path: 'drink'
    }
  ])
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
      .catch(err => {
        console.log(err)
        res.status(500).json({err: err.errmsg})
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

function update(req, res) {
  Review.findById(req.params.id)
  .then(review => {
    if (review.author._id.equals(req.user.profile)) {
      Review.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .populate([
        {
          path: 'author'
        }, {
          path: 'drink'
        }
      ])
      .then(updatedReview => {
        res.json(updatedReview)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({err: err.errmsg})
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
  update
}