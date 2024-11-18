import { Sequelize } from "sequelize";

const db = new Sequelize('test', 'postgres', 'toor', {
    host: '127.0.0.1',
    dialect: 'postgres'
})

// try {
//     await db.authenticate()
//     console.log('succes')
// } catch (error) {
//     console.log(error)
// }

export default db