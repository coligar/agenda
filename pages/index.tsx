import Home from "../pages/home"
import LayoutMain from "../components/layouts/main"
import { useEffect } from "react"
import useSWR from "swr"
import { useRouter } from 'next/router'

const Main = () =>
{
  const router = useRouter()

  const { data: currentLevel } = useSWR("role", async key => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    const value = localStorage.getItem(key);
    return !!value ? value : undefined;
  });

  useEffect(() => {
    if(!currentLevel) router.push('login')
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