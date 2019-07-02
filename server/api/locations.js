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

router.post('/active', async (req, res, next) => {
  try {
    const {userId, killzoneId, userScore} = req.body
    const location = await findByPk(killzoneId)
    const user = await findByPk(userId)
    const cash = user.cash + location.value
    const score = user.score + userScore
    await location.update({isActive: false})
    await user.update({cash, score})
    res.sendStatus(204)
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
    const locations = await Location.findAll()
    res.json(locations)
  } catch (error) {
    next(error)
  }
})
