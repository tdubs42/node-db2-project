const yup = require('yup')

const schema = yup.object()
  .shape({
    vin: yup.string()
      .required('vin is missing')
      .trim()
      .typeError(),
    make: yup.string()
      .required('make is missing')
      .trim()
      .min(3)
      .max(128)
      .typeError(),
    model: yup.string()
      .required('model is missing')
      .trim()
      .min(2)
      .max(128)
      .typeError(),
    mileage: yup.number()
      .required('mileage is missing')
      .positive()
      .typeError(),
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
