import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, resp: NextApiResponse)
{

    const { phone, userId, contact_type, is_default_phone } = req.body

    try 
    {
        let response: any
        let status_code: number = 200

        if(req.method === 'PUT' || req.method === 'DELETE')
        {
            return resp.status(405).json({message:'Method not allowed'})
        }

        if(req.method === 'GET')
        {
            response = await prisma.phone.findMany({
                orderBy:{phone:'asc'}
            })
        }

        if(req.method === 'POST')
        {
            await prisma.phone.create(
            {
                data:
                {
                    phone, userId, contact_type, is_default_phone
                }
            })
        
            response = {message:'Telefone cadastrado com sucesso'}
            status_code = 201
        }

        resp.status(status_code).json(response)
    }
    catch(error)
    {

    }
}