import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";

export const MainView = () =>{
    const [ movies, setMovies ] = useState ([]); 
    const [selectedMovie, setSelectedMovie] = useState (null);
    const [user,setUser] = useState (null);
    const [token, setToken] =useState(null);

    useEffect(()=> {
        fetch("https://myflix-movies-2a93844126ef.herokuapp.com/movies",
        {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then ((response)=> response.json())
        .then((data) => {
            const moviesFromApi = data.map((movie) => {
                return {
                    id: movie._id,
                    imagePath: movie.imagePath,
                    title: movie.title,
                    description: movie.description,
                    director: {
                        name: movie.director.name,
                        bio: movie.director.bio,
                        birth:movie.director.birth,
                        death:movie.director.death?.[0],
                    } ,
                    genre: { 
                        name: movie.genre.name,
                        description: movie.genre.description,
                    },
                    year: movie.year,
                    featured: movie.featured
                };
            });
            setMovies(moviesFromApi);
        });
    }, [token]);

    if (!user){
        return (
            <LoginView 
                onLoggedIn={(user,token)=> {
                    setUser (user);
                    setToken(token);
                }} 
            />
        );
    }

    if (selectedMovie) {
        return (
            <>
                <button
                    onClick={() => {
                        setUser(null);
                        setToken(null);
                    }}
                >
                    Logout
                </button>
                
                <MovieView 
                    movie={selectedMovie} 
                    onBackClick={()=> setSelectedMovie(null)} 
                />
            </>
        );
    }

    if(movies.length === 0 ) {
        return <div> The list is empty! </div>;
    }
    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                key = {movie.id}
                movie = {movie}
                onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                }}
                />
            ))}
        </div>
    );
};

