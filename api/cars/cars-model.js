const db = require('../../data/db-config')

async function getAll() {
  return await db('cars')
}

async function getById(id) {
  return db('cars')
    .where('id', id)
    .first()
}

async function create(car) {
  await db('cars')
    .insert(car)
    .then(async id => await getById(id))
}

module.exports = {
  getAll,
  getById,
  create
}
