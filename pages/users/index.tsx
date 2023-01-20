import { useRouter } from "next/router";
import LayoutMain from "../../components/layouts/main"
import useSWR from "swr";
import { useEffect } from "react";
import Grid from '@mui/material/Grid';
import { Button } from "@mui/material";
import UserSimpleForm from "../../components/form/users/userSimpleForm";

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
                
                <Grid
                  container
                  spacing={0}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  style={{ minHeight: '100vh' }}
                  >
                  <h1>Catastrar usuário</h1>
                  <Grid item xs={3}>
                      <h2>Login</h2>
                      <UserSimpleForm url='api/user' type='POST' role='ADMIN'/>
                  </Grid>   
                  
                  </Grid> 
            </LayoutMain>
        </>
    )
}

export default Users