import type {NextPage} from 'next'
import {useForm, UseFormSetValue, Controller} from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { toast } from "react-toastify"
import { useEffect } from 'react'
import { mutate } from 'swr'
import { useGetData } from '../../../hooks/useRequest'
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Tooltip } from '@mui/material'

interface IFormInput 
{
    email: string
    password: string
}

interface Props 
{
    url: string
    type: string
    dados?: any | null
}


const fieldvalidations = yup.object({
    email: yup.string().email('Email inválido').required('Campo obrigatório'),
    password: yup.string().required('Campo obrigatório'),
})



const setInputValues = (data:any, setValue:UseFormSetValue<IFormInput>) =>
{
    //console.log(data)
    if(data || data !== undefined)
    {
        setValue("email", data.email)
        setValue("password", data.password)
    }
}


const LoginForm: NextPage<Props> = (props) => 
{
    const {data: areas} = useGetData('api/activity')
    const { url, type, dados} = props

    let button_name: string = (type === 'POST') ? 'LOGIN' : 'Atualizar'

    const 
    {
        register, 
        handleSubmit, 
        watch, 
        setError, 
        control,
        reset, 
        setValue, 
        formState: { isSubmitting, errors }
    } = useForm<IFormInput>(
        {
            resolver: yupResolver(fieldvalidations)
        }
    )
    useEffect(() =>
    {
        setInputValues(dados, setValue)
    },[dados, setValue, watch])

    
    async function saveFormData(data: IFormInput) 
    {
        if(type === 'POST')
        {
            return await fetch(url, 
            {
                body: JSON.stringify(data),
                headers: {"Content-Type": "application/json"},
                method: type
            })
        }
        else
        {            
            return await fetch(`${url}/${dados.id}`, 
            {
                body: JSON.stringify(data),
                headers: {"Content-Type": "application/json"},
                method: type
            })
        }
    }


    const onSubmit = async (data: IFormInput) => 
    {
        try 
        {
            const response = await saveFormData(data)
            let resp = await response.json()
            
            if (response.status === 400 || response.status === 500) 
            {
                const fieldToErrorMessage:{[fieldName: string]: string} = await response.json()

                for (const [fieldName, errorMessage] of Object.entries(fieldToErrorMessage)) 
                {
                    toast.error(`${errorMessage}`, { hideProgressBar: false, autoClose: 2000})
                }
            } 
            else if (response.ok) 
            {
                if(type === 'POST')
                {
                    reset(
                    {
                        email:'',
                        password: '',
                    })
                }

                console.log(response)


                toast.success(resp.message, { hideProgressBar: false, autoClose: 2000 })
                mutate('/api/user');
            } 
            else 
            {
                toast.error(resp.message, { hideProgressBar: false, autoClose: 2000 })
            }
        } 
        catch (error) 
        {
            toast.error(`O usuário informado não existe para atualização.`)
        }
        
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{ required: 'First name required' }}
                render={({ field }) => 
                    <Tooltip title="Informe o e-mail." placement="top-start">
                        <TextField {...field} variant="outlined" label='E-mail' size='small' type='email' required/>
                    </Tooltip>
                }
            />
            <p className='error'>{errors.email?.message}</p>

            <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{ required: 'First name required' }}
                render={({ field }) => 
                    <TextField {...field} variant="outlined" label='Sobrenome' size='small' required type="password"/>
                }
            />
            <p className='error'>{errors.password?.message}</p>

            <Button type="submit" variant="contained" sx={{ mt: 3 }} disabled={isSubmitting}>
                {isSubmitting ? "login..." : `${button_name}`}
            </Button>
            

        </form>
    );
}

export default LoginForm