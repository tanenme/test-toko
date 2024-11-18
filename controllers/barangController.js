import Barang from "../models/barangModels.js";
import { addProdukSchema, updateProdukSchema, deleteBarangSchema } from "../validate/produkValidateSchema.js";


export const addBarang = async (req,res) =>{
    try {

        const {error} = addProdukSchema.validate(req.body)

        console.log(error)

        if (error) {
            res.status(400).json({success: false,
                 msg: error.details[0].message })
            return;
          }

        const countBarang = await Barang.count({
            where: {
                nama_barang: req.body.nama_barang
            }
        });


        if (countBarang === 1) {
            res.status(400).json({ success: false,
                msg: 'barang already exits' })
            return;
        }

        await Barang.create(req.body)
        res.status(201).json({success: true,
            msg: "barang added"})

    } catch (error) {
        console.log(error)
        res.status(400).json({suucces: false ,
            msg: error})
        
    }
}


export const findBarang = async (req,res) =>{
    try {
        const result = await Barang.findAll()
        res.status(200).json({success: true, 
            msg: result})

    } catch (error) {
        res.status(400).json({success: false, 
            msg: error})
        
    }
}

export const updateBarang = async (req, res) => {
    try {
        const {error} = updateProdukSchema.validate(req.body)

        if (error) {
            res.status(400).json({success: false,
                 msg: error.details[0].message })
            return;
          }

        const find = await Barang.findByPk(req.body.id_barang
        )

        if (!find) {
            res.status(400).json({success: false,
                msg: `id ${req.body.id_barang} tidak ditemukan` 
            })
            return;
        }

        console.log(req.body.update)
        
        await Barang.update(
           req.body.update, {
                where: {
                    id_barang: req.body.id_barang
                }
           }
        )
        res.status(200).json({
            success: true,
            msg: "produk updated"
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({suucces: false ,
            msg: error})
        
    }
}

export const deleteBarang = async (req, res) => {
    try {
        const {error} = deleteBarangSchema.validate(req.body)

        if (error) {
            res.status(400).json({success: false,
                 msg: error.details[0].message })
            return;
          }
        
          const find = await Barang.findByPk(req.body.id_barang)
  
          if (!find) {
              res.status(400).json({success: false,
                  msg: `id ${req.body.id_barang} tidak ditemukan` 
              })
              return;
          }

        await Barang.destroy({
            where: {
                id_barang: req.body.id_barang
            }
        })
        res.status(200).json({success: true,
            msg: "Barang Deleted"
        })
    } catch (error) {
        console.log(error)
    }
}