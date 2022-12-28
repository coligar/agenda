

const Iframe = ({url, height}) => 
{
    let h = (height) ? height+'px' : '450px'

    return(
        <>
            <iframe frameBorder="0" width="100%" height={h} src={url} />
        </>
    )
}

export default Iframe