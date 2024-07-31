import { useState } from "react";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from "@tanstack/react-query";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const queryClient = useQueryClient();
  const { mutate: login, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch('/api/v1/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password })
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error);
        }
        const data = await res.json();
        console.log(data);
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    }
  });

  const handleLogin = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div className="hero-bg h-screen w-full">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to={"/"}>
          <img src="/netflix-logo.png" alt="logo" className="w-52" />
        </Link>
      </header>
      <div className="flex items-center justify-center mx-3 mt-20">
        <div className="w-full max-w-md space-y-6 p-8 bg-black/60 rounded-lg shadow-md">
          <h1 className="text-white text-center text-2xl mb-4 font-bold">Login</h1>
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-300 block">
                Email
              </label>
              <input 
                type="email"
                id="email" 
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                className="w-full py-2 mt-1 border border-gray-200 rounded-md bg-transparent text-white focus:outline-none focus:ring px-2" placeholder="you@gmail.com"
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
                onChange={(e)=> setPassword(e.target.value)}
                className="w-full py-2 mt-1 border border-gray-200 rounded-md bg-transparent text-white focus:outline-none focus:ring px-2" placeholder="**********"
              />
            </div>
            <button 
              onClick={handleLogin} 
              className="w-full bg-red-600 text-white font-semibold p-2 hover:bg-red-700 rounded-md"
            >
              {isPending ? "Loading..." : "Sign In"}
            </button>
          </form>
          <div className="text-gray-600 text-center">
            Not a member?{"  "} 
            <Link to={'/signup'} className=" text-red-500 hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
