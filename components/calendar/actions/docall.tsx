import IconButton from '@mui/material/IconButton'
import PhoneIcon from '@mui/icons-material/PhoneInTalk'


const DoCall = (props) => 
{
    let icon_padding = (props.padding) ? props.padding : "3px"
    let font_size = (props.font_size) ? props.fontsize : "18px"
    let tel = props.tel
    
    return(
        <IconButton sx={{padding: icon_padding}} color='inherit' onClick={() => window.open('tel:'+tel, "_blank")}>
            <PhoneIcon sx={{fontSize: font_size}} color='inherit'/>
        </IconButton>
    )
}

export default DoCall