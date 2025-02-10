import { Connection } from "mongoose";

declare global {
    let global:{
        conn: Connection | null
        promise: Promise | null
    }
}