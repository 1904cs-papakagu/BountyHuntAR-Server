const router = require('express').Router()
const {Location, User} = require('../db/models')
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
router.post('/add', async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      await Location.create(req.body)
      res.sendStatus(200)
    } else {
      res.sendStatus(403)
    }
  } catch (error) {
    next(error)
  }
})
router.put('/edit', async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const {GPS, value, isActive, name} = req.body
      const location = await Location.findByPk(req.body.locationId)
      await location.update({GPS, value, isActive, name})
      res.sendStatus(200)
    } else {
      res.sendStatus(403)
    }
  } catch (error) {
    next(error)
  }
})
router.post('/active', async (req, res, next) => {
  try {
    const {locationId, userId, userScore} = req.body
    const location = await Location.findByPk(locationId)
    const user = await User.findByPk(userId)
    const cash = user.cash + location.value
    const score = user.score + userScore
    await location.update({isActive: false})
    await user.update({cash, score})
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
router.get('/active', async (req, res, next) => {
  try {
    const activeLocations = await Location.findAll({where: {isActive: true}})
    res.send(activeLocations)
  } catch (error) {
    next(error)
  }
})
router.get('/activateAll', async (req, res, next) => {
  try {
    const locations = await Location.findAll()
    locations.forEach(async location => {
      await location.update({isActive: true})
    })
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})
router.get('/:locationID', async (req, res, next) => {
  try {
    const id = req.params.locationID
    const location = await Location.findByPk(id)
    await location.update({isActive: true})
    res.send(`location ${id} is online`)
  } catch (error) {
    next(error)
  }
})
router.get('/', async (req, res, next) => {
  try {
    const locations = await Location.findAll({order: [['createdAt', 'ASC']]})
    res.json(locations)
  } catch (error) {
    next(error)
  }
})
