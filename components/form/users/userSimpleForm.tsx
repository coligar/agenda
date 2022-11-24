import type {NextPage} from 'next'
import {useForm, UseFormSetValue, Controller} from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { toast } from "react-toastify"
import { useEffect } from 'react'
import { mutate } from 'swr'
import { Input, TextField, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material'

interface IFormInput 
{
    name: string
    lastname: string
    email: string
    role: string | null
    sex: string | null
}

interface Props 
{
    url: string
    type: string
    dados: any | null
}

const fieldvalidations = yup.object({
    name: yup.string().required('Campo obrigatório').max(100,'Permitido no máximo 100 caracteres'),
    lastname: yup.string().required('Campo obrigatório').max(100, 'Permitido no máximo 100 caracteres'),
    email: yup.string().email('Email inválido').required('Campo obrigatório'),
    role: yup.string().required('Campo obrigatório'),
    sex: yup.string().required('Campo obrigatório')
})

const formfields: Array<string> = ['name', 'lastname', 'email', 'role', 'sex']

const setInputValues = (data:any, setValue:UseFormSetValue<IFormInput>) =>
{
    if(data || data !== undefined)
    {
        setValue("name", data.name);
        setValue("lastname", data.lastname)
        setValue("email", data.email)
        setValue("role", data.role)
        setValue("sex", data.sex)
    }
}

const UserSimpleForm: NextPage<Props> = (props) => 
{
    
    const { url, type, dados } = props;

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
        
        if (response.status === 400 || response.status === 500) 
        {
            const fieldToErrorMessage:{[fieldName: string]: string} = await response.json()

            for (const [fieldName, errorMessage] of Object.entries(fieldToErrorMessage)) 
            {
                toast.error(`Erro: ${errorMessage}`, { hideProgressBar: false, autoClose: 2000})
            }
        } 
        else if (response.ok) 
        {
            if(type === 'POST')
            {
                reset(
                {
                    name:'',
                    lastname:'',
                    email:'',
                    role: null,
                    sex: null
                })
            }

            toast.success(resp.message, { hideProgressBar: false, autoClose: 2000 })
            mutate('/api/user');
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
                name="lastname"
                control={control}
                defaultValue=""
                rules={{ required: 'First name required' }}
                render={({ field }) => <TextField {...field} variant="outlined" label='Sobrenome' size='small' required/>}
            />
            <p className='error'>{errors.lastname?.message}</p>

            <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{ required: 'First name required' }}
                render={({ field }) => <TextField {...field} variant="outlined" label='E-mail' size='small' type='email' required/>}
            />
            <p className='error'>{errors.email?.message}</p>

            <Controller
                name="role"
                control={control}
                defaultValue=""
                rules={{ required: 'First name required' }}
                render={({ field }) => 
                <FormControl sx={{ minWidth: 220 }} size="small" required>
                    <InputLabel id="labelage">Tipo de Usuário</InputLabel>
                    <Select {...field} variant="outlined" label='Tipo de Usuário' labelId="labelage" fullWidth>
                        <MenuItem disabled value=""><em>Selecione uma opção</em></MenuItem>
                        <MenuItem value='USER'>Usuário</MenuItem>
                        <MenuItem value='ADMIN'>Administrador</MenuItem>
                    </Select>
                </FormControl>
                }
                
            />
            <p className='error'>{errors.role?.message}</p>

            <Controller
                name="sex"
                control={control}
                defaultValue=""
                rules={{ required: 'First name required' }}
                render={({ field }) => 
                <FormControl sx={{ minWidth: 220 }} size="small" required>
                    <InputLabel id="labelsex">Sexo</InputLabel>
                    <Select {...field} variant="outlined" label='Sexo' labelId="labelsex">
                        <MenuItem disabled value=""><em>Selecione uma opção</em></MenuItem>
                        <MenuItem value='F'>Feminino</MenuItem>
                        <MenuItem value='M'>Masculino</MenuItem>
                    </Select>
                </FormControl>
                }
                
            />
            
            <p className='error'>{errors.sex?.message}</p>

            <Button type="submit" variant="contained" sx={{ mt: 3 }} disabled={isSubmitting}>
                {isSubmitting ? "salvando..." : "Cadastrar"}
            </Button>
            

        </form>
    );
}

export default UserSimpleForm