import React, { useState, useEffect, useCallback } from 'react'
import style from './ModernCalendar.module.css'
import SearchBar from '../../form/inputs/search/search'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Pin from './pin/pin'
import Calendar from './calendar'


import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';


import Person from '@mui/icons-material/Person'



const ModernCalendar = (props:any) => 
{
    const [searchTerm, setSearchTerm] = useState({type:'', term:''})
    const [scheduleList, setScheduleList] = useState([])
    const [schedule, setSchedule] = useState([])
    const [dataInterval, setDataInterval] = useState()
    const [dateValue, setDateValue] = useState(null)
    
    var current = new Date()

    const getScheduleInterval = (days = 0, startDate = '') =>
    {

        let data = getInterviewPeriod(days, startDate)

        let filtered_schedule:any = [
            {
                date_id: 1,
                date: `${new Date(data.current_day).toLocaleDateString()} até o dia ${data.period.toLocaleDateString()}`,
                data: data.filtered_data,
            }
        ]

        setScheduleList(filtered_schedule);
    }

    const getInterviewPeriod = (days:any, startDate = '') =>
    {
        let period = addSubDays(days)
        let title = ''

        let date = new Date('2022/01/01') //só retirar o período 
        let current_day = date.setDate(date.getDate());

        if(days==0 && startDate != '')
        {
            period = new Date(startDate)
        }

        let filtered_data = schedule.filter((element:any, index:any) => 
            new Date(element.day).toLocaleDateString() >= new Date(current_day).toLocaleDateString() && 
            new Date(element.day).toLocaleDateString() <= period.toLocaleDateString()
        )

        let data = 
        {
            current_day: current_day,
            period: period,
            filtered_data: filtered_data
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


    const getData = useCallback(async () =>
    {
        try 
        {
          let res = fetch('api/schedule')
          .then((response) => {
            return response.json()
          }) 
          .then((json) => 
          {
            const yesterday = json.filter((element:any, index:any) => new Date(element.day).toLocaleDateString() === last_day)
            const current = json.filter((element:any, index:any) => new Date(element.day).toLocaleDateString() === current_day)
            const tomorrow = json.filter((element:any, index:any) => new Date(element.day).toLocaleDateString() === next_day)


            setSchedule(json)

            const schedule:any = [
                {
                    date_id: 1,
                    date: last_day,
                    data: yesterday,
                },
                {
                    date_id: 2,
                    date: current_day,
                    data: current,
                },
                {
                    date_id: 3,
                    date: next_day,
                    data: tomorrow,
                },
            ]
            setScheduleList(schedule)

          });
        } 
        catch (error) 
        {
            console.log(error)
        }
    },[current_day, last_day, next_day])


    const doSchedule = useCallback(async () =>
    {
        try 
        {
            const response = await fetch('http://localhost:3000/api/schedule/create',
            {
                method: 'POST',
                body: JSON.stringify({
                    order: '5',
                    name: 'Marcelo Bombonato',
                    interviewer: 'Representante | Elisângela',
                    day: new Date(current.getTime()),
                    starttime: '14:00',
                    endtime: '15:00',
                    area: 'representante',
                    type: '',
                    avatar: 'https://www.thewrap.com/wp-content/uploads/2016/05/Top-Gun-Tom-Cruise.png'
                }),
                headers:
                {
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            })
            //console.log('passou aqui', response)
            if(!response.ok)
            {
                throw new Error(response.statusText)
            }
        } 
        catch (error) 
        {
            console.log(error)
        }
    },[current])


    useEffect(() => 
    {
        //doSchedule()
       // getData()
    },[doSchedule, getData])


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
                        return val.name.toLocaleLowerCase().includes(searchTerm.term.toLocaleLowerCase())
                    }

                }).map((item:any, index:any) => (

                    <div key={item.id} className={style.schedule_area_candidate_content_line}>

                        <div className={style.column_a}>

                            {item.order}º

                        </div>

                        <Pin name={item.name} interviewer={item.interviewer} starttime={item.starttime} endtime={item.endtime} area={item.area} type={item.type} avatar={item.avatar} day={data.date}/>

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
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Data"
                                        value={dateValue}
                                        className={style.datepicker}
                                        onChange={(newValue:any) => {
                                            setDateValue(newValue);
                                            getScheduleInterval(0, newValue);
                                        }}
                                        /*renderInput={({ inputRef, inputProps, InputProps }) => (
                                            <Box sx={{ display: 'flex', alignItems: 'center', height: 40 }}>
                                              <input ref={inputRef} {...inputProps} />
                                              {InputProps?.endAdornment}
                                            </Box>
                                        )}*/
                                        renderInput={(params) => <TextField {...params}/>}
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


                <div className={style.schedule_minimal}>

                    <h3>Próximas entrevistas</h3>

                    <Paper elevation={2} style={{padding: '10px', marginBottom:'25px'}}>
                        <h4>Entrevistas para a semana</h4>
                        <div className={style.counter_area}>
                            <span className={style.number}>14</span> 
                            <span className={style.description}>entrevisas agendadas para essa semana</span>
                        </div>
                        <div className={style.calendar_future}>
                            <Calendar data={getInterviewPeriod(7)}/>
                        </div>
                        <div className={style.calendar_action}>ver todas as entrevistas</div>
                    </Paper>

                    <Paper elevation={2} style={{padding: '10px', marginBottom:'25px'}}>
                        <h4>Entrevistas para o mês</h4>
                        <div className={style.counter_area}>
                            <span className={style.number}>25</span> 
                            <span className={style.description}>entrevisas agendadas para esse mês</span>
                        </div>
                        <div className={style.calendar_future}>
                            <Calendar data={getInterviewPeriod(14)}/>
                        </div>
                        <div className={style.calendar_action}>ver todas as entrevistas</div>
                    </Paper>
                                     
                </div>

            </div>
        </>
    )
}

export default ModernCalendar