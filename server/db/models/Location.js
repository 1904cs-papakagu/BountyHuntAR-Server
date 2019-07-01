const Sequelize = require('sequelize')
const db = require('../db')

const Location = db.define('location', {
  GPS: {
    type: Sequelize.ARRAY(Sequelize.DOUBLE),
    allowNull: false
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  radius: {
    type: Sequelize.INTEGER,
    allowNull: false,
    deaultValue: 50
  }
})

module.exports = Location
