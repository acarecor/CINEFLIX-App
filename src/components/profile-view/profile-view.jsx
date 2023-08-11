import React from "react";
import { useState } from "react";
import { Button, Card, Container, Form, Label } from "react-bootstrap";
import { FavoriteMovies } from "./favorite-movies";


export const ProfileView = ({user, token}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  
    //function to get favorites Movies 
   
    //const getUser= () => {

    //}
   
    
    const handleUpdate = (event) => {
          event.preventDefault();
      
          const updateData = {
            username: username,
            password: password,
            email: email,
            birthday: birthday,
          };
  
          fetch("https://myflix-movies-2a93844126ef.herokuapp.com/users/${user.username}", {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${("token")}`
              },
              body: JSON.stringify(updateData),
            }).then((response) => {
              if (response.ok) {
                alert("User information succesfully changed!");
                window.location.reload();
              } else {
                alert("Something is wrong");
              }})
              .catch((error) => 
                console.log(error))
               
            };
         
  

   


    //return (
      //<Container>
        //<UserInfo name={user.username} email={user.email} />
        //<FavoriteMovies />
        //<UpdateUser />
      //</Container>
    //);

    
    return (
    <Container>
      <Form className="profile-form" onSubmit={(e)=> handleUpdate(e)}>
          <h2>Want to change some Info?</h2>
          <Form.Group>
            <Form.Label>Username:</Form.Label>
            <Form.Control
                type="text"
                name="Username"
                defaultValue={username}
                onChange={e =>setUsername(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control 
                type="text"
                password="password"
                defaultValue={password}
                onChange={e => setPassword(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
                type="text"
                email="email"
                defaultValue={email}
                onChange={e => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group>
          <Form.Label>Birthday</Form.Label>
          <Form.Control
              type="date"
              birthday="birthday"
              defaultValue={birthday}
              onChange={e => setBirthday(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
        </Button>
      </Form>
    </Container>
    );
      
};






//const getUser = () => {
 // 
  //fetch("https://myflix-movies-2a93844126ef.herokuapp.com/users/${user.username}", {
   // method: "GET",
    //headers: { 
      //  "Content-Type":" application/json",
        //Authorization: `Bearer ${token}` },
    //body: JSON.stringify(user),
  //}).then((response) => response.json())
    //.then ((data) => {
      //const favoritesMovies = movies.filter((movie) => user.favoritesMovies.includes(m._id))
      //setFavoritesMovies(movies);
    //})
    //.catch((error) => 
      //  console.log(error))
      //};
    
      //useEffect(() => {
        //getFavoritesMovies();
      //}, [user,favoritesMovies]);




