'use strict'

const db = require('../server/db')
const {User, Location} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'}),
    User.create({email: 'wilson@email.com', password: '123', isAdmin: true})
  ])

  const locations = await Promise.all([
    Location.create({
      GPS: [40.705063, -74.00919], // oasis
      isActive: true,
      radius: 15
    }),
    Location.create({
      GPS: [40.704968, -74.00899], // SE corner of fullstack building (corner of senior room)
      isActive: false,
      radius: 15
    }),
    Location.create({
      GPS: [40.705145, -74.009481], // NW corner of fullstack building (corner of cafeteria)
      isActive: false,
      radius: 15
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${locations.length} locations`)

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
