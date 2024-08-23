import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authUser";
import Navbar from "../../component/common/Navbar";
import { Info,  Play } from "lucide-react";
import useGetTrandingContent from "../../hooks/useGetTrandingContent";
import { MOVIE_CATOGREY, SMALL_BASE_URL_iMAGE, TV_CATOGREY } from "../../utils/constens.js";
import { contentStore } from "../../store/content";
import MovieSlider from "../../component/slider/MovieSlider";
import { useState } from "react";

const HomeScreen = () => {
  const {trandingContent, loading} = useGetTrandingContent()
  const [imgLoading, setImgLoading] = useState(true)

  const { isCheckingAuth } = useAuthStore()
  const {contentType} = contentStore()

  if(isCheckingAuth) return null

  if (loading)
		return (
			<div className='h-screen text-white relative'>
				<Navbar />
				<div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer' />
			</div>
		);

 

  return (
    <>
      <div className="relative h-screen text-white ">
        <Navbar/>
        {imgLoading && (
				<div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer' />
        )}
        <img src={SMALL_BASE_URL_iMAGE + trandingContent?.backdrop_path} alt="img" 
        className="w-full h-full absolute top-0 left-0 object-cover -z-50" 
        onLoad={() => setImgLoading(false)}

        />
          <div className="w-full h-full bg-black/50 absolute top-0 left-0 -z-50" aria-hidden='true'/>
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32 ">
              <div className="bg-gradient-to-b from-black via-transparent to-transparent w-full h-full absolute top-0 left-0 -z-10">
              </div>
                <div className="max-w-2xl">
                  <h1 className="font-extrabold text-balance text-6xl mt-4">
                    {trandingContent?.title || trandingContent?.name}
                  </h1>
                  <p className="mt-2">
                    {trandingContent?.release_date?.split("-")[0] ?? 
                    trandingContent?.first_air_date?.split("-")[0]}{" "}
                    {trandingContent?.adult ? "18+" : "PG-13"}
                  </p>
                  <p className="mt-4 text-lg">{
                    trandingContent?.overview?.length > 200 ? trandingContent?.overview.slice(0, 200) + "..." : trandingContent?.overview
                  }</p>
                </div>
                <div className="flex mt-8">
                  <Link to={`/watch/${trandingContent?.id}`} className="bg-white hover:bg-white/60 text-black font-bold py-2 px-4 rounded mr-4 flex items-center">
                  <Play className="size-6 mr-2 fill-black"/>
                  Play
                  </Link>
                  <Link to={`/watch/${trandingContent?.id}`} className="bg-gray-500/60 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-4 flex items-center">
                  <Info className="size-6 mr-2"/>
                  More Info
                  </Link>
                </div>
            </div>
      </div>
      
      <div className="flex flex-col text-white bg-black py-10 gap-10">

        {contentType === "movie" ? (
          MOVIE_CATOGREY.map((category) => <MovieSlider key={category} category={category}/>)
        ) : (
          TV_CATOGREY.map((category) => <MovieSlider key={category} category={category} />)
        ) }

      </div>
    </>
  )
}

export default HomeScreen