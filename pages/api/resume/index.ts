import { User } from './../../../node_modules/.prisma/client/index.d';
import { AreaActivity } from '.prisma/client';
import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { AdminPanelSettingsOutlined } from '@mui/icons-material';


export default async function handler(req: NextApiRequest, resp: NextApiResponse)
{
    const { sumary, userId, professional_experience } = req.body

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
            response = await prisma.resume.findMany(
            {
                orderBy:{id:'desc'},
                include:{
                    user: true,
                    professional_experience: true
                }
            })
        }

        if(req.method === 'POST')
        {
            await prisma.resume.create(
            {
                data:
                {
                    sumary,
                    professional_experience:
                    {
                        create: professional_experience
                    },
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