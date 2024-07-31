import { Navigate, Route, Routes } from "react-router-dom"

import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/home/HomePage"

import LoadingSpinner from "./component/common/LoadingSpinner";
import Footer from './component/common/Footer'

import { Toaster } from "react-hot-toast"
import { useQuery } from "@tanstack/react-query"


function App() {
  // const {data:authUser, isLoading} = useQuery({
  //   queryKey:["authUser"],
  //   queryFn: async () => {
  //     const res = await fetch("/api/v1/auth/me")

  //     if (!res.ok) {
  //       const data = await res.json()
  //       throw new Error(data.error)
  //     }
  //     const data = await res.json();
      
  //     return data
  //   },
  //   retry:false

  // })

  // if (isLoading) {
  //   return(
  //     <div className="h-screen flex justify-center items-center">
  //       <LoadingSpinner size="lg"/>
  //     </div>
  //   )
  // }
  const authUser = true
  return (
    <>
    <Routes>
      <Route path="/" element={authUser ? <HomePage/> : <Navigate to={'/login'}/>}/>
      <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to={'/'}/>}/>
      <Route path="/signup" element={!authUser ? <SignUpPage/> : <Navigate to={'/'}/>}/>
      {/* <Route path="/" element={<HomePage/>}/> */}
    </Routes>
    <Footer/>
    <Toaster />
    </>
  )
}

export default App
