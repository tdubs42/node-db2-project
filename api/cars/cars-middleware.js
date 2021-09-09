const vinValidator = require('vin-validator')
const Car = require('./cars-model')
const schema = require('./cars-schema')

const checkCarId = (req, res, next) => {
  const {id} = req.params
  Car.getById(id)
    .then(car => {
      if (!car) {
        next({status: 404, message: `car with id ${id} not found`})
      }
      req.car = car
      next()
    })
    .catch(next)
}

const checkCarPayload = async (req, res, next) => {
  await schema
    .validate(req.body)
    .then(() => {
      req.valid = req.body
      next()
    })
    .catch(next)
}

const checkVinNumberValid = (req, res, next) => {
  const valid = vinValidator.validate(req.body.vin)
  if (!valid) {
    next({status: 400, message: `vin ${req.body.vin} is invalid`})
  }
  next()
}

const checkVinNumberUnique = (req, res, next) => {
  const {id} = req.params
  Car.getById(id)
    .then(() => next())
    .catch(next({status: 400, message: `vin ${req.body.vin} already exists`}))
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}
