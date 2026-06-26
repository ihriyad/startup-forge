'use server'

import { publicFetch, securedFetch } from "../core/server"
import { getUserSession } from "../core/session"

export const getStartups = async()=>{
    return await publicFetch(`/api/startups`)
}

export const getFounderStats = async()=>{
    const user = await getUserSession();
    return await securedFetch(`/api/founder/stats?email=${user?.email}`)

}

export const getFounderStartup = async()=>{
    const user = await getUserSession();
    return await securedFetch(`/api/startups/founder?email=${user?.email}`)
}