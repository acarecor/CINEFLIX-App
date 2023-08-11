
export const handleDeleteUser = (e) => {
    (event) => {
      event.preventDefault();
  
  
      fetch("https://myflix-movies-2a93844126ef.herokuapp.com/users/${user.username}", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data),
      }).then((response) => {
        if (response.ok) {
          alert("User deleted!");
          onLoggedOut();
        } else {
          alert("Something is wrong");
        }
      });
    };
  };
