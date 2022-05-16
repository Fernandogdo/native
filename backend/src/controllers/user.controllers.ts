import { Request, Response } from 'express'
import User from '../models/User'
import bcrypt from "bcrypt";
import { generateJWT } from "../helpers/jwt.helpers";


export async function getUsers(req: any, res: Response): Promise<Response> {
    const users = await User.find();
    return res.json({
        ok: true,
        users,
        uid: req.uid
    })
}

export async function getUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const user = await User.findById(id)
    // console.log(req.params.id)
    return res.json(user)
}


export async function createuser(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body
    let user;
    let token

    try {

        const existEMail = await User.findOne({ email })

        if (existEMail) {
            return res.status(400).json({
                ok: false,
                msg: 'Correo ya exixte'
            })
        }

        user = new User(req.body)
        // await user.save();

        //Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt)

        


        console.log("password", user.password)

        await user.save()

        token = await generateJWT(user.id);


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            smg: 'Error inesperado'
        });
    }

    return res.json({
        ok: true,
        user,
        token
    })
}



export async function updateduser(req: Request, res: Response): Promise<Response> {
    //Validar token and correct user
    const { id } = req.params;
    // const { name, role, email } = req.body;

    let updateduser;

    try {

        const userDB = await User.findById(id);

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No exist user for id'
            });
        }

        const { password, email, ...fields } = req.body;


        if (userDB.email !== email) {

            const existEmail = await User.findOne({ email });
            if (existEmail) {
                return res.status(400).json({
                    of: false,
                    msg: 'Ya existe usuario con ese email'
                });
            }
        }

        fields.email = email

        updateduser = await User.findByIdAndUpdate(id, fields, { new: true });


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

    return res.json({
        ok: true,
        updateduser
    })

}


export async function deleteUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    let user;


    try {

        const userdb = await User.findById(id);

        if (!userdb) {
            return res.status(404).json({
                ok: false,
                msg: 'User no exist for this id'
            })
        }


        await User.findByIdAndRemove(id);

    } catch (error) {
        console.log(error)
        res.status(500).json({
            of: false,
            msg: 'Error to delete'
        })
    }

    return res.json({
        ok: true,
        message: "user deleted"
    })
}



