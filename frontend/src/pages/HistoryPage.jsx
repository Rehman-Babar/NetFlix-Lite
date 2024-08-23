import axios from 'axios'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import Navbar from '../component/common/Navbar'
import { SMALL_BASE_URL_iMAGE } from '../utils/constens.js'
import { Trash } from 'lucide-react'

const HistoryPage = () => {
    const [history, setHistory] = React.useState([])
    const [loading, setloading] = React.useState(false)

    function formatDate(dateString) {
        // Create a Date object from the input date string
        const date = new Date(dateString);
    
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
        // Extract the month, day, and year from the Date object
        const month = monthNames[date.getUTCMonth()];
        const day = date.getUTCDate();
        const year = date.getUTCFullYear();
    
        // Return the formatted date string
        return `${month} ${day}, ${year}`;
    }


    useEffect( () => {
        const getHistory =async () => {
            try {
                const res = await axios.get(`/api/v2/search/history`)
                setHistory(res.data.content)
            } catch (error) {
                console.log(error)
                setHistory([])
                toast.error("An error occurred, Try again later")
            }
        }
        getHistory()
    }, [])

    const handleDelete = async (entry) => {
        setloading(true)
        try {
            await axios.delete(`/api/v2/search/history/${entry.id}`)
            setHistory(history.filter((item) => item.id !== entry.id))
        } catch (error) {
            toast.error("Failed to delete history item")
        } finally {
            setloading(false)
        }
    }
    
    if (history?.length === 0) {
        return (
            <div className='bg-black min-h-screen text-white'>
				<Navbar />
				<div className='max-w-6xl mx-auto px-4 py-8'>
					<h1 className='text-3xl font-bold mb-8'>Search History</h1>
					<div className='flex justify-center items-center h-96'>
						<p className='text-xl'>No search history found</p>
					</div>
				</div>
			</div>
        )
    }
return (
    <div className='bg-black min-h-screen text-white'>
        <Navbar/>
        <div className='max-w-6xl mx-auto px-4 py-8'>
			<h1 className='text-3xl font-bold mb-8'>Search History</h1>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-4'>
                {history?.map((entry) => (
                    <div key={entry.id}
                    className='flex items-start p-4 bg-gray-600 rounded'
                    >
                        <img 
                        src={SMALL_BASE_URL_iMAGE + entry.image} 
                        alt="img"
                        className='size-16 rounded-full object-cover mr-4'
                        />
                        <div className='flex flex-col'>
								<span className='text-white text-lg'>{entry.title}</span>
								<span className='text-gray-400 text-sm'>{formatDate(entry.createdAt)}</span>
						</div>
                        <span
								className={`py-1 px-3 min-w-20 text-center rounded-full text-sm  ml-auto ${
									entry.searchType === "movie"
										? "bg-red-600"
										: entry.searchType === "tv"
										? "bg-blue-600"
										: "bg-green-600"
								}`}
							>
                                {entry.searchType[0].toUpperCase() + entry.searchType.slice(1)}
                            </span>
                            
                            <Trash
                            className='size-5 ml-5 hover:fill-red-600 hover:text-red-600 cursor-pointer'
                            onClick={() => handleDelete(entry)}
                            >
                                {loading && (<div role="status">
                        <svg aria-hidden="true" className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>)}
                            </Trash>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default HistoryPage