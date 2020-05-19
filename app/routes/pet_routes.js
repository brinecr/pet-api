
const express = require('express')
const passport = require('passport')
const Pet = require('../models/pet')
const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// INDEX
router.get('/pets', requireToken, (req, res, next) => {
  Pet.find()
    .then(pets => {
      return pets.map(pet => pet.toObject())
    })
    .then(pets => res.status(200).json({ pets: pets }))
    .catch(next)
})

// SHOW
router.get('/pets/:id', requireToken, (req, res, next) => {
  Pet.findById(req.params.id)
    .then(handle404)
    .then(pet => res.status(200).json({ pet: pet.toObject() }))
    .catch(next)
})

// CREATE
router.post('/pets', requireToken, (req, res, next) => {
  console.log(req.body.pet.owner)
  req.body.pet.owner = req.user.id
  Pet.create(req.body.pet)
    .then(pet => {
      res.status(201).json({ pet: pet.toObject() })
    })
    .catch(next)
})

// UPDATE
router.patch('/pets/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.pet.owner
  Pet.findById(req.params.id)
    .then(handle404)
    .then(pet => {
      requireOwnership(req, pet)
      return pet.updateOne(req.body.pet)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DESTROY
router.delete('/pets/:id', requireToken, (req, res, next) => {
  Pet.findById(req.params.id)
    .then(handle404)
    .then(pet => {
      requireOwnership(req, pet)
      pet.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
