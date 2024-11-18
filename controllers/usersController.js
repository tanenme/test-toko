import Users from "../models/usersModel.js";
import bcrypt from "bcrypt";
import { userSchema } from "../validate/userValidateSchema.js";
import jwt from 'jsonwebtoken';


const secret = 'secretme'


export const signup = async (req, res) => {
    try {
        const countUser = await Users.count({
            where: {
                username: req.body.username
            }
        });

        const {error} = userSchema.validate(req.body)

        if (error) {
            res.status(400).json({success: false,
                 msg: error.details[0].message })
            return;
          }

        if (countUser === 1) {
            res.status(400).json({ success: false,
                msg: 'Username already exits' })
            return;
        }

        req.body.password = await bcrypt.hash(req.body.password, 10);
        

        await Users.create(req.body)
        res.status(201).json({success: true,
            msg: 'user created'
        })

    } catch (error) {
        res.status(500).json({success: false,
            msg: error
        })
    }
}

export const signin = async (req, res) => {
    try {
        const {error} = userSchema.validate(req.body)

        if (error) {
            res.status(400).json({ success: false,
                error: error.details[0].message })
            return;
          }
          
        const {username, password} = req.body

        const user = await Users.findOne({
            where: {
                username: username
            },
        })

        if (!user) {
            res.status(400).json({success: false, 
                msg: "username not valid "})
            return
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            res.status(400).json({success: false, 
                msg: "password not valid "})
            return
        }

        const payload = {
            username: user.username,
            iat: Date.now() / 1000, 
            exp: Date.now() / 1000 + (60 * 60)
        }
        
        const token = 'Bearer ' + jwt.sign(payload, secret, { algorithm: 'HS256' });


        await Users.update(
            { token: token }, {
                 where: {
                     username: req.body.username
                 }
            }
         )
         res.status(200).json({
            success: true,
            msg: {
                token: token
            }
         })

    } catch (error) {
        console.log(error)
        res.status(500).json({success: false,
            msg: error})
    }
}