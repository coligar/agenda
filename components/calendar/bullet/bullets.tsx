import Style from './Bullet.module.css'

const Bullet = (props:any) => 
{
    let size = (!props.size) ? "10px" : props.size
    let mr = (!props.mr) ? "0px" : props.mr
    let ml = (!props.ml) ? "0px" : props.ml
    let mt = (!props.mt) ? "0px" : props.mt
    let mb = (!props.mb) ? "0px" : props.mb

    return(
        <>
            <span style={{backgroundColor: props.color, width: size, height: size, borderRadius:"50%", marginRight:mr, marginLeft: ml, marginTop: mt, marginBottom: mb}}></span>
        </>
    )
}

export default Bullet