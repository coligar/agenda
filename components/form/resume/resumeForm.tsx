import type {NextPage} from 'next'
import * as React from 'react'
import {useForm, UseFormSetValue, Controller} from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { toast } from 'react-toastify'
import axios from 'axios'
import { mutate } from 'swr'
import { useEffect } from 'react'
import { Input, TextField, Select, MenuItem, FormControl, InputLabel, Button, Tooltip, FormControlLabel, Paper, Switch, Divider, Box, Card, Collapse, CardContent, IconButton, CardHeader, InputAdornment, CardActions } from '@mui/material'
import { useGetData } from '../../../hooks/useRequest'


interface IFormInput 
{
    userid: string,
    name: string, 
    birth_date: string,
    cpf: string,
    area_activityId: string,
    scholarity_id: string,
    email: string,
    zip: string,
    address: string,
    district: string,
    city: string,
    uf: string,
    phone: string,
    professional_experience?: Array<any>
}
interface Props 
{
    url?: string
    type?: string
    dados?: any
}


const fieldvalidations = yup.object({
    userid: yup.string().required('Campo obrigatório'),
    name: yup.string().required('Campo obrigatório').max(100,'Permitido no máximo 100 caracteres'),
    birth_date: yup.date().required('Campo obrigatório'),
    cpf: yup.string().required('Campo obrigatório').max(14,'Permitido no máximo 14 caracteres'),
    area_activityId: yup.string().required('Campo obrigatório'),
    scholarity_id: yup.string().required('Campo obrigatório'),
    email: yup.string().email('Email inválido').required('Campo obrigatório'),
    zip: yup.string().required('Campo obrigatório'),
    address: yup.string().required('Campo obrigatório'),
    district: yup.string().required('Campo obrigatório'),
    city: yup.string().required('Campo obrigatório'),
    uf: yup.string().required('Campo obrigatório'),
})


const setInputValues = (data:any, setValue:UseFormSetValue<IFormInput>) =>
{
    if(data || data !== undefined)
    {
        setValue("name", data.name);
    }
}


