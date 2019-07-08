const Sequelize = require('sequelize')
const db = require('../db')

const Location = db.define('location', {
  name: {
    type: Sequelize.TEXT,
    defaultValue: ''
  },
  GPS: {
    type: Sequelize.ARRAY(Sequelize.DOUBLE),
    allowNull: false
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  radius: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 50
  },
  value: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1000
  }
})

module.exports = Location
