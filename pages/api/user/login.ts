import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, resp: NextApiResponse)
{
    const { 
        email, 
        password, 
    } = req.body

    try 
    {
        let response: any
        let status_code: number = 200

        if(req.method === 'PUT' || req.method === 'DELETE')
        {
            return resp.status(405).json({message:'Method not allowed'})
        }

        if(req.method === 'POST')
        {
            response = await prisma.user.findMany(
            {
                where:{
                    AND:[
                        {email: email?.toString()},
                        {password: password?.toString()}
                    ],
                },
                include:{
                    address:true,
                    email_contact:true,
                    area_activity: true,
                    phone_contact: true,
                    resume:{
                        include:{
                            experience: true,
                        },
                    },
                    schedule: true,
                    curriculo: true,
                    scholarity: true,
                }
            })

            let login_response: any

            if(response.length === 0)
            {
                status_code = 404
                login_response = {message : 'Login ou senha inválidos.'}
            }
            else
            {
                login_response = {
                    id: response[0].id,
                    role: (response[0].role === 'USER') ? 'candidate' : 'manager',
                    avatar: response[0].avatar,
                    name: response[0].name,
                    lastname: response[0].lastname,
                }
                status_code = 202
            }
            
            resp.status(status_code).json(login_response)
        }
    } 
    catch (error:any) 
    {
        console.log(error)
        //resp.status(error.code).json({message:error})
    }
}