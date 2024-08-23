import React from 'react'
import { useState } from 'react'
import { contentStore } from '../../store/content.js'
import Navbar from '../../component/common/Navbar'
import { Search } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { LARGE_BASE_URL_iMAGE, SMALL_BASE_URL_iMAGE } from '../../utils/constens'
import { Link } from 'react-router-dom'

const SearchPage = () => {
    const [activeTab, setactiveTab] = useState("movie")
    const [searchTerm, setsearchTerm] = useState("")
    const [loading, setLoading] = useState(false)
    const [result, setresult] = useState([])
    const {contentType, setContentType} = contentStore()
    const handleClick = (tab) => {
        setactiveTab(tab)
        tab === "movie" ? setContentType("movie") : setContentType("tv")
        setresult([])
    }
    const handleSubmit = async(e) => {
        setLoading(true)
        e.preventDefault()
        try {
            const res = await axios.get(`/api/v2/search/${activeTab}/${searchTerm}`)
            setresult(res.data.content)
        } catch (error) {
            if (error.response.status === 404) {
                toast.error("Nothing found, make sire you are searching in the write category")
            } else {
                toast.error("An error occurred, Try again later")
            }
            // toast.error("An error occurred, Try again later")
        } finally {
            setLoading(false)
        }
    }
    // console.log("result", result)
    if (result.length < 0) {
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
        <Navbar/>
        
        <div className='container mx-auto px-8 py-4'>
            <div className='flex justify-center gap-3 mb-4'>
                <button 
                className={`px-3 py-2 rounded ${activeTab === "movie" ? "bg-red-600" : "bg-gray-600"} hover:bg-red-700`}
                onClick={() => handleClick("movie")}
                >Movies
                </button>

                <button 
                className={`px-3 py-2 rounded ${activeTab === "tv" ? "bg-red-600" : "bg-gray-600"} hover:bg-red-700`}
                onClick={() => handleClick("tv")}
                >TV Shows
                </button>

                <button 
                className={`px-3 py-2 rounded ${activeTab === "person" ? "bg-red-600" : "bg-gray-600"} hover:bg-red-700`}
                onClick={() => handleClick("person")}
                >Person
                </button>
            </div>
            <form className='flex items-stretch gap-2 mb-8 mx-auto max-w-2xl' onSubmit={handleSubmit}>
                <input 
                type="text"
                placeholder={`Search for a ${activeTab}`}
                value={searchTerm}
                onChange={(e) => setsearchTerm(e.target.value)}
                className='w-full rounded p-2 bg-gray-700 text-white'
                />
                {loading ? (
                    <div role="status">
                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                    ) : ( <button className='p-2 bg-red-600 hover:bg-red-700 rounded'>
                                        <Search className='size-6'/>
                </button>)}
               
            </form>

            {/* Results */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                
                    {result?.map((item) => {
                        if(!item.poster_path && !item.profile_path) return null;
                        return (
                            <div key={item.id} className='bg-gray-800 p-4 rounded'>
                                {activeTab === "person" ? (
                                    
                                        <div className='flex flex-col items-center'>
                                            <img
                                                src={LARGE_BASE_URL_iMAGE + item.profile_path}
                                                alt={item.name}
                                                className='max-h-96 rounded mx-auto'
                                            />
                                            <h2 className='mt-2 text-xl font-bold'>{item.name}</h2>
                                        </div>
                                    
                                ) : (
                                    <Link
										to={"/watch/" + item.id}
										onClick={() => {
											setContentType(activeTab);
										}}
									>
										<img
											src={LARGE_BASE_URL_iMAGE + item?.poster_path}
											alt={item.title || item.name}
											className='w-full h-auto rounded'
										/>
										<h2 className='mt-2 text-xl font-bold'>{item?.title || item?.name}</h2>
									</Link>
                                )}
                            </div>
                        )
                    })}
                
                
            </div>
        </div>
    </div>
)
}

export default SearchPage