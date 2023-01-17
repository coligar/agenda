import style from "./Status.module.css"
import Status from "../../../bullet/status"


const StatusResume = (props:any) => 
{
    var icon_status:any = ''

    switch (props.type) 
    {
        case 'confirmados':
            icon_status = 
                <div className={style.resume_header_status} style={{color:"#2d732d"}}>
                    <Status type="confirmados" mr="2px" size="18px"/> entrevista confirmada -&nbsp;<strong>{props.time}</strong>
                </div>
            break;

        case 'visualizados':
            icon_status = 
                <div className={style.resume_header_status} style={{color:"#959393"}}>
                    <Status type="visualizados" mr="2px" size="18px"/> currículo visualizado -&nbsp;<strong>{props.time}</strong>
                </div>
            break;

        case 'cancelamentosolicitado':
            icon_status = 
                <div className={style.resume_header_status} style={{color:"#f44d4d"}}>
                    <Status type="cancelamentosolicitado" mr="2px" size="18px"/> cancelamento solicitado -&nbsp;<strong>{props.time}</strong>
                </div>          
            break;

        case 'realizada':
            icon_status = 
                <div className={style.resume_header_status} style={{color:"#2d732d"}}>
                    <Status type="realizada" mr="2px" size="18px"/> entrevista realizada -&nbsp;<strong>{props.time}</strong>
                </div>
            break;

        case 'contratado':
            icon_status = 
                <div className={style.resume_header_status} style={{color:"#067be4"}}>
                    <Status type="contratado" mr="2px" size="18px"/> candadato contratado -&nbsp;<strong>{props.time}</strong>
                </div>
            break;

        case 'cancelado':
            icon_status = 
                <div className={style.resume_header_status} style={{color:"#f44d4d"}}>
                    <Status type="cancelado" mr="2px" size="18px"/> entrevista cancelada -&nbsp;<strong>{props.time}</strong>
                </div>
            break;

        case 'reagendado':
            icon_status = 
                <div className={style.resume_header_status} style={{color:"#daaa2e"}}>
                    <Status type="reagendado" mr="2px" size="18px"/> entrevista reagendada -&nbsp;<strong>{props.time}</strong>
                </div>
            break;

        case 'reagendamentosolicitado':
            icon_status = 
                <div className={style.resume_header_status} style={{color:"#dda44b"}}>
                    <Status type="reagendamentosolicitado" mr="2px" size="18px"/> solicitação de reagendamento -&nbsp;<strong>{props.time}</strong>
                </div>
            break;

        case 'agendamentosolicitado':
            icon_status = 
                <div className={style.resume_header_status} style={{color:"#5cbd3a"}}>
                    <Status type="agendamentosolicitado" mr="2px" size="18px"/> solicitação de agendamento -&nbsp;<strong>{props.time}</strong>
                </div>
            break;
    
        default:
            icon_status = icon_status
            break;
    }
    
    return(

         icon_status

    )
}

export default StatusResume