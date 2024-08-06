import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {ChevronRight} from 'lucide-react'
import toast from 'react-hot-toast'

const AuthScreen = () => {
    const [email, setEmail] = useState("")

    const navigate = useNavigate()


    // navigate user to signup page and send email to url in signup page
    const handleFormSubmit = (e) => {
        e.preventDefault()
        if (email === "") {
            toast.error("Please fill the email.")
            return;
        }
        navigate(`/signup?email=${email}`)
    }
  return (
    <div className='hero-bg relative'>
        {/* Header */}
        <header className='max-w-6xl mx-auto flex justify-between items-center p-4 pb-10'>
            <img src="/netflix-logo.png" alt="logo" className='w-32 md:w-52' />
            <Link to={'/login'} className='text-white py-1 px-2 rounded bg-red-600 '>
            Sign In
            </Link>
        </header>

        {/* hero section */}
        <div className='flex flex-col items-center justify-center py-40 text-white max-w-6xl mx-auto text-center'>
            <h1 className='text-4xl md:text-6xl mb-4 font-bold'>Unlimited movies, TV Shows and more</h1>
            <p className='text-lg mb-4'>Watch anywere, cancle anytime.</p>
            <p className='text-lg mb-4'>Ready to watch ? Enter your email to create or restart your membership. </p>

            <form className='flex flex-col md:flex-row gap-4 w1' onSubmit={handleFormSubmit}>
                <input type="email"
                placeholder='Email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='p-2 bg-black/80 rounded border border-gray-700 flex-1'
                />
                
                <button className='text-lg lg:text-2xl bg-red-600 px-2 lg:px-6 py-1 md:py-2 rounded flex justify-center items-center'>
                    Get Started <ChevronRight className='size-8 md:size-10' />
                    </button>
                
            </form>

        </div>

        {/* Seprater */}
        <div className='h-2 w-full bg-[#232323]' aria-hidden="true"/>

        {/* 1St section */}
        <div className='bg-black py-10 text-white'> 
            <div className='flex flex-col md:flex-row px-4 md:px-2 justify-center items-center max-w-6xl mx-auto'>
                 {/* left side */}
                <div className='flex-1 text-center md:text-left'>
                    <h2 className='text-4xl md:text-5xl mb-4 font-extrabold '>Enjoy on your Tv.</h2>
                    <p className='text-xl md:text-2xl'>
                        Watch on Smart TVs, Xbox, PlayStations, ChromeCast, Apple Tv, Blu-ray players, and more.
                    </p>
                </div>
                 {/* right side */}
                <div className='flex-1 relative'>
                    <img src="/tv.png" alt="tv-logo" className='mt-4 z-20 relative' />
                    <video className='absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2'
                    playsInline
                    autoPlay
                    muted
                    loop
                    >
                        <source src='hero-vid.m4v' type='video/mp4'/>
                    </video>
                </div>
            </div>
        </div>

        {/* Seprater */}
        <div className='h-2 w-full bg-[#232323]' aria-hidden="true"/>

        {/* 2nd section */}
        <div className='bg-black py-10 text-white'>
            <div className='max-w-6xl mx-auto flex flex-col-reverse md:flex-row px-4 md:px-2 justify-center items-center'>
                {/* left side */}
                <div className='flex-1'>
                    <div className='relative'>
                        <img src="/stranger-things-lg.png" alt="stranger thing pic" className='mt-4' />
                        <div className='flex items-center absolute gap-5 left-1/2 bottom-5 -translate-x-1/2 bg-black w-3/4 lg:w-1/2 h-24 border border-slate-500 rounded-md px-2'>
                            <img src="stranger-things-sm.png" alt="img" className='h-full' />
                            <div className='flex justify-between items-center'>
                                <div className='flex flex-col gap-0'>
                                    <span className='text-md lg:text-lg font-bold'>Stranger Things</span>
                                    <span className='text-blue-500 text-sm'>Downloading...</span>
                                </div>
                                <img src="/download-icon.gif" alt="icon" className='h-12' />
                            </div>
                        </div>
                    </div>
                </div>
                {/* right side */}
                <div className='flex-1 text-center md:text-left '>
                    <h2 className='text-4xl md:text-5xl mb-4 font-extrabold '>Download your shows to watch ofline.</h2>
                    <p className='text-xl md:text-2xl'>Save your favorites easily and always have some thing to watch</p>
                </div>
            </div>
        </div>

                {/* Seprater */}
                <div className='h-2 w-full bg-[#232323]' aria-hidden="true"/>
                
                {/* 3rd section */}
        <div className='bg-black py-10 text-white'> 
            <div className='flex flex-col md:flex-row px-4 md:px-2 justify-center items-center max-w-6xl mx-auto'>
                 {/* left side */}
                <div className='flex-1 text-center md:text-left'>
                    <h2 className='text-4xl md:text-5xl mb-4 font-extrabold '>Watch anywere.</h2>
                    <p className='text-xl md:text-2xl'>
                        Stream unlimitted movies and tv shows on your phone, tablet, laptop and Tv.
                    </p>
                </div>
                 {/* right side */}
                <div className='flex-1 relative overflow-hidden'>
                    <img src="/device-pile.png" alt="tv-logo" className='mt-4 z-20 relative' />
                    <video className='absolute z-10 top-2 left-1/2 -translate-x-1/2 h-4/6 max-w-[63%]'
                    playsInline
                    autoPlay
                    muted
                    loop
                    >
                        <source src='video-devices.m4v' type='video/mp4'/>
                    </video>
                </div>
            </div>
        </div>

        {/* Seprater */}
        <div className='h-2 w-full bg-[#232323]' aria-hidden="true"/>
        
        {/* 4th section */}
        <div className='bg-black py-10 text-white'>
            <div className='max-w-6xl mx-auto flex flex-col-reverse md:flex-row px-4 md:px-2 justify-center items-center'>
                {/* left side */}
                <div className='flex-1'>
                    <div className='relative'>
                        <img src="/kids.png" alt="stranger thing pic" className='mt-4' />
                    </div>
                </div>
                {/* right side */}
                <div className='flex-1 text-center md:text-left '>
                    <h2 className='text-4xl md:text-5xl mb-4 font-extrabold '>Create profile for kids.</h2>
                    <p className='text-xl md:text-2xl'>Send kids on adventures with their favorite characters in a space made just for them—free with your membership.</p>
                </div>
            </div>
        </div>

    </div>
    )
}

export default AuthScreen