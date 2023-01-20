import React, { useState, useEffect } from 'react'
import { prisma } from '../../../lib/prisma'
import style from './Manager.module.css'
import SearchBar from '../../../components/form/inputs/search/search'
import MenuSchedule from '../../../components/schedule/menu/menuschedule'
import CandidateCard from '../../../components/schedule/candidatecard/candidatecard'
import WarningCard from '../../../components/schedule/warningcard/warningcard'
import ResumeView from '../../../components/schedule/resumeview/resumeview'
import Log from '../../../components/form/logs'
import ModernCalendar from '../../../components/calendar/moderncalendar'
import useSWR, { mutate, SWRConfig } from 'swr';
import { useGetData } from '../../../hooks/useRequest'


export async function getServerSideProps()
{
  const users = await prisma.user.findMany()
  //const users = axios.get('http://localhost:3000/api/user/').then((res) => res.data)
  //const schedule = await prisma.schedule.findMany()
  const activity = await prisma.areaActivity.findMany()
  return{
    props:{
      //schedule: JSON.parse(JSON.stringify(schedule)),
      activity: JSON.parse(JSON.stringify(activity)),
      fallback:{
        '/api/user':JSON.stringify(users),
        '/api/activity':JSON.stringify(activity),
      }
    }
  }
}


