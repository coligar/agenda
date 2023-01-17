import { useRouter } from "next/router";
import LayoutMain from "../../components/layouts/main"
import useSWR from "swr";
import { useEffect } from "react";

const Users = () => 
{

    const router = useRouter()

    const { data: currentLevel } = useSWR("role", async key => {
      await new Promise(resolve => setTimeout(resolve, 2000))
      const value = localStorage.getItem(key);
      return !!value ? value : undefined;
    });
  
    const { data: name } = useSWR("name", async key => {
      await new Promise(resolve => setTimeout(resolve, 2000))
      const value:any = localStorage.getItem(key);
      console.log(value)
      return !!value ? JSON.parse(value) : undefined;
    });
  
    useEffect(() => {
      if(!currentLevel) router.push('login')
    });

    if (!currentLevel) return <div>Loading...</div>
    
    return (
        <>   
            <LayoutMain>
                <h1>Users</h1>
            </LayoutMain>
        </>
    )
}

export default Users