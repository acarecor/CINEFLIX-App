import { Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";


export  const addToFavorites = ({ user, token, favoritesMovies, movies }) => {
    const handleClick = (event) => {
      event.preventDefault();
      if (user.favoritesMovies.includes(movie._id)) {
        fetch(
          "https://myflix-movies-2a93844126ef.herokuapp.com/users/${user.username}/movies/${movies._id}",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
          }
        )
          .then((response) => response.json())
          .then((response) => {
            alert("movie was deleted from your list!");
            window.location.reload();
          })
          .catch((error) => {
            alert("Something is wrong");
          });
      } else {
        fetch(
          "https://myflix-movies-2a93844126ef.herokuapp.com/users/${user.username}/movies/${movie._id}",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
          }
        ).then((response) => response.json());
        if (response.ok) {
          alert("movie was added to your list!");
          window.location.reload();
        } else {
          alert("Something is wrong");
        }
      }
    };
  

  return (
    <Col>
      {favoritesMovies.includes(movies._id) ?(
            <Button variant="secondary" onClick={handleClick} >
              Remove from List
            </Button>
      ):(
            <Button variant="secondary" onClick={handleClick}>
              Add to List
            </Button>
          
        )}
    </Col>
  );
};
