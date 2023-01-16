import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../src/Link';
import ProTip from '../src/ProTip';
import Copyright from '../src/Copyright';
import { useState } from 'react';
import { prisma } from '../lib/prisma';
import { useGetData } from '../hooks/useRequest';
import ActivityForm from '../components/form/activities/activityForm';
import UserSimpleForm from '../components/form/users/userSimpleForm';
import ActivityFormList from '../components/form/activities/activityFormList';
import UsersSimpleList from '../components/form/users/usersSimpleList';
import ScholarityForm from '../components/form/scholarity/scholarityForm';
import ScholarityFormList from '../components/form/scholarity/scholarityFormList';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import useSWR, { mutate, SWRConfig } from 'swr';
import CurriculoForm from '../components/form/curriculo/curriculoForm';
import FullUserForm from '../components/form/users/fullUserForm';
import ScheduleTypeForm from '../components/form/scheduletype/scheduleTypeForm';
import ScheduleTypeFormList from '../components/form/scheduletype/schedumeTypeFormList';
import LoginForm from '../components/form/login/loginForm';


interface IUser
{
  email: string;
  name: string;
  role?: string;
  avatar?: string;
  area_activityId?: string;
}

interface IGetUserData
{
  onClick: (data:IUser) => void
}

interface IGetActivityAreas
{
  onClick: (data:any) => void
}


export async function getServerSideProps()
{
  const users = await prisma.user.findMany()
  //const users = axios.get('http://localhost:3000/api/user/').then((res) => res.data)
  const schedule = await prisma.schedule.findMany()
  const activity = await prisma.areaActivity.findMany()
  
  return{
    props:{
      schedule: JSON.parse(JSON.stringify(schedule)),
      activity: JSON.parse(JSON.stringify(activity)),
      fallback:{
        '/api/user':JSON.stringify(users),
        '/api/activity':JSON.stringify(activity),
      }
    }
  }
}

export default function Home(props:any, fallback:any) 
{

  const [agendas, setAgenda] = useState(props.schedule)
  const [users, setUsers] = useState(props.users)
  const [activityArea, setActivityArea] = useState()
  const [scholarity, setScholarity] = useState()
  const [shecduleType, setScheduleType] = useState()
  const [dataUser, setDataUser] = useState<IUser>()
  const {data: schedule} = useGetData('api/schedule')

  console.log(props)

  const getUserData = (data: IUser) => 
  {
    setDataUser(data)
  }

  const getActivityArea = (data:any) =>
  {
    setActivityArea(data)
  }

  const getScholarity = (data:any) =>
  {
    setScholarity(data)
  }

  const getScheduleType = (data:any) =>
  {
    setScheduleType(data)
  }

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Área de formulários para Testes
        </Typography>
        <Link href="/main" color="secondary">
          Ir para layout principal
        </Link>

      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>

          <Grid item xs={4}>
            <Paper>
              <h2>Adicionar escolaridade</h2>
              <ScholarityForm url='api/scholarity' type='POST'/>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper>
              <h2>Listar escolaridade</h2>
              <SWRConfig value={fallback}>
                <ScholarityFormList onClick={getScholarity}/>
              </SWRConfig>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper>
            <h2>Editar escolaridade</h2>
              <ScholarityForm url='api/scholarity' type='PUT' dados={scholarity}/>
            </Paper>
          </Grid>


          <Grid item xs={4}>
            <Paper>
              <h2>Adicionar atuação</h2>
              <ActivityForm url='api/activity' type='POST'/>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper>
              <h2>Listar de atuação</h2>
              <SWRConfig value={fallback}>
                <ActivityFormList onClick={getActivityArea}/>
              </SWRConfig>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper>
              <h2>Editar de atuação</h2>
              <ActivityForm url='api/activity' type='PUT' dados={activityArea}/>
            </Paper>
          </Grid>



          <Grid item xs={4}>
            <Paper>
              <h2>Adicionar Tipo Agendamento</h2>
              <ScheduleTypeForm url='api/scheduletype' type='POST'/>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper>
              <h2>Listar de atuação</h2>
              <SWRConfig value={fallback}>
                <ScheduleTypeFormList onClick={getScheduleType}/>
              </SWRConfig>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper>
              <h2>Editar de atuação</h2>
              <ScheduleTypeForm url='api/scheduletype' type='PUT' dados={shecduleType}/>
            </Paper>
          </Grid>


          <Grid item xs={4}>
            <Paper>
              <h2>Cadastrar usuários</h2>
              <UserSimpleForm url='api/user' type='POST' role='USER'/>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper>
              <h2>Listar usuários</h2>
              <SWRConfig value={fallback}>
                <UsersSimpleList onClick={getUserData}/>
              </SWRConfig>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper>
              <h2>Editar usuários</h2>
              <UserSimpleForm url='api/user' type='PUT' dados={dataUser} role='USER'/>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ 
        flexGrow: 1,
        boxShadow: 0,
        bgcolor: 'background.paper',
        m: 1,
        borderRadius:2,
        overflow: 'hidden',
        width: '100%',
       }}>
        <Paper>
        <CurriculoForm type='POST'/>
        </Paper>
        
      </Box>


      <Box sx={{ 
        flexGrow: 1,
        boxShadow: 0,
        bgcolor: 'background.paper',
        m: 1,
        borderRadius:2,
        overflow: 'hidden',
        width: '100%',
       }}>
        <Paper>
        <FullUserForm type='POST'/>
        </Paper>
        
      </Box>

      <Box sx={{ 
        flexGrow: 1,
        boxShadow: 0,
        bgcolor: 'background.paper',
        m: 1,
        borderRadius:2,
        overflow: 'hidden',
        width: '100%',
       }}>
        <Paper>
          <Grid item xs={4}>
            <Paper>
              <h2>Login</h2>
              <LoginForm url='api/user/login' type='POST'/>
            </Paper>
          </Grid>
        </Paper>
        
      </Box>



    </Container>
  );
}