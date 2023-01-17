import IconButton from '@mui/material/IconButton'
import CommentIcon from '@mui/icons-material/Comment'
import Comments from '../form/resumecomments'

const DoComment = (props:any) => 
{
    const {openWindow, closeWindow, dialog, callback, data, ...others} = props
    let icon_padding = (props.padding) ? props.padding : "3px"
    let font_size = (props.font_size) ? props.fontsize : "18px"

    return(
        <IconButton sx={{padding: icon_padding}} color='inherit' 
            onClick=
            {
                () => openWindow(<Comments data={data} closeWindow={closeWindow} dialog={dialog} callback={callback}/>, 'Comentários', 'md')
            }
        >
            <CommentIcon sx={{fontSize: font_size}} color='inherit'/>
        </IconButton>
    )
}

export default DoComment