import { User } from "../models/userModel.js";
import { fetchFromTMDB } from "../services/tmbd.services.js";

export const SearchMovies = async (req, res) => {
    try {
        const { query } = req.params;
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`)
        if (data.results.length === 0) {
            return res.status(404).send(null);
            
        }
        await User.findByIdAndUpdate(req.user._id, {
            $push:{
                searchHistory:{
                    id:data.results[0].id,
                    image:data.results[0].poster_path,
                    title:data.results[0].title,
                    searchType:"Movie",
                    createdAt:new Date()
                }
            }
        })
        return res.status(200).json({content:data.results})
    } catch (error) {
        console.log("error in search movie controller", error)
        if (error.message.includes(404)) {
            return res.status(404).json({ message: "Movie not found" });
        }
        return res.status(400).json({ message: 'Invalid request' });
    }
}

export const  SearchPerson = async (req, res) => {
    try {
        const { query } = req.params;
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&language=en-US&page=1`)
        if (data.results.length === 0) {
            return res.status(404).send(null);
        }
        await User.findByIdAndUpdate(req.user._id, {
            $push:{
                searchHistory:{
                    id:data.results[0].id,
                    image:data.results[0].profile_path,
                    title:data.results[0].name,
                    searchType:"Person",
                    createdAt:new Date()
                }
            }
        })
        
        return res.status(200).json({content:data.results})
        
    } catch (error) {
        console.log("error in search person controller", error)
        if (error.message.includes(404)) {
            return res.status(404).json({ message: "Person not found" });
            }
        return res.status(400).json({ message: 'Invalid request' });
    }
}

export const SearchTV = async (req, res) => {
    try {
        const { query } = req.params;
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`)
        if (data.results.length === 0) {
            return res.status(404).send(null)
        }
        await User.findByIdAndUpdate(req.user._id, {
            $push:{
                searchHistory:{
                    id:data.results[0].id,
                    image:data.results[0].poster_path,
                    title:data.results[0].name,
                    searchType:"Tv-Show",
                    createdAt:new Date()
                }
            }
        })
    res.status(200).json({content:data.results})
        
    } catch (error) {
        console.log("error in search tv controller", error)
        if (error.message.includes(404)) {
            return res.status(404).json({ message: "TV Show not found" });
            }
        return res.status(400).json({ message: 'Invalid request' });
    }
}

export const GetSearchHistory = async (req, res) => {

try {
    const user = await User.findById(req.user._id)
    res.status(200).json({content:user.searchHistory})
} catch (error) {
    console.log("error in search tv controller", error)
    return res.status(400).json({ message: 'Invalid request' });
}
}

export const DeleteSearchHistory = async (req, res) => {
    let {id} = req.params;
    id = parseInt(id)
try {
    await User.findByIdAndUpdate(req.user._id,{
        $pull:{
            searchHistory:{ id:id }
        }
    })
    
    res.status(200).json({message:"Item removed from search history."})
} catch (error) {
    console.log("error in delete search controller", error)
    return res.status(400).json({ message: 'Invalid request' });
}
}
