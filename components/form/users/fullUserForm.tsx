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
    userid?: string,
    name: string,
    email: string, 
    birth_date: string,
    cpf: string,
    have_desability: string,
    lastname: string,
    own_car: string,
    rg: string,
    sex: string,
    area_activityId: string,
    scholarity_id: string,
    phone: string,
    zip: string,
    address: string,
    district: string,
    city: string,
    uf: string,
}
interface Props 
{
    url?: string
    type?: string
    dados?: any
}


const fieldvalidations = yup.object({
    name: yup.string().required('Campo obrigatório'),
    email: yup.string().required('Campo obrigatório'),
    birth_date: yup.string().required('Campo obrigatório'),
    cpf: yup.string().required('Campo obrigatório'),
    have_desability: yup.string().required('Campo obrigatório'),
    lastname: yup.string().required('Campo obrigatório'),
    own_car: yup.string().required('Campo obrigatório'),
    rg: yup.string().required('Campo obrigatório'),
    sex: yup.string().required('Campo obrigatório'),
    area_activityId: yup.string().required('Campo obrigatório'),
    scholarity_id: yup.string().required('Campo obrigatório'),
    phone: yup.string().required('Campo obrigatório'),
    zip: yup.string().required('Campo obrigatório'),
    address: yup.string().required('Campo obrigatório'),
    district: yup.string().required('Campo obrigatório'),
    city: yup.string().required('Campo obrigatório'),
    uf: yup.string().required('Campo obrigatório'),

})


const setInputValues = (data:any, setValue:UseFormSetValue<IFormInput>) =>
{
    if(data || data !== undefined)
    {
        setValue("name", data.name);
        setValue("lastname", data.lastname);
        setValue("email", data.email);
        setValue("birth_date", data.birth_date);
        setValue("cpf", data.cpf);
        setValue("have_desability", data.have_desability);
        setValue("own_car", data.own_car);
        setValue("rg", data.rg);
        setValue("sex", data.sex);
        setValue("area_activityId", data.area_activityId);
        setValue("scholarity_id", data.scholarity_id);
        setValue("phone", data.phone);
        setValue("zip", data.zip);
        setValue("address", data.address);
        setValue("district", data.district);
        setValue("city", data.city);
        setValue("uf", data.uf);
    }
}


