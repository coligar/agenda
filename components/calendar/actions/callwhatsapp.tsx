import IconButton from '@mui/material/IconButton'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { useState } from 'react'

const CallWhatsapp = (props) => 
{
    let icon_padding = (props.padding) ? props.padding : "3px"
    let font_size = (props.font_size) ? props.fontsize : "18px"
    let tel = props.tel

    const [call, setCall] = useState()

    return(
        <IconButton sx={{padding: icon_padding}} color='inherit' onClick={() => window.open('https://api.whatsapp.com/send?phone='+tel, "_blank")}>
            <WhatsAppIcon sx={{fontSize: font_size}} color='inherit'/>
        </IconButton>
    )
}

export default CallWhatsapp