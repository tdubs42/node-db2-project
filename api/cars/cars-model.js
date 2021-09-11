const db = require('../../data/db-config')

async function getAll() {
  return db('cars')
}

async function getById(id) {
  return db('cars')
    .where('id', id)
    .first()
}

async function create(car) {
  return await db('cars')
    .insert(car)
    .then(id => getById(id))
}

module.exports = {
  getAll,
  getById,
  create
}
