import Home from "../pages/home"
import LayoutMain from "../components/layouts/main"
import { useEffect, useState } from "react"
import useSWR from "swr"
import { useGridApiEventHandler } from "@mui/x-data-grid"

const Main = () =>
{
  const user_level = 'manager'
  const [userLevel, setUserLevel] = useState(null) 

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


  if (!currentLevel) return <div>Loading...</div>

  return (
    <>
      <LayoutMain type={currentLevel}>
        <Home type={currentLevel}/>
      </LayoutMain>
    </>
  )
}

export default Main