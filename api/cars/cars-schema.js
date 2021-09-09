const yup = require('yup')

const schema = yup.object()
  .shape({
    vin: yup.string()
      .required()
      .trim()
      .min(17)
      .length(17)
      .typeError('vin is missing'),
    make: yup.string()
      .required()
      .trim()
      .min(3)
      .max(128)
      .typeError('make is missing'),
    model: yup.string()
      .required()
      .trim()
      .min(2)
      .max(128)
      .typeError('model is missing'),
    mileage: yup.number()
      .required()
      .min(3)
      .typeError('mileage is missing'),
    title: yup.string()
      .notRequired()
      .trim()
      .max(128),
    transmission: yup.string()
      .notRequired()
      .trim()
      .max(128),
  })

module.exports = schema
