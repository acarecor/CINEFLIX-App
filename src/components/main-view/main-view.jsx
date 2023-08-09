import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  //const storedUser = JSON.parse(localStorage.getItem("user"));
  //const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [movies, setMovies] = useState([]);
  //const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://myflix-movies-2a93844126ef.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
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
              birth: movie.director.birth,
              death: movie.director.death?.[0],
            },
            genre: {
              name: movie.genre.name,
              description: movie.genre.description,
            },
            year: movie.year,
            featured: movie.featured,
          };
        });
        setMovies(moviesFromApi);
      });
  }, [token]);

  //added grid to the main view
  //refactor the code: adding routes

  return (
    <BrowserRouter>
      <Row className="justify-content-md-center">
        <Routes>
            <Route
                path="/signup"
                element={
                    <>
                        {user ? (
                            <Navigate to="/" />
                        ) : (
                            <Col md={5}>
                                <SignupView />
                            </Col>
                        )}
                    </>
                }
            />
            <Route
                path="/login"
                element={
                    <>
                        {user ? (
                            <Navigate to="/" />
                        ) : (
                            <Col md={5}>
                                <LoginView 
                                    onLoggedIn={(user, token) => {
                                        setUser(user); 
                                        setToken(token); 
                                    }} 
                                />
                            </Col>
                        )}
                    </>
                }
            />
            <Route
                path="/movies/:movieId"
                element={
                    <>
                        {!user ? (
                            <Navigate to="/login" replace />
                        ): movies.length === 0 ? (
                            <Col> The list is empty!</Col>
                        ): (
                            <Col md={8}>
                                <MovieView movies={movies} />
                            </Col>
                        )}
                    </>
                }
            />
            <Route
                path="/"
                element={
                    <>
                        {!user ? (
                            <Navigate to="/login" replace />
                        ): movies.length === 0 ? (
                            <Col> The list is empty!</Col>
                        ): (
                            <>
                              {movies.map((movie) => (
                                <Col className="mb-5" key={movie.id} md={3}>
                                 <MovieCard movie={movie}/>
                                </Col>
                              ))}
                            </>
                        )}
                    </>
                }
            />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

//          {!user ? (
          //<Col md={5}>
            //<LoginView
              //onLoggedIn={(user, token) => {
               // setUser(user);
               // setToken(token);
              //}}
            ///>
            //<SignupView />
          //</Col>
        //) : selectedMovie ? (
          //<Col md={8}>
            //<Button
              //variant="link"
              //onClick={() => {
               // setUser(null);
               // setToken(null);
               // localStorage.clear();
              //}}
           // >
            //  Logout
           // </Button>

            //<MovieView
             // movie={selectedMovie}
             // onBackClick={() => setSelectedMovie(null)}
            ///>
         // </Col>
        //) : movies.length === 0 ? (
         // <div>The list is empty!</div>
        //) : (
          //<>
           // <Button
              //variant="link"
             // onClick={() => {
               // setUser(null);
               // setToken(null);
              //  localStorage.clear();
             // }}
           // >
            //  Logout
            //</Button>
           // {movies.map((movie) => (
            //  <Col className="mb-5" key={movie.id} md={3}>
              //  <MovieCard
                //  movie={movie}
                 // onMovieClick={(newSelectedMovie) => {
                 //   setSelectedMovie(newSelectedMovie);
                 // }}
                ///>
             // </Col>
           // ))}
        //  </>