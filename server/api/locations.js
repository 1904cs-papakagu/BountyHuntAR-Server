const router = require('express').Router()
const {Location} = require('../db/models')
module.exports = router

router.put('/active', async (req, res, next) => {
  try {
    const [userLatitude, userLongitude] = req.body.userLocation
    let data = null
    const activeKillzones = await Location.findAll({
      where: {isActive: true}
    })
    for (let i = 0; i < activeKillzones.length; i++) {
      const killzone = activeKillzones[i]
      const [targetLatitude, targetLongitude] = killzone.GPS
      const latitudeDiff = userLatitude - targetLatitude
      const longitudeDiff = userLongitude - targetLongitude
      // convert degrees to meters
      const x = latitudeDiff * 111111
      const y =
        longitudeDiff * 111111 * Math.cos(Math.PI * targetLatitude / 180)
      // pythagorean theorem

      const distance = Math.sqrt(x ** 2 + y ** 2)
      if (distance <= killzone.radius) {
        data = killzone
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
