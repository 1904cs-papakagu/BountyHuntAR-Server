const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      order: [['score', 'DESC']],
      attributes: ['userName', 'score']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.post('/score', async (req, res, next) => {
  try {
    console.log(req.user.id, '____req.user.id_____')
    console.log(req.body.id, '____req.body.id_____')
    if (req.user.id === req.body.userId) {
      const user = await User.findByPk(req.body.userId)
      const score = user.score + req.body.score
      await user.update({score})
      res.status(200).send()
    } else {
      res.status(403).send()
    }
  } catch (err) {
    next(err)
  }
})
