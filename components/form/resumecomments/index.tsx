import React, {useState, useEffect} from 'react'
import Style from './resumecomments.module.css'
import Avatar from "../../avatar"
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'

const Comments = (props:any) => 
{

    return(
        <>
            <div className={Style.container}>

                <div className={Style.commentarea}>
                    
                    <div className={Style.form_lines}>

                        <div className={Style.colicon}>
                            <Avatar direction="row" name={props.data.name} width="36" avatar={props.data.avatar}/>
                        </div>

                        <div className={Style.userinfo}>

                            <div className={Style.userinfohead}>
                                <strong>{props.data.name}</strong>
                                adicionou um comentário - 18/08/2021 15:55
                            </div>

                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mattis quam eget ipsum facilisis  tincidunt. Pellentesque finibus elit scelerisque massa porta sodales. Donec sodales aliquam nisl, quis feugiat nisl sagittis vel.

                        </div>

                    </div>

                    <div className={Style.form_lines}>

                        <div className={Style.colicon}>
                            <Avatar direction="row" name={props.data.name} width="36" avatar={props.data.avatar}/>
                        </div>

                        <div className={Style.userinfo}>

                            <div className={Style.userinfohead}>
                                <strong>{props.data.name}</strong>
                                adicionou um comentário - 18/08/2021 15:55
                            </div>

                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mattis quam eget ipsum facilisis  tincidunt. Pellentesque finibus elit scelerisque massa porta sodales. Donec sodales aliquam nisl, quis feugiat nisl sagittis vel.

                        </div>

                    </div>

                </div>

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
                                maintitle: 'Adicionar comentário',
                                title: 'Tem certeza que deseja adicionar o comentário?',
                                subTitle: 'Você não será capaz de desfazer esta operação',
                                type: 'confirm',
                                onConfirm: () => {props.callback(1)}
                            })
                        } 
                >
                    adicionar comentário
                </Button>

            </div>
        </>
    )
}

export default Comments