import { fetchFromTMDB } from "../services/tmbd.services.js"

export const getTrendingTvShows = async (req, res) => {
    try {
        const data = await fetchFromTMDB('https://api.themoviedb.org/3/trending/tv/day?language=en-US')
        res.status(200).json({content:data.results})
    } catch (error) {
        console.log("error in getTrendingTvShows controller", error)
        if (error.message.includes(404)) {
            return res.status(500).send(null)
        }
            return res.status(500).json({error:"internal server error."})
    }
}

export const getTVTrailer = async (req, res) => {
    const {id} = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`)
        res.status(200).json({content:data.results})
    } catch (error) {
        console.log("error in GetTVTrailer controller", error)
        if (error.message.includes(404)) {
            return res.status(400).send(null)
        }
        return res.status(500).json({error:"internal server error."})
    }
}

export const getTvShowsDetails = async(req, res) => {
    const {id} = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`)
        res.status(200).json({content:data})
        } catch (error) {
            console.log("error in getTvShowsDetails controller", error)
            if (error.message.includes(404)) {
                return res.status(400).send(null)
                }
                return res.status(500).json({error:"internal server error."})
                }
}

export const GetSimmilerTVShows = async (req, res) => {
    const {id} = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`)
        res.status(200).json({content:data.results})
        } catch (error) {
            console.log("error in GetSimmilerTVShows controller", error)
            if (error.message.includes(404)) {
                return res.status(400).send(null)
            }
        return res.status(500).json({error:"internal server error."})
    }
}

export const getTVShowsCategory = async (req, res) => {
    const {category} = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`)
        res.status(200).json({content:data.results})
        } catch (error) {
            console.log("error in getTVShowsCategory controller", error)
            if (error.message.includes(404)) {
                return res.status(400).send(null)
            }
        return res.status(500).json({error:"internal server error."})
    }
}