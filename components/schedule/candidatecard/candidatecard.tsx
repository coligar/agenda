import style from "./CandidateCard.module.css"
import Avatar from "../../avatar"
import BulletSatus from "../../bullet/status"
import Tooltip from '@mui/material/Tooltip'
import sanitizeHtml from 'sanitize-html';


const CandidateCard = (props:any) => 
{
    let candidate_name
    let last_index_array = parseInt(props.name.split(' ').length) - 1

    if(props.name.split(' ').length == 1)
    {
        candidate_name = props.name
    }
    else
    {
        candidate_name = `${props.name.split(' ')[0]} ${props.name.split(' ')[last_index_array]}`
    }

    const createMarkup = () => {
        return {__html: sanitizeHtml(props.description?.substring(0, 60))};
    }
    

    return(

        <Tooltip title={`${props.name}`} placement="right">

            <div className={style.candidate_tag} style={{borderLeft: '3px solid '+`${props.border}`}} onClick={props.onClick}>

                <div className={style.candidate_img}>
                    <Avatar direction="row" name={props.name} width="36" avatar={props.img}/>
                </div>

                <div className={style.candidate_content}>

                    <div className={style.candidate_content_header}>

                        <div className={style.candidate_name}>
                            {candidate_name}
                        </div>
                                              
                        <div className={style.candidate_date}>
                            <BulletSatus type={props.status} mr="5px"/> 
                            {props.date}
                        </div>

                    </div>

                    <div className={style.candidate_description}>
                        <span dangerouslySetInnerHTML={createMarkup()}></span> 
                    </div>

                </div>

            </div>
            
        </Tooltip>
    )
}

export default CandidateCard


