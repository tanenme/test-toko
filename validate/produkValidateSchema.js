import Joi from "joi"

export const addProdukSchema = Joi.object({
    nama_barang: Joi.string().max(50).min(2).required(),
    harga_beli: Joi.number().required(),
    harga_jual: Joi.number().required(),
    stok: Joi.number().min(1).required()
})

export const updateProdukSchema = Joi.object({
    id_barang: Joi.number().required(),
    update: {
        nama_barang: Joi.string().max(50).min(2),
        harga_beli: Joi.number(),
        harga_jual: Joi.number(),
        stok: Joi.number().min(1)
    }
})

export const deleteBarangSchema = Joi.object({
    id_barang: Joi.number().required()
})
