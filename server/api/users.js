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
