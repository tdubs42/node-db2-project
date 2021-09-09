const db = require('../../data/db-config')

module.exports = {
  async getAll() {
    return db('cars')
  },

  async getById(id) {
    return db('cars')
      .where('id', id)
      .first()
  },

  async create(car) {
    await db('cars')
      .insert(car)
    return car
  }
}
