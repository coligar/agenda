import style from './MenuSchedule.module.css'
import Bullets from '../../bullet/bullets'
import Status from '../../bullet/status'

interface Iprops
{
    bullet?: any,
    size?: string,
    color?: string,
    mr?: string,
    ml?: string,
    mt?: string,
    mb?: string,
    type?: string,
    label?: string,
    quantity?: Number,
    onClick?: any
}

const Menu = (props:Iprops) => 
{
    let bullet:any = ''
    let size = (!props.size) ? "10px" : props.size
    let color = (!props.color) ? "#ccc" : props.color
    let mr = (!props.mr) ? "0px" : props.mr
    let ml = (!props.ml) ? "0px" : props.ml
    let mt = (!props.mt) ? "0px" : props.mt
    let mb = (!props.mb) ? "0px" : props.mb

    switch (props.bullet) 
    {
        case 'status':
            bullet = <Status width={size} height={size} mr={mr} ml={ml} mt={mt} mb={mb} type={props.type}/>
            break;
    
        default:
            bullet = <Bullets color={color} size={size} mr={mr} ml={ml} mt={mt} mb={mb}/>
            break;
    }

    return(
        <>
            
            <div className={style.area_name} onClick={props.onClick}>

                <div className={style.area_title}>

                    {bullet}
                    {props.label}

                </div>

                <div className={style.area_count}>

                    {Number(props.quantity)}

                </div>

            </div>

        </>
    )
}

export default Menu