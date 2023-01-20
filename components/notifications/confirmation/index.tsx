import style from './Confirmation.module.css'
import ErrorIcon from '@mui/icons-material/Error';
import Box from '@mui/material/Box';
import EmailIcon from '@mui/icons-material/Email';
import RoomIcon from '@mui/icons-material/Room';
import IconButton from '@mui/material/IconButton'
import no_schedule_pick from '/public/images/system/no_schedule.jpg'
import { NextPage } from 'next';
import Link from 'next/link';

interface Props 
{
    dados?: any | null
}

const Confirmation: NextPage<Props> = (props) =>
{
    let show_confirm_buttons: boolean = false
    let user_info = props.dados
    let user_schedule = props.dados.schedule.slice(-1)[0]

    return(
          
          <>  
            
            <Box
                sx={{
                    boxShadow: 3,
                    bgcolor: 'background.paper',
                    m: 1,
                    borderRadius:2,
                    overflow: 'hidden',
                    marginTop: 7,
                    marginBottom: 8
                }}
            >
                <div className={style.header}>
                    Notificação
                </div>

                <div className={style.textnotifications}>
                    <div className={style.icon}>
                        
                            <ErrorIcon fontSize='inherit'/>
                        
                    </div>
                    <div className={style.text}>
                        Olá {user_info.name} {user_info.lastname}, solicitamos que você esteja presente no dia <strong>{new Date(user_schedule.day).toLocaleDateString()}</strong> às <strong>{new Date(user_schedule.starttime).toLocaleTimeString().substring(0,5)}</strong> no endereço: Acesso à Via Washington Luiz, Km 180 - Distrito Industrial de Batovi em Rio Claro (SP). Por favor, esteja presente 15 minutos antes do horário da entrevista. {user_schedule.note}.
                    </div>
                </div>

                <div className={style.infoarea}>
                    <div className={style.icons}>
                        <a target="_blank" href="mailto:rh@ceramicacristofoletti.com.br" rel="noopener noreferrer">
                            <IconButton aria-label="mail" size="small" color='inherit'>
                                <EmailIcon fontSize="inherit"/>
                            </IconButton>
                        </a>

                        <a target="_blank" href="https://goo.gl/maps/HPNeMvfDbiTRhYvE6" rel="noopener noreferrer">
                            <IconButton aria-label="pin" size="small" color='inherit' classes={style.iconhover}>
                                <RoomIcon fontSize="inherit" />
                            </IconButton>
                        </a>

                    </div>
                    <div className={style.time}>
                        Data da Entrevista: {new Date(user_schedule.day).toLocaleDateString()} {new Date(user_schedule.starttime).toLocaleTimeString().substring(0,5)}
                    </div>
                </div>
                {show_confirm_buttons &&
                    <div className={style.buttonsarea}>

                        <div className={style.confirm}>
                            confirmar
                        </div>

                        <div className={style.cancel}>
                            cancelar
                        </div>

                        <div className={style.reshedule}>
                            reagendar
                        </div>
                    </div>
                }           

            </Box>
            
        </>
    )
}

export default Confirmation