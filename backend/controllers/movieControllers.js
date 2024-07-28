import { fetchFromTMDB } from "../services/tmbd.services.js"

export const GetTrandingMovie = async (req, res) => {
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US")
        
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)]
        res.status(200).json({ content: randomMovie })
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log("error in GetTrandingMovie controller")
        
    }
}

export const GetMovieTrailer = async (req, res) => {
    const {id} = req.params;
    try {
        const data =await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`) 
        res.status(200).json({trailer:data})
    } catch (error) {
        console.log("error in GetMovieTrailer controller")
        if (error.message.includes(404)) {
            return res.status(404).send(null)
        }
        return res.status(500).json({ error:"internal server error"})
        
        
    }
}

export const GetMovieDetails = async(req, res) => {
    const {id} = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`)
        res.status(200).json({content:data})
        } catch (error) {
            console.log("error in GetMovieDetails controller", error)
            if (error.message.includes(404)) {
                return res.status(404).send(null)
                }
                return res.status(500).json({ error:"internal server error"})
                }
}

export const GetSimmilerMovies = async (req, res) => {
    const {id} = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`)
        res.status(200).json({simmiler:data.results})
    } catch (error) {
        if (data.error.includes(404)) {
            return res.status(404).send(null)
        }
        console.log("error in GetMovieDetails controller")
        return res.status(500).json({error:"Internal server error."})
    }
}

export const getcategreyMovies = async (req, res) => {
    const {category} = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`)
        res.status(200).json({content:data.results})
        } catch (error) {
            console.log("error in getcategreyMovies controller", error)
        if (error.message.includes(404)) {
            return res.status(404).send(null)
        }
            return res.status(500).json({ error:"internal server error"})
    }
}