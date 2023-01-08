import React, { useState, useEffect, useCallback } from 'react'
import style from './ModernCalendar.module.css'
import SearchBar from '../../form/inputs/search/search'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Pin from './pin/pin'
import Calendar from './calendar'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/pt-br'


import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';


import Person from '@mui/icons-material/Person'
import axios from 'axios'
import { date } from 'yup/lib/locale'



const ModernCalendar = (props:any) => 
{
    const [searchTerm, setSearchTerm] = useState({type:'', term:''})
    const [scheduleList, setScheduleList] = useState([])
    const [schedule, setSchedule] = useState([])
    const [dataInterval, setDataInterval] = useState()
    const [dateValue, setDateValue] = useState(null)
   
    
    let current = new Date()

    const getScheduleInterval = async (days = 0, startDate = '') =>
    {        
        let data = await getInterviewPeriod(days, startDate)

        let filtered_schedule:any = [
            {
                date_id: 1,
                date: `${new Date(data.current_day).toLocaleDateString()} até o dia ${data.period.toLocaleDateString()}`,
                data: data.data,
            }
        ]

        setScheduleList(filtered_schedule)
    }

    const getInterviewPeriod = async (days:any, startDate = '') =>
    {
        let enddate = addSubDays(days).toISOString().split('T')[0]
        let startdate = new Date().toISOString().split('T')[0]
        let new_startdate: string = ''
        let res:any;
        let start_period: Date = new Date()
        let end_period: Date = addSubDays(days)

        if(days==0 && startDate != '')
        {
            new_startdate = new Date(startDate).toISOString().split('T')[0]

            if(new_startdate > enddate)
            {
                startdate = new_startdate
                enddate = new_startdate
                start_period = new Date(startDate)
                end_period = new Date(startDate)
            }
        }

        res = await axios.get(`api/schedule/?startdate=${startdate}&enddate=${enddate}`).then(res => res.data)

        let data = 
        {
            current_day: start_period,
            period: end_period,
            data: res
        }

        return data
    }

    const addSubDays = (days = 0) =>
    {
        let date = new Date()
        date.setDate(date.getDate() + days)
        return date
    }

    let last_day = new Date('2021/01/01').toLocaleDateString()
    let current_day = new Date('2022/01/02').toLocaleDateString()
    let next_day = new Date('2022/01/03').toLocaleDateString()
    let week = new Date('2022/01/21')


    const getData = useCallback(async (days:number = 2) =>
    {
        let enddate = addSubDays(days).toISOString().split('T')[0]
        let startdate = new Date().toISOString().split('T')[0]

        let current_day = addSubDays(-1).toLocaleDateString()
        let next_day = addSubDays(0).toLocaleDateString()
        let future_day = addSubDays(1).toLocaleDateString()

        let res = await axios.get(`api/schedule/?startdate=${startdate}&enddate=${enddate}`).then(res => res.data)
        
        const current = res.filter((element:any, index:any) => new Date(element.day).toLocaleDateString() === current_day)
        const tomorrow = res.filter((element:any, index:any) => new Date(element.day).toLocaleDateString() === next_day)
        const future = res.filter((element:any, index:any) => new Date(element.day).toLocaleDateString() === future_day)

        const schedulefilter:any = [
            {
                date_id: 1,
                date: current_day,
                data: current,
            },
            {
                date_id: 2,
                date: next_day,
                data: tomorrow,
            },
            {
                date_id: 3,
                date: future_day,
                data: future,
            },
        ]
        setScheduleList(schedulefilter)
    },[])



    useEffect(() => 
    {
       getData()
    },[getData])


    const schedule_list = scheduleList.map((data:any, index) => 
    (                           
        <>
            <div key={Math.random()} className={style.schedule_area_candidate_content_line_header}>               
                <div className={style.column_a}>
                    <Person style={{ marginLeft: '4px' }} />
                </div>
                <div className={style.column_x} style={{ width: '100%', padding: '8px 0 8px 0', fontSize: '16px', fontWeight: '500' }}>
                    Agenda do dia {data.date}
                </div>               
            </div>

            
                {

                    data.data.filter((val:any, index:any) => {

                    if(searchTerm.type == '')
                    {
                        return val
                    }               
                    else if(searchTerm.type === 'search') 
                    {
                        return val.user.name.toLocaleLowerCase().includes(searchTerm.term.toLocaleLowerCase())
                    }

                }).map((item:any, index:any) => (

                    <div key={item.id} className={style.schedule_area_candidate_content_line}>

                        <div className={style.column_a}>

                            {item.index}º

                        </div>

                        <Pin name={item.user.name + ' ' +item.user.lastname} interviewer={item.interviewer} starttime={item.starttime} endtime={item.endtime} area={item.area_activity.name} type={item.schedule_type.type} avatar={item.user.avatar} day={data.date}/>

                    </div>
                ))}   

        </>
    ))
    
    return(
        <>
            <div className={style.schedule_area_header}>

                <div className={style.schedule_area_header_title}>
                    <h2><span className={style.feature}>| Agenda</span> de entrevistas</h2>
                    <p className={style.description}>Aqui ficam os agendamentos para entrevistas dos candidatos</p>
                </div>

            </div>

            <div className={style.schedule_content}>
            
                <div className={style.schedule_area}>
                        
                    <div className={style.schedule_area_header_filter}>

                        <SearchBar elevation={1} placeholder="Pesquisar na agenda" onChange={(event:any) => setSearchTerm({type:'search', term: event.target.value})}/>

                        <div className={style.schedule_area_header_filter_date}>

                            <Paper
                                component="form"
                                elevation= {1}
                                onClick={() => getScheduleInterval()}
                                className={style.schedule_buttons}
                                sx={{ padding: '0px', margin:'0px'}}
                            >
                               <span className={style.schedule_buttons}>Dia</span>
                            </Paper>

                            <Paper
                                component="form"
                                className={style.schedule_buttons}
                                elevation= {1}
                                onClick={() => getScheduleInterval(7)}
                            >
                                <span className={style.schedule_buttons}>Semana</span>
                            </Paper>

                            <Paper
                                component="form"
                                className={style.schedule_buttons}
                                sx={{ p: '0px'}}
                                elevation= {1}
                                onClick={() => getScheduleInterval(30)}
                            >
                              <span className={style.schedule_buttons}>Mês</span>
                            </Paper>

                            <Paper
                                component="form"
                                sx={{ p: '4px', display: 'flex', alignItems: 'center', width: '191px', color: '#5A607F', backgroundColor: 'white', fontWeight: '400', textAlign: 'center', justifyContent: 'center',  margin:'0'}}
                                elevation= {1}
                            >
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                                    <DatePicker
                                        value={dateValue}
                                        className={style.datepicker}
                                        onChange={(newValue:any) => {
                                            setDateValue(newValue);
                                            getScheduleInterval(0, newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} size="small"/>}
                                    />
                                </LocalizationProvider>
                               
                            </Paper>

                        </div>
                        
                        <Button variant="outlined" sx={{border: '2px solid #1592E6', borderRadius:'51px', lineHeight: '12px', fontSize: '12px', padding:'7px',
                            '&:hover': {
                                border: '2px solid currentColor',
                                backgroundColor:'#1592E6',
                                color: 'white'
                            }, margin:'10px 0 0 0'}}
                            onClick={()=> getData()}
                        >
                                ver agenda
                        </Button>

                    </div>

                    <div className={style.schedule_area_candidate}>
                        
                        <div className={style.schedule_area_candidate_content}>

                            {
                                schedule_list
                            }

                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default ModernCalendar