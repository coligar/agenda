import Link from 'next/link'
import Avatar from "../../avatar"
import style from "./Layoutmain.module.css"
import DehazeIcon from '@mui/icons-material/Dehaze'
import IconButton from '@mui/material/IconButton'
import MenuSideBar from "../../sidebarmenu"
import Notifications from "../../notifications/notification"
import Welcome from "../../welcome"
import ChatIcon from '@mui/icons-material/Chat';
import Logo from '../../logotipo'



const LayoutMain = (props:any) => 
{
    let user_name = localStorage.getItem('name') + ' ' + localStorage.getItem('lastname')
    let avatar_image = localStorage.getItem('avatar')
    return (
        <>
            <div className={style.header_wrapper}>

                <div className={style.nav_left}>
                    <div className={style.content_nav_left}>
                        <div className={`${style.item} ${style.logomobile}`}>
                            <Link href="/" passHref>
                                <Logo height="39" width="113" image="/images/system/logo-grupo-40.svg"/>
                            </Link>
                        </div>
                        <div className={style.item}>
                            
                        </div>
                    </div>                   
                </div>

                <div className={style.logo}>
                    <Link href="/" passHref>
                        <Logo height="39" width="113" image="/images/system/logo-grupo.svg"/>
                    </Link>
                </div>

                <div className={style.nav}>

                    <div className={style.notifications}>
                        <Notifications badgevalue="0"/>
                    </div>

                    <div className={style.avatar}>
                        <IconButton aria-label="cart">
                            <Avatar direction="row" name={user_name} width="36" avatar={avatar_image}/>
                        </IconButton>
                    </div>

                    <div className={style.welcome}>
                        <Welcome username={user_name}/>
                    </div>

                    <div className={style.chat}>

                        <span className={style.chatdesktop}>
                            <IconButton aria-label="chat">
                                <ChatIcon sx={{color: '#AAAAAA'}}/>
                            </IconButton>
                        </span>

                        <span className={style.menumobile}>
                            <IconButton aria-label="menu">
                                <DehazeIcon sx={{color: '#AAAAAA'}}/>
                            </IconButton>
                        </span>

                    </div>

                </div>

            </div>

            <div className={style.sidebar}>

                <div className={style.side_profiler}>                  
                    <IconButton aria-label="menu">
                        <DehazeIcon sx={{color: 'white', margin: '0 0 26px 0'}}/>
                    </IconButton>
                    <Avatar direction="column" name={user_name} width="42" border avatar={avatar_image}/>
                </div>

                <MenuSideBar type={props.type}/>
                
            </div>

            <div className={style.content_wrapper}>
                <div className={style.content}>
                    {props.children}
                </div>
            </div>

        </>  
    )
}

export default LayoutMain