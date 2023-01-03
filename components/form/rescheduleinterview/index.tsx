import React, {useState, useEffect} from 'react'
import Style from './rescheduleinterview.module.css'

import DateRangeIcon from '@mui/icons-material/DateRange'
import ReagendamentoSolicitado from '@mui/icons-material/Restore'

import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'


const ReScheduleInterview = (props:any) => 
{

    return(

        <>
            
            <div className={Style.container}>

                <div className={Style.colicon}>

                    <ReagendamentoSolicitado fontSize='large' sx={{fontSize:'55px', color: "#dda44b"}}/>

                </div>

                <div className={Style.colform}>
                    
                    <div className={Style.form_lines}>

                        <strong>Motivo do reagendamento:</strong>
                          
                    </div>

                    <div className={Style.form_lines}>

                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mattis quam eget ipsum facilisis  tincidunt. Pellentesque finibus elit scelerisque massa porta sodales. Donec sodales aliquam nisl, quis feugiat nisl sagittis vel.
                        <br/>

                    </div>

                    <div className={Style.form_lines}>

                        Escolher data da entrevista<br/>

                        <Tooltip title="Informe a data da entrevista. Utilizar o formato: dd/mm/aaaa. Exemplo: 01/01/1900" placement="top-start">
                            <TextField 
                                id="interview_date" 
                                required
                                fullWidth
                                //label="Data da entrevista" 
                                variant="outlined" 
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
                                maintitle: 'Confirmar Reagendamento',
                                title: 'Tem certeza que deseja marcar o reagendamento?',
                                subTitle: 'Você não será capaz de desfazer esta operação',
                                type: 'confirm',
                                onConfirm: () => {props.callback(1)}
                            })
                        } 
                >
                    confirmar reagendamento
                </Button>

            </div>

        </>

    )
}

export default ReScheduleInterview