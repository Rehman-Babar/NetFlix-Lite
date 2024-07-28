import axios from "axios";

// const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOWE1YmEzNGMxZGQ5NGQwMWEyNGQ4ZjQ5ZjFiYzgwMiIsIm5iZiI6MTcyMTgwODY5Ny4xODAzMzgsInN1YiI6IjY2YTBiNTNlZWZjYzY3OTYxZmJmNjk0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DJK2ncUcIYVFJfKUNbJR-Shhz8y9ezkw1LP8ezcoBBs'
//     }
//   };
  
//   fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));
// const url = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"

export const fetchFromTMDB = async (url) =>{
    const options = {
        headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_SECRET_KEY}`
        }
    };

    const response = await axios.get(url, options)
    if (response.status !== 200) {
        throw new Error("Failed to fetch data from TMDB")
    }
    return response.data;
}

// export const fetchFromTMDB = async (url) => {
//     const res = await fetch(url, {
//         method:"GET",
//         headers:{
//             "Content-Type":"application/json",
//             "Authorization": `Bearer ${process.env.TMDB_SECRET_KEY}`
//         }
//     })
//     if (!res.ok) {
//         throw new Error(`Failed to fetch data from TMDB: ${res.statusText}`);
//     }
//     const data = await res.json()
//     return data
// // }