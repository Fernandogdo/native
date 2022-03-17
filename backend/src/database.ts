import { connect} from "mongoose";

export async function startConnection() {
    await connect('mongodb://localhost/nativeec')
    console.log("DB is connect")
}