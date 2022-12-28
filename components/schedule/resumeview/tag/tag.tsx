import style from "./Tag.module.css"

const Tag = (props) => 
{
    let color

    switch (props.area)
    {
        case 'Administrativo':
            color = (props.color) ? props.color : "#a39ffe"
            break;

        case 'Comercial':
            color = (props.color) ? props.color : "#ffcb37"
            break;

        case 'Representante':
                color = (props.color) ? props.color : "#f66a59"
                break;

        case 'Produção':
            color = (props.color) ? props.color : "#ffa4c1"
            break;

        case 'RH':
            color = (props.color) ? props.color : "#5cbd3a"
            break;
    
        default:
            color = (props.color) ? props.color : "#efefef"
            break;
    }
    
    return(
        
        <div className={style.candidate_resume_area_tag} style={{backgroundColor: color}}>{props.area}</div>
    )
}

export default Tag