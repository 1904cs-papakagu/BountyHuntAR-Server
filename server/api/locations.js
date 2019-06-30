const router = require('express').Router()
const {Location} = require('../db/models')
module.exports = router

router.get('/active', async (req, res, next) => {
  try {
    const games = await Location.findAll({
      where: {isActive: true}
    })
    res.json(games)
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const locations = await Location.findAll()
    res.json(locations)
  } catch (error) {
    next(error)
  }
})
