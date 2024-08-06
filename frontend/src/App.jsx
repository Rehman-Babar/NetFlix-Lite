import { Navigate, Route, Routes } from "react-router-dom"

import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/home/HomePage"

import LoadingSpinner from "./component/common/LoadingSpinner";
import Footer from './component/common/Footer'

import { Toaster } from "react-hot-toast"
import { useAuthStore } from "./store/authUser.js";
import { useEffect } from "react";
import { Loader } from "lucide-react";


function App() {
const {user, isCheckingAuth, authCheck} = useAuthStore()

useEffect(() => {
  authCheck()
},[authCheck])
if (isCheckingAuth) {
  return (
    <div className="h-screen">
        <div className="flex justify-center items-center mx-auto bg-black h-full">
          <Loader className="animate-spin text-red-600 size-10"/>
        </div>
    </div>
  )
}
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/login" element={!user ? <LoginPage/> : <Navigate to={'/'}/>}/>
      <Route path="/signup" element={!user ? <SignUpPage/> : <Navigate to={'/'}/>}/>
    </Routes>
    <Footer/>
    <Toaster />
    </>
  )
}

export default App
