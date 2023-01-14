import type {NextPage} from 'next'
import style from './resume.module.css'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'
import {useForm, UseFormSetValue, Controller} from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { toast } from "react-toastify"
import { useEffect, useState } from 'react'
import { TextField, Button, FormControlLabel, Switch } from '@mui/material'
import StoreIcon from '@mui/icons-material/Store'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/pt-br'


interface IFormResume
{
    sumary: string,
    last_company: string,
    last_admission: Date | string,
    last_resignation: Date | string,
    last_activity: string,
    penultimate_company: string,
    penultimate_admission: Date | string,
    penultimate_resignation: Date | string,
    penultimate_activity: string,
}

interface Props 
{
    url: string
    type: string
    dados?: any | null
}


const fieldvalidations = yup.object({
    /*name: yup.string().required('Campo obrigatório').max(100,'Permitido no máximo 100 caracteres'),
    lastname: yup.string().required('Campo obrigatório').max(100, 'Permitido no máximo 100 caracteres'),
    email: yup.string().email('Email inválido').required('Campo obrigatório'),
    sex: yup.string().required('Campo obrigatório'),*/
})

const setInputValues = (data:any, setValue:UseFormSetValue<IFormResume>) =>
{
    if(data || data !== undefined)
    {
        setValue("sumary", data.curriculo.sumary)
        setValue("last_activity", data.curriculo.last_activity)
        setValue("last_admission", data.curriculo.last_admission)
        setValue("last_company", data.curriculo.last_company)
        setValue("last_resignation", data.curriculo.last_resignation)
        setValue("penultimate_activity", data.curriculo.penultimate_activity)
        setValue("penultimate_admission", data.curriculo.penultimate_admission)
        setValue("penultimate_company", data.curriculo.penultimate_company)
        setValue("penultimate_resignation", data.curriculo.penultimate_resignation)
    }
}

