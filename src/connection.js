import { Sequelize } from "sequelize";
import dotenv from 'dotenv'
dotenv.config({path: './.env'})


const db = new Sequelize(process.env.db)

// try {
//     await db.authenticate()
//     console.log('succes')
// } catch (error) {
//     console.log(error)
// }

export default db