import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuthStore } from "../store/authUser"

const SignUpPage = () => {
  const emailFromUrl = new URLSearchParams(window.location.search).get("email");
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState( emailFromUrl || "");
  const [password, setPassword] = useState("");

const {signup, isSigningUp} = useAuthStore()


  const handleSignup = (e) => {
    e.preventDefault();
    signup({username, email, password});
  }

  return (
    <div className="hero-bg h-screen w-full">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to={"/"}>
          <img src="/netflix-logo.png" alt="logo" className="w-52" />
        </Link>
      </header>
      <div className="flex items-center justify-center mx-3 mt-20">
        <div className="w-full max-w-md space-y-6 p-8 bg-black/60 rounded-lg shadow-md">
          <h1 className="text-white text-center text-2xl mb-4 font-bold">Sign Up</h1>
          <form className="space-y-4" onSubmit={handleSignup}>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-300 block">
                Email
              </label>
              <input 
                type="email"
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-2 mt-1 border border-gray-200 rounded-md bg-transparent text-white focus:outline-none focus:ring px-2" 
                placeholder="you@gmail.com"
              />
            </div>

            <div>
              <label htmlFor="username" className="text-sm font-medium text-gray-300 block">
                Username
              </label>
              <input 
                type="text" 
                id="username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full py-2 mt-1 border border-gray-200 rounded-md bg-transparent text-white focus:outline-none focus:ring px-2" 
                placeholder="Rehman Babar"
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-300 block">
                Password
              </label>
              <input 
                type="password" 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-2 mt-1 border border-gray-200 rounded-md bg-transparent text-white focus:outline-none focus:ring px-2" 
                placeholder="**********"
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-red-600 text-white font-semibold p-2 hover:bg-red-700 rounded-md"
            >
              {isSigningUp ? "Loading..." : "Sign Up"}
            </button>
          </form>
          <div className="text-gray-600 text-center">
            Already a member?{" "}
            <Link to={'/login'} className="text-red-500 hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage;
