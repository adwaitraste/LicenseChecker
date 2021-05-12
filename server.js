const express = require('express')
const mongoose = require('mongoose');
const users = require('./routes/users');
var bodyParser = require('body-parser');
const app = express()
const port = 3000

mongoose.connect('mongodb+srv://admin:admin@cluster0.rgobs.mongodb.net/Engenext?retryWrites=true&w=majority')
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));


// middleware
app.use(express.json());
app.use(express.urlencoded());

app.use('/api/users', users);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})