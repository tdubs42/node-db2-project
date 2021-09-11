const vinValidator = require('vin-validator')
const Car = require('./cars-model')
const schema = require('./cars-schema')

const checkCarId = (req, res, next) => {
  const {id} = req.params
  Car.getById(id)
    .then(car => {
      if (!car) {
        next({
          status: 404,
          message: `car with id ${id} not found`
        })
      }
      req.car = car
      next()
    })
    .catch(next)
}

const checkCarPayload = async (req, res, next) => {
  try {
    await schema.validate(req.body)
    next()
  } catch (err) {
    next({status: 400, message: err.message})
  }
}

const checkVinNumberValid = async (req, res, next) => {
  const valid = vinValidator.validate(req.body.vin)
  valid
    ? next()
    : next({
      status: 400,
      message: `vin ${req.body.vin} is invalid`
    })
}

const checkVinNumberUnique = (req, res, next) => {
  Car.getAll()
    .then(cars => {
      const taken = cars.find(car => car.vin
        === req.body.vin)
      taken
      === undefined
        ? next()
        : next({
          status: 400,
          message: `vin ${req.body.vin} already exists`
        })
    })
    .catch(next)
  // const {id} = req.params
  // Car.getById(id)
  //   .then(car => {
  //     if (car.vin
  //       !== req.body.vin) {
  //       next()
  //     }
  //     if (car.vin
  //       === req.body.vin) {
  //       next({
  //         status: 400,
  //         message: `vin ${req.body.vin} already exists`
  //       })
  //     }
  //   })
  //   .catch(next)
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}
