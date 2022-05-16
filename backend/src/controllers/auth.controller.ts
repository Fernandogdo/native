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
        console.log("🚀 ~ file: auth.controller.ts ~ line 40 ~ login ~ token", token)


        if (userDB.role !== 'ADMIN_ROLE') {
            console.log("userid", userDB.role)
            token = 'No tiene persmisos para acceder a un token';
        }

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



export async function renewToken(req:any, res: Response): Promise<Response> {
    const id  = req.uid;

    // console.log("params", req.params)

    const token = await generateJWT(id);
    console.log("🚀 ~ file: auth.controller.ts ~ line 70 ~ renewToken ~ token", token)
    const user = await User.findById( id);

    // console.log(req.params.id)
    return res.json({
        ok: true,
        token,
        user
    })
}