const ResumeForm: NextPage<Props> = (props) => 
{
    const { url, type, dados } = props
    const {data: users} = useGetData('api/user')
    const {data: areas} = useGetData('api/activity')
    let button_name: string = (type === 'POST') ? 'Cadastrar' : 'Atualizar'
    console.log(users)

    const {
        register,
        handleSubmit,
        watch,
        setError,
        control,
        reset,
        setValue,
        formState: { isSubmitting, errors }
      } = useForm<IFormInput>(
        {
            resolver: yupResolver(fieldvalidations)
        }
    )

    const setSelectedUserDataToForm = (event:any) =>
    {
        let id = event.target.value;
        let userdata = users.filter((item:any) => item.id === id)
        console.log(userdata);

        (userdata[0].name) ? setValue('name', userdata[0].name) : setValue('name', '');
        (userdata[0].birth_date) ? setValue('birth_date', userdata[0].birth_date) : setValue('birth_date','');
        (userdata[0].cpf) ? setValue('cpf', userdata[0].cpf) : setValue('cpf', '');
        (userdata[0].email) ? setValue('email', userdata[0].email) : setValue('email', '');
        (userdata[0].phone_contact[0].phone) ? setValue('phone', userdata[0].phone_contact[0].phone) : '';
    }

   // setValue("name", users.name)

    useEffect(() =>
    {
        setInputValues(dados, setValue)

    },[dados, setValue])



  
    
    async function saveFormData(data: IFormInput) 
    {
        if(type === 'POST')
        {
            return await fetch('url', 
            {
                body: JSON.stringify(data),
                headers: {"Content-Type": "application/json"},
                method: type
            })
        }
        else
        {     
            return await fetch(`${url}/${dados.id}`, 
            {
                body: JSON.stringify(data),
                headers: {"Content-Type": "application/json"},
                method: type
            }) 
        }

    }


    const onSubmit = async (data: IFormInput) => 
    { 
        try 
        {
            const response = await saveFormData(data)
            let resp = await response?.json()
            
            if (response?.status === 400) 
            {
                const fieldToErrorMessage:{[fieldName: string]: string} = await response?.json()
                for (const [fieldName, errorMessage] of Object.entries(fieldToErrorMessage)) 
                {
                    toast.error(`${errorMessage}`)
                }
            } 
            else if (response?.ok) 
            {
                if(type === 'POST')
                {
                    reset({
                        name:'',
                    })
                }

                toast.success(resp.message, { hideProgressBar: false, autoClose: 2000 })
                mutate('/api/scholarity');
            } 
            else 
            {
                toast.error(resp.message, { hideProgressBar: false, autoClose: 2000 })
            }
        } 
        catch (error) 
        {
            toast.error(`A escolaridade informada não existe para atualização.`)
        }
        
    }


    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)}>

            <Controller
                name="userid"
                control={control}
                defaultValue=""
                render={({ field }) => 
                    <FormControl sx={{ minWidth: 220 }} size="small" required>
                        <InputLabel id="labeluser">Usuários</InputLabel>
                        <Select {...field} variant="outlined" label='Usários' labelId="labeluser" onChange={setSelectedUserDataToForm}>
                            <MenuItem disabled value=""><em>Selecione um usuário</em></MenuItem>
                             {users && users.map((item:any) => {
                                return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                             })}   
                        </Select>
                    </FormControl>
                }
                
            />
            <br/>
               

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
                        <CardHeader
                            action={
                            <IconButton aria-label="settings">
                                ...
                            </IconButton>
                            }
                            title="Dados pessoais"
                            subheader="Informe seus dados pessoais abaixo"
                        />

                        <CardContent >

                            <Paper>

                                    
                            <Controller
                                name="name"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Campo obrigatório' }}
                                render={({ field }) => <TextField {...field} variant="outlined" fullWidth label='Nome' size='small' required helperText={errors ? errors.name?.message : null}/>}
                            />
                            <p className='error'>{errors.name?.message}</p>

                            <Controller
                                name="birth_date"
                                control={control}
                                rules={{ required: 'Campo obrigatório' }}
                                render={({ field }) => <TextField {...field} variant="outlined" fullWidth label='Data de nascimento' size='small' required helperText={errors ? errors.birth_date?.message : null}/>}
                            />
                            <p className='error'>{errors.birth_date?.message}</p>

                            <Controller
                                name="cpf"
                                control={control}
                                rules={{ required: 'Campo obrigatório' }}
                                render={({ field }) => <TextField {...field} variant="outlined" fullWidth label='CPF' size='small' required helperText={errors ? errors.cpf?.message : null}/>}
                            />
                            <p className='error'>{errors.cpf?.message}</p>

                            <Controller
                                name="email"
                                control={control}
                                rules={{ required: 'Campo obrigatório' }}
                                render={({ field }) => <TextField {...field} variant="outlined" fullWidth label='E-mail' size='small' required helperText={errors ? errors.email?.message : null}/>}
                            />
                            <p className='error'>{errors.email?.message}</p>

                            <Controller
                                name="phone"
                                control={control}
                                rules={{ required: 'Campo obrigatório' }}
                                render={({ field }) => <TextField {...field} variant="outlined" fullWidth label='Número do celular' size='small' required helperText={errors ? errors.phone?.message : null}/>}
                            />
                            <p className='error'>{errors.phone?.message}</p>




                                    
                                <TextField 
                                    id="celular" 
                                    fullWidth
                                    required
                                    label="Telefone celular" 
                                    variant="outlined" 
                                    size="small"
                                    margin="dense"
                                    placeholder='Número do celular'
                                    InputLabelProps={{
                                        style:{fontSize:14},
                                    }}
                                />
                                    
                                <TextField 
                                    id="cep" 
                                    required
                                    fullWidth
                                    label="CEP" 
                                    variant="outlined" 
                                    size="small"
                                    margin="dense"
                                    placeholder='Informe seu CEP'
                                    
                                    InputLabelProps={{
                                        style:{fontSize:14},
                                    }}
                                />

                                <TextField 
                                    id="endereco" 
                                    required
                                    fullWidth
                                    label="Endereço" 
                                    variant="outlined"
                                    margin="dense"
                                    placeholder='Seu endereço'
                                    InputLabelProps={{
                                        style:{fontSize:14},
                                    }}
                                />
                                            
                                <TextField 
                                    id="bairro" 
                                    required
                                    fullWidth
                                    label="Bairro" 
                                    variant="outlined"
                                    size="small"
                                    margin="dense"
                                    placeholder='Seu bairro'
                                    InputLabelProps={{
                                        style:{fontSize:14},
                                    }}
                                />

                                <TextField 
                                    id="cidade" 
                                    required
                                    fullWidth
                                    label="Cidade" 
                                    variant="outlined"
                                    size="small"
                                    margin="dense"
                                    placeholder='Cidade'
                                    InputLabelProps={{
                                        style:{fontSize:14},
                                    }}
                                />

                                <TextField 
                                    id="uf"
                                    required
                                    fullWidth
                                    label="UF" 
                                    placeholder="UF"
                                    variant="outlined" 
                                    size="small"
                                    InputLabelProps={{
                                        style:{fontSize:14},
                                    }}
                                />
                                    


                                
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
                                    InputLabelProps={{
                                        style:{fontSize:14},
                                    }}
                                >
                                    <MenuItem value="Sim">Sim</MenuItem>
                                    <MenuItem value="Não">Não</MenuItem>
                                </TextField>
                                                                
                                <TextField 
                                    id="sexo" 
                                    required
                                    fullWidth
                                    select
                                    label="Sexo" 
                                    variant="outlined" 
                                    size="small"
                                    margin="dense"

                                    InputLabelProps={{
                                        style:{fontSize:14},
                                    }}
                                >
                                    <MenuItem value="Feminino">Feminino</MenuItem>
                                    <MenuItem value="Masculino">Masculino</MenuItem>
                                    <MenuItem value="Outro">Outro</MenuItem>
                                </TextField>
                                    
                                <TextField 
                                    id="veiculo" 
                                    required
                                    fullWidth
                                    select
                                    label="Possui veículo próprio?" 
                                    variant="outlined"
                                    size="small"
                                    margin="dense"
                                    placeholder='Informe se você tem veículo próprio'

                                    InputLabelProps={{
                                        style:{fontSize:14},
                                    }}
                                >
                                    <MenuItem value="Sim">Sim</MenuItem>
                                    <MenuItem value="Não">Não</MenuItem>
                                </TextField>
                                                                    

                            </Paper>

                        </CardContent>

                        <CardContent>
                            
                            <Paper sx={{marginBottom:2}}>

                                <span>Área de interesse e formação</span>
                                <span>Defina sua área de interesse e formação</span>


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
                                    InputLabelProps={{
                                        style:{fontSize:14},
                                    }}
                                >
                                    <MenuItem value="Administrativo">Administrativo</MenuItem>
                                    <MenuItem value="Comercial">Comercial</MenuItem>
                                    <MenuItem value="Representante">Representante</MenuItem>
                                    <MenuItem value="Produção">Produção</MenuItem>
                                    <MenuItem value="RH">RH</MenuItem>
                                </TextField>

                                <Divider orientation="vertical" flexItem variant="middle" sx={{marginRight:2, marginLeft:2}}/>
                                
                                <TextField 
                                    id="formacao" 
                                    required
                                    fullWidth
                                    select
                                    label="Escolha sua formação" 
                                    variant="outlined" 
                                    size="small"
                                    margin="dense"
                                    InputLabelProps={{
                                        style:{fontSize:14},
                                    }}
                                >
                                    <MenuItem value="Ensino Fundamental">Ensino Fundamental</MenuItem>
                                    <MenuItem value="Ensino Médio">Ensino Médio</MenuItem>
                                    <MenuItem value="Superior Incompleto">Superior Incompleto</MenuItem>
                                    <MenuItem value="Superior Completo">Superior Completo</MenuItem>
                                    <MenuItem value="Pós Graduação">Pós Graduação</MenuItem>
                                    <MenuItem value="PHD">PHD</MenuItem>
                                </TextField>
                        
                            </Paper>

                            <Paper sx={{marginBottom:2}}>

                                <div >
                                    <span>Experiência profissional</span>
                                    <span>Descreva abaixo as suas últimas duas experiências profissionais</span>
                                </div>
                                            
                                <TextField 
                                    id="ultima_empresa" 
                                    required
                                    fullWidth
                                    label="Nome da última empresa"
                                    placeholder="Nome da última empresa"
                                    variant="outlined" 
                                    size="small"
                                    margin="dense"
                                    InputLabelProps={{
                                        style:{fontSize:14},
                                    }}
                                />
                                            
                                <TextField 
                                    id="dataadmissao_ultima_empresa" 
                                    required
                                    fullWidth
                                    label="Data admissão" 
                                    variant="outlined" 
                                    size="small"
                                    margin="dense"
                                    placeholder='Data da admissão na última empresa'
                                    
                                    InputLabelProps={{
                                        style:{fontSize:14},
                                    }}
                                />
                                        
                                <TextField 
                                    id="datademissao_ultima_empresa" 
                                    required
                                    fullWidth
                                    label="Data demissão" 
                                    variant="outlined" 
                                    size="small"
                                    margin="dense"
                                    placeholder='Data de demissão da última empresa'
                                    InputLabelProps={{
                                        style:{fontSize:14},
                                    }}
                                />

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
                                    InputProps={{
                                        style:{fontSize:14},
                                    }}
                                    InputLabelProps={{
                                        style:{fontSize:14},
                                    }}
                                />
                                    
                                <Divider orientation="vertical" flexItem variant="middle" sx={{marginRight:2, marginLeft:2}}/>
                                
                                <TextField 
                                    id="penultima_empresa" 
                                    required
                                    fullWidth
                                    label="Nome da penúltima empresa"
                                    placeholder="Nome da penúltima empresa"
                                    variant="outlined" 
                                    size="small"
                                    margin="dense"
                                    InputLabelProps={{
                                        style:{fontSize:14},
                                    }}
                                />

                                <TextField 
                                    id="dataadmissao_penultima_empresa" 
                                    required
                                    fullWidth
                                    label="Data admissão" 
                                    variant="outlined" 
                                    size="small"
                                    margin="dense"
                                    placeholder='Data da admissão na penúltima empresa'
                                    InputLabelProps={{
                                        style:{fontSize:14},
                                    }}
                                />

                                <TextField 
                                    id="datademissao_penultima_empresa" 
                                    required
                                    fullWidth
                                    label="Data demissão" 
                                    variant="outlined" 
                                    size="small"
                                    margin="dense"
                                    placeholder='Data de demissão da penúltima empresa'
                                    InputLabelProps={{
                                        style:{fontSize:14},
                                    }}
                                />
                        
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
                                    InputProps={{
                                        style:{fontSize:14},
                                    }}
                                    InputLabelProps={{
                                        style:{fontSize:14},
                                    }}
                                />

                            </Paper>
                                

                            <FormControlLabel 
                                control={<Switch />}
                                id="ciente"
                                label="Estou ciente que meu currículo ficará em nossa base de dados por 2 meses" 
                                labelPlacement="start" 
                                sx={{fontSize:0.85}}
                            />

                            <Divider orientation="vertical" flexItem variant="middle" sx={{marginRight:2, marginLeft:2}}/>


                        </CardContent>
                    </Card>
                </Box>
            
                <Button type="submit" variant="contained" sx={{ mt: 3 }} disabled={isSubmitting}>
                    {isSubmitting ? "salvando..." : `${button_name}`}
                </Button>
            
        </form>
        </>
    );
}

export default ResumeForm