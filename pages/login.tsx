import Home from "../pages/home"
import LayoutMain from "../components/layouts/main"
import { useEffect, useState } from "react"
import useSWR from "swr"
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import LoginForm from "../components/form/login/loginForm"
import Link from "next/link";
import { useRouter } from 'next/router'
import { Button } from "@mui/material";

const Login = () =>
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

        <Grid item xs={3}>
            <h2>Login</h2>
            <LoginForm url='api/user/login' type='POST'/>
            <br/>
            Ainda não possui registro?<br/>
            <Button onClick={() => router.push('register')} variant="text">Cadastre-se aqui</Button>
        </Grid>   
        
        </Grid> 
    )
}

export default Login