'use server'

import { serverMutation } from "../core/server"

export const updateUser= async(email, data)=>{
    // console.log(data);
    return await serverMutation(`/api/users/${email}`, data, "PATCH")
}
