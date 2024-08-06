import { useQuery } from "@tanstack/react-query"
import HomeScreen from "./HomeScreen"
import AuthScreen from "./AuthScreen"
import { useAuthStore } from "../../store/authUser"
import { useEffect } from "react"

const HomePage = () => {
const {user} = useAuthStore()
// const user = true
      return <>{user ? <HomeScreen /> : <AuthScreen />}</>;
  
}

export default HomePage