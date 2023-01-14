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

import PersonalDataForm from '../users/personalDataForm'
import SimpleResumeForm from '../resume/simpleResumeForm'



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

    const {data: user} = useGetData('api/user/clcqwlzeo00011y7eaxr2w5mi')

    const [expanded, setExpanded] = useState(false);
    const [warning, setWarning] = useState('Clique na seta para visualizar o seu currículo');
    const [enablebuttom, setEnableButtom] = useState(<Button disabled variant="contained" size="small" type="submit">enviar</Button>)

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
        console.log(data)
        console.log(1)
        console.log(watch('name'))
    }


    const onSubmitResumeData = async (data: IFormResume) => 
    {
        console.log(data)
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

                    <PersonalDataForm type='PUT' url='api/user' dados={user}/>

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
                                <SimpleResumeForm  type='PUT' url='api/curriculo' dados={user}/>    
                            </CardContent>
                    </Collapse>
                </Card>
            </Box>
        
        </>
    )
}

export default Resume