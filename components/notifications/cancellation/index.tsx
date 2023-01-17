import React, { useState } from 'react'
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt'
import FlashMessage from "../../flashmessage"
import { Button, Divider} from '@mui/material'


const Cancellation = (props:any) => 
{

    return(
        <>
            <div style={{
                display: 'flex', 
                flexDirection:'row', 
                alignItems: 'center', 
                color:'#707070', 
                width:'100%', 
                height:'100%', 
                marginBottom:'15px', 
                padding:'2px'}}
            > 
                
                <DoNotDisturbAltIcon color="inherit" sx={{fontSize:'55px', color: '#f4617d', marginRight:'5px'}}/> Tem certeza que deseja cancelar o reagendamento?

            </div>

            <Divider/>

            <div style={{display: 'flex', flexDirection:'row', marginTop:'10px', alignItems: 'center', justifyContent: 'right'}}>

                <Button variant="outlined" size="small" onClick={() => props.fncancel()} style={{marginRight:'5px'}}>
                    cancelar
                </Button>
    
                <Button variant="outlined" size="small" onClick = {() => props.fnconfirm(1)}>
                    confirmar
                </Button>

            </div>

        </>
    )
}

export default Cancellation