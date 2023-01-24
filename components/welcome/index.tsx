import style from "./Welcome.module.css"
import { useRouter } from 'next/router'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import LogoutIcon from '@mui/icons-material/Logout';

const Welcome = (props:any) => {

    const router = useRouter()

    const logOut = () =>
    {
        localStorage.clear()
        router.push('login')
    }

    return(
        <div className={style.content}>
            <span>
                <div className={style.welcome_message}>Seja bem vindo</div>
                <div className={style.username}>{props.username}</div>
            </span>
            
            <IconButton
                aria-label="logout"
                onClick={() => logOut()}
                sx={{textTransform: 'lowercase'}}
            >
                <LogoutIcon />
            </IconButton>
        </div> 
    )

}

export default Welcome