import IconButton from '@mui/material/IconButton'
import PinIcon from '@mui/icons-material/Room'
import Iframe from './iframe'

const GoMap = (props:any) => 
{
    const {openWindow, ...others} = props
    let icon_padding = (props.padding) ? props.padding : "3px"
    let font_size = (props.font_size) ? props.fontsize : "18px"
    let src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7320.477751095217!2d-49.411489301248324!3d-23.451846488649778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c1a101c84293db%3A0x7c599e49d7afd046!2sTagua%C3%AD%2C%20SP%2C%2018890-000!5e0!3m2!1spt-BR!2sbr!4v1637081861061!5m2!1spt-BR!2sbr"

    return(
        <IconButton sx={{padding: icon_padding}} color='inherit' onClick={() => openWindow(<Iframe url={src}/>, 'Localização')}>
            <PinIcon sx={{fontSize: font_size}} color='inherit'/>
        </IconButton>
    )
}

export default GoMap