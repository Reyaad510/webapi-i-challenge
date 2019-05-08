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









// Listening

server.listen(1234, () => {
    console.log('Listening on port 1234')
});