// implement your API here, initial commit

const express = require('express');
const server = express();

const db = require('./data/db.js');




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
    if (db.findById(id) !== id) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else {
    db.findById(id)
      .then(user => {
          res.send(user)
      })
      .catch(err => {
          res.status(500).json({ error: "The user information could not be retrieved." })
      })
    }
})


// Create - Add a new user to the list




// middleware

server.use(express.json());



// Listening

server.listen(1234, () => {
    console.log('Listening on port 1234')
});