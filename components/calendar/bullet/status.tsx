import AgendamentoSolicitado from '@mui/icons-material/AccessTime'
import Visualizados from '@mui/icons-material/DoneAll'
import CancelamentoSolicitado from '@mui/icons-material/TimerOff'
import ReagendamentoSolicitado from '@mui/icons-material/Restore'
import Realizada from '@mui/icons-material/TaskAlt'
import Contratado from '@mui/icons-material/StarRate'
import VerifiedIcon from '@mui/icons-material/Verified'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { SvgIconTypeMap } from '@mui/material'


const StatusBullet = (props:any) => 
{
    var icon_status 
    let color: any = ''
    let size = (!props.size) ? "14px" : props.size
    let mr = (!props.mr) ? "0px" : props.mr
    let ml = (!props.ml) ? "0px" : props.ml
    let mt = (!props.mt) ? "0px" : props.mt
    let mb = (!props.mb) ? "0px" : props.mb
    
    switch (props.type) 
    {
        case 'confirmados':
            color = (props.color) ? props.color : "#2d732d"
            icon_status = <VerifiedIcon sx={{color: color, width: size, height: size, marginRight:mr, marginLeft: ml, marginTop: mt, marginBottom: mb, fontWeight: "bold"}}/>
            break;

        case 'visualizados':
            color = (props.color) ? props.color : "#959393"
            icon_status = <Visualizados sx={{color: color, width: size, height: size, marginRight:mr, marginLeft: ml, marginTop: mt, marginBottom: mb, fontWeight: "bold"}}/>
            break;

        case 'cancelamentosolicitado':
            color = (props.color) ? props.color : "#f44d4d"
            icon_status = <CancelamentoSolicitado sx={{color: color, width: size, height: size, marginRight:mr, marginLeft: ml, marginTop: mt, marginBottom: mb, fontWeight: "bold"}}/>
            break;

        case 'realizada':
            color = (props.color) ? props.color : "#2d732d"
            icon_status = <Realizada sx={{color: color, width: size, height: size, marginRight:mr, marginLeft: ml, marginTop: mt, marginBottom: mb, fontWeight: "bold"}}/>
            break;

        case 'contratado':
            color = (props.color) ? props.color : "#067be4"
            icon_status = <Contratado sx={{color: color, width: size, height: size, marginRight:mr, marginLeft: ml, marginTop: mt, marginBottom: mb, fontWeight: "bold"}}/>
            break;

        case 'cancelado':
            color = (props.color) ? props.color : "#f44d4d"
            icon_status = <VerifiedIcon sx={{color: color, width: size, height: size, marginRight:mr, marginLeft: ml, marginTop: mt, marginBottom: mb, fontWeight: "bold"}}/>
            break;

        case 'reagendado':
            color = (props.color) ? props.color : "#daaa2e"
            icon_status = <VerifiedIcon sx={{color: color, width: size, height: size, marginRight:mr, marginLeft: ml, marginTop: mt, marginBottom: mb, fontWeight: "bold"}}/>
            break;

        case 'reagendamentosolicitado':
            color = (props.color) ? props.color : "#dda44b"
            icon_status = <ReagendamentoSolicitado sx={{color: color, width: size, height: size, marginRight:mr, marginLeft: ml, marginTop: mt, marginBottom: mb, fontWeight: "bold"}}/>
            break;

        case 'agendamentosolicitado':
            color = (props.color) ? props.color : "#5cbd3a"
            icon_status = <AgendamentoSolicitado sx={{color: color, width: size, height: size, marginRight:mr, marginLeft: ml, marginTop: mt, marginBottom: mb, fontWeight: "bold"}}/>
            break;
    
        default:
            icon_status = icon_status
            break;
    }
    
    return(
        <>
            {icon_status}
        </>
    )
}

export default StatusBullet