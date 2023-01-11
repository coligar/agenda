import style from './resume.module.css'
import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

import InputAdornment from '@mui/material/InputAdornment'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'


import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

import Collapse from '@mui/material/Collapse'
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

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { toast } from "react-toastify"

import { mutate } from 'swr'
import { useGetData } from '../../../hooks/useRequest'
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Tooltip } from '@mui/material'
import { DateTimePickerTabsClasses } from '@mui/x-date-pickers'
import { Controller, UseFormSetValue, useForm } from 'react-hook-form'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import 'dayjs/locale/pt-br'



const ExpandMore = styled((props:any) => 
{
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface IFormPersonalDataInput 
{
    name: string, 
    lastname: string,
    avatar: string | null, 
    birth_date: Date, 
    cpf: string, 
    rg: string, 
    sex: string, 
    area_activityId: string,
    have_desability: boolean,
    own_car: boolean,
    scholarity_id: string,
    zip: string,
    address: string,
    number: string,
    complement: string | null,
    district: string,
    city: string,
    uf: string,
    phone: string,
    email: string, 
}


interface IFormResume
{
    sumary: string,
    last_company: string,
    last_admission: Date,
    last_resignation: Date,
    last_activity: string,
    penultimate_company: string,
    penultimate_admission: Date,
    penultimate_resignation: Date,
    penultimate_activity: string,
}


const fieldvalidations = yup.object({
    name: yup.string().required('Campo obrigatório').max(100,'Permitido no máximo 100 caracteres'),
    lastname: yup.string().required('Campo obrigatório').max(100, 'Permitido no máximo 100 caracteres'),
    email: yup.string().email('Email inválido').required('Campo obrigatório'),
    sex: yup.string().required('Campo obrigatório'),
    area_activityId: yup.boolean().required('Campo obrigatório'),
    birth_date: yup.string().required('Campo obrigatório'),
    cpf: yup.string().required('Campo obrigatório'),
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
    phone: yup.string().required('Campo obrigatório'),
    sumary: yup.string().required('Campo obrigatório'),
    last_company: yup.string().required('Campo obrigatório'),
    last_admission: yup.date().required('Campo obrigatório'),
    last_resignation: yup.date().required('Campo obrigatório'),
    last_activity: yup.string().required('Campo obrigatório'),
    penultimate_company: yup.string().required('Campo obrigatório'),
    penultimate_admission: yup.date().required('Campo obrigatório'),
    penultimate_resignation: yup.date().required('Campo obrigatório'),
    penultimate_activity: yup.string().required('Campo obrigatório'),
})

const setInputPersonalDataValues = (data:any, setValue:UseFormSetValue<IFormPersonalDataInput>) =>
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
        setValue("rg", data.rg)
        setValue("have_desability", data.have_desability)
        setValue("scholarity_id", data.scholarity_id)
        setValue("zip", data.zip)
        setValue("address", data.address)
        setValue("number", data.number)
        setValue("complement", data.complement)
        setValue("district", data.district)
        setValue("city", data.city)
        setValue("uf", data.uf)
        setValue("phone", data.phone)
        setValue("phone", data.phone)
    }
}


const setInputResumelDataValues = (data:any, setValue:UseFormSetValue<IFormResume>) =>
{
    //console.log(data)
    if(data || data !== undefined)
    {
        setValue("sumary", data.sumary);
        setValue("last_company", data.last_company)
        setValue("last_admission", data.last_admission)
        setValue("last_resignation", data.last_resignation)
        setValue("last_activity", data.last_activity)
        setValue("penultimate_company", data.birth_date)
        setValue("penultimate_admission", data.penultimate_admission)
        setValue("penultimate_resignation", data.penultimate_resignation)
        setValue("penultimate_activity", data.penultimate_activity)
    }
}




