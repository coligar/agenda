import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, resp: NextApiResponse)
{
    const { id } = req.query

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
        let response
        let status_code: number = 200

        if(req.method === 'POST')
        {
            return resp.status(405).json({message:'Method not allowed'})
        }

        if(req.method === 'PUT')
        {
            response = await prisma.address.update(
            {
                where:{
                    id: id?.toString()
                }, 
                data:
                {
                    zip,
                    address,
                    number,
                    complement,
                    district,
                    city,
                    uf,
                    userId, 
                }
            })

            status_code = 202
            response = {message : 'Endereço atualizado com sucesso'}
        }

        if(req.method === 'GET')
        {
            response = await prisma.address.findUnique(
            {
                where:{
                    id: id?.toString()
                },
                include:{
                    user:true,
                }
            })
        }

        if(req.method === 'DELETE')
        {
            response = await prisma.address.delete(
            {
                where:{
                    id: id?.toString()
                }
            })

            status_code = 204
            response = {message : 'Endereço excluído com sucesso'}
        }

        
        resp.status(status_code).json(response)
        
    } 
    catch (error:any) 
    {
        console.log(error)
        resp.status(error.code).json({message:error})
    }
}