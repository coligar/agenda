import {useEffect, useState} from 'react'
import style from "./ResumeView.module.css"

import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import Popup from "../../modalbox/popup"
import FlashMessage from "../../flashmessage"
import ConfirmaDialog from "../../notifications/confirmdialog"

import StatusResume from './status'
import Tag from './tag/tag'

import DoInterview from "../../actions/dointerview"
import GoMap from "../../actions/gomaps"
import DoCall from "../../actions/docall"
import CallWhatsapp from "../../actions/callwhatsapp"
import SendMail from "../../actions/sendmail"
import PrintContent from "../../actions/printcontent"
import DoComment from "../../actions/docomment"
import Comments from '../../form/resumecomments'
import Avatar from "../../avatar"

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CommentIcon from '@mui/icons-material/Comment'
import ContratadoIcon from '@mui/icons-material/StarRate';

import { useGetData } from '../../../hooks/useRequest'

const Resumeview = (props:any) => 
{
    const [anchorEl, setAnchorEl] = useState(null);
    const [notify, setNotify] = useState({isOpen: false, message:'', type:''})
    const [confirmDialog, setConfirmDialog] = useState({isOpen: false, maintitle:'', title: '', subTitle: '', type: ''})

    const [avaliableSchedule, setAvaliableSchedule] = useState <boolean>(true)
    const [avaliablePhone, setAvaliablePhone] = useState <boolean>(false)
    const [avaliableCellPhone, setAvaliableCellPhone] = useState <boolean>(false)
    const [openPopup, setOpenPopup] = useState<boolean>(false)

    const [schedule_type, setScheduleType] = useState<string>('')
    const [schedule_date, setScheduleDate] = useState<string>('')
    const [endRegisterPeriod, setEndRegisterPeriod] = useState<string>('')
    const [width, setWidth] = useState('md')

    const [content, setContent] = useState<any>()
    const [popuptitle, setPopupTitle] = useState<any>()

    const {data: scheduletype} = useGetData('api/scheduletype')
    let schedule_t = scheduletype

    const open = Boolean(anchorEl);
    let no_show: boolean = false

    const handleClick = (event:any) => 
    {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => 
    {
        setAnchorEl(null)
    }


    const addSubDays = (date = new Date(), days = 0) =>
    {
        date.setDate(date.getDate() + days)
        return date
    }

    
    
    useEffect(() => 
    {
        let userHasSchedule = props.data.schedule.filter((x:any) => new Date(x.day) >= new Date(Date.now()))
        let hasPhone = props.data.phone_contact.filter((x:any) => x.contact_type !== 'PERSONAL')
        let hasCellPhone = props.data.phone_contact.filter((x:any) => x.contact_type === 'PERSONAL')

    
        if(props.data.schedule.length === 0)
        {
            setAvaliableSchedule(true)
            setScheduleType('')
            setScheduleDate('')
        }
        else
        {
            if(userHasSchedule.length == 0)
            {
                setAvaliableSchedule(true)
                setScheduleType('')
                setScheduleDate('')
            }
            else
            {
                setAvaliableSchedule(false)
                let scheduletype = schedule_t.filter((x:any) => x.id === userHasSchedule[0].schedule_typeId)
                //setScheduleType(scheduletype[0].type)
                setScheduleType('agendamentosolicitado')
                setScheduleDate(`${new Date(userHasSchedule[0].day).toLocaleDateString()} às ${new Date(userHasSchedule[0].starttime).toLocaleTimeString()}`)
            }
        }

        (hasPhone.length > 0 && hasPhone[0].phone) ? setAvaliablePhone(true) : setAvaliablePhone(false);
        (hasCellPhone.length > 0 && hasCellPhone[0].phone) ? setAvaliableCellPhone(true) : setAvaliableCellPhone(false);

        let expires = addSubDays(new Date(props.data.createdAt), 60)
        setEndRegisterPeriod(expires.toLocaleString())
    
    }, [props.data.createdAt, props.data.phone_contact, props.data.schedule, schedule_t])
    

    const closePopUp = () =>
    {
        setOpenPopup(false)
    }

    const doAnything = (cod:any) => 
    {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
        })

        if(cod === 1)
        {
           setNotify({
               isOpen: true,
               message: 'Cancelamento realizado com sucesso',
               type: 'success'
           })
        }
        else
        {
            setNotify(
            {
                isOpen: true,
                message: 'Erro ao cancelar reagendamento',
                type: 'error'
            })
        }

        closePopUp()
    }

    const openPopupWithContent = (content:any, title:any, width='md') =>
    {
        setWidth(width)
        setOpenPopup(true)
        setPopupTitle(title)
        setContent(content)
        setAnchorEl(null)
    }

    return(

        <div id="print">
            
            <div className={style.candidate_resume_header}>

                <div className={style.candidate_resume_title}>

                    <h2>Análise de currículo</h2>

                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        {no_show &&
                            <div>

                                <Button
                                    id="basic-button"
                                    aria-controls="basic-menu"
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                    sx={{textTransform: 'lowercase'}}
                                >
                                    <ExpandMoreIcon /> opções
                                </Button>

                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                    }}
                                    sx={{fontSize:"12px"}}
                                    
                                >
                                    
                                    <MenuItem 
                                        onClick=
                                        { 
                                            () => openPopupWithContent(<Comments data={props.data} closeWindow={closePopUp} dialog={setConfirmDialog} callback={doAnything}/>, 'Comentários') 
                                        } 
                                        sx={{fontSize:"12px"}} 
                                        divider
                                    >
                                        
                                        <CommentIcon sx={{fontSize:"16px", marginRight:"3px", color:"#c83f15"}} /> 
                                        Adicionar/ver comentários

                                    </MenuItem>

                                    <MenuItem onClick={handleClose} sx={{fontSize:"12px"}} divider><ContratadoIcon sx={{fontSize:"16px", marginRight:"3px", color:"#0176e7"}} /> Candidato contratado</MenuItem>

                                </Menu>
                                
                            </div>
                        }

                    </div>

                </div>

                <div className={style.candidate_resume_data}>

                    <div className={style.candidate_resume_avatar}>
                        <Avatar direction="row" name={props.data.name} width="52" avatar={props.data.avatar}/>
                    </div>

                    <div className={style.candidate_resume_name_area}>

                        <div className={style.candidate_resume_name}>
                            {props.data.name}
                        </div>

                        <div className={style.candidate_resume_area}>

                            <div className={style.candidate_resume_area_status}>
                                <Tag area={props.data.area_activity.name} color={props.data.area_activity.color}/>
                                <StatusResume type={schedule_type} time={schedule_date}/>
                            </div>

                            <div className={style.candidate_resume_area_actions}>
                                {avaliableSchedule &&
                                    <DoInterview 
                                        openWindow={openPopupWithContent} 
                                        closeWindow={closePopUp} 
                                        data={props.data} 
                                        dialog={setConfirmDialog} 
                                        callback={doAnything}
                                    />
                                }
                                {no_show &&
                                    <GoMap openWindow = {openPopupWithContent}/>
                                }
                                {avaliablePhone &&
                                    <DoCall tel={props.data.phone_contact[0].phone}/>
                                }
                                {avaliableCellPhone &&
                                    <CallWhatsapp tel={(props.data.phone_contact[0].phone) ? props.data.phone_contact[0].phone : '-'}/>
                                }
                                <SendMail mail={props.data.email}/>
                                {no_show &&
                                    <PrintContent data={props.data} />
                                }
                                {no_show &&
                                    <DoComment 
                                        openWindow = {openPopupWithContent}
                                        closeWindow={closePopUp} 
                                        data={props.data} 
                                        dialog={setConfirmDialog} 
                                        callback={doAnything}
                                    />
                                }
                            </div>

                        </div>

                    </div>
                    
                </div>

            </div>

            <div className={style.candidate_resume_content}>

                <div className={style.candidate_resume_body}>

                    <div className={style.candidate_resume_body_line}>
                        <div className={style.candidate_resume_body_line_title}>
                            Dados pessoais
                        </div>
                    </div>

                    <div className={style.candidate_resume_body_line}>
                        <div className={style.candidate_resume_body_line_itens}>
                            <strong>Data de nascimento:</strong> {(props.data.birth_date) ? new Date(props.data.birth_date).toLocaleDateString() : '-'}
                        </div>

                        <div className={style.candidate_resume_body_line_itens}>
                            <strong>CPF:</strong> {props.data.cpf ? props.data.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4") : '-'}
                        </div>       
                    </div>

                    <div className={style.candidate_resume_body_line}>
                        <div className={style.candidate_resume_body_line_itens}>
                            <strong>Telefone:</strong> {props.data.phone_contact[0].phone ? props.data.phone_contact[0].phone : '-'}
                        </div>

                        <div className={style.candidate_resume_body_line_itens}>
                            <strong>E-mail:</strong> {props.data.email}
                        </div>       
                    </div>

                    <div className={style.candidate_resume_body_line}>                                       
                        <div className={style.candidate_resume_body_line_itens}>
                            <strong>Sexo:</strong> {(props.data.sex === 'F')? 'Feminino' : 'Masculino'}
                        </div> 
                        <div className={style.candidate_resume_body_line_itens}>
                            <strong>CEP:</strong> {(props.data.address.length > 0) ? props.data.address[0].zip : '-'}
                        </div>
                    </div>

                    <div className={style.candidate_resume_body_line}>
                        <div className={style.candidate_resume_body_line_itens}>
                            <strong>Endereço:</strong> {(props.data.address.length > 0) ? props.data.address[0].address : '-'}, {(props.data.address.length > 0) ? props.data.address[0].number : '-'}
                        </div>

                        <div className={style.candidate_resume_body_line_itens}>
                            <strong>Bairro:</strong> {(props.data.address.length > 0) ? props.data.address[0].district : '-'}
                        </div>       
                    </div>

                    <div className={style.candidate_resume_body_line}>
                        <div className={style.candidate_resume_body_line_itens}>
                            <strong>Cidade:</strong> {(props.data.address.length > 0) ? props.data.address[0].city : '-'}
                        </div>

                        <div className={style.candidate_resume_body_line_itens}>
                            <strong>UF:</strong> {(props.data.address.length > 0) ? props.data.address[0].uf : '-'}
                        </div>       
                    </div>

                    <div className={style.candidate_resume_body_line}>

                        <div className={style.candidate_resume_body_line_itens}>
                            <strong>Possui deficiência:</strong> {(props.data.have_desability) ? 'Sim' : 'Não'}
                        </div>

                        <div className={style.candidate_resume_body_line_itens}>
                            <strong>Possui veículo próprio:</strong> {(props.data.own_car) ? 'Sim' : 'Não'}
                        </div>

                    </div>
                    
                    <div className={style.candidate_resume_body_line} style={{flexDirection:"column"}}>
                        
                        <div className={style.candidate_resume_body_line_title} style={{marginTop: "40px"}}>
                            Breve resumo
                        </div>

                        <div className={style.candidate_resume_body_line} style={{flexDirection:"column"}}>
                            {(props.data.curriculo) ? props.data.curriculo.sumary : '-'}
                        </div>

                    </div>
                   
                    <div className={style.candidate_resume_body_line}>
                        <div className={style.candidate_resume_body_line_title} style={{marginTop: "40px"}}>
                            Área de interesse e formação
                        </div>
                    </div>

                    <div className={style.candidate_resume_body_line}>

                        <div className={style.candidate_resume_body_line_itens}>
                            <strong>Área de interesse:</strong> {(props.data.area_activity) ? props.data.area_activity.name : '-'}
                        </div>

                        <div className={style.candidate_resume_body_line_itens}>
                            <strong>Formação:</strong> {(props.data.scholarity) ? props.data.scholarity.name : '-'}
                        </div>

                    </div>

                    <div className={style.candidate_resume_body_line}>
                        <div className={style.candidate_resume_body_line_title} style={{marginTop: "40px"}}>
                            Experiência Profissional
                        </div>
                    </div>

                    <div className={style.candidate_resume_body_line}>

                        <div className={style.candidate_resume_body_line_itens} style={{width: "100%"}}>
                            <strong>Nome da última empresa:</strong> {(props.data.curriculo) ? props.data.curriculo.last_company : '-'}
                        </div>

                    </div>

                    <div className={style.candidate_resume_body_line}>

                        <div className={style.candidate_resume_body_line_itens}>
                            <strong>Data de admissão:</strong> {(props.data.curriculo) ? new Date(props.data.curriculo.last_admission).toLocaleDateString() : '-'}
                        </div>

                        <div className={style.candidate_resume_body_line_itens}>
                            <strong>Data de demissão:</strong> {(props.data.curriculo) ? new Date(props.data.curriculo.last_resignation).toLocaleDateString() : '-'}
                        </div>
                        
                    </div>

                    <div className={style.candidate_resume_body_line} style={{flexDirection:"column"}}>


                        <strong><p>Atividades realizadas:</p></strong>

                        {(props.data.curriculo) ? props.data.curriculo.last_activity : '-'}

                    </div>
                    
                    <div style={{marginTop:"25px", marginBottom:"25px", width: "100%", borderBottom: "1px solid #eee"}}></div>

                    <div className={style.candidate_resume_body_line}>

                        <div className={style.candidate_resume_body_line_itens} style={{width: "100%"}}>
                            <strong>Nome da penúltima empresa:</strong> {(props.data.curriculo) ? props.data.curriculo.penultimate_company : '-'}
                        </div>

                    </div>

                    <div className={style.candidate_resume_body_line}>

                        <div className={style.candidate_resume_body_line_itens}>
                            <strong>Data de admissão:</strong> {(props.data.curriculo) ? new Date(props.data.curriculo.penultimate_admission).toLocaleDateString() : '-'}
                        </div>

                        <div className={style.candidate_resume_body_line_itens}>
                            <strong>Data de demissão:</strong> {(props.data.curriculo) ? new Date(props.data.curriculo.penultimate_resignation).toLocaleDateString() : '-'}
                        </div>
                        
                    </div>

                    <div className={style.candidate_resume_body_line} style={{flexDirection:"column"}}>

                        <strong><p>Atividades realizadas:</p></strong>
                        {(props.data.curriculo) ? props.data.curriculo.penultimate_activity : '-'}

                    </div>

                </div>

                <div className={style.candidate_resume_footer}>

                    <div className={style.candidate_resume_footer_itens}> 
                        {avaliableSchedule &&
                            <DoInterview 
                                openWindow={openPopupWithContent} 
                                closeWindow={closePopUp} 
                                data={props.data} 
                                dialog={setConfirmDialog} 
                                callback={doAnything}
                            />
                        }
                        {no_show &&
                            <GoMap openWindow = {openPopupWithContent}/>
                        }
                        {avaliablePhone &&
                            <DoCall tel={props.data.phone_contact[0].phone}/>
                        }
                        {avaliableCellPhone &&
                            <CallWhatsapp tel={(props.data.phone_contact[0].phone) ? props.data.phone_contact[0].phone : '-'}/>
                        }
                        <SendMail mail={props.data.email}/>
                        {no_show &&
                            <PrintContent data={props.data} />
                        }
                        {no_show &&
                            <DoComment 
                                openWindow = {openPopupWithContent}
                                closeWindow={closePopUp} 
                                data={props.data} 
                                dialog={setConfirmDialog} 
                                callback={doAnything}
                            />
                        }
                    </div>

                    <div className={style.candidate_resume_footer_itens} style={{textAlign:"right"}}>
                        Visto em: {new Date(Date.now()).toLocaleString()} | Expira em: {endRegisterPeriod}
                    </div>

                </div>

            </div>
            
            <Popup 
                openPopup = {openPopup}
                setOpenPopup = {setOpenPopup}
                title = {popuptitle}
                maxwidth={width}
            >

                {content}

            </Popup>

            <FlashMessage
                notify = {notify}
                setNotify = {setNotify}
            />

            <ConfirmaDialog
                confirmDialog = {confirmDialog}
                setConfirmDialog = {setConfirmDialog}
            />
            
        </div>
    )
}


export default Resumeview