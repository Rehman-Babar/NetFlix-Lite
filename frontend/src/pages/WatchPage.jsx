import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { contentStore } from '../store/content';
import axios from 'axios';
import Navbar from '../component/common/Navbar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ReactPlayer from 'react-player'
import { LARGE_BASE_URL_iMAGE, SMALL_BASE_URL_iMAGE } from '../utils/constens';
// import WatchPageSkeltons from '../component/common/WatchPageSkeltons';
import WatchPageSkeleton from '../component/common/WpSkeltons.jsx';

const WatchPage = () => {

    function FormateRelaseDate (date) {
        return new Date(date).toLocaleDateString("en-US", {
          year:"numeric",
          month:"long",
          day:"numeric"
        })
    }
    const sliderRef = useRef(null)
    const ScroolLeft = () => {
      if (sliderRef.current) {
        sliderRef.current.scrollBy({left:-sliderRef.current.offsetWidth, behavior:"smooth"})
      }
    }
    const ScroolRight = () => {
      if (sliderRef.current) {
        sliderRef.current.scrollBy({left:sliderRef.current.offsetWidth, behavior:"smooth"})
      }
    }


    const {contentType} = contentStore();


    const {id} = useParams();

    const [trailers, setTrailers] = useState([])
    const [currentTrailerid, settrailerId] = useState(0)
    const [content, setContent] = useState([])
    const [loading, setLoading] = useState(true)
    const [simmiler, setSimmiler] = useState([])
    const [details, setDetails] = useState([])

    const handleNext = () => {
      if (currentTrailerid < trailers.length -1) {
        settrailerId(currentTrailerid + 1)
      }
    }

    const handlePrev = () => {
      if (currentTrailerid > 0) {
        settrailerId(currentTrailerid -1)
      }
    }


    useEffect(() => {
        const gaetTrailer =async () => {
          try {
            const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`)
            setTrailers(res.data.trailer)
          } catch (error) {
            console.log(error)
            if (error.message.includes('404')) {
              setTrailers(null)
            }
          } 
        }

        gaetTrailer()
    }, [contentType,id])

    useEffect(() => {
      const gaetSimmiler=async () => {
        try {
          const res = await axios.get(`/api/v1/${contentType}/${id}/simmiler`)
          setSimmiler(res.data.simmiler)
        } catch (error) {
          if (error.message.includes('404')) {
            setSimmiler(null)
          }
        }
      }

      gaetSimmiler()
  }, [contentType,id])

  useEffect(() => {
    const getdetails=async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/details`)
        setDetails(res.data.content)
      } catch (error) {
        if (error.message.includes('404')) {
          setDetails(null)
        }
      } finally {
        setLoading(false)
      }
    }

    getdetails()
}, [contentType,id])
  

  if (loading)
		return (
			<div className='min-h-screen bg-black p-10'>
				<WatchPageSkeleton />
			</div>
		);

    if (!simmiler) {
      return (
        <div className='bg-black text-white h-screen'>
          <div className='max-w-6xl mx-auto'>
            <Navbar />
            <div className='text-center mx-auto px-4 py-8 h-full mt-40'>
              <h2 className='text-2xl sm:text-5xl font-bold text-balance'>Content not found 😥</h2>
            </div>
          </div>
        </div>
      );
    }

  return (
    <div className='bg-black min-h-screen text-white'>
        <div className='mx-auto container px-4 py-8 h-full'>
          <Navbar/>
          {trailers?.length > 0 && (
  <div className='flex justify-between items-center mb-4'>
    <button
      className={`bg-gray-500/70 hover:bg-gray-500 px-2 py-4 text-white rounded ${currentTrailerid === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={currentTrailerid === 0}
      onClick={handlePrev}
    >
      <ChevronLeft size={24} />
    </button>
    <button
      className={`bg-gray-500/70 hover:bg-gray-500 px-2 py-4 text-white rounded ${currentTrailerid === trailers.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={currentTrailerid === trailers.length - 1}
      onClick={handleNext}
    >
      <ChevronRight size={24} />
    </button>
  </div>
)}
        <div className='aspect-video mb-8 p-2 sm:px-10 md:px-32'>
            {trailers?.length > 0 && (
              <ReactPlayer 
              controls={true}
              width={"100%"}
              height={"70vh"}
              className={"mx-auto overflow-hidden rounded-lg"}
              url={`https://wwww.youtube.com/watch?v=${trailers[currentTrailerid].key}`}
              /> 
            )}
            {
              trailers?.length === 0 && (
                <h2 className='text-center text-lg font-bold mt-5'>
                  No trailers available for{" "}
                  <span className='font-bold text-red-500'>
                  {
                    content?.title || content?.name
                  } 🥱🥱
                  </span>
                </h2>
              )
            }
        </div>
        {/* Movies details */}
        <div className='flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto gap-20'>
              <div className='mb-4 md:mb-0'>
                <h2 className='text-5xl text-balance font-bold'>{details?.title || details?.name}</h2>
                <p className='mt-2 text-lg'>
                  {FormateRelaseDate(details?.release_date || details?.first_air_date)}| {" "}
                  {details?.adult ? (
                    <span className='text-red-600'>18+</span>
                  ) : (
                    <span className='to-green-600'>PG-13</span>
                  )}
                </p>
                <p className='mt-4 text-lg'>{details?.overview}</p>
              </div>
              <img 
              src={LARGE_BASE_URL_iMAGE + details?.poster_path} 
              alt="poster_path"
              className='max-h-[600px] rounded-lg'
              />
        </div>

        {/* Simmiler */}
        {simmiler?.length > 0 && (
          <div className='mt-12 relative mx-auto max-w-5xl'>
            <h3 className='text-3xl mb-4 font-bold'>Simmiler movies/Tv shows</h3>
            <div className='flex overflow-x-scroll scrollbar-hide mb-4 gap-4 group' ref={sliderRef}>
              {simmiler.map((item) => {
                if (!item?.poster_path) return null
                return (
                  <Link key={item.id} to={`/watch/${item.id}`} className='w-52 flex-none'>
                  <img 
                  src={SMALL_BASE_URL_iMAGE+item.poster_path} 
                  alt="poster-path"
                  className='w-full h-auto rounded-md'
                  />
                    <h4 className='font-semibold mt-2 text-lg'>{item.name || item.title}</h4>
                </Link>
                )
              })}
              
              <ChevronRight
								className='absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8
										opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer
										bg-red-600 text-white rounded-full'
								onClick={ScroolRight}
							/>
							<ChevronLeft
								className='absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0 
								group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 
								text-white rounded-full'
								onClick={ScroolLeft}
							/>
					
            </div>
          </div>
        )}

        </div>
    </div>
  )
}

export default WatchPage