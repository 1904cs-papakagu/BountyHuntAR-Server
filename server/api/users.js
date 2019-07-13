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
    if (req.user.id === Number(req.body.userId)) {
      console.log(req.body.score, '___req.body.score_____')
      const user = await User.findByPk(req.body.userId)
      const score = user.score + Number(req.body.score)
      await user.update({score})
      res.status(200).send()
    } else {
      res.status(403).send()
    }
  } catch (err) {
    next(err)
  }
})
