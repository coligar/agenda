import axios from 'axios'
import { toast } from 'react-toastify'
import useSWR, { mutate } from 'swr'

interface IGetScheduleType
{
  onClick: (data:any) => void
}

const fetcher = (url:string) => axios.get(url).then(res => res.data)

const ScheduleTypeFormList = (props: IGetScheduleType) =>
{

    const {data: scheduletype} = useSWR('/api/scheduletype', fetcher)

    const editScheduleType = async (id:string) =>
    {
        let data = await axios.get(`api/scheduletype/${id}`).then(res => res.data)
        props.onClick(data)
    }

    const deleteScheduleType = async (id:string) =>
    {
        return await axios.delete(`api/scheduletype/${id}`).then(res => 
        {
            toast.success('Área de atuação excluída com sucesso', { hideProgressBar: false, autoClose: 2000 })
        }).catch((error) =>
        {
        toast.error(error, { hideProgressBar: false, autoClose: 2000 })
        }).then(() => 
        {
        mutate('/api/scheduletype')
        })
    }

    return(
        <>
        <ul>
            {((!scheduletype|| scheduletype === undefined) &&
            <li>Carregando</li>
            )}
            { (scheduletype && scheduletype !== undefined) &&
            scheduletype.map((data:any) =>(
                <li key={data.id} >
                <span onClick={() => editScheduleType(data.id)}>Área: {data.name} | Cor: {data.color}  | Ícone: {data.icone}</span> -  
                <span onClick={() => deleteScheduleType(data.id)}>excluir</span>
                </li>
            ))
            }
        </ul>
        </>
    )
}

export default ScheduleTypeFormList