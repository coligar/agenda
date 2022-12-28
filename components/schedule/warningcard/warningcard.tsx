import React, { useState, useEffect } from 'react'
import style from './WarningCard.module.css'
import Avatar from '../../avatar'
import GoMap from "../../actions/gomaps"
import DoCall from "../../actions/docall"
import CallWhatsapp from "../../actions/callwhatsapp"
import SendMail from "../../actions/sendmail"
import Popup from "../../modalbox/popup"

import TaskAltIcon from '@mui/icons-material/TaskAlt'
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt'
import RestoreIcon from '@mui/icons-material/Restore'

import FlashMessage from "../../flashmessage"
import Form from "../../form/rescheduleinterview"
import Cancellation from "../../notifications/cancellation"
import { Button, DialogActions, Divider} from '@mui/material'
import ConfirmaDialog from "../../notifications/confirmdialog"


const WarningCard = (props:any) => 
{
    let x, colortype, type, reschedule, title

    const [notify, setNotify] = useState({isOpen: false, message:'', type:''})
    const [confirmDialog, setConfirmDialog] = useState({isOpen: false, maintitle:'', title: '', subTitle: '', type: ''})

    const [openPopup, setOpenPopup] = useState(false)
    const [content, setContent] = useState()
    const [popuptitle, setPopupTitle] = useState()
    
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

    const closePopUp = () =>
    {
        setOpenPopup(false)
    }

    const openPopupWithContent = (content:any, title:any) =>
    {
        setOpenPopup(true)
        setPopupTitle(title)
        setContent(content)
    }

   
    if(props.data.type == 'cancelamento')
    {
        colortype = '#FF6565'
        type = 'cancelamento'
        reschedule = '--'
    }
    else
    {
        colortype = '#E1A836'
        type = 'reagendamento'
        reschedule = `Data do reagendamento: ${props.data.date}`
    }

    return(

        <div className={style.warning_content}>

            <div className={style.warning_picture}>

                <div className={style.warning_picture_img} style={{border: `solid 12px ${colortype}`}}>
                    <Avatar direction="row" name={props.data.name} width="60" avatar={props.data.img}/>
                </div>

                <div className={style.warning_picture_actions}>
                    <GoMap padding="1px" openWindow = {openPopupWithContent}/>
                    <DoCall padding="1px" tel={props.data.tel}/>
                    <CallWhatsapp padding="1px" tel={props.data.whatsapp}/>
                    <SendMail padding="1px" mail={props.data.mail}/>
                </div>
                
            </div>

            <div className={style.warning_picture_info_area}>

                <div className={style.info_head}>
                    <div className={style.info_head_name}>
                        {props.data.name}
                    </div>
                    <div className={style.info_head_tag} style={{backgroundColor: colortype}}>
                        {type}
                    </div>
                </div>

                <div className={style.info_area_description}>
                    {props.data.description}
                </div>

                <div className={style.info_area_date}>
                    {reschedule}
                </div>

                <div className={style.info_area_buttons}>

                    <Button size="small" 
                        onClick=
                        {
                            () => 
                            setConfirmDialog({
                                isOpen:true,
                                maintitle: 'Confirmar Reagendamento',
                                title: 'Tem certeza que deseja confirmar o reagendamento?',
                                subTitle: 'Você não será capaz de desfazer esta operação',
                                type: 'confirm',
                                onConfirm: () => {doAnything(1)}
                            })
                        } 
                        className={style.confirm}>
                        confirmar
                    </Button>

                    <Button size="small" 
                        onClick=
                        {
                            () => 
                            setConfirmDialog({
                                isOpen:true,
                                maintitle: 'Cancelar Reagendamento',
                                title: 'Tem certeza que deseja cancelar o reagendamento?',
                                subTitle: 'Você não será capaz de desfazer esta operação',
                                type: 'cancel',
                                onConfirm: () => {doAnything(0)}
                            })
                        } 
                        className={style.cancel}
                    >
                        cancelar
                    </Button>

                    <Button size="small" 
                        onClick=
                        {
                            () => openPopupWithContent(
                                <Form openWindow = {openPopupWithContent} 
                                    closeWindow={closePopUp} 
                                    data={props.data} 
                                    dialog={setConfirmDialog} 
                                    callback={doAnything}/>, 'Reagendar entrevista')
                        } 
                        className={style.reshedule}
                    >
                        reagendar
                    </Button>

                </div>
                
            </div>

            <Popup 
                openPopup = {openPopup}
                setOpenPopup = {setOpenPopup}
                title = {popuptitle}
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

export default WarningCard