import type {NextPage} from 'next'
import * as React from 'react'
import {useForm, UseFormSetValue, Controller} from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { toast } from 'react-toastify'
import axios from 'axios'
import { mutate } from 'swr'
import { useEffect } from 'react'
import { Input, TextField, Select, MenuItem, FormControl, InputLabel, Button, Tooltip, FormControlLabel, Paper, Switch, Divider, Box, Card, Collapse, CardContent, IconButton, CardHeader, InputAdornment, CardActions } from '@mui/material'
import { useGetData } from '../../../hooks/useRequest'


interface IFormInput 
{
    userid: string,
    sumary: string, 
    last_company: string,
    last_admission: string,
    last_resignation: string,
    last_activity: string,
    penultimate_company: string,
    penultimate_admission: string,
    penultimate_resignation: string,
    penultimate_activity : string,
}
interface Props 
{
    url?: string
    type?: string
    dados?: any
}


const fieldvalidations = yup.object({
    userid: yup.string().required('Campo obrigatório'),
    sumary: yup.string().required('Campo obrigatório').max(100,'Permitido no máximo 100 caracteres'),
    last_company: yup.string().required('Campo obrigatório'),
    last_admission: yup.string().required('Campo obrigatório'),
    last_resignation: yup.string().required('Campo obrigatório'),
    last_activity: yup.string().required('Campo obrigatório'),
    penultimate_company: yup.string().required('Campo obrigatório'),
    penultimate_admission: yup.string().required('Campo obrigatório'),
    penultimate_resignation: yup.string().required('Campo obrigatório'),
    penultimate_activity: yup.string().required('Campo obrigatório'),

})


const setInputValues = (data:any, setValue:UseFormSetValue<IFormInput>) =>
{
    if(data || data !== undefined)
    {
        setValue("userid", data.userid);
        setValue("sumary", data.sumary);
        setValue("last_company", data.last_company);
        setValue("last_admission", data.last_admission);
        setValue("last_resignation", data.last_resignation);
        setValue("last_activity", data.ast_activity);
        setValue("penultimate_company", data.penultimate_company);
        setValue("penultimate_admission", data.penultimate_admission);
        setValue("penultimate_resignation", data.penultimate_resignation);
        setValue("penultimate_activity", data.penultimate_activity);
    }
}