const Manager = (props:any, fallback:any) =>
{
    const [activityArea, setActivityArea] = useState(props.activity)
    const [searchTerm, setSearchTerm] = useState({type:'', term:''})
    const [resume, setResume] = useState()

    const {data: activity} = useGetData('api/activity')
    const {data: users} = useGetData('api/user')
    const {data: scheduletype} = useGetData('api/scheduletype')

    let areas_total: any
    let candidates: any
    let candidateList: any[] = []
    let profiles: any[] = []
    
    //dado mocado. Ver como inserir quantidades de registros
    /*const [menuInterviews, setMenuInterviews] = useState(
        [
            {
                id: 1,
                label: "Confirmadas",
                quantity: 15,
                type: "confirmados"
            },
            {
                id: 2,
                label: "Canceladas",
                quantity: 2,
                type: "cancelado"
            },
            {
                id: 3,
                label: "Reagendadas",
                quantity: 5,
                type: "reagendado"
            },
            {
                id: 4,
                label: "Realizadas",
                quantity: 45,
                type: "realizada"
            },
            {
                id: 5,
                label: "Cancel. Solicitados",
                quantity: 0,
                type: "cancelamentosolicitado"
            },
            {
                id: 6,
                label: "Reagen. Solicitados",
                quantity: 0,
                type: "reagendamentosolicitado"
            },
            {
                id: 7,
                label: "Agen. Solicitados",
                quantity: 0,
                type: "agendamentosolicitado"
            },
        ]
    )
    //dado mocado. Ver como inserir quantidades de registros
    const [menuProfile, setMenuProfile] = useState(
        [
            {
                id: 1,
                label: "Contratados",
                quantity: 3,
                type: "contratado"
            },
            {
                id: 2,
                label: "Visualizados",
                quantity: 0,
                type: "visualizados"
            }
        ]
    )*/

    if(activity && activity !== undefined)
    {
        areas_total = activity.reduce((total:any, currentValue:any) => total = total + (currentValue.quantity) ? currentValue.quantity : 0, 0)
    }

    if(scheduletype && scheduletype !== undefined)
    {
        profiles = scheduletype.filter((item:any) => item.type === 'visualizados' || item.type === 'contratado')
    }
    
    //let total_interviews = menuInterviews.reduce((total, currentValue) => total = total + (currentValue.quantity) ? currentValue.quantity : 0, 0)
    //let total_profiles = menuProfile.reduce((total, currentValue) => total = total + (currentValue.quantity) ? currentValue.quantity : 0, 0)
    
    if(users && users !== undefined)
    {
        candidates = users.filter((val:any) => val.role === 'USER')

        candidateList = candidates.filter((val:any) =>
        {
            if(searchTerm.type == '')
            {
                return val
            }
            else if(searchTerm.type === 'areas' && val.area_activityId === searchTerm.term)
            {
                return val
            }
            else if(searchTerm.type === 'schedule' && val.scholarity_id === searchTerm.term)
            {
                return val
            }
            else if(searchTerm.type === 'profiles' && val.profiles === searchTerm.term)
            {
                return val
            } 
            else if(searchTerm.type === 'search') 
            {
                return val.name.toLocaleLowerCase().includes(searchTerm.term.toLocaleLowerCase())
            }
        }).map((candidate:any) =>(
                        
                <CandidateCard 
                    key = {candidate.id}
                    name= {candidate.name + ' ' + candidate.lastname}
                    border= {candidate.area_activity.color} 
                    img= {candidate.avatar}
                    status= {candidate.status}
                    date= {candidate.date}
                    description = 'Descrição'//{candidate.curriculo?.sumary}
                    onClick = {() => getCandidateResume(candidate)}
                /> 
        ))
    }

    const getCandidateResume = (data:any) => 
    {
        setResume(data)
    }

    
    return(
        
        <div className={style.container}>


            <ModernCalendar/>
            

            <div className={style.manager_schedule_area}>

                <div className={style.manager_resume_area}>

                    <div className={style.main_title}>

                        <h2><span className={style.feature}>| Candidatos</span> disponíveis</h2>
                        <p className={style.description}>Listagem de candidatos disponíveis para entrevista</p>

                    </div>

                    <div className={style.schedule}>

                        <div className={style.entrance}>

                            <div className={style.header}>
                                ENTRADAS
                            </div>

                            <div className={style.sidebar_left_menu}>

                                <div className={style.areas}>

                                    <div className={style.areas_title}><strong>Áreas de atuação</strong></div>

                                    <div className={style.itens}>

                                        { (activity && activity !== undefined) &&
                                            activity.map((area:any) => (
                                                <MenuSchedule 
                                                    key={area.id} 
                                                    label={area.name} 
                                                    quantity={0} 
                                                    mr="2px" 
                                                    color={area.color} 
                                                    onClick={() => setSearchTerm({type:'areas', term: area.id.toString()})}
                                                />
                                            ))
                                        }

                                    </div>

                                    <div className={style.areas_total}>
                                        <div>Total</div>
                                        <div>{areas_total}</div>
                                    </div>

                                </div>


                                <div className={style.areas}>

                                    <div className={style.areas_title}><strong>Agendamentos</strong></div>

                                    <div className={style.itens}>

                                        {(scheduletype && scheduletype !== undefined) &&
                                            scheduletype.filter((item:any) => item.type !== 'visualizados' && item.type !== 'contratado').map((interview:any) =>(
                                            <MenuSchedule 
                                                key={interview.id} 
                                                bullet="status" 
                                                label={interview.name} 
                                                quantity={0} 
                                                mr="2px" 
                                                type={interview.type} 
                                                onClick={() => setSearchTerm({type:'schedule', term: interview.id.toString()})}
                                            />
                                        ))}
                                        
                                    </div>

                                    <div className={style.areas_total}>
                                        <div>Total</div>
                                        <div>0</div>
                                    </div>

                                </div>


                                <div className={style.areas}>

                                    <div className={style.areas_title}><strong>Perfis</strong></div>

                                    <div className={style.itens}>

                                    {(scheduletype && scheduletype !== undefined) &&
                                        profiles.map((interview:any) =>(
                                        <MenuSchedule 
                                            key={interview.id} 
                                            bullet="status" 
                                            label={interview.name} 
                                            quantity={0} 
                                            mr="2px" 
                                            type={interview.type} 
                                            onClick={() => setSearchTerm({type:'schedule', term: interview.id.toString()})}
                                        />
                                    ))}

                                    </div>

                                    <div className={style.areas_total}>
                                        <div>Total</div>
                                        <div>0</div>
                                    </div>

                                </div>

                            </div>

                        </div>


                        <div className={style.candidate_list}>
                            
                            <div className={style.header_candidate_area}>
                                <SearchBar placeholder="Pesquisar candidato" onChange={(event:any) => setSearchTerm({type:'search', term: event.target.value})}/>
                            </div>

                            <div className={style.candidate}>
                                
                                {candidateList}

                            </div>

                        </div>


                        <div className={style.candidate_resume}>

                            {resume !== undefined &&
                                <ResumeView data={resume}/>
                            }
                            {resume === undefined &&
                                
                                <div className={style.noevent}>
                                    Por favor, escolha um candidato ao lado
                                </div>
                                
                            }
                            
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Manager