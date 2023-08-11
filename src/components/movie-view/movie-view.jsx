import { Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {Link} from "react-router-dom";
import { Favorites } from "../profile-view/favorite-movies";

export const MovieView = ({ movies, user, setUser, token, removeFav, addFav }) => {
    const { movieId } = useParams();
    const movie = movies.find((b)=> b.id === movieId);

  return (
    <Card  className="h-100">
      <Card.Img variant="top" src={movie.imagePath} />

      <Card.Body>
        <Card.Title>Title: {movie.title}</Card.Title>
        <Card.Title>Description:</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
        <Card.Title>Director: {movie.director.name}</Card.Title>
        <Card.Text> {movie.director.bio}</Card.Text>
        <Card.Text> Birth: {movie.director.birth}</Card.Text>
        <Card.Title> Genre: {movie.genre.name}</Card.Title>
        <Card.Text>{movie.genre.description}</Card.Text>
        <Card.Text>Year: {movie.year}</Card.Text>
        <Favorites 
          user={user}
          setUser={setUser}
          token={token}
          addFav={addFav}
          removeFav={removeFav}/>
        <Link to={`/`}>
            <Button
                variant="primary"
                style={{ cursor: "pointer" }}
            >
                Back
            </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};