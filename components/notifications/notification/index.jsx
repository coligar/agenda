import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';


const Notifications = (props) => {

    let badgex =  (!props.badgex) ? 'right' : props.badgex
    let badgey =  (!props.badgey) ? 'top' : props.badgey
    let badgevalue = (!props.badgevalue) ? 0 : parseInt(props.badgevalue)
    let badgemaxvalue = (!props.badgemaxvalue) ? 10 : parseInt(props.badgemaxvalue)
    let badgecolor = "success"
    let notificationiconcolor = (!props.notificationiconcolor) ? '#7E84A3' : props.notificationiconcolor

    if(badgevalue > 0 && badgevalue <= Math.round(badgemaxvalue)/2)
    {
        badgecolor
    }
    else if(badgevalue > Math.round(badgemaxvalue)/2 && badgevalue <= badgemaxvalue)
    {
        badgecolor = "warning"
    }
    else
    {
        badgecolor = "error"
    }

    return(
        <>
            <IconButton aria-label="notifications">
                <Badge 
                    badgeContent= {parseInt(badgevalue)}
                    max= {parseInt(badgemaxvalue)} 
                    color= {badgecolor} 
                    anchorOrigin= {{
                        vertical: String(badgey),
                        horizontal: String(badgex),
                    }}>
                    <NotificationsNoneIcon sx= {{color: notificationiconcolor}}/>
                </Badge>
            </IconButton>
        </>
    )

}

export default Notifications