import express from 'express'
import barangRoute from './routes/barangRoutes.js'
import penjualanRoute from './routes/penjualanRoute.js'
import userRoute from './routes/userRoutes.js'

const app = express()
app.use(express.json())
app.use(userRoute)
app.use(barangRoute)
app.use(penjualanRoute)

app.listen(3000, () => {
    console.log('app running')
})