import Home from "../pages/home"
import LayoutMain from "../components/layouts/main"
import { useEffect, useState } from "react"
import useSWR from "swr"
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import UserSimpleForm from "../components/form/users/userSimpleForm";
import { useRouter } from 'next/router'

const Register = () =>
{
 
    const router = useRouter()

  return (


    <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    style={{ minHeight: '100vh' }}
    >

    <Grid item>
        <h2>Cadastre-se em nossa base de currículos</h2>
        <UserSimpleForm url='api/user' type='POST' role='USER'/>
        <br/>
        <Button onClick={() => router.push('/')} variant="text">Voltar</Button>
    </Grid>   
    
    </Grid> 
  )
}

export default Register