const CurriculoForm: NextPage<Props> = (props) => 
{
    const { url, type, dados } = props
    const {data: users} = useGetData('api/user')
    const {data: areas} = useGetData('api/activity')
    let button_name: string = (type === 'POST') ? 'Cadastrar' : 'Atualizar'
    console.log(users)

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

    const setSelectedUserDataToForm = (event:any) =>
    {
        let id = event.target.value;
        let userdata = users.filter((item:any) => item.id === id)
        console.log(userdata);
    }

   // setValue("name", users.name)

    useEffect(() =>
    {
        setInputValues(dados, setValue)

    },[dados, setValue])



  
    
    async function saveFormData(data: IFormInput) 
    {
        toast.success('Cadastro realizado com sucesso', { hideProgressBar: false, autoClose: 2000 })
        reset({
            sumary: '',
            last_company: '',
            last_admission:'',
            last_resignation: '',
            last_activity: '',
            penultimate_company: '',
            penultimate_admission: '',
            penultimate_resignation: '',
            penultimate_activity: '',
        })
        return
        if(type === 'POST')
        {
            return await fetch('url', 
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
            let resp = await response?.json()
            
            if (response?.status === 400) 
            {
                const fieldToErrorMessage:{[fieldName: string]: string} = await response?.json()
                for (const [fieldName, errorMessage] of Object.entries(fieldToErrorMessage)) 
                {
                    toast.error(`${errorMessage}`)
                }
            } 
            else if (response?.ok) 
            {
                if(type === 'POST')
                {
                    reset({
                        sumary: '',
                        last_company: '',
                        last_admission:'',
                        last_resignation: '',
                        last_activity: '',
                        penultimate_company: '',
                        penultimate_admission: '',
                        penultimate_resignation: '',
                        penultimate_activity: '',
                    })
                }

                toast.success('Cadastro realizado com sucesso', { hideProgressBar: false, autoClose: 2000 })
                //toast.success(resp.message, { hideProgressBar: false, autoClose: 2000 })
                //mutate('/api/scholarity');
            } 
            else 
            {
                toast.error(resp.message, { hideProgressBar: false, autoClose: 2000 })
            }
        } 
        catch (error) 
        {
            //toast.error(`O currículo informado não existe para atualização.`)
        }
        
    }


    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)}>

            
               

                <Box
                    sx={{
                        boxShadow: 0,
                        bgcolor: 'background.paper',
                        m: 1,
                        borderRadius:2,
                        overflow: 'hidden',
                        width: '100%',
                    }}
                >
                    <Card>
                        <CardHeader
                            action={
                            <IconButton aria-label="settings">
                                ...
                            </IconButton>
                            }
                            title="Currículo"
                            subheader="Informe os dados para cadastro"
                        />

                        <CardContent >

                            <Paper>
                            <Controller
                                name="userid"
                                control={control}
                                defaultValue=""
                                render={({ field }) => 
                                    <FormControl sx={{ minWidth: 220, marginBottom:1 }} size="small" required>
                                        <InputLabel id="labeluser">Usuário</InputLabel>
                                        <Select {...field} variant="outlined" label='Usários' labelId="labeluser">
                                            <MenuItem disabled value=""><em>Selecione um usuário</em></MenuItem>
                                            {users && users.map((item:any) => {
                                                return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                            })}   
                                        </Select>
                                    </FormControl>
                                }
                                
                            />
                            <br/>
                            <Paper sx={{marginBottom:2, padding:2}}>
                                <h3>Resumo</h3>
                                <span>Fale um pouco sobre você</span>
                                <Divider orientation="vertical" flexItem variant="middle" sx={{marginRight:2, marginLeft:2}}/>

                                <Controller
                                    name="sumary"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: 'Campo obrigatório' }}
                                    render={({ field }) => <TextField {...field} variant="outlined" fullWidth label='Faça um resumo sobre você' size='small' required helperText={errors ? errors.sumary?.message : null}/>}
                                />
                                <p className='error'>{errors.sumary?.message}</p>

                            </Paper>
                                

                            </Paper>

                        </CardContent>

                        <CardContent>
                            
                            <Paper sx={{marginBottom:2, padding:2}}>

                                <h3>Experiência profissional</h3>
                                <span>Descreva abaixo as suas últimas duas experiências profissionais</span>
                                <Divider orientation="vertical" flexItem variant="middle" sx={{marginRight:2, marginLeft:2}}/>

                                <Controller
                                    name="last_company"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: 'Campo obrigatório' }}
                                    render={({ field }) => <TextField {...field} variant="outlined" fullWidth label='Nome da última empresa' size='small' required helperText={errors ? errors.last_company?.message : null}/>}
                                />
                                <p className='error'>{errors.last_company?.message}</p>
                                            
                                <Controller
                                    name="last_admission"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: 'Campo obrigatório' }}
                                    render={({ field }) => <TextField {...field} variant="outlined" label='Data admissão' size='small' required helperText={errors ? errors.last_admission?.message : null}/>}
                                />
                                <p className='error'>{errors.last_admission?.message}</p>

                                <Controller
                                    name="last_resignation"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: 'Campo obrigatório' }}
                                    render={({ field }) => <TextField {...field} variant="outlined" label='Data demissão' size='small' required helperText={errors ? errors.last_resignation?.message : null}/>}
                                />
                                <p className='error'>{errors.last_resignation?.message}</p>

                                <Controller
                                    name="last_activity"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: 'Campo obrigatório' }}
                                    render={({ field }) => <TextField {...field} variant="outlined" fullWidth label='Descreva as atividades nessa empresa' size='small' required helperText={errors ? errors.last_activity?.message : null}/>}
                                />
                                <p className='error'>{errors.last_activity?.message}</p>



                                <Controller
                                    name="penultimate_company"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: 'Campo obrigatório' }}
                                    render={({ field }) => <TextField {...field} variant="outlined" fullWidth label='Nome da penúltima empresa' size='small' required helperText={errors ? errors.penultimate_company?.message : null}/>}
                                />
                                <p className='error'>{errors.penultimate_company?.message}</p>
                                            
                                <Controller
                                    name="penultimate_admission"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: 'Campo obrigatório' }}
                                    render={({ field }) => <TextField {...field} variant="outlined" label='Data admissão' size='small' required helperText={errors ? errors.penultimate_admission?.message : null}/>}
                                />
                                <p className='error'>{errors.penultimate_admission?.message}</p>

                                <Controller
                                    name="penultimate_resignation"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: 'Campo obrigatório' }}
                                    render={({ field }) => <TextField {...field} variant="outlined" label='Data demissão' size='small' required helperText={errors ? errors.penultimate_resignation?.message : null}/>}
                                />
                                <p className='error'>{errors.penultimate_resignation?.message}</p>

                                <Controller
                                    name="penultimate_activity"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: 'Campo obrigatório' }}
                                    render={({ field }) => <TextField {...field} variant="outlined" fullWidth label='Descreva as atividades nessa empresa' size='small' required helperText={errors ? errors.penultimate_activity?.message : null}/>}
                                />
                                <p className='error'>{errors.penultimate_activity?.message}</p>
                                            
                            </Paper>
                                

                            <FormControlLabel 
                                control={<Switch />}
                                id="ciente"
                                label="Estou ciente que meu currículo ficará em nossa base de dados por 2 meses" 
                                labelPlacement="start" 
                                sx={{fontSize:0.85}}
                            />

                            <Divider orientation="vertical" flexItem variant="middle" sx={{marginRight:2, marginLeft:2}}/>


                        </CardContent>
                    </Card>
                </Box>
            
                <Button type="submit" variant="contained" sx={{ mt: 3 }} disabled={isSubmitting}>
                    {isSubmitting ? "salvando..." : `${button_name}`}
                </Button>
            
        </form>
        </>
    );
}

export default CurriculoForm