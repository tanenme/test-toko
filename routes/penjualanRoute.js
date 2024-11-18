import express from 'express'
import { inputPenjualan, laporanMenguntungkan, laporanPenjualanYangMenguntungkan, laporanTerlaris } from '../controllers/penjualanController.js'
import { authMiddleware } from '../middleware/authMiddlewaree.js';


const penjualanRoute = new express.Router()
penjualanRoute.use(authMiddleware)

penjualanRoute.post('/penjualan/jual', inputPenjualan)
penjualanRoute.get('/laporanTerlaris', laporanTerlaris)
penjualanRoute.get('/laporanbarangmenguntungkan', laporanMenguntungkan)
penjualanRoute.get('/laporanpenjualanuntung', laporanPenjualanYangMenguntungkan)

export default penjualanRoute