// implement your API here, initial commit

const express = require('express');

const db = require('./data/db.js');
const server = express();



// middleware

server.use(express.json());




// Read - Get users

server.get('/api/users', (req, res) => {
   db.find()
   .then(allUsers => {
       res.json(allUsers)
   })
   .catch(err => {
       res.status(500).json({ error: "The users information could not be retrieved." })
   })
})



// Read - Get user by id

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params

db.findById(id)
  .then(user => {
      if(user) {
          res.json(user);
      } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
      }
  })
  .catch(err => {
              res.status(500).json({ error: "The user information could not be retrieved." })
          })
        })



// Create - Add a new user to the list
server.post('/api/users', (req, res) => {
    const newUser = req.body;
    console.log(req.body)

    if(!newUser.name || !newUser.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        db.insert(newUser)
          .then(user => {
              res.status(201).json(user)
          })
          .catch(err => {
              res.status(500).json({ error: "There was an error while saving the user to the database" })
          })
    }
})


// Delete - delete a user from the list by using id

server.delete('/api/users/:id', (req, res) => {
   const { id } = req.params;

   db.remove(id)
   .then(removedUser => {
    if(removedUser) {
        res.json(removedUser);
    } else {
      res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
})
.catch(err => {
            res.status(500).json({ error: "The user could not be removed." })
        })
      });
   











// Listening

server.listen(1234, () => {
    console.log('Listening on port 1234')
});