const Resume = (props:any) => 
{
    const {data: areas} = useGetData('api/activity')
    const {data: scholarity} = useGetData('api/scholarity')

    const [expanded, setExpanded] = useState(false);
    const [deficiencia, setDeficiencia] = useState('');
    const [sexo, setSexo] = useState('');
    const [veiculo, setVeiculo] = useState('');
    const [job, setJob] = useState('');
    const [formacao, setFormacao] = useState('');
    const [warning, setWarning] = useState('Clique na seta para visualizar o seu currículo');
    const [enablebuttom, setEnableButtom] = useState(<Button disabled variant="contained" size="small">cadastrar</Button>)

    let button_name = 'Enviar'

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
    } = useForm<any>(
        {
            resolver: yupResolver(fieldvalidations)
        }
    )


    const handleExpandClick = () => 
    {
        setExpanded(!expanded)
        let warning = (!expanded) ? 'Clique na seta para ocultar o currículo' : 'Clique na seta para visualizar o seu currículo'
        setWarning(warning)
    }

    const handleEnableButtomClick = (event:any) =>
    {
        let enablebuttom = (!event.target.checked) ? <Button disabled variant="contained" size="small">cadastrar</Button> : <Button variant="contained" size="small">cadastrar</Button>
        setEnableButtom(enablebuttom)
    }

    async function saveFormData(data:IFormPersonalDataInput | IFormResume, type:string = 'PUT', url:string='', id: string) 
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
            return await fetch(`${url}/${id}`, 
            {
                body: JSON.stringify(data),
                headers: {"Content-Type": "application/json"},
                method: type
            })
        }
    }

    const onSubmitPersonalData = async (data: IFormPersonalDataInput) => 
    {
    }


    const onSubmitResumeData = async (data: IFormResume) => 
    {
    }


    const margin_fields = 
    {
        marginRight:1, 
        marginLeft:1,
        marginBottom:2,
        fontSize:'10px'
    }


    return(
        <>
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
                    <CardHeader className={style.card}
                        action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                        }
                        title="Dados pessoais"
                        subheader="Informe seus dados pessoais abaixo"
                    />

                    <form onSubmit={handleSubmit(onSubmitPersonalData)}>
                        <CardContent >

                            <Paper>

                                <div className={style.form_lines}>
                                <Controller
                                    name="name"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: 'Campo obrigatório' }}
                                    render={({ field }) => 
                                        <TextField 
                                            {...field}
                                            id="nome" 
                                            required
                                            fullWidth
                                            label="Nome"
                                            placeholder="Informe seu nome"
                                            variant="outlined" 
                                            size="small"
                                            margin="dense"
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
                                    name="birth_date"
                                    control={control}
                                    rules={{ required: 'Campo obrigatório' }}
                                    defaultValue=""
                                    render={({ field:{ ref, ...fieldProps } }) => 
                                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                                            <DatePicker
                                                {...fieldProps}
                                                inputRef={ref}
                                                renderInput={(params) =>
                                                <TextField 
                                                    {...params}
                                                    id="datanascimento" 
                                                    required
                                                    fullWidth
                                                    label="Data de nascimento" 
                                                    variant="outlined" 
                                                    size="small"
                                                    margin="dense"
                                                    placeholder='Data de nascimento'
                                                    sx={margin_fields}
                                                />}
                                            />
                                        </LocalizationProvider>
                                    }
                                />
                                 <Controller
                                    name="cpf"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: 'Campo obrigatório' }}
                                    render={({ field }) => 
                                        <TextField 
                                            {...field}
                                            id="cpf" 
                                            required
                                            fullWidth
                                            label="CPF" 
                                            variant="outlined"
                                            size="small"
                                            margin="dense"
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

                                </div>


                                <div className={style.form_lines}>
                                <Controller
                                    name="email"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: 'Campo obrigatório' }}
                                    render={({ field }) => 
                                        <TextField 
                                            {...field}
                                            id="email" 
                                            required
                                            fullWidth
                                            label="E-mail" 
                                            variant="outlined" 
                                            size="small"
                                            margin="dense"
                                            placeholder='Informe seu e-mail'
                                            InputProps={{
                                                startAdornment: (
                                                <InputAdornment position="start">
                                                    <MailOutlineIcon />
                                                </InputAdornment>
                                                ),
                                                style:{fontSize:14},
                                                //pattern: '/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i',
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
                                        <TextField 
                                            {...field}
                                            id="celular" 
                                            required
                                            fullWidth
                                            label="Telefone celular" 
                                            variant="outlined" 
                                            size="small"
                                            margin="dense"
                                            placeholder='Número do celular'
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
                                    
                                        <TextField 
                                            {...field}
                                            id="cep" 
                                            required
                                            fullWidth
                                            label="CEP" 
                                            variant="outlined" 
                                            size="small"
                                            margin="dense"
                                            placeholder='Informe seu CEP'
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
                                        <TextField 
                                            {...field}
                                            id="endereco" 
                                            required
                                            fullWidth
                                            label="Endereço" 
                                            variant="outlined"
                                            size="small"
                                            margin="dense"
                                            placeholder='Seu endereço'
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
                                        name="district"
                                        control={control}
                                        defaultValue=""
                                        rules={{ required: 'Campo obrigatório' }}
                                        render={({ field }) => 
                                            
                                        <TextField 
                                            {...field}
                                            id="bairro" 
                                            required
                                            fullWidth
                                            label="Bairro" 
                                            variant="outlined"
                                            size="small"
                                            margin="dense"
                                            placeholder='Seu bairro'
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

                                        <TextField 
                                            {...field}
                                            id="cidade" 
                                            required
                                            fullWidth
                                            label="Cidade" 
                                            variant="outlined"
                                            size="small"
                                            margin="dense"
                                            placeholder='Cidade'
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
                                        <TextField
                                            {...field} 
                                            id="uf"
                                            required
                                            fullWidth
                                            label="UF" 
                                            placeholder="UF"
                                            variant="outlined" 
                                            size="small"
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
                                    defaultValue=""
                                    rules={{ required: 'Campo obrigatório' }}
                                    render={({ field }) => 
                                
                                        <TextField 
                                            {...field}
                                            id="deficiencia"
                                            fullWidth 
                                            required
                                            select
                                            label="Possui deficiência?"
                                            placeholder="Informe se você tem deficiência"
                                            variant="outlined" 
                                            size="small"
                                            margin="dense"
                                            value= {deficiencia}
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
                                            <MenuItem value="true">Sim</MenuItem>
                                            <MenuItem value="false">Não</MenuItem>
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
                                            id="sexo" 
                                            required
                                            fullWidth
                                            select
                                            label="Sexo" 
                                            variant="outlined" 
                                            size="small"
                                            margin="dense"
                                            value= {sexo}
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
                                    defaultValue=""
                                    rules={{ required: 'Campo obrigatório' }}
                                    render={({ field }) => 
                                    
                                        <TextField 
                                            {...field}
                                            id="veiculo" 
                                            required
                                            fullWidth
                                            select
                                            label="Possui veículo próprio?" 
                                            variant="outlined"
                                            size="small"
                                            margin="dense"
                                            value= {veiculo}
                                            placeholder='Informe se você tem veículo próprio'
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
                                            <MenuItem value="Sim">Sim</MenuItem>
                                            <MenuItem value="Não">Não</MenuItem>
                                        </TextField>
                                    }
                                />
                                                                    
                                </div>

                            </Paper>

                        </CardContent>

                        <CardContent>

                            <Paper sx={{marginBottom:2}}>

                                <div className={style.title}>
                                    <span>Área de interesse e formação</span>
                                    <span className={style.subtitle}>Defina sua área de interesse e formação</span>
                                </div>

                                <div className={style.form_lines_center}>

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
                                            value= {job}
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
                                            value= {formacao}
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
                                <Button type="submit" variant="contained" sx={{ mt: 3 }} disabled={isSubmitting}>
                                    {isSubmitting ? "salvando..." : `${button_name}`}
                                </Button>

                                </Paper>

                        </CardContent>
                    </form>

                    <CardActions disableSpacing>
                        
                        <div style={{display: 'flex', alignItems: 'right', justifyContent: 'right', width:'100%', fontSize:'14px'}}>
                           {warning}
                        </div>
                        
                        <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="veja mais"
                        >
                            <ExpandMoreIcon sx={{background:"#CCC", borderRadius:"50%"}}/>
                        </ExpandMore>

                    </CardActions>

                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        
                        <CardContent>
                            
                            

                            <Paper sx={{marginBottom:2}}>

                                <div className={style.title}>
                                    <span>Experiência profissional</span>
                                    <span className={style.subtitle}>Descreva abaixo as suas últimas duas experiências profissionais</span>
                                </div>
                                <div className={style.form_lines_nopadding}>
                                        <Controller
                                            name="sumary"
                                            control={control}
                                            defaultValue=""
                                            rules={{ required: 'Campo obrigatório' }}
                                            render={({ field }) => 
                                                <TextField
                                                    id="sumary"
                                                    required
                                                    fullWidth
                                                    size="small"
                                                    margin="dense"
                                                    maxRows={5}
                                                    label="Fale sobre você"
                                                    placeholder="Fale um pouco sobre você. Quais são suas habilidades, no que você é bom..."
                                                    multiline
                                                    variant="outlined" 
                                                    sx={margin_fields}
                                                    InputProps={{
                                                        style:{fontSize:14},
                                                    }}
                                                    InputLabelProps={{
                                                        style:{fontSize:14},
                                                    }}
                                                />
                                            }
                                            />

                                        </div>

                                <div className={style.form_lines_center}>
                                

                                    <div className={style.form_lines_col}>

                                        <div className={style.form_lines_nopadding}>
                                        <Controller
                                        name="last_company"
                                        control={control}
                                        defaultValue=""
                                        rules={{ required: 'Campo obrigatório' }}
                                        render={({ field }) =>  
                                                <TextField 
                                                    id="ultima_empresa" 
                                                    required
                                                    fullWidth
                                                    label="Nome da última empresa"
                                                    placeholder="Nome da última empresa"
                                                    variant="outlined" 
                                                    size="small"
                                                    margin="dense"
                                                    InputProps={{
                                                        startAdornment: (
                                                        <InputAdornment position="start">
                                                            <StoreIcon />
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

                                        <div className={style.form_lines_nopadding}>
                                       
                                            <Controller
                                                name="last_admission"
                                                control={control}
                                                rules={{ required: 'Campo obrigatório' }}
                                                defaultValue=""
                                                render={({ field:{ ref, ...fieldProps } }) => 
                                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                                                        <DatePicker
                                                            {...fieldProps}
                                                            inputRef={ref}
                                                            renderInput={(params) =>
                                                            <TextField 
                                                                {...params}
                                                                id="dataadmissao_ultima_empresa" 
                                                                required
                                                                fullWidth
                                                                label="Data admissão" 
                                                                variant="outlined" 
                                                                size="small"
                                                                margin="dense"
                                                                placeholder='Data da admissão na última empresa'
                                                                
                                                                InputLabelProps={{
                                                                    style:{fontSize:14},
                                                                }}
                                                                sx={margin_fields}
                                                            />}
                                                        />
                                                    </LocalizationProvider>
                                                    }
                                            />

                                            <Controller
                                                name="last_resignation"
                                                control={control}
                                                rules={{ required: 'Campo obrigatório' }}
                                                defaultValue=""
                                                render={({ field:{ ref, ...fieldProps } }) => 
                                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                                                        <DatePicker
                                                            {...fieldProps}
                                                            inputRef={ref}
                                                            renderInput={(params) =>
                                                            <TextField 
                                                                {...params}
                                                                id="datademissao_ultima_empresa" 
                                                                required
                                                                fullWidth
                                                                label="Data demissão" 
                                                                variant="outlined" 
                                                                size="small"
                                                                margin="dense"
                                                                placeholder='Data da deissão na última empresa'
                                                                
                                                                InputLabelProps={{
                                                                    style:{fontSize:14},
                                                                }}
                                                                sx={margin_fields}
                                                            />}
                                                        />
                                                    </LocalizationProvider>
                                                    }
                                                />

                                        </div>

                                        <div className={style.form_lines_nopadding}>
                                        <Controller
                                            name="last_activity"
                                            control={control}
                                            defaultValue=""
                                            rules={{ required: 'Campo obrigatório' }}
                                            render={({ field }) => 

                                                <TextField
                                                    {...field}
                                                    id="desc_ultima_empresa"
                                                    required
                                                    fullWidth
                                                    size="small"
                                                    margin="dense"
                                                    maxRows={4}
                                                    label="Descreva suas atividades aqui"
                                                    placeholder="Faça uma descrição resumida das atividades que você realizou na última empresa"
                                                    multiline
                                                    variant="outlined"
                                                    sx={margin_fields}
                                                    InputProps={{
                                                        style:{fontSize:14},
                                                    }}
                                                    InputLabelProps={{
                                                        style:{fontSize:14},
                                                    }}
                                                />
                                        }
                                        />

                                        </div>

                                    </div>
                                    
                                    <Divider orientation="vertical" flexItem variant="middle" sx={{marginRight:2, marginLeft:2}}/>
                                    
                                    <div className={style.form_lines_col}>

                                        <div className={style.form_lines_nopadding}>
                                        <Controller
                                            name="penultimate_company "
                                            control={control}
                                            defaultValue=""
                                            rules={{ required: 'Campo obrigatório' }}
                                            render={({ field }) => 
                                                <TextField 
                                                    {...field}
                                                    id="penultima_empresa" 
                                                    required
                                                    fullWidth
                                                    label="Nome da penúltima empresa"
                                                    placeholder="Nome da penúltima empresa"
                                                    variant="outlined" 
                                                    size="small"
                                                    margin="dense"
                                                    InputProps={{
                                                        startAdornment: (
                                                        <InputAdornment position="start">
                                                            <StoreIcon />
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

                                        <div className={style.form_lines_nopadding}>

                                        <Controller
                                                name="penultimate_admission"
                                                control={control}
                                                rules={{ required: 'Campo obrigatório' }}
                                                defaultValue=""
                                                render={({ field:{ ref, ...fieldProps } }) => 
                                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                                                        <DatePicker
                                                            {...fieldProps}
                                                            inputRef={ref}
                                                            renderInput={(params) =>
                                                            <TextField 
                                                                {...params}
                                                                id="dataadmissao_penultima_empresa" 
                                                                required
                                                                fullWidth
                                                                label="Data admissão" 
                                                                variant="outlined" 
                                                                size="small"
                                                                margin="dense"
                                                                placeholder='Data da admissão na penúltima empresa'
                                                                
                                                                InputLabelProps={{
                                                                    style:{fontSize:14},
                                                                }}
                                                                sx={margin_fields}
                                                            />}
                                                        />
                                                    </LocalizationProvider>
                                                    }
                                            />

                                            <Controller
                                                name="penultimate_resignation"
                                                control={control}
                                                rules={{ required: 'Campo obrigatório' }}
                                                defaultValue=""
                                                render={({ field:{ ref, ...fieldProps } }) => 
                                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                                                        <DatePicker
                                                            {...fieldProps}
                                                            inputRef={ref}
                                                            renderInput={(params) =>
                                                            <TextField 
                                                                {...params}
                                                                id="datademissao_penultima_empresa" 
                                                                required
                                                                fullWidth
                                                                label="Data demissão" 
                                                                variant="outlined" 
                                                                size="small"
                                                                margin="dense"
                                                                placeholder='Data da deissão na penúltima empresa'
                                                                
                                                                InputLabelProps={{
                                                                    style:{fontSize:14},
                                                                }}
                                                                sx={margin_fields}
                                                            />}
                                                        />
                                                    </LocalizationProvider>
                                                    }
                                                />

                                        </div>

                                        <div className={style.form_lines_nopadding}>
                                        <Controller
                                            name="penultimate_activity"
                                            control={control}
                                            defaultValue=""
                                            rules={{ required: 'Campo obrigatório' }}
                                            render={({ field }) => 
                                                <TextField
                                                    id="desc_penultima_empresa"
                                                    required
                                                    fullWidth
                                                    size="small"
                                                    margin="dense"
                                                    maxRows={5}
                                                    label="Descreva suas atividades aqui"
                                                    placeholder="Faça uma descrição resumida das atividades que você realizou na penúltima empresa"
                                                    multiline
                                                    variant="outlined" 
                                                    sx={margin_fields}
                                                    InputProps={{
                                                        style:{fontSize:14},
                                                    }}
                                                    InputLabelProps={{
                                                        style:{fontSize:14},
                                                    }}
                                                />
                                            }
                                            />

                                        </div>

                                    </div>
                            
                                </div>

                            </Paper>
                                
                            <div className={style.form_footer}>

                                <FormControlLabel 
                                    control={<Switch />}
                                    id="ciente"
                                    label="Estou ciente que meu currículo ficará em nossa base de dados por 2 meses" 
                                    labelPlacement="start" 
                                    sx={{fontSize:0.85}}
                                    value= {enablebuttom}
                                    onChange= {handleEnableButtomClick}
                                />

                                <Divider orientation="vertical" flexItem variant="middle" sx={{marginRight:2, marginLeft:2}}/>
                                {enablebuttom}

                            </div>

                        </CardContent>
                    </Collapse>
                </Card>
            </Box>
        
        </>
    )
}

export default Resume