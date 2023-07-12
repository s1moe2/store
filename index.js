const express = require("express");
const app = express();
const { logger } = require("./middleware");

app.use(logger);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "internal error" });
});

app.get("/users", (req, res) => {
    const users = db.users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    });

    res.json(users);
    console.log(users);
  });

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});


// Endpoint to list all users
app.get('/users', (req, res) => {
    // Map user data to include only required fields
    const userList = users.map(user => ({ id: user.id, name: user.name, email: user.email }));
    
    res.json(userList); // Send the user list as JSON response
  });
  
  // Start the server
  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });