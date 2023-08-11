import { useState, useEffect } from "react";
import { Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";


export  const Favorites = ({ user, token, setUser, movies}) => {
  const [ fav, setFav ] = useState(false);
  
  useEffect(()=> {
    const addFavorite = user.favoritesMovies.includes(movieId)
    setFav (addFavorite)
  }, [])

  const removeFav = () => {
        fetch(
          "https://myflix-movies-2a93844126ef.herokuapp.com/users/${user.username}/movies/${movies._id}",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
        })
          .then((response) => response.json())
          .then((data) => {
            setFav(false);
            localStorage.setItem("user", JSON.stringify(data));
            setUser(data);
            alert("movie was deleted from your list!");
          })
          .catch((error) => {
            alert("Something is wrong");
          });
      };
  const addFav= ()=> {
        fetch(
          "https://myflix-movies-2a93844126ef.herokuapp.com/users/${user.username}/movies/${movie._id}",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        ).then((response) => response.json())
        .then((data) => {
          setFav(true);
          localStorage.setItem("user", JSON.stringify(data));
          setUser(data);
          alert("movie was added to your list!");
        })
        .catch((error) => {
            alert("Something is wrong");
          });
        
    };
  

  return (
    <Col>
      {fav ? (
            <Button variant="secondary" onClick={removeFav} >
              Remove from List
            </Button>
      ):(
            <Button variant="secondary" onClick={addFav}>
              Add to List
            </Button>
          
        )}
    </Col>
  );
};
