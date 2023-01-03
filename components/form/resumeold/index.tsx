import style from './resume.module.css'
import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import InputAdornment from '@mui/material/InputAdornment'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import PersonIcon from '@mui/icons-material/Person'
import DateRangeIcon from '@mui/icons-material/DateRange'
import PinIcon from '@mui/icons-material/Pin'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import GpsFixedIcon from '@mui/icons-material/GpsFixed'
import ApartmentIcon from '@mui/icons-material/Apartment'
import PublicIcon from '@mui/icons-material/Public'
import AccessibleIcon from '@mui/icons-material/Accessible'
import GroupIcon from '@mui/icons-material/Group'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import RoomIcon from '@mui/icons-material/Room'
import SchoolIcon from '@mui/icons-material/School'
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns'
import StoreIcon from '@mui/icons-material/Store'



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


const Resume = (props:any) => 
{

    const [expanded, setExpanded] = useState(false);
    const [deficiencia, setDeficiencia] = useState('');
    const [sexo, setSexo] = useState('');
    const [veiculo, setVeiculo] = useState('');
    const [job, setJob] = useState('');
    const [formacao, setFormacao] = useState('');
    const [warning, setWarning] = useState('Clique na seta para visualizar os demais campos do currículo');
    const [enablebuttom, setEnableButtom] = useState(<Button disabled variant="contained" size="small">cadastrar</Button>)


    const handleExpandClick = () => 
    {
        setExpanded(!expanded)
        let warning = (!expanded) ? 'Clique na seta para ocultar os demais campos do currículo' : 'Clique na seta para visualizar os demais campos do currículo'
        setWarning(warning)
    }

    const handleEnableButtomClick = (event:any) =>
    {
        let enablebuttom = (!event.target.checked) ? <Button disabled variant="contained" size="small">cadastrar</Button> : <Button variant="contained" size="small">cadastrar</Button>
        setEnableButtom(enablebuttom)
    }

    const handleDeficienciaClick = (event:any) => 
    {
        setDeficiencia(event.target.value);
    }

    const handleSexoClick = (event:any) => 
    {
        setSexo(event.target.value);
    }

    const handleVeiculoClick = (event:any) => 
    {
        setVeiculo(event.target.value);
    }

    const handleJobClick = (event:any) => 
    {
        setJob(event.target.value);
    }

    const handleFormacaoClick = (event:any) => 
    {
        setFormacao(event.target.value);
    }

    const margin_fields = 
    {
        marginRight:1, 
        marginLeft:1,
        marginBottom:2,
        fontSize:'10px'
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

                    <CardContent >

                        <Paper>

                            <div className={style.form_lines}>
                                
                                <Tooltip title="Informe seu nome" placement="top-start">
                                    <TextField 
                                        id="nome" 
                                        required
                                        fullWidth
                                        label="Nome"
                                        placeholder="Informe seu nome"
                                        variant="outlined" 
                                        size="small"
                                        margin="dense"
                                        InputProps={{
                                            startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonIcon />
                                            </InputAdornment>
                                            ),
                                            style:{fontSize:14},
                                        }}
                                        InputLabelProps={{
                                            style:{fontSize:14},
                                        }}
                                        sx={margin_fields}
                                    />
                                </Tooltip>

                                <Tooltip title="Informe sua data de nascimento no formato: dd/mm/aaaa. Exemplo: 22/12/1900" placement="top-start">
                                    <TextField 
                                        id="datanascimento" 
                                        required
                                        fullWidth
                                        label="Data de nascimento" 
                                        variant="outlined" 
                                        size="small"
                                        margin="dense"
                                        placeholder='Data de nascimento'
                                        InputProps={{
                                            startAdornment: (
                                            <InputAdornment position="start">
                                                <DateRangeIcon />
                                            </InputAdornment>
                                            ),
                                            style:{fontSize:14},
                                        }}
                                        InputLabelProps={{
                                            style:{fontSize:14},
                                        }}
                                        sx={margin_fields}
                                    />
                                </Tooltip>

                                <Tooltip title="Informe o número do seu CPF. Utilizar apenas números." placement="top-start">
                                    <TextField 
                                        id="cpf" 
                                        required
                                        fullWidth
                                        label="CPF" 
                                        variant="outlined"
                                        size="small"
                                        margin="dense"
                                        placeholder='Informe seu CPF'
                                        InputProps={{
                                            startAdornment: (
                                            <InputAdornment position="start">
                                                <PinIcon />
                                            </InputAdornment>
                                            ),
                                            style:{fontSize:14},
                                        }}
                                        InputLabelProps={{
                                            style:{fontSize:14},
                                        }}
                                        sx={margin_fields}
                                    />
                                </Tooltip>

                            </div>


                            <div className={style.form_lines}>

                                <Tooltip title="Informe o seu e-mail para contato" placement="top-start">
                                    <TextField 
                                        id="email" 
                                        required
                                        fullWidth
                                        label="E-mail" 
                                        variant="outlined" 
                                        size="small"
                                        margin="dense"
                                        placeholder='Informe seu e-mail'
                                        InputProps={{
                                            startAdornment: (
                                            <InputAdornment position="start">
                                                <MailOutlineIcon />
                                            </InputAdornment>
                                            ),
                                            style:{fontSize:14},
                                            //pattern: '/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i',
                                        }}
                                        InputLabelProps={{
                                            style:{fontSize:14},
                                        }}
                                        sx={margin_fields}
                                    />
                                </Tooltip>
                                
                                <Tooltip title="Informe número do seu celular para contato" placement="top-start">
                                    <TextField 
                                        id="celular" 
                                        required
                                        fullWidth
                                        label="Telefone celular" 
                                        variant="outlined" 
                                        size="small"
                                        margin="dense"
                                        placeholder='Número do celular'
                                        InputProps={{
                                            startAdornment: (
                                            <InputAdornment position="start">
                                                <LocalPhoneIcon />
                                            </InputAdornment>
                                            ),
                                            style:{fontSize:14},
                                        }}
                                        InputLabelProps={{
                                            style:{fontSize:14},
                                        }}
                                        sx={margin_fields}
                                    />
                                </Tooltip>
                                
                                <Tooltip title="Informe o número do cep de sua residência" placement="top-start">
                                    <TextField 
                                        id="cep" 
                                        required
                                        fullWidth
                                        label="CEP" 
                                        variant="outlined" 
                                        size="small"
                                        margin="dense"
                                        placeholder='Informe seu CEP'
                                        InputProps={{
                                            startAdornment: (
                                            <InputAdornment position="start">
                                                <GpsFixedIcon />
                                            </InputAdornment>
                                            ),
                                            style:{fontSize:14},
                                        }}
                                        InputLabelProps={{
                                            style:{fontSize:14},
                                        }}
                                        sx={margin_fields}
                                    />
                                </Tooltip>

                            </div>

                            
                            <div className={style.form_lines}>
                               
                                <Tooltip title="Informe o endereço de sua residência" placement="top-start">
                                    <TextField 
                                        id="endereco" 
                                        required
                                        fullWidth
                                        label="Endereço" 
                                        variant="outlined"
                                        size="small"
                                        margin="dense"
                                        placeholder='Seu endereço'
                                        InputProps={{
                                            startAdornment: (
                                            <InputAdornment position="start">
                                                <RoomIcon />
                                            </InputAdornment>
                                            ),
                                            style:{fontSize:14},
                                        }}
                                        InputLabelProps={{
                                            style:{fontSize:14},
                                        }}
                                        sx={margin_fields}
                                    />
                                </Tooltip>
                                        
                                <Tooltip title="Informe o seu bairro" placement="top-start">
                                    <TextField 
                                        id="bairro" 
                                        required
                                        fullWidth
                                        label="Bairro" 
                                        variant="outlined"
                                        size="small"
                                        margin="dense"
                                        placeholder='Seu bairro'
                                        InputProps={{
                                            startAdornment: (
                                            <InputAdornment position="start">
                                                <ApartmentIcon />
                                            </InputAdornment>
                                            ),
                                            style:{fontSize:14},
                                        }}
                                        InputLabelProps={{
                                            style:{fontSize:14},
                                        }}
                                        sx={margin_fields}
                                    />
                                </Tooltip>

                                <Tooltip title="Informe a sua cidade" placement="top-start">                    
                                    <TextField 
                                        id="cidade" 
                                        required
                                        fullWidth
                                        label="Cidade" 
                                        variant="outlined"
                                        size="small"
                                        margin="dense"
                                        placeholder='Cidade'
                                        InputProps={{
                                            startAdornment: (
                                            <InputAdornment position="start">
                                                <ApartmentIcon />
                                            </InputAdornment>
                                            ),
                                            style:{fontSize:14},
                                        }}
                                        InputLabelProps={{
                                            style:{fontSize:14},
                                        }}
                                        sx={margin_fields}
                                    />
                                </Tooltip>

                                <Tooltip title="Informe a UF de sua cidade. Ex: Se você mora em São Paulo, utilize SP. Se mora em Brasília, utilize DF" placement="top-start">                    
                                    <TextField 
                                        id="uf"
                                        required
                                        fullWidth
                                        label="UF" 
                                        placeholder="UF"
                                        variant="outlined" 
                                        size="small"
                                        InputProps={{
                                            startAdornment: (
                                            <InputAdornment position="start">
                                                <PublicIcon />
                                            </InputAdornment>
                                            ),
                                            style:{fontSize:14},
                                        }}
                                        InputLabelProps={{
                                            style:{fontSize:14},
                                        }}
                                        sx={margin_fields}
                                    />
                                </Tooltip>
                                
                            </div>


                            <div className={style.form_lines}>
                               
                                <Tooltip title="Informe se você possui alguma deficiência" placement="top-start"> 
                                    <TextField 
                                        id="deficiencia"
                                        fullWidth 
                                        required
                                        select
                                        label="Possui deficiência?"
                                        placeholder="Informe se você tem deficiência"
                                        variant="outlined" 
                                        size="small"
                                        margin="dense"
                                        value= {deficiencia}
                                        onChange= {handleDeficienciaClick}
                                        InputProps={{
                                            startAdornment: (
                                            <InputAdornment position="start">
                                                <AccessibleIcon />
                                            </InputAdornment>
                                            ),
                                            placeholder: "Informe se você tem deficiência",
                                            style:{fontSize:14},
                                        }}
                                        InputLabelProps={{
                                            style:{fontSize:14},
                                        }}
                                        sx={margin_fields}
                                    >
                                        <MenuItem value="Sim">Sim</MenuItem>
                                        <MenuItem value="Não">Não</MenuItem>
                                    </TextField>
                                </Tooltip>
                                                              
                                <Tooltip title="Informe seu sexo" placement="top-start">
                                    <TextField 
                                        id="sexo" 
                                        required
                                        fullWidth
                                        select
                                        label="Sexo" 
                                        variant="outlined" 
                                        size="small"
                                        margin="dense"
                                        value= {sexo}
                                        onChange= {handleSexoClick}
                                        InputProps={{
                                            startAdornment: (
                                            <InputAdornment position="start">
                                                <GroupIcon />
                                            </InputAdornment>
                                            ),
                                            style:{fontSize:14},
                                        }}
                                        InputLabelProps={{
                                            style:{fontSize:14},
                                        }}
                                        sx={margin_fields}
                                    >
                                        <MenuItem value="Feminino">Feminino</MenuItem>
                                        <MenuItem value="Masculino">Masculino</MenuItem>
                                        <MenuItem value="Outro">Outro</MenuItem>
                                    </TextField>
                                </Tooltip>
                                
                                <Tooltip title="Informe se você possui veículo próprio" placement="top-start">
                                    <TextField 
                                        id="veiculo" 
                                        required
                                        fullWidth
                                        select
                                        label="Possui veículo próprio?" 
                                        variant="outlined"
                                        size="small"
                                        margin="dense"
                                        value= {veiculo}
                                        onChange= {handleVeiculoClick}
                                        placeholder='Informe se você tem veículo próprio'
                                        InputProps={{
                                            startAdornment: (
                                            <InputAdornment position="start">
                                                <DirectionsCarIcon />
                                            </InputAdornment>
                                            ),
                                            style:{fontSize:14},
                                        }}
                                        InputLabelProps={{
                                            style:{fontSize:14},
                                        }}
                                        sx={margin_fields}
                                    >
                                        <MenuItem value="Sim">Sim</MenuItem>
                                        <MenuItem value="Não">Não</MenuItem>
                                    </TextField>
                                </Tooltip>
                                                                
                            </div>

                        </Paper>

                    </CardContent>

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
                            
                            <Paper sx={{marginBottom:2}}>

                                <div className={style.title}>
                                    <span>Área de interesse e formação</span>
                                    <span className={style.subtitle}>Defina sua área de interesse e formação</span>
                                </div>

                                <div className={style.form_lines_center}>

                                    <Tooltip title="Escolha a sua área de interesse" placement="top-start">
                                        <TextField 
                                            id="job" 
                                            required
                                            fullWidth
                                            select
                                            label="Escolha sua área de interesse"
                                            placeholder="Informe se você tem deficiência"
                                            variant="outlined" 
                                            size="small"
                                            margin="dense"
                                            value= {job}
                                            onChange= {handleJobClick}
                                            InputProps={{
                                                startAdornment: (
                                                <InputAdornment position="start">
                                                    <FollowTheSignsIcon />
                                                </InputAdornment>
                                                ),
                                                style:{fontSize:14},
                                            }}
                                            InputLabelProps={{
                                                style:{fontSize:14},
                                            }}
                                            sx={margin_fields}
                                        >
                                            <MenuItem value="Administrativo">Administrativo</MenuItem>
                                            <MenuItem value="Comercial">Comercial</MenuItem>
                                            <MenuItem value="Representante">Representante</MenuItem>
                                            <MenuItem value="Produção">Produção</MenuItem>
                                            <MenuItem value="RH">RH</MenuItem>
                                        </TextField>
                                    </Tooltip>

                                    <Divider orientation="vertical" flexItem variant="middle" sx={{marginRight:2, marginLeft:2}}/>
                                    
                                    <Tooltip title="Informe a sua escolaridade." placement="top-start">
                                        <TextField 
                                            id="formacao" 
                                            required
                                            fullWidth
                                            select
                                            label="Escolha sua formação" 
                                            variant="outlined" 
                                            size="small"
                                            margin="dense"
                                            value= {formacao}
                                            onChange= {handleFormacaoClick}
                                            InputProps={{
                                                startAdornment: (
                                                <InputAdornment position="start">
                                                    <SchoolIcon />
                                                </InputAdornment>
                                                ),
                                                style:{fontSize:14},
                                            }}
                                            InputLabelProps={{
                                                style:{fontSize:14},
                                            }}
                                            sx={margin_fields}
                                        >
                                            <MenuItem value="Ensino Fundamental">Ensino Fundamental</MenuItem>
                                            <MenuItem value="Ensino Médio">Ensino Médio</MenuItem>
                                            <MenuItem value="Superior Incompleto">Superior Incompleto</MenuItem>
                                            <MenuItem value="Superior Completo">Superior Completo</MenuItem>
                                            <MenuItem value="Pós Graduação">Pós Graduação</MenuItem>
                                            <MenuItem value="PHD">PHD</MenuItem>
                                        </TextField>
                                    </Tooltip>
                           
                                </div>

                            </Paper>

                            <Paper sx={{marginBottom:2}}>

                                <div className={style.title}>
                                    <span>Experiência profissional</span>
                                    <span className={style.subtitle}>Descreva abaixo as suas últimas duas experiências profissionais</span>
                                </div>

                                <div className={style.form_lines_center}>

                                    <div className={style.form_lines_col}>

                                        <div className={style.form_lines_nopadding}>
                                            
                                            <Tooltip title="Nome da última empresa" placement="top-start">
                                                <TextField 
                                                    id="ultima_empresa" 
                                                    required
                                                    fullWidth
                                                    label="Nome da última empresa"
                                                    placeholder="Nome da última empresa"
                                                    variant="outlined" 
                                                    size="small"
                                                    margin="dense"
                                                    InputProps={{
                                                        startAdornment: (
                                                        <InputAdornment position="start">
                                                            <StoreIcon />
                                                        </InputAdornment>
                                                        ),
                                                        style:{fontSize:14},
                                                    }}
                                                    InputLabelProps={{
                                                        style:{fontSize:14},
                                                    }}
                                                    sx={margin_fields}
                                                />
                                            </Tooltip>

                                        </div>

                                        <div className={style.form_lines_nopadding}>
                                            
                                            <Tooltip title="Informe a data em que você foi contratado(a) na última empresa. Utilizar o formato: dd/mm/aaaa. Exemplo: 01/01/1900" placement="top-start">
                                                <TextField 
                                                    id="dataadmissao_ultima_empresa" 
                                                    required
                                                    fullWidth
                                                    label="Data admissão" 
                                                    variant="outlined" 
                                                    size="small"
                                                    margin="dense"
                                                    placeholder='Data da admissão na última empresa'
                                                    InputProps={{
                                                        startAdornment: (
                                                        <InputAdornment position="start">
                                                            <DateRangeIcon />
                                                        </InputAdornment>
                                                        ),
                                                        style:{fontSize:14},
                                                    }}
                                                    InputLabelProps={{
                                                        style:{fontSize:14},
                                                    }}
                                                    sx={margin_fields}
                                                />
                                            </Tooltip>
                                            
                                            <Tooltip title="Informe a data em que você foi demitido(a) na última empresa. Utilizar o formato: dd/mm/aaaa. Exemplo: 01/01/1900" placement="top-start">
                                                <TextField 
                                                    id="datademissao_ultima_empresa" 
                                                    required
                                                    fullWidth
                                                    label="Data demissão" 
                                                    variant="outlined" 
                                                    size="small"
                                                    margin="dense"
                                                    placeholder='Data de demissão da última empresa'
                                                    InputProps={{
                                                        startAdornment: (
                                                        <InputAdornment position="start">
                                                            <DateRangeIcon />
                                                        </InputAdornment>
                                                        ),
                                                        style:{fontSize:14},
                                                    }}
                                                    InputLabelProps={{
                                                        style:{fontSize:14},
                                                    }}
                                                    sx={margin_fields}
                                                />
                                            </Tooltip>

                                        </div>

                                        <div className={style.form_lines_nopadding}>

                                            <Tooltip title="Descreva as suas principais atividades na última empresa" placement="top-start">
                                                <TextField
                                                    id="desc_ultima_empresa"
                                                    required
                                                    fullWidth
                                                    size="small"
                                                    margin="dense"
                                                    maxRows={4}
                                                    label="Descreva suas atividades aqui"
                                                    placeholder="Faça uma descrição resumida das atividades que você realizou na última empresa"
                                                    multiline
                                                    variant="outlined"
                                                    sx={margin_fields}
                                                    InputProps={{
                                                        style:{fontSize:14},
                                                    }}
                                                    InputLabelProps={{
                                                        style:{fontSize:14},
                                                    }}
                                                />
                                            </Tooltip>

                                        </div>

                                    </div>
                                    
                                    <Divider orientation="vertical" flexItem variant="middle" sx={{marginRight:2, marginLeft:2}}/>
                                    
                                    <div className={style.form_lines_col}>

                                        <div className={style.form_lines_nopadding}>

                                            <Tooltip title="Informe o nome de sua penúltima empresa" placement="top-start">
                                                <TextField 
                                                    id="penultima_empresa" 
                                                    required
                                                    fullWidth
                                                    label="Nome da penúltima empresa"
                                                    placeholder="Nome da penúltima empresa"
                                                    variant="outlined" 
                                                    size="small"
                                                    margin="dense"
                                                    InputProps={{
                                                        startAdornment: (
                                                        <InputAdornment position="start">
                                                            <StoreIcon />
                                                        </InputAdornment>
                                                        ),
                                                        style:{fontSize:14},
                                                    }}
                                                    InputLabelProps={{
                                                        style:{fontSize:14},
                                                    }}
                                                    sx={margin_fields}
                                                />
                                            </Tooltip>

                                        </div>

                                        <div className={style.form_lines_nopadding}>

                                            <Tooltip title="Informe a data em que você foi contratado(a) na penúltima empresa. Utilizar o formato: dd/mm/aaaa. Exemplo: 01/01/1900" placement="top-start">
                                                <TextField 
                                                    id="dataadmissao_penultima_empresa" 
                                                    required
                                                    fullWidth
                                                    label="Data admissão" 
                                                    variant="outlined" 
                                                    size="small"
                                                    margin="dense"
                                                    placeholder='Data da admissão na penúltima empresa'
                                                    InputProps={{
                                                        startAdornment: (
                                                        <InputAdornment position="start">
                                                            <DateRangeIcon />
                                                        </InputAdornment>
                                                        ),
                                                        style:{fontSize:14},
                                                    }}
                                                    InputLabelProps={{
                                                        style:{fontSize:14},
                                                    }}
                                                    sx={margin_fields}
                                                />
                                            </Tooltip>

                                            <Tooltip title="Informe a data em que você foi demitido(a) na penúltima empresa. Utilizar o formato: dd/mm/aaaa. Exemplo: 01/01/1900" placement="top-start">
                                                <TextField 
                                                    id="datademissao_penultima_empresa" 
                                                    required
                                                    fullWidth
                                                    label="Data demissão" 
                                                    variant="outlined" 
                                                    size="small"
                                                    margin="dense"
                                                    placeholder='Data de demissão da penúltima empresa'
                                                    InputProps={{
                                                        startAdornment: (
                                                        <InputAdornment position="start">
                                                            <DateRangeIcon />
                                                        </InputAdornment>
                                                        ),
                                                        style:{fontSize:14},
                                                    }}
                                                    InputLabelProps={{
                                                        style:{fontSize:14},
                                                    }}
                                                    sx={margin_fields}
                                                />
                                            </Tooltip>

                                        </div>

                                        <div className={style.form_lines_nopadding}>
                                            
                                            <Tooltip title="Descreva as suas principais atividades na penúltima empresa" placement="top-start">
                                                <TextField
                                                    id="desc_penultima_empresa"
                                                    required
                                                    fullWidth
                                                    size="small"
                                                    margin="dense"
                                                    maxRows={5}
                                                    label="Descreva suas atividades aqui"
                                                    placeholder="Faça uma descrição resumida das atividades que você realizou na penúltima empresa"
                                                    multiline
                                                    variant="outlined" 
                                                    sx={margin_fields}
                                                    InputProps={{
                                                        style:{fontSize:14},
                                                    }}
                                                    InputLabelProps={{
                                                        style:{fontSize:14},
                                                    }}
                                                />
                                            </Tooltip>

                                        </div>

                                    </div>
                            
                                </div>

                            </Paper>
                                
                            <div className={style.form_footer}>

                                <FormControlLabel 
                                    control={<Switch />}
                                    id="ciente"
                                    label="Estou ciente que meu currículo ficará em nossa base de dados por 2 meses" 
                                    labelPlacement="start" 
                                    sx={{fontSize:0.85}}
                                    value= {enablebuttom}
                                    onChange= {handleEnableButtomClick}
                                />

                                <Divider orientation="vertical" flexItem variant="middle" sx={{marginRight:2, marginLeft:2}}/>
                                {enablebuttom}

                            </div>

                        </CardContent>
                    </Collapse>
                </Card>
            </Box>
        
        </>
    )
}

export default Resume