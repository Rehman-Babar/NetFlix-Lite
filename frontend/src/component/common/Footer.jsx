import React from 'react'

const Footer = () => {
  return (
    <footer className='py-6 md:py-0 px-2 md:px-8 text-white border-t border-slate-500 bg-black'>
        <div className='flex flex-col md:flex-row justify-between items-center md:h-24 gap-4'>
            <p>Built by {" "}
              <a href="" target='_blank' className='font-medium underline underline-offset-4'>Rehman Babar</a>
              . The source code is avaliable on {" "}
              <a href="" target='_blank' className='font-medium underline underline-offset-4'>GitHub</a>
            </p>
        </div>
    </footer>
  )
}

export default Footer