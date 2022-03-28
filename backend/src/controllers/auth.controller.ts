import { Request, Response } from 'express'
import User from '../models/User'
import bcrypt from "bcrypt";
import { generateJWT } from "../helpers/jwt.helpers";

// import {  validationResult } from "express-validator";
// import path  from 'path'; 
// import fs from 'fs-extra';

export async function login(req: Request, res: Response): Promise<Response> {

    const { email, password } = req.body
    let token;

    try {

        //Verify email
        const userDB = await User.findOne({ email });

        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Email not found'
            })
        }

        // //Verify password
        const validPassword = bcrypt.compareSync( password, userDB.password )

        if ( !validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password not valid'
            });
        }

        //Generate TOKEN - JWT
        token = await generateJWT(userDB.id);

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error in Login'
        })

    }
    const users = await User.find();
    return res.json({
        ok: true,
        token
    })
}

export async function getUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const user = await User.findById(id)
    // console.log(req.params.id)
    return res.json({user})
}

// export async function createuser(req: Request, res: Response): Promise<Response> {
//     const { name, email, password, role } = req.body
//     let userSave: any;

//     try {

//         const existEMail = await User.findOne({ email })

//         if (existEMail) {
//             return res.status(400).json({
//                 ok: false,
//                 msg: 'Correo ya exixte'
//             })
//         }

//         console.log(req.body.products)
//         const newUser = {
//             name: name,
//             email: email,
//             password: password,
//             // role: role,
//             // total: total,
//             // products: products
//         };

//         userSave = new User(newUser);

//         //Encrypt password
//         const salt = bcrypt.genSaltSync();
//         userSave.password = bcrypt.hashSync(password, salt)
//         await userSave.save()

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             ok: false,
//             smg: 'Error inesperado'
//         });
//     }

//     return res.json({
//         message: 'User created successfully',
//         userSave
//     })




// }


// export async function deleteuser(req: Request, res: Response): Promise<Response> {
//     const { id } = req.params;
//     let user;


//     try {

//         const userdb = await User.findById(id);

//         if (!userdb) {
//             return res.status(400).json({
//                 ok: false,
//                 msg: 'User no exist for this id'
//             })
//         }


//         user = await User.findByIdAndRemove(id);

//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             of: false,
//             msg: 'Error to delete'
//         })
//     }

//     return res.json({
//         message: "user deleted",
//         user
//     })
// }


// export async function updateduser(req: Request, res: Response): Promise<Response> {
//     //Validar token and correct user
//     const { id } = req.params;
//     // const { title, description, month } = req.body;

//     let updateduser;

//     try {

//         const userdb = await User.findById(id);

//         console.log("userdb", userdb)

//         if (!userdb) {
//             return res.status(404).json({
//                 ok: false,
//                 msg: 'No exist user'
//             });
//         }

//         const { password, email, ...fields } = req.body;

//         if (userdb.email !== email) {

//             const existEmail = await User.findOne({ email });
//             if (existEmail) {
//                 return res.status(400).json({
//                     of: false,
//                     msg: 'Ya existe usuario con ese email'
//                 });
//             }
//         }

//         fields.email = email;

//         //Update
//         updateduser = await User.findByIdAndUpdate(id, fields, { new: true })


//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             ok: false,
//             msg: 'Error inesperado'
//         })
//     }

//     return res.json({
//         message: "Update susccesfully",
//         updateduser
//     })

// }