import { LogOut, Menu, Search } from 'lucide-react'
import React, { useState} from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/authUser'
import { contentStore } from '../../store/content'

const Navbar = () => {
  const {user, logout} = useAuthStore()
  const [isMobileMenuOpen,setIsMobileMenuOpen] =  useState(false)

  const Toggler  = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  const {setContentType} = contentStore()


  return (
    <header className='max-w-6xl mx-auto p-4 items-center justify-between flex flex-wrap h-32'>
      <div className='flex items-center gap-10 z-50'>
        <Link to={'/'}><img src="/netflix-logo.png" alt="logo" className='w-32 sm:w-40' /></Link>
        {/* navbar for desktop */}
        <div className='hidden sm:flex gap-2 items-center'>
          <Link to={'/'} className='hover:underline' onClick={() => setContentType("movie")}>
          Movies
          </Link>
          <Link to={'/'} className='hover:underline' onClick={() => setContentType("tv")}>
          TV Shows
          </Link>
          <Link to={'/history'} className='hover:underline'>
          Search History
          </Link>
        </div>
      </div>
      {/*  */}
      <div className='gap-2 md:gap4 z-50 flex items-center'>
        <Link to={'/search'}>
        <Search className='size-6 cursor-pointer'/>
        </Link>
        <img src={user?.image} alt="avatar" className='h-8 cursor-pointer rounded' />
        <LogOut className='size-6 cursor-pointer' onClick={logout}/>
        <div className='sm:hidden'>
          <Menu onClick={Toggler} className='cursor-pointer size-6'/>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='mt-4 border border-gray-800 z-50 w-full sm:hidden'>
          <Link to={'/'} onClick={Toggler} className='block p-2 hover:underline' >
          <div onClick={() => setContentType("movie")}>Movie</div>
          </Link>
          <Link to={'/'} onClick={Toggler} className='block p-2 hover:underline' >
          <div onClick={() => setContentType("tv")}>TV Shows</div>
          </Link>
          <Link to={'/history'} onClick={Toggler} className='block p-2 hover:underline' >
          Search History
          </Link>
        </div>
      )}
      
    </header>
  )
}

export default Navbar