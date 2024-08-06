import React, { useEffect, useRef, useState } from 'react'
import { contentStore } from '../../store/content'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { SMALL_BASE_URL_iMAGE } from '../../utils/constens'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const MovieSlider = ({category}) => {

  const [showArrow, setShowArrow] = useState(false)

  const sliderRef = useRef(null)

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" });
    }
  }

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left:sliderRef.current.offsetWidth, behavior: "smooth" });
    }
  }

  const {contentType} = contentStore()

  const formateCatogery = category.replaceAll("_", " ")[0].toUpperCase() + category.replaceAll("_", " ").slice(1)
  const formateContent = contentType === "movie" ? "Movies" : "Tv Shows"
  const [content, setContent] = useState([])

  useEffect(() => {
    const getContent = async () => {
      const res = await axios.get(`/api/v1/${contentType}/${category}`)
      setContent(res.data.content)
    }

    getContent();
  }, [contentType, category])
 
  return (
    <div className='bg-black relative text-white px-5 md:px-20'
    onMouseEnter={() => setShowArrow(true)}
    onMouseLeave={() => setShowArrow(false)}
    >
        <h2 className='mb-4 text-2xl font-bold'>
        {formateCatogery} {formateContent}
        </h2>
        <div className='flex space-x-4 overflow-x-scroll scrollbar-hide' ref={sliderRef}>
          {content.map((item) => (
            <Link to={`/watch/${item.id}`} key={item.id} className='min-w-[256px] relative group'>
              <div className='rounded-lg overflow-hidden'>
                <img 
                src={SMALL_BASE_URL_iMAGE + item?.backdrop_path} alt="" 
                className='transition-transform ease-in-out duration-300 group-hover:scale-125'
                />
              </div>
              <p className='mt-4 text-center'>
                {item.title || item.name}
              </p>
            </Link>
          ))}
        </div>
        {
          showArrow && (

            <>
					<button
						className='absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center
            size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10
            '
						onClick={scrollLeft}
					>
						<ChevronLeft size={24} />
					</button>

					<button
						className='absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center
            size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10
            '
						onClick={scrollRight}
					>
						<ChevronRight size={24} />
					</button>
				</>

          )
        }
    </div>
  )
}

export default MovieSlider