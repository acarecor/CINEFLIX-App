import PropTypes  from "prop-types";
import React from "react";
import { useState, useEffect } from "react";
import { Button, Card, Container, Form, Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";


export const ProfileView = ({ user, setUser, token, movies, onLoggedOut}) => {
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(user.birthday);
  

  const favoriteMoviesList = movies.filter((movie) => {
    return user.favoritesMovies.includes(movie._id)
  });

  useEffect(() => {
    console.log(user)
  }, [user] )

//Update a user account 
  const handleUpdate = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
      email: email,
      birthday: birthday,
    };

    fetch(
      "https://myflix-movies-2a93844126ef.herokuapp.com/users/${user.username}",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${"token"}`,
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => {
        if (response.ok) {
          alert("User information succesfully changed!");
          window.location.reload();
        } else {
          alert("Something is wrong");
        }
      })
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
      });
  };
//Delete a user account function 
  const handleDeleteUser = () => {
    
      fetch(
        "https://myflix-movies-2a93844126ef.herokuapp.com/users/${user.username}",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((response) => {
        if (response.ok) {
          alert("User deleted!");
          onLoggedOut();
        } else {
          alert("Something is wrong");
        }
      });
    };
  

  return (
    <Container>
      <Row>
      <h2>Profile</h2>
        <Col>
          <div>Hey {user.username}!</div>
          <div> Email: {user.email}</div>
        </Col>
      </Row>
      <Row>
        <h2>Favorites Movies</h2>
        {favoriteMoviesList.map((movie) => (
          <Col key={movie._id}>
            <MovieCard movie={movie}
            ></MovieCard>
          </Col>
        ))}
      </Row>
      <Form className="profile-form" onSubmit={(e) => handleUpdate(e)}>
        <h2>Want to change some Info?</h2>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            name="Username"
            defaultValue={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text"
            password="password"
            defaultValue={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            email="email"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            type="date"
            birthday="birthday"
            defaultValue={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Button variant="primary" onClick={handleDeleteUser}>Delete User</Button>
    </Container>
  );
};

ProfileView.propTypes = {
  user: PropTypes.object,
  setUser:PropTypes.func,
  movies: PropTypes.array,
  onLoggedOut:PropTypes.func,
  user:PropTypes.shape({
    favoritesMovies: PropTypes.array}),

};