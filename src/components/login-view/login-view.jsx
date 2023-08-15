import { useState } from "react";
import { Button, Form, Container, Row, Col} from "react-bootstrap";
import { Link } from "react-router-dom";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
    };

    fetch("https://myflix-movies-2a93844126ef.herokuapp.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };

  return (
    <Container className="mt-5">
      
      <Form onSubmit={handleSubmit}>
        
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            minLength="5"
            required
            placeholder="Enter your Username"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </Form.Group>
        <Row >
          <Col className="d-flex justify-content-center">
          <Button  variant="primary" type="submit">
            Submit
          </Button>
          </Col>
        </Row>
      </Form>
      <p className="d-flex justify-content-center"> or </p>
      <Link className="d-flex justify-content-center" as={Link} to="/signup">
        <Button variant="primary">You don't have an account? Create one</Button>
      </Link>
    </Container>
  );
};
