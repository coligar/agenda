import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, resp: NextApiResponse)
{
    const { id } = req.query

    const { 
        sumary,
        last_company,
        last_admission,
        last_resignation,
        last_activity,
        penultimate_company,
        penultimate_admission,
        penultimate_resignation,
        penultimate_activity,
        userId 
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
            response = await prisma.curriculo.update(
            {
                where:{
                    id: id?.toString()
                }, 
                data:
                {
                    sumary,
                    last_company,
                    last_admission,
                    last_resignation,
                    last_activity,
                    penultimate_company,
                    penultimate_admission,
                    penultimate_resignation,
                    penultimate_activity,
                    userId 
                }
            })

            status_code = 202
            response = {message : 'Curriculo atualizado com sucesso'}
        }

        if(req.method === 'GET')
        {
            response = await prisma.curriculo.findUnique(
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
            response = await prisma.curriculo.delete(
            {
                where:{
                    id: id?.toString()
                }
            })

            status_code = 204
            response = {message : 'Currículo excluído com sucesso'}
        }

        
        resp.status(status_code).json(response)
        
    } 
    catch (error:any) 
    {
        console.log(error)
        resp.status(error.code).json({message:error})
    }
}