const SimpleResumeForm: NextPage<Props> = (props) => 
{
    const { url, type, dados} = props
    const [warning, setWarning] = useState('Clique na seta para visualizar o seu currículo');
    const [enablebuttom, setEnableButtom] = useState('')

    const margin_fields = 
    {
        marginRight:1, 
        marginLeft:1,
        marginBottom:2,
        fontSize:'10px'
    }

    const 
    {
        register, 
        handleSubmit, 
        watch, 
        setError, 
        control,
        reset, 
        setValue, 
        formState: { isSubmitting, errors }
    } = useForm<IFormResume>(
        {
            resolver: yupResolver(fieldvalidations)
        }
    )

    watch('sumary')
    useEffect(() =>
    {
        setInputValues(dados, setValue)
    },[dados, setValue, watch])


    const handleEnableButtomClick = (event:any) =>
    {
        let enablebuttom = (!event.target.checked) ? 'disabled' : ''
        setEnableButtom(enablebuttom)
    }

    
    async function saveFormData(data: IFormResume) 
    {
        if(type === 'POST')
        {
            return await fetch(url, 
            {
                body: JSON.stringify(data),
                headers: {"Content-Type": "application/json"},
                method: type
            })
        }
        else
        {               
            return await fetch(`${url}/${dados.curriculo.id}`, 
            {
                body: JSON.stringify(data),
                headers: {"Content-Type": "application/json"},
                method: type
            })

            
        }
    }


    const onSubmit = async (data: IFormResume) => 
    {

        try 
        {
            const response = await saveFormData(data)
            let resp = await response.json()
            
            if (response.status === 400 || response.status === 500) 
            {
                const fieldToErrorMessage:{[fieldName: string]: string} = await response.json()

                for (const [fieldName, errorMessage] of Object.entries(fieldToErrorMessage)) 
                {
                    toast.error(`${errorMessage}`, { hideProgressBar: false, autoClose: 2000})
                }
            } 
            else if (response.ok) 
            {
                if(type === 'POST')
                {
                    reset()
                }

                toast.success(resp.message, { hideProgressBar: false, autoClose: 2000 })
            } 
            else 
            {
                toast.error(resp.message, { hideProgressBar: false, autoClose: 2000 })
            }
        } 
        catch (error) 
        {
            toast.error(`Erro ao atualizar currículo.`)
        }
        
    }


    return(
  
        <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent >
                <Paper sx={{marginBottom:2}}>

                    <div className={style.title}>
                        <span>Experiência profissional</span>
                        <span className={style.subtitle}>Descreva abaixo as suas últimas duas experiências profissionais</span>
                    </div>

                    <div className={style.form_lines_center}>
                        <div className={style.form_lines_nopadding}>
                            <Controller
                                name="sumary"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Campo obrigatório' }}
                                render={({ field }) => 
                                    <TextField
                                        {...field} 
                                        required
                                        fullWidth
                                        size="small"
                                        margin="dense"
                                        rows={5}
                                        label="Fale sobre você"
                                        placeholder="Fale um pouco sobre você. Quais são suas habilidades, no que você é bom..."
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
                                }
                            />
                        </div>
                    </div>
                    <div className={style.form_lines_center}>

                        <div className={style.form_lines_col}>
                            <div className={style.form_lines_nopadding}>
                                <Controller
                                    name="last_company"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: 'Campo obrigatório' }}
                                    render={({ field }) =>  
                                        <TextField 
                                            {...field}  
                                            required
                                            fullWidth
                                            label="Nome da última empresa"
                                            placeholder="Nome da última empresa"
                                            variant="outlined" 
                                            size="small"
                                            margin="dense"
                                            helperText={errors ? errors.last_company?.message : null}
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
                                    }
                                />
                            </div>
                            <div className={style.form_lines_nopadding}>
                                <Controller
                                    name="last_admission"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: 'Campo obrigatório' }}
                                    render={({ field:{ ref, ...fieldProps } }) => 
                                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                                            <DatePicker
                                                {...fieldProps}
                                                inputRef={ref}
                                                renderInput={(params) => 
                                                <TextField {...params} 
                                                    size="small" 
                                                    fullWidth 
                                                    label='Data admissão'
                                                    required
                                                    helperText={errors ? errors.last_admission?.message : null}
                                                    sx={margin_fields}
                                                    InputLabelProps={{
                                                        style:{fontSize:14},
                                                    }}
                                                />}
                                            />
                                        </LocalizationProvider>
                                    }
                                />
                            </div>
                            <div className={style.form_lines_nopadding}>
                                <Controller
                                    name="last_resignation"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: 'Campo obrigatório' }}
                                    render={({ field:{ ref, ...fieldProps } }) => 
                                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                                            <DatePicker
                                                {...fieldProps}
                                                inputRef={ref}
                                                renderInput={(params) => 
                                                <TextField {...params} 
                                                    size="small" 
                                                    fullWidth 
                                                    label='Data demissão'
                                                    required
                                                    helperText={errors ? errors.last_resignation?.message : null}
                                                    sx={margin_fields}
                                                    InputLabelProps={{
                                                        style:{fontSize:14},
                                                    }}
                                                />}
                                            />
                                        </LocalizationProvider>
                                    }
                                />
                            </div>

                            <div className={style.form_lines_nopadding}>
                                <Controller
                                    name="last_activity"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: 'Campo obrigatório' }}
                                    render={({ field }) => 
                                        <TextField
                                            {...field}
                                            id="desc_ultima_empresa"
                                            required
                                            fullWidth
                                            size="small"
                                            margin="dense"
                                            rows={4}
                                            label="Descreva suas atividades aqui"
                                            placeholder="Faça uma descrição resumida das atividades que você realizou na última empresa"
                                            multiline
                                            helperText={errors ? errors.last_activity?.message : null}
                                            variant="outlined"
                                            sx={margin_fields}
                                            InputProps={{
                                                style:{fontSize:14},
                                            }}
                                            InputLabelProps={{
                                                style:{fontSize:14},
                                            }}
                                        />
                                    }
                                />

                            </div>
                        </div>

                        <Divider orientation="vertical" flexItem variant="middle" sx={{marginRight:2, marginLeft:2}}/>

                        <div className={style.form_lines_col}>
                            <div className={style.form_lines_nopadding}>
                                <Controller
                                    name="penultimate_company"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: 'Campo obrigatório' }}
                                    render={({ field }) =>  
                                        <TextField
                                            {...field} 
                                            required
                                            fullWidth
                                            label="Nome da penúltima empresa"
                                            placeholder="Nome da penúltima empresa"
                                            variant="outlined" 
                                            size="small"
                                            margin="dense"
                                            helperText={errors ? errors.penultimate_company?.message : null}
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
                                    }
                                />
                            </div>
                            <div className={style.form_lines_nopadding}>
                                <Controller
                                    name="penultimate_admission"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: 'Campo obrigatório' }}
                                    render={({ field:{ ref, ...fieldProps } }) => 
                                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                                            <DatePicker
                                                {...fieldProps}
                                                inputRef={ref}
                                                renderInput={(params) => 
                                                <TextField {...params} 
                                                    size="small" 
                                                    fullWidth 
                                                    label='Data admissão'
                                                    required
                                                    helperText={errors ? errors.penultimate_admission?.message : null}
                                                    sx={margin_fields}
                                                    InputLabelProps={{
                                                        style:{fontSize:14},
                                                    }}
                                                />}
                                            />
                                        </LocalizationProvider>
                                    }
                                />
                            </div>
                            <div className={style.form_lines_nopadding}>
                                <Controller
                                    name="penultimate_resignation"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: 'Campo obrigatório' }}
                                    render={({ field:{ ref, ...fieldProps } }) => 
                                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                                            <DatePicker
                                                {...fieldProps}
                                                inputRef={ref}
                                                renderInput={(params) => 
                                                <TextField {...params} 
                                                    size="small" 
                                                    fullWidth 
                                                    label='Data demissão'
                                                    required
                                                    helperText={errors ? errors.penultimate_resignation?.message : null}
                                                    sx={margin_fields}
                                                    InputLabelProps={{
                                                        style:{fontSize:14},
                                                    }}
                                                />}
                                            />
                                        </LocalizationProvider>
                                    }
                                />
                            </div>

                            <div className={style.form_lines_nopadding}>
                                <Controller
                                    name="penultimate_activity"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: 'Campo obrigatório' }}
                                    render={({ field }) => 
                                        <TextField
                                            {...field}
                                            id="desc_ultima_empresa"
                                            required
                                            fullWidth
                                            size="small"
                                            margin="dense"
                                            rows={4}
                                            label="Descreva suas atividades aqui"
                                            placeholder="Faça uma descrição resumida das atividades que você realizou na penúltima empresa"
                                            multiline
                                            helperText={errors ? errors.penultimate_activity?.message : null}
                                            variant="outlined"
                                            sx={margin_fields}
                                            InputProps={{
                                                style:{fontSize:14},
                                            }}
                                            InputLabelProps={{
                                                style:{fontSize:14},
                                            }}
                                        />
                                    }
                                />

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
                    
                    <Button type="submit" variant="contained" sx={{ mt: 3 }} disabled={isSubmitting}>
                        {isSubmitting ? "salvando..." : `enviar`}
                    </Button>

                </div>
            </CardContent>


            
            

        </form>
    
 

    )
}

export default SimpleResumeForm