import Home from "../pages/home"
import LayoutMain from "../components/layouts/main"

const Main = () =>
{
  const user_level = "candidate"

  return (
    <>
      <LayoutMain type={user_level}>
        <Home type={user_level}/>
      </LayoutMain>
    </>
  )
}

export default Main