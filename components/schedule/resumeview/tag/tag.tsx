import style from "./Tag.module.css"

const Tag = (props:any) => 
{    
    return(
        
        <div className={style.candidate_resume_area_tag} style={{backgroundColor: props.color}}>{props.area}</div>
    )
}

export default Tag