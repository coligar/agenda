import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, resp: NextApiResponse)
{

    const { name } = req.body

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
            response = await prisma.scholarity.findMany({
                orderBy:{name:'asc'}
            })

            console.log(response)
        }

        if(req.method === 'POST')
        {

            await prisma.scholarity.create(
            {
                data:
                {
                    name                }
            })
        
            response = {message:'Escolaridade criada com sucesso'}
            status_code = 201
        }

        resp.status(status_code).json(response)
    }
    catch(error)
    {

    }
}