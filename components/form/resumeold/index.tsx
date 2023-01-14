import style from './resume.module.css'
import React, {useState} from 'react'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import { Button } from '@mui/material'

import PersonalDataForm from '../users/personalDataForm'
import SimpleResumeForm from '../resume/simpleResumeForm'
import { NextPage } from 'next'



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


interface Props 
{
    dados?: any | null
}


const Resume: NextPage<Props> = (props) => 
{

    const [expanded, setExpanded] = useState(false);
    const [warning, setWarning] = useState('Clique na seta para visualizar o seu currículo');
    const [enablebuttom, setEnableButtom] = useState(<Button disabled variant="contained" size="small" type="submit">enviar</Button>)

    let button_name = 'Enviar'

    const handleExpandClick = () => 
    {
        setExpanded(!expanded)
        let warning = (!expanded) ? 'Clique na seta para ocultar o currículo' : 'Clique na seta para visualizar o seu currículo'
        setWarning(warning)
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
                <Card>
                    <CardHeader className={style.card}
                        action={
                        <IconButton aria-label="settings">
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