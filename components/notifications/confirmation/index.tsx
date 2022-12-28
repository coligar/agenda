import style from './Confirmation.module.css'
import ErrorIcon from '@mui/icons-material/Error';
import Box from '@mui/material/Box';
import EmailIcon from '@mui/icons-material/Email';
import RoomIcon from '@mui/icons-material/Room';
import IconButton from '@mui/material/IconButton'

const Confirmation = (props:any) =>
{
    return(
          
          <>  
            
            <Box
                sx={{
                    boxShadow: 3,
                    bgcolor: 'background.paper',
                    m: 1,
                    borderRadius:2,
                    overflow: 'hidden',
                    marginTop: 7,
                    marginBottom: 8
                }}
            >
                <div className={style.header}>
                    Notificação
                </div>

                <div className={style.textnotifications}>
                    <div className={style.icon}>
                        <ErrorIcon fontSize='inherit'/>
                    </div>
                    <div className={style.text}>
                        Olá Alexandre Corrêa, solicitamos que você esteja presente no dia 25/08/2021 às 9h no endereço: Acesso à Via Washington Luiz, Km 180 - Distrito Industrial de Batovi em Rio Claro (SP). Por favor, esteja presente 15 minutos antes do horário da entrevista. Evite atrasos.
                    </div>
                </div>

                <div className={style.infoarea}>
                    <div className={style.icons}>

                        <IconButton aria-label="mail" size="small" color='inherit'>
                            <EmailIcon fontSize="inherit"/>
                        </IconButton>

                        <IconButton aria-label="pin" size="small" color='inherit' classes={style.iconhover}>
                            <RoomIcon fontSize="inherit" />
                        </IconButton>

                    </div>
                    <div className={style.time}>
                        Data da Entrevista: 25 Ago 2021 9:00AM
                    </div>
                </div>

                <div className={style.buttonsarea}>

                    <div className={style.confirm}>
                        confirmar
                    </div>

                    <div className={style.cancel}>
                        cancelar
                    </div>

                    <div className={style.reshedule}>
                        reagendar
                    </div>
                </div>

            </Box>
            
        </>
    )
}

export default Confirmation