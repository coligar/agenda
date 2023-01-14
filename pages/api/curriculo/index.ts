import { AreaActivity } from '.prisma/client';
import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, resp: NextApiResponse)
{
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
        let response: any
        let status_code: number = 200

        if(req.method === 'PUT' || req.method === 'DELETE')
        {
            return resp.status(405).json({message:'Method not allowed'})
        }

        if(req.method === 'GET')
        {
            response = await prisma.curriculo.findMany(
            {
                orderBy:{createdAt:'desc'},
                include:{
                    user:true
                }
            })
        }

        if(req.method === 'POST')
        {
            await prisma.curriculo.create(
            {
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
        
            response = {message:'Currículo cadastrado com sucesso'}
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