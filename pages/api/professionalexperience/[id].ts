import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, resp: NextApiResponse)
{
    const { id } = req.query
    const { company, admission, resignation, activity, resumeId } = req.body

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
            response = await prisma.professionalExperience.update(
            {
                where:
                {
                    id: id?.toString()
                }, 
                data:
                {
                    company, admission, resignation, activity, resumeId
                }
            })

            status_code = 202
            response = {message : 'Experiência profissional atualizada com sucesso'}
        }

        if(req.method === 'GET')
        {
            response = await prisma.professionalExperience.findUnique(
            {
                where:
                {
                    id: id?.toString()
                }
            })
        }

        if(req.method === 'DELETE')
        {
            response = await prisma.phone.delete(
            {
                where:
                {
                    id: id?.toString()
                }
            })

            status_code = 204
            response = {message : 'Telefone excluído com sucesso'}
        }
        
        resp.status(status_code).json(response)
    } 
    catch (error:any) 
    {
        resp.status(error.code).json({message:error})
    }
}