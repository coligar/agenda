import Link from 'next/link'
import DashboardIcon from '@mui/icons-material/Dashboard'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import IconButton from '@mui/material/IconButton'


const SidebarMenu = (props) => 
{
    function getMenuType(type = 'candidate')
    {
        let color =  (!props.color) ? '#7E84A3' : props.color

        if(type == 'manager')
        {
            return(
                <>
                    <IconButton aria-label="dashboard">
                        <Link href="/" passHref>
                            <DashboardIcon sx={{color: color}}/>
                        </Link>
                    </IconButton>
                    <IconButton aria-label="people">
                        <Link href="/users" passHref>
                            <PeopleAltIcon sx={{color: color}}/>
                        </Link>
                    </IconButton>
                    <IconButton aria-label="email">
                        <Link href="/contact" passHref>
                            <EmailOutlinedIcon sx={{color: color}}/>
                        </Link>
                    </IconButton>
                    <IconButton aria-label="settings">
                        <Link href="/config" passHref>
                            <SettingsOutlinedIcon sx={{color: color}}/>
                        </Link>
                    </IconButton>
                </>
            )
        }
        else
        {
            return(
                <>
                    <IconButton aria-label="dashboard">
                        <Link href="/" passHref>
                            <DashboardIcon sx={{color: color}}/>
                        </Link>
                    </IconButton>
                    <IconButton aria-label="email">
                        <Link href="/contact" passHref>
                            <EmailOutlinedIcon sx={{color: color}}/>
                        </Link>
                    </IconButton>
                    <IconButton aria-label="settings">
                        <SettingsOutlinedIcon sx={{color: color}}/>
                    </IconButton>
                </>
            )
        }
    }

    return (
        <>
            {getMenuType(props.type)}
        </>
    )
}

export default SidebarMenu