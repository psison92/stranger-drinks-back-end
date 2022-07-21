import { Profile } from '../models/profile.js'
import { v2 as cloudinary } from 'cloudinary'

function index(req, res) {
  Profile.find({})
  .then(profiles => res.json(profiles))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

function show(req, res){
  Profile.findById(req.params.id)
  .populate('hangoverTip')
  .then(profile => 
    res.json(profile))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

function create(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    profile.hangoverTip.push(req.body)
    profile.save()
    .then(() => {
      res.json(profile)
    }) 
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

function deleteTip(req, res) {
console.log(req.user.profile)
  Profile.findById(req.user.profile)
  .populate('hangoverTip')
  .then(profile =>{
    console.log(profile)
    if(profile._id.equals(req.user.profile)){
      profile.hangoverTip.remove(req.params.tipId)
      profile.save()
        .then(updatedProfile => {
        console.log(updatedProfile)
        res.json(updatedProfile)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

function addPhoto(req, res) {
  const imageFile = req.files.photo.path
  Profile.findById(req.params.id)
  .then(profile => {
    cloudinary.uploader.upload(imageFile, {tags: `${profile.email}`})
    .then(image => {
      profile.photo = image.url
      profile.save()
      .then(profile => {
        res.status(201).json(profile.photo)
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  })
}

export { 
  index, 
  addPhoto, 
  show,
  create,
  deleteTip as delete
}
