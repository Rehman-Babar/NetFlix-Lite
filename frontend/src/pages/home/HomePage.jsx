import { useQuery } from "@tanstack/react-query"
import HomeScreen from "./HomeScreen"
import AuthScreen from "./AuthScreen"

const HomePage = () => {
  const {data:authUser} = useQuery({queryKey:["authUser"]})
  return (
    <div>
      {authUser ? <HomeScreen/> : <AuthScreen/>}
    </div>
  )
}

export default HomePage