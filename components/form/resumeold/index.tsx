import style from './resume.module.css'
import React, {useState} from 'react'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Popover from '@mui/material/Popover';

import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import Draggable from 'react-draggable';

import { Button, Paper, PaperProps } from '@mui/material'

import PersonalDataForm from '../users/personalDataForm'
import SimpleResumeForm from '../resume/simpleResumeForm'
import { NextPage } from 'next'
import axios from 'axios'
import { toast } from 'react-toastify'
import router from 'next/router'



const ExpandMore = styled((props:any) => 
{
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


const PaperComponent = (props: PaperProps) => {
    return (
        <Draggable
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
        >
        <Paper {...props} />
        </Draggable>
    );
}


interface Props 
{
    dados?: any | null
}


const Resume: NextPage<Props> = (props) => 
{

    const [expanded, setExpanded] = useState(false);
    const [warning, setWarning] = useState('Clique na seta para visualizar o seu currículo');
    const [enablebuttom, setEnableButtom] = useState(<Button disabled variant="contained" size="small" type="submit">enviar</Button>)
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
    const [openDialog, setOpenDialog] = React.useState(false)

    let button_name = 'Enviar'

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
      };
    
    const handleClose = () => {
    setAnchorEl(null);
    };
    
    const handleExpandClick = () => 
    {
        setExpanded(!expanded)
        let warning = (!expanded) ? 'Clique na seta para ocultar o currículo' : 'Clique na seta para visualizar o seu currículo'
        setWarning(warning)
    }

    const handleClickOpenDialog = () => 
    {
        setOpenDialog(true);
    };
    
    const handleCloseDialog = () => 
    {
        setOpenDialog(false);
    };

    const deleteUser = async (id:string) =>
    {
        return await axios.delete(`api/user/${id}`).then(res => 
        {
            toast.success('Usuário excluído com sucesso', { hideProgressBar: false, autoClose: 2000 });
            localStorage.clear()
            router.push('login')
        }).catch((error) =>
        {
            toast.error(error, { hideProgressBar: false, autoClose: 2000 })
        })
    }


    return(
        <>
            <Box
                sx={{
                    boxShadow: 0,
                    bgcolor: 'background.paper',
                    m: 1,
                    borderRadius:2,
                    overflow: 'hidden',
                    width: '100%',
                }}
            >
                 <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <Button onClick={handleClickOpenDialog}>Deletar conta</Button>
                </Popover>

                <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Aviso
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Tem certeza que deseja deletar sua conta? Ao deletá-la, todos os seus dados serão excluídos e você perderá o acesso à plataforma.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button autoFocus onClick={handleCloseDialog}>
                        Cancelar
                    </Button>
                    <Button variant="contained" color="error" onClick={()=>{deleteUser(props.dados.id)}}>Excluir</Button>
                    </DialogActions>
                </Dialog>

                <Card>
                    <CardHeader className={style.card}
                        action={
                            <IconButton aria-label="settings" onClick={handleClick}>
                                <MoreVertIcon />
                            </IconButton>
                        }
                        
                        title="Dados pessoais"
                        subheader="Informe seus dados pessoais abaixo"
                    />

                    <PersonalDataForm type='PUT' url='api/user' dados={props.dados}/>

                    <CardActions disableSpacing>
                        
                        <div style={{display: 'flex', alignItems: 'right', justifyContent: 'right', width:'100%', fontSize:'14px'}}>
                           {warning}
                        </div>
                        
                        <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="veja mais"
                        >
                            <ExpandMoreIcon sx={{background:"#CCC", borderRadius:"50%"}}/>
                        </ExpandMore>

                    </CardActions>

                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <SimpleResumeForm  type='PUT' url='api/curriculo' dados={props.dados}/>    
                            </CardContent>
                    </Collapse>
                </Card>
            </Box>
        
        </>
    )
}

export default Resume