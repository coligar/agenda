import type {NextPage} from 'next'
import style from './users.module.css'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import {useForm, UseFormSetValue, Controller} from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { toast } from "react-toastify"
import { useEffect } from 'react'
import { mutate } from 'swr'
import { useGetData } from '../../../hooks/useRequest'
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Tooltip } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import PersonIcon from '@mui/icons-material/Person'
import DateRangeIcon from '@mui/icons-material/DateRange'
import PinIcon from '@mui/icons-material/Pin'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import GpsFixedIcon from '@mui/icons-material/GpsFixed'
import ApartmentIcon from '@mui/icons-material/Apartment'
import PublicIcon from '@mui/icons-material/Public'
import AccessibleIcon from '@mui/icons-material/Accessible'
import GroupIcon from '@mui/icons-material/Group'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import RoomIcon from '@mui/icons-material/Room'
import SchoolIcon from '@mui/icons-material/School'
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns'
import StoreIcon from '@mui/icons-material/Store'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import 'dayjs/locale/pt-br'


interface IFormPersonalDataInput 
{
    name: string, 
    lastname: string,
    avatar?: string | null, 
    birth_date: Date | string, 
    cpf: Number, 
    rg: string, 
    sex: string, 
    area_activityId: string,
    have_desability: boolean,
    own_car: boolean,
    scholarity_id: string,
    zip: string,
    address: string,
    number?: string,
    complement?: string | null,
    district: string,
    city: string,
    uf: string,
    phone: string,
    email: string, 
}

interface Props 
{
    url: string
    type: string
    dados?: any | null
}


const fieldvalidations = yup.object({
    name: yup.string().required('Campo obrigatório').max(100,'Permitido no máximo 100 caracteres'),
    /*lastname: yup.string().required('Campo obrigatório').max(100, 'Permitido no máximo 100 caracteres'),
    email: yup.string().email('Email inválido').required('Campo obrigatório'),
    sex: yup.string().required('Campo obrigatório'),
    area_activityId: yup.string().required('Campo obrigatório'),
    birth_date: yup.date().required('Campo obrigatório'),
    cpf: yup.number().required('Campo obrigatório'),
    rg: yup.string().required('Campo obrigatório'),
    have_desability: yup.boolean().required('Campo obrigatório'),
    scholarity_id: yup.string().required('Campo obrigatório'),
    zip: yup.string().required('Campo obrigatório'),
    address: yup.string().required('Campo obrigatório'),
    number: yup.string().required('Campo obrigatório'),
    complement: yup.string().required('Campo obrigatório'),
    district: yup.string().required('Campo obrigatório'),
    city: yup.string().required('Campo obrigatório'),
    uf: yup.string().required('Campo obrigatório'),
    phone: yup.string().required('Campo obrigatório'),*/
})

const setInputValues = (data:any, setValue:UseFormSetValue<IFormPersonalDataInput>) =>
{
    //console.log(data)
    if(data || data !== undefined)
    {
        setValue("name", data.name);
        setValue("lastname", data.lastname)
        setValue("email", data.email)
        setValue("sex", data.sex)
        setValue("area_activityId", data.area_activityId)
        setValue("birth_date", data.birth_date)
        setValue("cpf", data.cpf)
        setValue("rg", data.rg)
        setValue("own_car", data.own_car)
        setValue("have_desability", data.have_desability)
        setValue("scholarity_id", data.scholarity_id)
        setValue("phone", data.phone)
        setValue("zip", data.address[0].zip)
        setValue("address", data.address[0].address)
        setValue("number", data.address[0].number)
        setValue("complement", data.address[0].complement)
        setValue("district", data.address[0].district)
        setValue("city", data.address[0].city)
        setValue("uf", data.address[0].uf)
        setValue("phone", data.phone_contact[0].phone)
    }
}

