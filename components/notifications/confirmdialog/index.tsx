import React from 'react'
import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogTitle, styled, Typography } from '@mui/material'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt'

const ConfirmDialog = (props:any) =>  
{
    const { confirmDialog, setConfirmDialog } = props

    const DialogModel = styled(Dialog)(( {theme}) => 
    ({
        '& .MuiDialog-root':{
            top: theme.spacing(5),
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(2px)',
            borderRadius: '10px',
        },
        '& .MuiDialogContent-root':{
            padding: theme.spacing(2),

        },
        '& .MuiDialog-container':{
        backdropFilter: 'blur(3px)'
        },
        '& .MuiDialog-scrollPaper':
        {
            alignItems: 'flex-start',
        }
    }))

    const DialogTitleModel = styled(DialogTitle)({
        borderBottom: '1px solid #EEE', 
        lineHeight:'10px', 
        marginBottom: '5px', 
        color:'#A7A7A7', 
        fontWeight:'500', 
        fontSize:'14px', 
        textTransform:'uppercase'
    })

    const DialogActionsModel = styled(DialogActions)({
        borderTop: '1px solid #EEE', lineHeight:'10px'
    })

    let icon = (confirmDialog.type === 'confirm') ? <TaskAltIcon color="inherit" sx={{color:'#3FD889', fontSize:'35px', marginRight:'5px'}}/> : <DoNotDisturbAltIcon color="inherit" sx={{color:'#FF6565', fontSize:'35px', marginRight:'5px'}}/>

    return (

        <DialogModel open={confirmDialog.isOpen}>

            <DialogTitleModel>
                {confirmDialog.maintitle}
            </DialogTitleModel>

            <DialogContent>

                <Typography variant='h6' sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                    {icon} {confirmDialog.title}
                </Typography>

                <Typography variant='subtitle2' sx={{marginLeft:'40px'}}>
                    {confirmDialog.subTitle}
                </Typography>
                
            </DialogContent>

            <DialogActionsModel>

                <ButtonGroup size="small" variant="contained" disableElevation>

                    <Button
                        onClick = {() => setConfirmDialog({...confirmDialog, isOpen: false})}
                    >
                        Não
                    </Button>

                    <Button
                        onClick = {confirmDialog.onConfirm}
                    >
                        Sim
                    </Button>

                </ButtonGroup>

            </DialogActionsModel>

        </DialogModel>
    )
}

export default ConfirmDialog
