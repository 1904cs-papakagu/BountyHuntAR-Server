const Sequelize = require('sequelize')
const db = require('../db')

const Location = db.define('location', {
  GPS: {
    type: Sequlize.ARRAY(Sequelize.DOUBLE),
    allowNull: false
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  radius: {
    type: Sequlize.INTEGER,
    allowNull: false
  }
})

module.exports = Location
