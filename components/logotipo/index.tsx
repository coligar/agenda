import Image from 'next/image'

const Logotipo = (props:any) => 
{
    return (
        <>
            <Image src={props.image} height={props.height} width={props.width} alt="logo Grupo Cristofoletti" quality={100}/>
        </>
    )
}

export default Logotipo