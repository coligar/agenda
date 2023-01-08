import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, resp: NextApiResponse)
{
    const { startdate, enddate, name } = req.query
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

            if(startdate || enddate || name)
            {
                let res:any;

                if(startdate!==undefined && enddate !== undefined && name !== undefined)
                {
                    res = await prisma.schedule.findMany({
                        where:{
                            day: {
                                lte: new Date(`${enddate}`).toISOString(),
                                gte: new Date(`${startdate}`).toISOString()
                            },
                            user:{
                                name:{
                                    contains: `${name}`
                                }
                            }
                        },
                        include:{
                            user: true,
                            area_activity: true,
                            schedule_type: true,
                        },
                        orderBy:{day:'asc'}
                    })
                }

                if(startdate !== undefined && enddate !== undefined)
                {
                    res = await prisma.schedule.findMany({
                        where:{
                            day: {
                                lte: new Date(`${enddate}`).toISOString(),
                                gte: new Date(`${startdate}`).toISOString()
                            }
                        },
                        include:{
                            user: true,
                            area_activity: true,
                            schedule_type: true,
                        },
                        orderBy:{day:'asc'}
                    })
                }

                if(name !== undefined)
                {
                    res = await prisma.schedule.findMany({
                        where:{
                            user:{
                                name:{
                                    contains: `${name}`
                                }
                            }
                        },
                        include:{
                            user: true,
                            area_activity: true,
                            schedule_type: true,
                        },
                        orderBy:{day:'asc'},
                    })
                }

                response = res
            }
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
        resp.status(error.code).json({message:error})
    }
}