const FullUserForm: NextPage<Props> = (props) => 
{
    const { url, type, dados } = props
    const {data: users} = useGetData('api/user')
    const {data: areas} = useGetData('api/activity')
    let button_name: string = (type === 'POST') ? 'Cadastrar' : 'Atualizar'

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
        console.log(data)
        toast.success('Cadastro realizado com sucesso', { hideProgressBar: false, autoClose: 2000 })
        reset({
            name: '',
            email: '',
            birth_date: '',
            cpf: '',
            have_desability: '',
            lastname: '',
            own_car: '',
            rg: '',
            sex: '',
            area_activityId: '',
            scholarity_id: '',
            phone: '',
            zip: '',
            address: '',
            district: '',
            city: '',
            uf: '',
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
        console.log(data)
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
                        name: '',
                        email: '',
                        birth_date: '',
                        cpf: '',
                        have_desability: '',
                        lastname: '',
                        own_car: '',
                        rg: '',
                        sex: '',
                        area_activityId: '',
                        scholarity_id: '',
                        phone: '',
                        zip: '',
                        address: '',
                        district: '',
                        city: '',
                        uf: '',
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
                        title="Cadastro"
                        subheader="Informe os dados para cadastro"
                    />

                    <CardContent>
                        
                        <Paper sx={{marginBottom:2, padding:2}}>

                            <h3>Informe seus dados</h3>
                            <span>Todos os campos são obrigatórios</span>
                            <Divider orientation="vertical" flexItem variant="middle" sx={{marginRight:2, marginLeft:2}}/>

                            <Controller
                                name="name"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Campo obrigatório' }}
                                render={({ field }) => <TextField {...field} variant="outlined" fullWidth label='Informe seu nome' size='small' required helperText={errors ? errors.name?.message : null}/>}
                            />
                            <p className='error'>{errors.name?.message}</p>

                            <Controller
                                name="lastname"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Campo obrigatório' }}
                                render={({ field }) => <TextField {...field} variant="outlined" fullWidth label='Informe seu sobrenome' size='small' required helperText={errors ? errors.lastname?.message : null}/>}
                            />
                            <p className='error'>{errors.lastname?.message}</p>
                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Campo obrigatório' }}
                                render={({ field }) => <TextField {...field} variant="outlined" fullWidth label='Informe seu email' size='small' required helperText={errors ? errors.email?.message : null}/>}
                            />
                            <p className='error'>{errors.email?.message}</p>
                                        
                            <Controller
                                name="birth_date"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Campo obrigatório' }}
                                render={({ field }) => <TextField {...field} variant="outlined" label='Data de Nascimento' size='small' required helperText={errors ? errors.birth_date?.message : null}/>}
                            />
                            <p className='error'>{errors.birth_date?.message}</p>

                            <Controller
                                name="cpf"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Campo obrigatório' }}
                                render={({ field }) => <TextField {...field} variant="outlined" label='CPF' size='small' required helperText={errors ? errors.cpf?.message : null}/>}
                            />
                            <p className='error'>{errors.cpf?.message}</p>

                            <Controller
                                name="have_desability"
                                control={control}
                                defaultValue=""
                                render={({ field }) => 
                                    <FormControl sx={{ minWidth: 220, marginBottom:1 }} size="small" required>
                                        <InputLabel id="labeldef">Possui deficiência</InputLabel>
                                        <Select {...field} variant="outlined" label='Possui deficiência' labelId="labeldef">
                                        <MenuItem disabled value=""><em>Selecione uma opção</em></MenuItem>
                                        <MenuItem value={true as any}>Sim</MenuItem>
                                        <MenuItem value={false as any}>Não</MenuItem>
                                        </Select>
                                    </FormControl>
                                }
                                
                            />
                            <p className='error'>{errors.have_desability?.message}</p>

                            <Controller
                                name="own_car"
                                control={control}
                                defaultValue=""
                                render={({ field }) => 
                                    <FormControl sx={{ minWidth: 220, marginBottom:1 }} size="small" required>
                                        <InputLabel id="labelcar">Possui carro próprio?</InputLabel>
                                        <Select {...field} variant="outlined" label='Possui carro próprio?' labelId="labelcar">
                                        <MenuItem disabled value=""><em>Selecione uma opção</em></MenuItem>
                                        <MenuItem value={true as any}>Sim</MenuItem>
                                        <MenuItem value={false as any}>Não</MenuItem>
                                        </Select>
                                    </FormControl>
                                }
                                
                            />

                            <p className='error'>{errors.own_car?.message}</p>

                            <Controller
                                name="sex"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'First name required' }}
                                render={({ field }) => 
                                    <Tooltip title="Escolha o sexo." placement="top-start">
                                        <FormControl sx={{ minWidth: 220 }} size="small" required>
                                            <InputLabel id="labelsex">Sexo</InputLabel>
                                            <Select {...field} variant="outlined" label='Sexo' labelId="labelsex">
                                                <MenuItem disabled value=""><em>Selecione uma opção</em></MenuItem>
                                                <MenuItem value='F'>Feminino</MenuItem>
                                                <MenuItem value='M'>Masculino</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Tooltip>
                                }
                                
                            />
                            <p className='error'>{errors.sex?.message}</p>

                            <Controller
                                name="rg"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Campo obrigatório' }}
                                render={({ field }) => <TextField {...field} variant="outlined" label='Informe o RG' size='small' required helperText={errors ? errors.rg?.message : null}/>}
                            />
                            <p className='error'>{errors.rg?.message}</p>



                            <Controller
                                name="phone"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Campo obrigatório' }}
                                render={({ field }) => <TextField {...field} variant="outlined" label='Informe o telefone' size='small' required helperText={errors ? errors.phone?.message : null}/>}
                            />
                            <p className='error'>{errors.phone?.message}</p>
                                        
                            <Controller
                                name="zip"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Campo obrigatório' }}
                                render={({ field }) => <TextField {...field} variant="outlined" label='Cep' size='small' required helperText={errors ? errors.zip?.message : null}/>}
                            />
                            <p className='error'>{errors.zip?.message}</p>

                            <Controller
                                name="address"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Campo obrigatório' }}
                                render={({ field }) => <TextField {...field} variant="outlined" fullWidth label='Endereço' size='small' required helperText={errors ? errors.address?.message : null}/>}
                            />
                            <p className='error'>{errors.address?.message}</p>

                            <Controller
                                name="district"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Campo obrigatório' }}
                                render={({ field }) => <TextField {...field} variant="outlined" label='Informe o bairro' size='small' required helperText={errors ? errors.district?.message : null}/>}
                            />
                            <p className='error'>{errors.district?.message}</p>

                            <Controller
                                name="city"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Campo obrigatório' }}
                                render={({ field }) => <TextField {...field} variant="outlined" label='Informe a cidade' size='small' required helperText={errors ? errors.city?.message : null}/>}
                            />
                            <p className='error'>{errors.city?.message}</p>

                            <Controller
                                name="uf"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Campo obrigatório' }}
                                render={({ field }) => <TextField {...field} variant="outlined" label='Informe a uf' size='small' required helperText={errors ? errors.uf?.message : null}/>}
                            />
                            <p className='error'>{errors.uf?.message}</p>
                                        
                        </Paper>

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

export default FullUserForm