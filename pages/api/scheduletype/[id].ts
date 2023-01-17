import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, resp: NextApiResponse)
{
    const { id } = req.query
    const { name, icon, color, type } = req.body

    try 
    {
        let response
        let status_code: number = 200

        if(req.method === 'POST')
        {
            return resp.status(405).json({message:'Method not allowed'})
        }
        
        if(req.method === 'PUT')
        {
            response = await prisma.scheduleType.update(
            {
                where:
                {
                    id: id?.toString()
                }, 
                data:
                {
                    name, icon, color, type
                }
            })

            status_code = 202
            response = {message : 'Tipo de agenda atualizada com sucesso'}
        }

        if(req.method === 'GET')
        {
            response = await prisma.scheduleType.findUnique(
            {
                where:
                {
                    id: id?.toString()
                }
            })
        }

        if(req.method === 'DELETE')
        {
            response = await prisma.scheduleType.delete(
            {
                where:
                {
                    id: id?.toString()
                }
            })

            status_code = 204
            response = {message : 'Tipo de agenca excluída com sucesso'}
        }
        
        resp.status(status_code).json(response)
    } 
    catch (error:any) 
    {
        resp.status(error.code).json({message:error})
    }
}