import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, resp: NextApiResponse)
{

    const { email, userId, contact_type, is_default_email } = req.body

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
            response = await prisma.email.findMany({
                orderBy:{email:'asc'}
            })
        }

        if(req.method === 'POST')
        {
            await prisma.email.create(
            {
                data:
                {
                    email, userId, contact_type, is_default_email
                }
            })
        
            response = {message:'Email cadastrado com sucesso'}
            status_code = 201
        }

        resp.status(status_code).json(response)
    }
    catch(error)
    {

    }
}