import style from "./ResumeView.module.css"
import Avatar from "../../avatar"
import StatusResume from './status'
import Tag from './tag/tag'


const PrintResumeview = (props:any) => 
{

    return(
        <div id="print">
            <div className={style.candidate_resume_header}>

                <div className={style.candidate_resume_title}>

                    <h2>Análise de currículo</h2>

                </div>

                <div className={style.candidate_resume_data}>

                    <div className={style.candidate_resume_avatar}>
                        <Avatar direction="row" name={props.data.name} width="52" avatar={props.data.avatar}/>
                    </div>

                    <div className={style.candidate_resume_name_area}>

                        <div className={style.candidate_resume_name}>
                            {props.data.name}
                        </div>

                        <div className={style.candidate_resume_area}>

                            <div className={style.candidate_resume_area_status}>
                                <Tag area={props.data.area_of_interest}/>
                                <StatusResume type={props.data.status_resume} time={props.data.date_status_resume}/>
                            </div>

                        </div>

                    </div>
                    
                </div>

            </div>

            <div className={style.candidate_resume_content}>

                <div className={style.candidate_resume_body}>

                    <div className={style.candidate_resume_body_line}>
                        <div className={style.candidate_resume_body_line_title}>
                            Dados pessoais
                        </div>
                    </div>

                    <div className={style.candidate_resume_body_line}>
                        <div className={style.candidate_resume_body_line_itens}>
                            <strong>Data de nascimento:</strong> {props.data.birthdate}
                        </div>

                        <div className={style.candidate_resume_body_line_itens}>
                            <strong>CPF:</strong> {props.data.cpf}
                        </div>       
                    </div>

                    <div className={style.candidate_resume_body_line}>
                        <div className={style.candidate_resume_body_line_itens}>
                            <strong>Telefone:</strong> {props.data.telephone}
                        </div>

                        <div className={style.candidate_resume_body_line_itens}>
                            <strong>E-mail:</strong> {props.data.email}
                        </div>       
                    </div>

                    <div className={style.candidate_resume_body_line}>                                       
                        <div className={style.candidate_resume_body_line_itens}>
                            <strong>Sexo:</strong> {props.data.gender}
                        </div> 
                        <div className={style.candidate_resume_body_line_itens}>
                            <strong>CEP:</strong> {props.data.zipcode}
                        </div>
                    </div>

                    <div className={style.candidate_resume_body_line}>
                        <div className={style.candidate_resume_body_line_itens}>
                            <strong>Endereço:</strong> {props.data.address}
                        </div>

                        <div className={style.candidate_resume_body_line_itens}>
                            <strong>Bairro:</strong> {props.data.district}
                        </div>       
                    </div>

                    <div className={style.candidate_resume_body_line}>
                        <div className={style.candidate_resume_body_line_itens}>
                            <strong>Cidade:</strong> {props.data.city}
                        </div>

                        <div className={style.candidate_resume_body_line_itens}>
                            <strong>UF:</strong> {props.data.uf}
                        </div>       
                    </div>

                    <div className={style.candidate_resume_body_line}>

                        <div className={style.candidate_resume_body_line_itens}>
                            <strong>Possui deficiência:</strong> {props.data.has_disability}
                        </div>

                        <div className={style.candidate_resume_body_line_itens}>
                            <strong>Possui veículo próprio:</strong> {props.data.own_vehicle}
                        </div>

                    </div>

                    
                    <div className={style.candidate_resume_body_line} style={{flexDirection:"column"}}>
                        
                        <div className={style.candidate_resume_body_line_title} style={{marginTop: "40px"}}>
                            Breve resumo
                        </div>

                        <div className={style.candidate_resume_body_line} style={{flexDirection:"column"}}>
                            {props.data.summary}
                        </div>

                    </div>

                    
                    <div className={style.candidate_resume_body_line}>
                        <div className={style.candidate_resume_body_line_title} style={{marginTop: "40px"}}>
                            Área de interesse e formação
                        </div>
                    </div>

                    <div className={style.candidate_resume_body_line}>

                        <div className={style.candidate_resume_body_line_itens}>
                            <strong>Área de interesse:</strong> {props.data.area_of_interest}
                        </div>

                        <div className={style.candidate_resume_body_line_itens}>
                            <strong>Formação:</strong> {props.data.academic_education}
                        </div>

                    </div>


                    <div className={style.candidate_resume_body_line}>
                        <div className={style.candidate_resume_body_line_title} style={{marginTop: "40px"}}>
                            Experiência Profissional
                        </div>
                    </div>

                    <div className={style.candidate_resume_body_line}>

                        <div className={style.candidate_resume_body_line_itens} style={{width: "100%"}}>
                            <strong>Nome da última empresa:</strong> {props.data.last_company}
                        </div>

                    </div>

                    <div className={style.candidate_resume_body_line}>

                        <div className={style.candidate_resume_body_line_itens}>
                            <strong>Data de admissão:</strong> {props.data.last_adminission_date}
                        </div>

                        <div className={style.candidate_resume_body_line_itens}>
                            <strong>Data de demissão:</strong> {props.data.last_resignation_date}
                        </div>
                        
                    </div>

                    <div className={style.candidate_resume_body_line} style={{flexDirection:"column"}}>


                        <strong><p>Atividades realizadas:</p></strong>

                        {props.data.last_performed_activities}

                    </div>
                    
                    <div style={{marginTop:"25px", marginBottom:"25px", width: "100%", borderBottom: "1px solid #eee"}}></div>

                    <div className={style.candidate_resume_body_line}>

                        <div className={style.candidate_resume_body_line_itens} style={{width: "100%"}}>
                            <strong>Nome da penúltima empresa:</strong> {props.data.penultimate_company}
                        </div>

                    </div>

                    <div className={style.candidate_resume_body_line}>

                        <div className={style.candidate_resume_body_line_itens}>
                            <strong>Data de admissão:</strong> {props.data.penultimate_adminission_date}
                        </div>

                        <div className={style.candidate_resume_body_line_itens}>
                            <strong>Data de demissão:</strong> {props.data.penultimate_resignation_date}
                        </div>
                        
                    </div>

                    <div className={style.candidate_resume_body_line} style={{flexDirection:"column"}}>

                        <strong><p>Atividades realizadas:</p></strong>
                        {props.data.penultimate_performed_activities}

                    </div>

                </div>


            </div>
            

        </div>
    )
}


export default PrintResumeview