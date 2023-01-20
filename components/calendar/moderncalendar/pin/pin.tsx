import style from './Pin.module.css'
import Avatar from "../../../avatar"
import Status from '../../../bullet/status'
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'

const Pin = (props:any) => 
{
    
    let icon, bg, border, icon_color
    let avatar = (props.avatar) ? props.avatar : ''
    let width = (props.width) ? props.width : '100%'
    let ml = (props.ml) ? props.ml : '0'

    const[interviewprogress, setInterviewProgress] = useState ({variant:"indeterminate", progress:0})
    const[opacity, setOpacity] = useState('1')
    const[interviewcurrentduration, setInterviewCurrentDuration] = useState<string>('')

    let today = new Date().toLocaleDateString()
    var date = new Date()
   
    let start_time = new Date('2020-01-01 ' + props.starttime)
    let end_time = new Date('2020-01-01 ' + props.endtime)
    let actual_time = new Date('2020-01-01 ' + date.getHours()+':'+date.getMinutes())

    let interview_start = new Date(props.starttime).toLocaleTimeString('pt-BR').substring(0,5)
    let interview_end = new Date(props.endtime).toLocaleTimeString('pt-BR').substring(0,5)


    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getCurrentInterview = () => 
    {

        if(actual_time.getTime() >= start_time.getTime() && actual_time.getTime() <= end_time.getTime() && today === props.day)
        {
            let interview_duration =  Math.ceil(Number(end_time)-Number(start_time)/(1000*60))
            let interview_time = Math.ceil((Math.abs(Number(actual_time) - Number(start_time))/(1000*60)))
            let percent_progress = Math.ceil((interview_time*100)/interview_duration)

            if(interview_time > 60)
            {
                let check_minutes =  interview_time%60 //pega o resto da divisão dos minutos dividido por 60(hora)

                let interview_minutes = (check_minutes < 10) ? '0' + check_minutes + 'min' : check_minutes + 'min'
                let get_hours =  Math.trunc(interview_time/60) //pega apenas o inteiro
                let interview_current_duration = ' ( ' + get_hours + ':' + interview_minutes +' ) '

                setInterviewCurrentDuration(interview_current_duration)
            }
            else
            {
                let correct_minute = (interview_time < 10) ? '0'+interview_time : interview_time
                let interview_current_duration = ' ( ' + correct_minute+'min )'
                setInterviewCurrentDuration(interview_current_duration)
            }

            setInterviewProgress({variant:'determinate', progress:percent_progress})
        }
    }


    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getPastInterviews = () => 
    {
        if(end_time.getTime() <= actual_time.getTime() && today === props.day)
        {
            setInterviewProgress({variant:'determinate', progress:100})
            setOpacity('0.5')
        }
        else if(today > props.day)
        {
            setOpacity('0.5')
            setInterviewProgress({variant:'determinate', progress:100})
        }
        else
        {
            setOpacity('1')
        }

        if(interviewprogress.progress === 100)
        {
            setInterviewCurrentDuration('')
        }
    }


    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getFutureInterviews = () =>
    {
        if(actual_time.getTime() < start_time.getTime() && today === props.day)
        {
            let interview_time = Math.ceil((Math.abs(Number(start_time) - Number(actual_time))/(1000*60)))

            let check_minutes =  interview_time%60 //pega o resto da divisão dos minutos dividido por 60(hora)

            let interview_minutes = (check_minutes < 10) ? '0' + check_minutes + 'min' : check_minutes + 'min'
            let get_hours =  Math.trunc(interview_time/60) //pega apenas o inteiro
            let interview_current_duration = ' ( -' + get_hours + ':' + interview_minutes +' ) '

            setInterviewCurrentDuration(interview_current_duration)
            setInterviewProgress({variant:'indeterminate', progress:0})
        }

        if(start_time.getTime() === actual_time.getTime())
        {
            setInterviewCurrentDuration('')
        }
    }


    useEffect(() => 
    {
        getCurrentInterview()
        getPastInterviews()
        getFutureInterviews()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    
    useEffect(() =>
    {      
        const timer = setInterval(() => 
        {
            getCurrentInterview()
            getPastInterviews()
            getFutureInterviews()

        }, 5000 )
        return () => 
        {
            clearInterval(timer);
        }
    },[getCurrentInterview, getFutureInterviews, getPastInterviews])
    
    icon_color = props.cor
    bg = props.cor
    /*switch (props.area.toString().toLocaleLowerCase()) 
    {
        case 'administrativo':
            icon_color = '#7472B5'
            bg = '#A3A0FB'
            break

        case 'comercial':
            icon_color = '#dda44b'
            bg = '#FECB2E'
            break

        case 'representante':
            icon_color = '#C24B4B'    
            bg = '#FF6565'
            break

        case 'produção':
            icon_color = '#D96B8E'
            bg = '#FFA8C3'
            break

        case 'rh':
            bg = '#62B937'
            icon_color = '#478428'
            break
    
        default:
            bg = '#eee'
            break
    }*/
    

    if(props.type.toString().toLocaleLowerCase() === 'agendamentosolicitado')
    {
        border = 'dashed 2px #0B821F'
        icon = <Status type="agendamentosolicitado" ml="5px" size="20px" color={icon_color}/>
    }
    else if(props.type.toString().toLocaleLowerCase() === 'reagendamentosolicitado')
    {
        border = 'dashed 2px #dda44b'
        icon = <Status type="reagendamentosolicitado" ml="5px" size="20px" color={icon_color}/>
    }
    else
    {
        border = 'dashed 2px #0B821F'
        icon = <Status type="agendamentosolicitado" ml="5px" size="20px" color={icon_color}/>
    }
    

    return(
        <>
            <div className={style.schedule_pin} style={{backgroundColor: bg, outline: border, border:'solid 2px #EEE', width: width, marginLeft: ml, opacity:opacity, color: 'white'}}>
                <div className={style.data}>
                    <Avatar direction="row" name={props.name} width="28" avatar={avatar}/>
                    <div className={style.candidate_name} style={{opacity:0.8, color: 'white'}}>
                        {props.name}
                        <div className={style.interviewer}>{props.interviewer} | {props.area}</div>
                    </div>
                </div>
                <div className={style.time}>
                    <Box sx={{ width: '30%', marginRight:'10px' }}>
                        <LinearProgress variant="determinate" color="inherit" value={interviewprogress.progress}/>
                    </Box>
                    <span style={{marginRight:'7px', opacity:0.7, color: 'white'}}>
                        {interviewprogress.progress}% 
                        {interviewcurrentduration}
                    </span>
                    <span style={{marginBottom:'7px',opacity:0.7, color: 'white'}}>
                        {interview_start} - {interview_end}               
                        {icon}
                    </span>
                </div>
                
            </div>       
        </>
    )
}

export default Pin