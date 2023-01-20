import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, resp: NextApiResponse)
{

    const { name, icon, color, type } = req.body
    console.log(req.body)
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
            response = await prisma.scheduleType.findMany({
                orderBy:{name:'asc'}
            })
        }

        if(req.method === 'POST')
        {
            await prisma.scheduleType.create(
            {
                data:
                {
                    name,
                    icon,
                    color,
                    type
                }
            })
        
            response = {message:'Tipo de agenda cadastrada com sucesso'}
            status_code = 201
        }

        resp.status(status_code).json(response)
    }
    catch(error:any)
    {
        if(error.code == 'P2002')
        {
            resp.status(400).json({message:'Não é possíel cadastrar um tipo de agenda utilizando o mesmo nome, ícone e cor'})
            //resp.status(400).statusMessage='Não é possíel cadastrar um tipo de agenda utilizando o mesmo nome, ícone e cor'
        }
        else{
            resp.status(error.code).json({message:error})
        }
    }
}