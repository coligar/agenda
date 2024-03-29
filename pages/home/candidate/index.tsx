import style from './Candidate.module.css'
import React, {useState} from 'react'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider';
import Confirmation from '../../../components/notifications/confirmation'
import Log from '../../../components/form/logs';
import Image from 'next/image'
import no_schedule_pick from '/public/images/system/no_schedule.jpg'
import no_log_pick from '/public/images/system/no_log.jpg'
import no_resume_pick from '/public/images/system/no_resume.jpg'
import Resume from '../../../components/form/resumeold';
import { useGetData } from '../../../hooks/useRequest';
import useSWR from "swr"

interface IType 
{
    is_visible: undefined | boolean
}

const Candidate = (props:any) => 
{
    
    const status = false

    /**
     * var is_log receberá true or false. Define se é para exibir log
     * is_log será sempre false, se e somente se não houver registro de log
     * var id é o id do usuário logado
     */
    const is_active_log = 
    {
        is_log: status,
        id: 1
    }

    /**
     * var has_notification receberá true or false. Define se haverá notificação
     * var id é o id do usuário logado
     * var component será o componente a ser carregado. Passa isso via parâmetro ou o próprio componente?
     */
    const has_notification =
    {
        has_notification: status,
    }

    /**
     * var is_visible receberá true or false. Define se o formulário de cadastro de currículo estará visível ou não
     * is_visible será false, se e somente se não houver currículo cadastrado
     * var id é o id do usuário logado
     */
    const active_resume = {
        is_vivible: false, 
        id: 1
    }

    const { data: id } = useSWR("id", async key => {
        await new Promise(resolve => setTimeout(resolve, 2000))
        const value = localStorage.getItem(key);
        return !!value ? value : undefined;
      });


    const [activeNotification, setActiveNotification] = useState(has_notification)
    const [activeLog, setActiveLog] = useState(is_active_log)
    const [activeResume,  setActiveResume] = useState<IType>({is_visible: undefined})
    const {data: user} = useGetData(`api/user/${id}`)


    if (!user && !id) return <div>Loading...</div>

    if(user)
    {
        activeResume.is_visible = true
        let has_active_schedule = user.schedule.find((f:any) => new Date(f.day).toLocaleDateString() >= new Date().toLocaleDateString())
 
        if(user.schedule.length > 0 && has_active_schedule){
            has_notification.has_notification = true
        }
        else
        {
            has_notification.has_notification = false
        }      
    }


    return(
        <div className={style.container}>
            <div className={style.info_area}>

                <div className={style.schedule}>

                    <div className={style.title_area}>
                        <h2><span className={style.feature}>| Agenda</span> de Entrevistas</h2>
                        <p className={style.description}>Aqui ficam os agendamentos para entrevistas que serão feitas pelo nosso RH</p>
                    </div>

                    {has_notification.has_notification &&
                        <Confirmation dados={user}/>
                    }
                    {!has_notification.has_notification &&
                        <div className={style.noevent}>
                            <Image src={no_schedule_pick} alt="imagem que indica que não há agendamentos"/>
                        </div>
                    }
                    
                </div>

                <div className={style.log_info}>

                    <div className={style.title_area}>
                        <h2><span className={style.feature}>| Registro</span> de eventos</h2>
                        <p className={style.description}>Aqui ficam todos os registros das atividades de agendamento realizadas</p>
                    </div>

                    {activeLog.is_log !== false &&
                        <Log />
                    }
                    {activeLog.is_log === false &&
                        <div className={style.noevent}>
                            <Image src={no_log_pick} alt="imagem que indica que não há logs" />
                        </div>
                    }
                     
                </div>

            </div>

     
                <Divider orientation="vertical" flexItem variant="middle" textAlign="center" sx={{marginRight:5, marginLeft:5}}/>
    

            <div className={style.resume_area}>

                <div className={style.resume}>

                    <div className={style.title_area}>
                        <h2><span className={style.feature}>| Meu</span> Currículo</h2>
                        <p className={style.description}>Aqui você deve cadastrar seu currículo para análise do nosso RH</p>
                    </div>

                    {activeResume &&
                        <Resume dados={user}/>
                    }
                    {!activeResume &&
                        
                        <div className={style.noevent}>
                            <Image src={no_resume_pick} alt="imagem que indica que não há currículos cadastrados"/>
                            <Button variant="contained" sx={{marginTop:3.8}} onClick={()=>setActiveResume({is_visible:false})}>cadastrar currículo</Button>
                        </div>
                    }
                       
                </div>

            </div>

        </div>
    )
}

export default Candidate