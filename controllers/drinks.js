import { Drink } from '../models/drink.js'
import { v2 as cloudinary } from 'cloudinary'

function create(req, res) {
  req.body.owner = req.user.profile
  Drink.create(req.body)
  .then(drink => {
    Drink.findById(drink._id)
    .populate([
      {
        path: 'owner'
      }, {
        path: 'recipe',
        populate: {
          path: 'ingredient'
        }
      }
    ])
    .then(populatedDrink => {
      // respond with JSON (drink)
      res.json(populatedDrink)
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

function index(req, res) {
  Drink.find({})
  .populate([
    {
      path: 'owner'
    }, {
      path: 'recipe',
      populate: {
        path: 'ingredient'
      }
    }
  ])
  .then(drinks => {
    res.json(drinks)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

function deleteOne(req, res) {
  Drink.findById(req.params.id)
  .then(drink => {
    if (drink.owner._id.equals(req.user.profile)) {
      Drink.findByIdAndDelete(drink._id)
      .then(deletedDrink => {
        res.json(deletedDrink)
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
  Drink.findById(req.params.id)
  .then(drink => {
    if (drink.owner._id.equals(req.user.profile)) {
      Drink.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .populate([
        {
          path: 'owner'
        }, {
          path: 'recipe',
          populate: {
            path: 'ingredient'
          }
        }
      ])
      .then(updatedDrink => {
        res.json(updatedDrink)
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

function addPhoto(req, res) {
  const imageFile = req.files.photo.path
  Drink.findById(req.params.id)
  .then(drink => {
    cloudinary.uploader.upload(imageFile, {tags: `${drink.name}`})
    .then(image => {
      console.log(image)
      drink.imageURL = image.url
      drink.save()
      .then(drink => {
        res.status(201).json(drink.photo)
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  })
}

export {
  create,
  index,
  deleteOne as delete,
  update,
  addPhoto
}
