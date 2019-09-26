const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');

const saltRounds = 10 // increase this if you want more iterations
const userPassword = 'supersecretpassword'
const randomPassword = 'fakepassword'

const storeUserPassword = (password, salt) =>
  bcrypt.hash(password, salt).then(storeHashInDatabase)

const storeHashInDatabase = (hash) => {
   // Store the hash in your password DB
   return hash // For now we are returning the hash for testing at the bottom
}
/*
// Returns true if user password is correct, returns false otherwise
const checkUserPassword = (enteredPassword, storedPasswordHash) =>
  bcrypt.compare(enteredPassword, storedPasswordHash)


// This is for demonstration purposes only.
storeUserPassword(userPassword, saltRounds)
  .then(hash =>
    // change param userPassword to randomPassword to get false
    checkUserPassword(userPassword, hash)
  )
  .then(console.log)
  .catch(console.error)
*/



const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
  users: [
      {
        id: '123',
        name: 'John',
        password: 'cookies',
        email: 'john@gmail.com',
        entries: 0,
        joined: new Date()
      },
      {
        id: '124',
        name: 'Sally',
        password: 'bananas',
        email: 'sally@gmail.com',
        entries: 0,
        joined: new Date()
      }
  ]
}

app.get('/', (req, res) => {
  res.send(database.users);
})

app.post('/signin', (req, res) => {
  if (req.body.email === database.users[0].email &&
      req.body.password === database.users[0].password) {
    res.json(database.users[0]);
  } else {
    res.status(400).json('error logging in');
  }
})

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  //storeUserPassword(password, saltRounds)
  //  .then(hash =>
      // change param userPassword to randomPassword to get false
  //    console.log(hash)
      //checkUserPassword(userPassword, hash)
  //  )
  //  .then(console.log)
  //  .catch(console.error);
  database.users.push({
    id: '125',
    name: name,
    email: email,
    entries: 0,
    joined: new Date()
  })
  res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  })
  if (!found) {
    res.status(400).json('not found');
  }
})

app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  })
  if (!found) {
    res.status(400).json('not found');
  }
})

app.listen(3000, ()=>{
  console.log('app is running on port 3000');
})

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user


*/