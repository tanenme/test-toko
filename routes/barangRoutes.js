import express from 'express'
import { addBarang, findBarang, updateBarang, deleteBarang} from '../controllers/barangController.js'
import { authMiddleware } from '../middleware/authMiddlewaree.js';

const barangRoute = new express.Router()
barangRoute.use(authMiddleware);

barangRoute.post('/barang/add', addBarang)
barangRoute.get('/barang/find', findBarang)
barangRoute.patch('/barang/update', updateBarang)
barangRoute.delete('/barang/delete', deleteBarang)


export default barangRoute