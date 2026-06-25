'use server'
import { securedFetch } from "../core/server"

export const getAllUsers = async()=>{
    return await securedFetch("/api/users")
}