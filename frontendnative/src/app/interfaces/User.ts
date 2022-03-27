export interface User {
    role: string,
    nombre: string,
    email: string,
    password?: string, 
    google?: boolean,
    img?: string, 
    uid?: string,
}