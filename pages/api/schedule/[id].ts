import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, resp: NextApiResponse)
{
    const { id, limit } = req.query
    const { 
        interviewer,
        starttime, 
        endtime,
        day,
        note,
        userId,
        schedule_typeId,
        area_activityId
    } = req.body

    console.log(req.query)

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
            response = await prisma.schedule.update(
            {
                where:
                {
                    id: id?.toString()
                }, 
                data:
                {
                    interviewer,
                    starttime, 
                    endtime,
                    day,
                    note,
                    userId,
                    schedule_typeId,
                    area_activityId
                }
            })

            status_code = 202
            response = {message : 'Entrevista atualizada com sucesso'}
        }

        if(req.method === 'GET')
        {
            response = await prisma.schedule.findUnique(
            {
                where:
                {
                    id: id?.toString()
                }
            })
        }

        if(req.method === 'DELETE')
        {
            response = await prisma.schedule.delete(
            {
                where:
                {
                    id: id?.toString()
                }
            })

            status_code = 204
            response = {message : 'Entrevista excluída com sucesso'}
        }
        
        resp.status(status_code).json(response)
    } 
    catch (error:any) 
    {
        resp.status(error.code).json({message:error})
    }
}