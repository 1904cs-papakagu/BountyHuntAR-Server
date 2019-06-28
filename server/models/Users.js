const Sequelize = require('sequelize')

const User = db.create("users", {
    userName: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true,
        },
    },
    password: Sequelize.STRING,
    score: Sequelize.INTEGER,
    cash:  Sequelize.INTEGER
})