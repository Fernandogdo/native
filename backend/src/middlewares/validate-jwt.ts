import { response } from "express";
import jwt from "jsonwebtoken";


export const validateJWT = (req: any, res = response, next: any) => {

    //read token

    const token = req.header('x-token')

    // console.log("token", token)

    // let uid;
    const JWT_SECRET = 'pxndx17janeth1998ta1992@'


    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No token in the request'
        });
    }


    try {
        const { uid }: any = jwt.verify(token, JWT_SECRET)
        console.log("uid", uid);

        req.uid = uid;

        next()
        

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            ok: false,
            msg: 'Token not valid'
        })
    }

    

}


// export default validateJWT;