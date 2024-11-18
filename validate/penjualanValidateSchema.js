import Joi from "joi"

export const penjualanSchema = Joi.object({
    id_barang: Joi.number().max(50).min(2).required(),
    jumlah: Joi.number().min(1).required()
})