const PersonalDataForm: NextPage<Props> = (props) => 
{
    const { url, type, dados} = props
    const {data: areas} = useGetData('api/activity')
    const {data: scholarity} = useGetData('api/scholarity')

    const margin_fields = 
    {
        marginRight:1, 
        marginLeft:1,
        marginBottom:2,
        fontSize:'10px'
    }

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
    } = useForm<IFormPersonalDataInput>(
        {
            resolver: yupResolver(fieldvalidations)
        }
    )

    useEffect(() =>
    {
        setInputValues(dados, setValue)
    },[dados, setValue, watch])

    
    async function saveFormData(data: IFormPersonalDataInput) 
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
            console.log(data)
            await fetch(`api/phone/${dados.phone_contact[0].id}`, 
            {
                body: JSON.stringify({phone: data.phone}),
                headers: {"Content-Type": "application/json"},
                method: type
            })

            await fetch(`api/email/${dados.email_contact[0].id}`, 
            {
                body: JSON.stringify({email: data.email}),
                headers: {"Content-Type": "application/json"},
                method: type
            })

            await fetch(`api/address/${dados.address[0].id}`, 
            {
                body: JSON.stringify({
                    address: data.address,
                    city: data.city,
                    complement: data.complement,
                    district: data.district,
                    number: data.number,
                    uf: data.uf,
                    zip: data.zip
                }),
                headers: {"Content-Type": "application/json"},
                method: type
            })
            return await fetch(`${url}/${dados.id}`, 
            {
                body: JSON.stringify(data),
                headers: {"Content-Type": "application/json"},
                method: type
            })

            
        }
    }


    const onSubmit = async (data: IFormPersonalDataInput) => 
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
                    reset()
                }

                toast.success(resp.message, { hideProgressBar: false, autoClose: 2000 })
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


    return(


         
        <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent >
                <Paper>
                    <div className={style.form_lines}>
                        <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Campo obrigatório' }}
                            render={({ field }) => 
                            <TextField {...field} 
                                variant="outlined" 
                                label='Nome' 
                                size='small'
                                fullWidth 
                                required 
                                helperText={errors ? errors.name?.message : null} 
                                placeholder="Informe seu nome"
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon />
                                    </InputAdornment>
                                    ),
                                    style:{fontSize:14},
                                }}
                                InputLabelProps={{
                                    style:{fontSize:14},
                                }}
                                sx={margin_fields}
                            />
                            }
                        />
                        
                        <Controller
                            name="lastname"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Campo obrigatório' }}
                            render={({ field }) => 
                                <TextField {...field} 
                                variant="outlined" 
                                label='Sobrenome' 
                                size='small'
                                fullWidth 
                                required
                                placeholder='Informe seu sobrenome'
                                helperText={errors ? errors.lastname?.message : null} 
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon />
                                    </InputAdornment>
                                    ),
                                    style:{fontSize:14},
                                }}
                                InputLabelProps={{
                                    style:{fontSize:14},
                                }}
                                sx={margin_fields}
                                />
                            }
                        />
                    </div>

                    <div className={style.form_lines}>
                        <Controller
                            name="birth_date"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Campo obrigatório' }}
                            render={({ field:{ ref, ...fieldProps } }) => 
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                                    <DatePicker
                                        {...fieldProps}
                                        inputRef={ref}
                                        renderInput={(params) => 
                                        <TextField {...params} 
                                            size="small" 
                                            fullWidth 
                                            label='Data de nascimento'
                                            required
                                            helperText={errors ? errors.birth_date?.message : null}
                                            sx={margin_fields}
                                            InputLabelProps={{
                                                style:{fontSize:14},
                                            }}
                                        />}
                                    />
                                </LocalizationProvider>
                            }
                        />

                        <Controller
                            name="cpf"
                            control={control}
                            rules={{ required: 'Campo obrigatório' }}
                            render={({ field }) => 
                                <TextField {...field} 
                                variant="outlined" 
                                label='CPF' 
                                size='small' 
                                fullWidth 
                                required
                                helperText={errors ? errors.cpf?.message : null} 
                                placeholder='Informe seu CPF'
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <PinIcon />
                                    </InputAdornment>
                                    ),
                                    style:{fontSize:14},
                                }}
                                InputLabelProps={{
                                    style:{fontSize:14},
                                }}
                                sx={margin_fields}
                                />
                            }
                        />

                        <Controller
                            name="rg"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Campo obrigatório' }}
                            render={({ field }) => 
                                <TextField {...field} 
                                variant="outlined" 
                                label='RG' 
                                size='small'
                                fullWidth 
                                required
                                helperText={errors ? errors.rg?.message : null} 
                                placeholder='Informe seu RG'
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <PinIcon />
                                    </InputAdornment>
                                    ),
                                    style:{fontSize:14},
                                }}
                                InputLabelProps={{
                                    style:{fontSize:14},
                                }}
                                sx={margin_fields}
                                />
                            }
                        />
                    </div>

                    <div className={style.form_lines}>

                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Campo obrigatório' }}
                            render={({ field }) => 
                                <TextField {...field} 
                                    variant="outlined" 
                                    label='E-mail' 
                                    size='small' 
                                    type='email' 
                                    required
                                    fullWidth
                                    placeholder='Informe seu e-mail'
                                    helperText={errors ? errors.email?.message : null}
                                    InputProps={{
                                        startAdornment: (
                                        <InputAdornment position="start">
                                            <MailOutlineIcon />
                                        </InputAdornment>
                                        ),
                                    }}
                                    InputLabelProps={{
                                        style:{fontSize:14},
                                    }}
                                    sx={margin_fields}
                                />
                            }
                        />

                        <Controller
                            name="phone"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Campo obrigatório' }}
                            render={({ field }) => 
                                <TextField {...field} 
                                variant="outlined" 
                                label='Telefone' 
                                size='small'
                                fullWidth 
                                required
                                helperText={errors ? errors.phone?.message : null} 
                                placeholder='Informe seu telefone'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LocalPhoneIcon />
                                        </InputAdornment>
                                    ),
                                    style:{fontSize:14},
                                }}
                                InputLabelProps={{
                                    style:{fontSize:14},
                                }}
                                sx={margin_fields}
                                />
                            }
                        />

                        <Controller
                            name="zip"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Campo obrigatório' }}
                            render={({ field }) => 
                                <TextField {...field} 
                                variant="outlined" 
                                label='CEP' 
                                size='small'
                                fullWidth 
                                required
                                helperText={errors ? errors.zip?.message : null} 
                                placeholder='Informe seu cep'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <GpsFixedIcon />
                                        </InputAdornment>
                                    ),
                                    style:{fontSize:14},
                                }}
                                InputLabelProps={{
                                    style:{fontSize:14},
                                }}
                                sx={margin_fields}
                                />
                            }
                        />

                    </div>

                    <div className={style.form_lines}>

                        <Controller
                            name="address"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Campo obrigatório' }}
                            render={({ field }) => 
                                <TextField {...field} 
                                    variant="outlined" 
                                    label='Endereço' 
                                    size='small' 
                                    required
                                    fullWidth
                                    placeholder='Informe seu endereço'
                                    helperText={errors ? errors.address?.message : null}
                                    InputProps={{
                                        startAdornment: (
                                        <InputAdornment position="start">
                                            <RoomIcon />
                                        </InputAdornment>
                                        ),
                                    }}
                                    InputLabelProps={{
                                        style:{fontSize:14},
                                    }}
                                    sx={margin_fields}
                                />
                            }
                        />

                        <Controller
                            name="complement"
                            control={control}
                            defaultValue=""
                            render={({ field }) => 
                                <TextField {...field} 
                                variant="outlined" 
                                label='Complemento' 
                                size='small'
                                helperText={errors ? errors.complement?.message : null} 
                                placeholder='Complemento'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <RoomIcon />
                                        </InputAdornment>
                                    ),
                                    style:{fontSize:14},
                                }}
                                InputLabelProps={{
                                    style:{fontSize:14},
                                }}
                                sx={margin_fields}
                                />
                            }
                        />

                        <Controller
                            name="number"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Campo obrigatório' }}
                            render={({ field }) => 
                                <TextField {...field} 
                                variant="outlined" 
                                label='Número' 
                                size='small'
                                required
                                type="number"
                                helperText={errors ? errors.number?.message : null} 
                                placeholder='Informe o número'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <RoomIcon />
                                        </InputAdornment>
                                    ),
                                    style:{fontSize:14},
                                }}
                                InputLabelProps={{
                                    style:{fontSize:14},
                                }}
                                sx={margin_fields}
                                />
                            }
                        />

                    </div>

                    <div className={style.form_lines}>

                        <Controller
                            name="district"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Campo obrigatório' }}
                            render={({ field }) => 
                                <TextField {...field} 
                                variant="outlined" 
                                label='Bairro' 
                                size='small'
                                fullWidth 
                                required
                                helperText={errors ? errors.district?.message : null} 
                                placeholder='Informe seu bairro'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <ApartmentIcon />
                                        </InputAdornment>
                                    ),
                                    style:{fontSize:14},
                                }}
                                InputLabelProps={{
                                    style:{fontSize:14},
                                }}
                                sx={margin_fields}
                                />
                            }
                        />

                        <Controller
                            name="city"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Campo obrigatório' }}
                            render={({ field }) => 
                                <TextField {...field} 
                                variant="outlined" 
                                label='Cidade' 
                                size='small'
                                fullWidth 
                                required
                                helperText={errors ? errors.city?.message : null} 
                                placeholder='Informe sua cidade'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <ApartmentIcon />
                                        </InputAdornment>
                                    ),
                                    style:{fontSize:14},
                                }}
                                InputLabelProps={{
                                    style:{fontSize:14},
                                }}
                                sx={margin_fields}
                                />
                            }
                        />
                        <Controller
                            name="uf"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Campo obrigatório' }}
                            render={({ field }) => 
                                <TextField {...field} 
                                variant="outlined" 
                                label='UF' 
                                size='small'
                                fullWidth 
                                required
                                helperText={errors ? errors.uf?.message : null} 
                                placeholder='Informe o estado'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PublicIcon />
                                        </InputAdornment>
                                    ),
                                    style:{fontSize:14},
                                }}
                                InputLabelProps={{
                                    style:{fontSize:14},
                                }}
                                sx={margin_fields}
                                />
                            }
                        />

                    </div>

                    <div className={style.form_lines}>
                        <Controller
                            name="have_desability"
                            control={control}
                            rules={{ required: 'Campo obrigatório' }}
                            render={({ field }) => 
                        
                                <TextField 
                                    {...field}
                                    fullWidth 
                                    required
                                    select
                                    label="Possui deficiência?"
                                    placeholder="Informe se você tem deficiência"
                                    variant="outlined" 
                                    size="small"
                                    margin="dense"
                                    helperText={errors ? errors.have_desability?.message : null}
                                    SelectProps={{ multiple: false }}
                                    InputProps={{
                                        startAdornment: (
                                        <InputAdornment position="start">
                                            <AccessibleIcon />
                                        </InputAdornment>
                                        ),
                                        placeholder: "Informe se você tem deficiência",
                                        style:{fontSize:14},
                                    }}
                                    InputLabelProps={{
                                        style:{fontSize:14},
                                    }}
                                    sx={margin_fields}
                                >
                                    <MenuItem value={true as any}>Sim</MenuItem>
                                    <MenuItem value={false as any}>Não</MenuItem>
                                </TextField>
                            }
                        />
                        <Controller
                            name="sex"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Campo obrigatório' }}
                            render={({ field }) => 
                                                        
                                <TextField 
                                    {...field}
                                    required
                                    fullWidth
                                    select
                                    label="Sexo" 
                                    variant="outlined" 
                                    size="small"
                                    margin="dense"
                                    helperText={errors ? errors.sex?.message : null}
                                    SelectProps={{ multiple: false }}
                                    InputProps={{
                                        startAdornment: (
                                        <InputAdornment position="start">
                                            <GroupIcon />
                                        </InputAdornment>
                                        ),
                                        style:{fontSize:14},
                                    }}
                                    InputLabelProps={{
                                        style:{fontSize:14},
                                    }}
                                    sx={margin_fields}
                                >
                                    <MenuItem value='F'>Feminino</MenuItem>
                                    <MenuItem value='M'>Masculino</MenuItem>
                                </TextField>
                            }
                        />

                        <Controller
                            name="own_car"
                            control={control}
                            rules={{ required: 'Campo obrigatório' }}
                            render={({ field }) => 
                            
                                <TextField 
                                    {...field}
                                    required
                                    fullWidth
                                    select
                                    label="Possui veículo próprio?" 
                                    variant="outlined"
                                    size="small"
                                    margin="dense"
                                    placeholder='Informe se você tem veículo próprio'
                                    helperText={errors ? errors.own_car?.message : null}
                                    SelectProps={{ multiple: false }}
                                    InputProps={{
                                        startAdornment: (
                                        <InputAdornment position="start">
                                            <DirectionsCarIcon />
                                        </InputAdornment>
                                        ),
                                        style:{fontSize:14},
                                    }}
                                    InputLabelProps={{
                                        style:{fontSize:14},
                                    }}
                                    sx={margin_fields}
                                >
                                    <MenuItem value={true as any}>Sim</MenuItem>
                                    <MenuItem value={false as any}>Não</MenuItem>
                                </TextField>
                            }
                        />
                    </div>
                </Paper>
            </CardContent>

            

            <CardContent>
                <Paper sx={{marginBottom:2}}>
                    <div className={style.form_lines}>
                        <div className={style.title}>
                            <span className={style.title}><strong>Área de interesse e formação</strong></span><br/>
                            <span className={style.subtitle}>Defina sua área de interesse e formação</span>
                        </div>
                    </div>

                    <div className={style.form_lines}>

                        <Controller
                            name="area_activityId"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Campo obrigatório' }}
                            render={({ field }) => 

                                <TextField 
                                    {...field}
                                    id="job" 
                                    required
                                    fullWidth
                                    select
                                    label="Escolha sua área de interesse"
                                    placeholder="Informe se você tem deficiência"
                                    variant="outlined" 
                                    size="small"
                                    margin="dense"
                                    SelectProps={{ multiple: false }}
                                    InputProps={{
                                        startAdornment: (
                                        <InputAdornment position="start">
                                            <FollowTheSignsIcon />
                                        </InputAdornment>
                                        ),
                                        style:{fontSize:14},
                                    }}
                                    InputLabelProps={{
                                        style:{fontSize:14},
                                    }}
                                    sx={margin_fields}
                                >
                                    {areas && areas.map((item:any) => {
                                        return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                    })} 
                                </TextField>
                            }
                        />

                        <Divider orientation="vertical" flexItem variant="middle" sx={{marginRight:2, marginLeft:2}}/>

                        <Controller
                            name="scholarity_id"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Campo obrigatório' }}
                            render={({ field }) =>     
                            <TextField 
                                {...field}
                                id="formacao" 
                                required
                                fullWidth
                                select
                                label="Escolha sua formação" 
                                variant="outlined" 
                                size="small"
                                margin="dense"
                                SelectProps={{ multiple: false }}
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <SchoolIcon />
                                    </InputAdornment>
                                    ),
                                    style:{fontSize:14},
                                }}
                                InputLabelProps={{
                                    style:{fontSize:14},
                                }}
                                sx={margin_fields}
                            >
                                {scholarity && scholarity.map((item:any) => {
                                    return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                })} 
                            </TextField>
                            }
                        />

                    </div>
                </Paper>
            </CardContent>


            <Button type="submit" variant="contained" sx={{ mt: 3 }} disabled={isSubmitting}>
                {isSubmitting ? "salvando..." : `enviar`}
            </Button>
            

        </form>
    
 

    )
}

export default PersonalDataForm