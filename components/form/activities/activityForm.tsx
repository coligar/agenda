import type {NextPage} from 'next'
import * as React from 'react'
import {useForm, UseFormSetValue, Controller} from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { toast } from 'react-toastify'
import axios from 'axios'
import { mutate } from 'swr'
import { useEffect } from 'react'
import { Input, TextField, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material'


interface IFormInput 
{
    name: string
    color: string
}
interface Props 
{
    url: string
    type: string
    dados: any
}


const fieldvalidations = yup.object({
    name: yup.string().required('Campo obrigatório').max(20,'Permitido no máximo 20 caracteres'),
    color: yup.string().required('Campo obrigatório').max(11, 'Permitido no máximo 11 caracteres'),
})


const setInputValues = (data:any, setValue:UseFormSetValue<IFormInput>) =>
{
    if(data || data !== undefined)
    {
        setValue("name", data.name);
        setValue("color", data.color)
    }
}


const ActivityForm: NextPage<Props> = (props) => 
{
    const { url, type, dados } = props

    const {
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

    },[dados, setValue])
    
    
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
        const response = await saveFormData(data)
        let resp = await response.json()
        
        if (response.status === 400) 
        {
            const fieldToErrorMessage:{[fieldName: string]: string} = await response.json()
            for (const [fieldName, errorMessage] of Object.entries(fieldToErrorMessage)) 
            {
                toast.error(`Erro: ${errorMessage} `)
            }
        } 
        else if (response.ok) 
        {
            if(type === 'POST')
            {
                reset({
                    name:'',
                    color:'',
                })
            }

            toast.success(resp.message, { hideProgressBar: false, autoClose: 2000 })
            mutate('/api/activity');
        } 
        else 
        {
            toast.error(resp.message, { hideProgressBar: false, autoClose: 2000 })
        }
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>

                <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Campo obrigatório' }}
                    render={({ field }) => <TextField {...field} variant="outlined" label='Nome' size='small' required helperText={errors ? errors.name?.message : null}/>}
                />
                <p className='error'>{errors.name?.message}</p>
                
                <Controller
                    name="color"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Campo obrigatório' }}
                    render={({ field }) => <TextField {...field} variant="outlined" label='Cor' size='small' required helperText={errors ? errors.name?.message : null}/>}
                />
                <p className='error'>{errors.color?.message}</p>
                
                <Button type="submit" variant="contained" sx={{ mt: 3 }} disabled={isSubmitting}>
                    {isSubmitting ? "salvando..." : "Cadastrar"}
                </Button>
            
        </form>
    );
}

export default ActivityForm