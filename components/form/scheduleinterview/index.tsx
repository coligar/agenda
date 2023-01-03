import React, {useState, useEffect} from 'react'
import Style from './scheduleinterview.module.css'

import { prisma } from '../../../lib/prisma'

import DateRangeIcon from '@mui/icons-material/DateRange'
import PersonIcon from '@mui/icons-material/Person'

import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import InputAdornment from '@mui/material/InputAdornment'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'



const ScheduleInterview = (props:any) => 
{
    
    const [interviewer, setInterviewer] = useState('')
    const [name, setName] = useState('')
    const [day, setDay] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endtime, setEndTime] = useState('')
    const [area, setArea] = useState('')
    const [type, setType] = useState('')
    const [avatar, setAvatar] = useState('')
    const [form, setForm] = useState({order:0, name:'', interviewer:'',day:'', starttime:'', endtime:'', area:'', type:'', avatar:''})

    const getInterviewer = (event:any) => {setInterviewer(event.target.value)}
    const getDay = (event:any) => {setDay(event.target.value)}


    /*const submit = async () =>
    {
       setName(props.data.name) 
       setStartTime('08:00')
       setEndTime('09:20')
       setArea(props.data.area_of_interest)
       setType('agendamentosolicitado')
       setAvatar('https://www.google.com/imgres?imgurl=https%3A%2F%2Fogimg.infoglobo.com.br%2Fin%2F24907109-c86-bcf%2FFT1086A%2Favatar-a-lenda-de-aang.jpg&imgrefurl=https%3A%2F%2Foglobo.globo.com%2Fcultura%2Favatar-lenda-de-aang-24907115&tbnid=ImSuYogAxw_CCM&vet=12ahUKEwix5Zbs_5_7AhWuq5UCHbUhAI4QMygLegUIARD6AQ..i&docid=6KPIzy9KLakjjM&w=1086&h=652&q=avatar&ved=2ahUKEwix5Zbs_5_7AhWuq5UCHbUhAI4QMygLegUIARD6AQ')
        
        let dados =
        {
            order: 1,
            name: name,
            interviewer: interviewer,
            day: day,
            starttime: startTime,
            endtime: endtime,
            area: area,
            type: type,
            avatar: avatar
        }

        try
        {
            fetch('http://localhost:3000/api/crreate',{
                body: JSON.stringify(dados),
                headers:{
                    'Content-type': 'application/json'
                },
                method: 'POST'
            }).then(() => setForm({order:0, name:'', interviewer:'',day:'', starttime:'', endtime:'', area:'', type:'', avatar:''}))
        }
        catch(err)
        {
            console.log(err)
        }


    }*/

    return(

        <>
            <form onSubmit={ e => {
                e.preventDefault()
            }}>
                <div className={Style.container}>

                    <div className={Style.colicon}>

                        <DateRangeIcon fontSize='large' sx={{fontSize:'55px'}}/>

                    </div>

                    <div className={Style.colform}>
                        
                        <div className={Style.form_lines}>

                            Agendamento de entrevista para<br/>

                            <strong>{props.data.name}</strong> - Área: <strong>{props.data.area_of_interest}</strong>
                            
                        </div>

                        <div className={Style.form_lines}>

                            Entrevistador<br/>
                            

                            <Tooltip title="Escolha o entrevistador" placement="top-start">
                                <TextField 
                                    id="Entrevistador" 
                                    required
                                    fullWidth
                                    select
                                    //label="Entrevistador" 
                                    value={form.interviewer}
                                    variant="outlined" 
                                    size="small"
                                    margin="dense"
                                    onChange= {e => setForm({...form, interviewer: e.target.value})}
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
                                    sx={{marginTop:'5px'}}
                                >
                                    <MenuItem value="Elisângela | Administrativo">Elisângela - Administrativo</MenuItem>
                                    <MenuItem value="Elisângela | Comercial">Elisângela - Comercial</MenuItem>
                                    <MenuItem value="Elisângela | Representante">Elisângela - Representante</MenuItem>
                                    <MenuItem value="Elisângela | Produção">Elisângela - Produção</MenuItem>
                                    <MenuItem value="Diego | TI">Diego - TI</MenuItem>
                                </TextField>
                            </Tooltip>

                        </div>

                        <div className={Style.form_lines}>

                            Escolher data da entrevista<br/>

                            <Tooltip title="Informe a data da entrevista. Utilizar o formato: dd/mm/aaaa. Exemplo: 01/01/1900" placement="top-start">
                                <TextField 
                                    id="interview_date" 
                                    required
                                    fullWidth
                                    value = {form.day}
                                    variant="outlined" 
                                    onChange={e => setForm({...form, day: e.target.value})}
                                    size="small"
                                    margin="dense"
                                    placeholder='Escolher data da entrevista'
                                    InputProps={{
                                        startAdornment: (
                                        <InputAdornment position="start">
                                            <DateRangeIcon />
                                        </InputAdornment>
                                        ),
                                        style:{fontSize:14},
                                    }}
                                    InputLabelProps={{
                                        style:{fontSize:14},
                                    }}
                                    sx={{marginTop:'5px', width:'100%'}}
                                />
                            </Tooltip>

                        </div>

                        <div className={Style.form_lines}>

                            Observação<br/>

                            <Tooltip title="Digite aqui alguma observação" placement="top-start">
                                <TextField
                                    id="interview_note"
                                    required
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
                            </Tooltip>

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
                        onClick=
                            {
                                () => 
                                props.dialog({
                                    isOpen:true,
                                    maintitle: 'Confirmar Agendamento',
                                    title: 'Tem certeza que deseja marcar o agendamento?',
                                    subTitle: 'Você não será capaz de desfazer esta operação',
                                    type: 'confirm',
                                   //onConfirm: () => {submit()}
                                })
                            } 
                    >
                        agendar entrevista
                    </Button>

                </div>
            </form>

        </>

    )
}

export default ScheduleInterview