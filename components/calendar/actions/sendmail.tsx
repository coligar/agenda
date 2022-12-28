import IconButton from '@mui/material/IconButton'
import MailIcon from '@mui/icons-material/MailOutline'

const SendMail = (props) => 
{
    let icon_padding = (props.padding) ? props.padding : "3px"
    let font_size = (props.font_size) ? props.fontsize : "18px"
    let mail = props.mail

    return(
        <IconButton sx={{padding: icon_padding}} color='inherit' onClick={() => window.open('mailto:'+mail, "_blank")}>
            <MailIcon sx={{fontSize: font_size}} color='inherit'/>
        </IconButton>
    )
}

export default SendMail