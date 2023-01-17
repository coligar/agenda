import { AreaActivity } from '.prisma/client';
import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, resp: NextApiResponse)
{
    const { 
        zip,
        address,
        number,
        complement,
        district,
        city,
        uf,
        userId,  
    } = req.body

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
            response = await prisma.address.findMany(
            {
                orderBy:{address:'desc'},
                include:{
                    user:true
                }
            })
        }

        if(req.method === 'POST')
        {
            await prisma.address.create(
            {
                data:
                {
                    zip,
                    address,
                    number,
                    complement,
                    district,
                    city,
                    uf,
                    userId
                }
            })
        
            response = {message:'Endereço cadastrado com sucesso'}
            status_code = 201
        }

        resp.status(status_code).json(response)
        
    } 
    catch (error:any) 
    {
        console.log(error)
        //resp.status(error.code).json({message:error})
    }
}