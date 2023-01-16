import { AreaActivity } from './../../../node_modules/.prisma/client/index.d';
import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, resp: NextApiResponse)
{
    const { 
        email, 
        name, 
        lastname, 
        role, 
        avatar, 
        birth_date, 
        cpf, 
        rg, 
        sex, 
        password, 
        area_activityId,
        have_desability,
        own_car,
        scholarity_id,
        phone,
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
            response = await prisma.user.findMany(
            {
                orderBy:{role:'desc'},
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
        }

        if(req.method === 'POST')
        {
            await prisma.user.create(
            {
                data:
                {
                    email, 
                    name,
                    lastname,
                    role,
                    avatar,
                    birth_date,
                    cpf,
                    rg,
                    sex,
                    password,
                    area_activityId,
                    have_desability,
                    own_car,
                    scholarity_id,
                    email_contact:
                    {
                        create:
                        {
                            email: email,
                            is_default_email: true,
                        }
                    },
                    phone_contact:
                    {
                        create:
                        {
                            phone,
                            is_default_phone: true,
                        }
                    },
                    address:{
                        create:
                        {
                           complement: '' 
                        }
                    },
                    curriculo:
                    {
                        create:
                        {
                            sumary: 'Uma breve descrição sobre você aqui'
                        }
                    },
                    resume:
                    {
                        create:
                        {
                           sumary: '' 
                        }
                    }
                }
            })
        
            response = {message:'Usuário cadastrado com sucesso'}
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