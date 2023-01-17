import React, {useState, useEffect} from 'react'
import Style from './scheduleinterview.module.css'

import { prisma } from '../../../lib/prisma'

import DateRangeIcon from '@mui/icons-material/DateRange'
import PersonIcon from '@mui/icons-material/Person'

import {useForm, UseFormSetValue, Controller} from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { toast } from 'react-toastify'

import { useGetData } from '../../../hooks/useRequest'

import { Input, TextField, Select, MenuItem, FormControl, InputLabel, Button, Tooltip, FormControlLabel, Paper, Switch, Divider, Box, Card, Collapse, CardContent, IconButton, CardHeader, InputAdornment, CardActions } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import 'dayjs/locale/pt-br'

interface IFormInput 
{
    interviewer: string,
    starttime: Date | string, 
    endtime: Date | string,
    day: Date | string,
    note: string,
    userId: string,
    schedule_typeId: string,
    area_activityId: string
}

const fieldvalidations = yup.object({

    day: yup.string().required('Campo obrigatório'),
    starttime: yup.date().required('Campo obrigatório'),
    endtime: yup.date().required('Campo obrigatório'),
    interviewer: yup.string().required('Campo obrigatório'),
})



const ScheduleInterview = (props:any) => 
{
    const {data: users} = useGetData('api/user')
    let interviewrs = users.filter((val:any) => val.role === 'ADMIN')

    let userId = props.data.id
    let schedule_typeId = 'clc6zshgr000e1yxw3u0gp328'
    let area_activityId = props.data.area_activityId

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

    async function saveFormData(data: IFormInput) 
    {
        return await fetch('api/schedule', 
        {
            body: JSON.stringify(data),
            headers: {"Content-Type": "application/json"},
            method: 'POST'
        })
    }


    const onSubmit = async (data: IFormInput) => 
    { 
        try 
        {
            if(Number(new Date(data.day)) < Number(new Date()))
            {
                toast.error(`A data da entrevista informada, não pode ser anterior ao dia de hoje.`, { hideProgressBar: false, autoClose: 2000 })
                return
            }

            if(data.starttime >= data.endtime)
            {
                toast.error(`A hora de início não pode ser maior ou igual que a hora do fim da entrevista.`, { hideProgressBar: false, autoClose: 2000 })
                return
            }

            data['userId'] = userId
            data['area_activityId'] = area_activityId
            data['schedule_typeId'] = schedule_typeId
            data['day'] = new Date(data.day)

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
                reset()
                toast.success(resp.message, { hideProgressBar: false, autoClose: 2000 })
            } 
            props.closeWindow()
        } 
        catch (error) 
        {
            toast.error(`Erro ao criar agendamento. Tente novamente mais tarde.`)
        }
        
    }

    
    return(

        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={Style.container}>

                    <div className={Style.colicon}>

                        <DateRangeIcon fontSize='large' sx={{fontSize:'55px'}}/>

                    </div>

                    <div className={Style.colform}>
                        
                        <div className={Style.form_lines}>

                            Agendamento de entrevista para<br/>

                            <strong>{props.data.name}</strong> - Área: <strong>{props.data.area_activity.name}</strong>
                            
                        </div>

                        <div className={Style.form_lines}>

                            Entrevistador<br/>
                            

                            <Controller
                                name="interviewer"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Campo obrigatório' }}
                                render={({ field }) => 
                                    <FormControl fullWidth size="small" required>
                                        <Select {...field} variant="outlined">
                                            <MenuItem disabled value=""><em>Selecione um entrevistador</em></MenuItem>
                                            {interviewrs && interviewrs.map((item:any) => {
                                                return <MenuItem key={item.id} value={item.name +' '+item.lastname}>{item.name +' '+item.lastname}</MenuItem>
                                            })}   
                                        </Select>
                                    </FormControl>
                                }
                                
                            />
                            <p className='error'>{errors.interviewer?.message}</p>
                        </div>

                        <div className={Style.form_lines}>
                            Data da entrevista<br/>

                            <Controller
                                name="day"
                                control={control}
                                rules={{ required: 'Campo obrigatório' }}
                                defaultValue=""
                                render={({ field:{ ref, ...fieldProps } }) => 
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                                        <DatePicker
                                            {...fieldProps}
                                            inputRef={ref}
                                            renderInput={(params) => <TextField {...params} size="small" fullWidth/>}
                                        />
                                    </LocalizationProvider>
                                }
                            />
                            <p className='error'>{errors.day?.message}</p>
                        </div>

                        <div className={Style.form_double}>
                            <div>
                                Início da entrevista <br/>
                                <Controller
                                    name="starttime"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: 'Campo obrigatório' }}
                                    render={({ field:{ ref, ...fieldProps } }) => 
                                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                                            <TimePicker
                                                {...fieldProps}
                                                inputRef={ref}
                                                renderInput={(params) => <TextField {...params} size="small"/>}
                                            />
                                        </LocalizationProvider>
                                    }
                                />
                                <p className='error'>{errors.starttime?.message}</p>
                            </div>
                            <div>
                                Fim da entrevista <br/>
                                <Controller
                                    name="endtime"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: 'Campo obrigatório' }}
                                    render={({ field:{ ref, ...fieldProps } }) => 
                                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                                            <TimePicker
                                                {...fieldProps}
                                                inputRef={ref}
                                                renderInput={(params) => <TextField {...params} size="small"/>}
                                            />
                                        </LocalizationProvider>
                                    }
                                />
                                <p className='error'>{errors.starttime?.message}</p>

                            </div>
                        </div>

                        <div className={Style.form_lines}>

                            Observação<br/>
                            <Controller
                                name="note"
                                control={control}
                                defaultValue=""
                                render={({ field }) => 

                                    <TextField
                                        {...field}
                                        id="interview_note"
                                        fullWidth
                                        size="small"
                                        margin="dense"
                                        rows={5}
                                        label="Digite alguma observação aqui"
                                        placeholder="Descreva aqui alguma nota que você deseja deixar ao candidato"
                                        multiline
                                        variant="outlined" 
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

                <div className={Style.footer}>

                    <Button 
                        variant="outlined"
                        size="small"
                        sx={{marginRight:'5px', color:'#A7A7A7', border:'solid 1px #A7A7A7'}}
                        onClick = {() => props.closeWindow()}
                    >
                        cancelar
                    </Button> 
                    
                    <Button
                        variant="outlined"
                        size="small"
                        type="submit"
                        /*onClick=
                            {
                                () => 
                                props.dialog({
                                    isOpen:true,
                                    maintitle: 'Confirmar Agendamento',
                                    title: 'Tem certeza que deseja marcar o agendamento?',
                                    subTitle: 'Você não será capaz de desfazer esta operação',
                                    type: 'confirm',
                                    onConfirm: () => {handleSubmit(onSubmit)}
                                })
                            } */
                    >
                        agendar entrevista
                    </Button>

                </div>
            </form>

        </>

    )
}

export default ScheduleInterview