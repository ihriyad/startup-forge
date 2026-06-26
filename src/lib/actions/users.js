'use server'

import { serverMutation } from "../core/server"

export const updateUser= async(id, data)=>{
    return await serverMutation(`/api/users/${id}`, data, "PATCH")
}
