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
                        <Notifications badgevalue="3"/>
                    </div>

                    <div className={style.avatar}>
                        <IconButton aria-label="cart">
                            <Avatar direction="row" name="Alexandre Henrique da Silva Corrêa" width="36" avatar="https://heloisatolipan.com.br/imagens/2021/01/20210121-imagem.jpg"/>
                        </IconButton>
                    </div>

                    <div className={style.welcome}>
                        <Welcome username="Alexandre Corrêa"/>
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
                    <Avatar direction="column" name="Alexandre Henrique da Silva Corrêa" width="42" border avatar="https://heloisatolipan.com.br/imagens/2021/01/20210121-imagem.jpg"/>
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