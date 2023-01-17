import axios from 'axios'
import { toast } from 'react-toastify'
import useSWR, { mutate } from 'swr'

interface IGetScholarity
{
  onClick: (data:any) => void
}

const fetcher = (url:string) => axios.get(url).then(res => res.data)

const ScholarityFormList = (props: IGetScholarity) =>
{

    const {data: scholarity} = useSWR('/api/scholarity', fetcher)

    const edit = async (id:string) =>
    {
        let data = await axios.get(`api/scholarity/${id}`).then(res => res.data)
        props.onClick(data)
    }

    const del = async (id:string) =>
    {
        return await axios.delete(`api/scholarity/${id}`).then(res => 
        {
            toast.success('Escolaridade excluída com sucesso', { hideProgressBar: false, autoClose: 2000 })
        }).catch((error) =>
        {
            toast.error(error, { hideProgressBar: false, autoClose: 2000 })
        }).then(() => 
        {
            mutate('/api/scholarity')
        })
    }

    return(
        <>
        <ul>
            {((!scholarity || scholarity === undefined) &&
            <li>Carregando</li>
            )}
            { (scholarity && scholarity !== undefined) &&
                scholarity.map((activity:any) =>(
                    <li key={activity.id} >
                    <span onClick={() => edit(activity.id)}>Escolaridade: {activity.name}</span> -  
                    <span onClick={() => del(activity.id)}>excluir</span>
                    </li>
                ))
            }
        </ul>
        </>
    )
}

export default ScholarityFormList