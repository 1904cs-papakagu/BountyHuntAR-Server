const router = require('express').Router()
const {Location} = require('../db/models')
module.exports = router

router.put('/active', async (req, res, next) => {
  try {
    const games = await Location.findAll({
      where: {isActive: true}
    })
    const [userLat, userLon] = req.body.userLocation

    let data = null

    for (let i = 0; i < games.length; i++) {
      const [targetLat, targetLon] = games[i].GPS
      const latDiff = userLat - targetLat
      const lonDiff = userLon - targetLon
      const x = latDiff * 111111
      const y = lonDiff * 111111 * Math.cos((Math.PI * targetLat) / 180)
      const distance = Math.sqrt(x ** 2 + y ** 2)
      if (distance < games[i].radius) {
        data = games[i]
        break
      }
    }

    res.json(data)
  } catch (error) {
    next(error)
  }
})
router.get('/active/:locationID', async (req, res, next) => {
  try {
    const location = Location.findByPk(req.params.locationID)
    res.send(location)
  } catch (error) {
    next(error)
  }
})
router.put('/active/:locationID', async (req, res, next) => {
  try {
    const location = Location.findByPk(req.params.locationID)
    await location.update({isActive: false})
    res.sendStatus(204)
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
