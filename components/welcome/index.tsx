import style from "./Welcome.module.css"

const Welcome = (props:any) => {

    return(
        <>
            <div className={style.welcome_message}>Seja bem vindo</div>
            <div className={style.username}>{props.username}</div>
        </> 
    )

}

export default Welcome