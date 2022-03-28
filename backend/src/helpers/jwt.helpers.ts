import jwt from "jsonwebtoken";

export async function generateJWT(uid: string) {


    return new Promise((resolve, reject) => {
        const payload = {
            uid
        };

        const JWT_SECRET = 'pxndx17janeth1998ta1992@'

        jwt.sign(payload, JWT_SECRET, {
            expiresIn: '12h'
        }, (error, token) => {

            if (error) {
                console.log(error);
                reject('Cant generate JWT')

            } else {
                resolve(token)
            }
        })
    });

}