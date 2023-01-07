import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, resp: NextApiResponse)
{
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
            response = await prisma.schedule.findMany(
            {
                orderBy:{day:'asc'},
                where:{status:'ACTIVE'},
                include:{
                    user: true,
                    area_activity: true,
                    schedule_type: true,
                }
            })
        }

        if(req.method === 'POST')
        {
            await prisma.schedule.create(
            {
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
        
            response = {message:'Agendamento criado com sucesso'}
            status_code = 201
        }
        
        
        resp.status(status_code).json(response)
        
    } 
    catch (error:any) 
    {
        console.log(error)
        resp.status(error.code).json({message:error})
    }
}