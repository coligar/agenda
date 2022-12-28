import IconButton from '@mui/material/IconButton';
import DateIcon from '@mui/icons-material/DateRange'
import ScheduleForm from '../forms/scheduleinterview'

const DoInterview = (props) =>
{
    const {openWindow, closeWindow, dialog, callback, data, ...others} = props
    let icon_padding = (props.padding) ? props.padding : "3px"
    let font_size = (props.font_size) ? props.fontsize : "18px"

    
    return(

        <IconButton 
            sx={{padding: icon_padding}} color='inherit' 
            onClick=
            {
                () => openWindow(<ScheduleForm data={data} closeWindow={closeWindow} dialog={dialog} callback={callback}/>, 'Agendar Entrevista', 'sm')
            }
        >
            <DateIcon sx={{fontSize: font_size}} color='inherit'/>
        </IconButton>
    )

}

export default DoInterview