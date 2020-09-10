const express = require('express');
const mongoose =  require('mongoose');
const  { MONGOURI } = require('./keys');
const app = express();
const PORT = 5000;

// connections to mongodb
mongoose.connect(MONGOURI,  { useNewUrlParser: true });
mongoose.set('useCreateIndex', true)

mongoose.connection.on('connected', () => {
  console.log('connected to mongodb');
})

mongoose.connection.on('error', (error) => {
  console.log(error);
})

// models import
require('./models/post');
require('./models/category');
require('./models/comment');


app.use(express.json());

app.use(require('./routes/post'));
app.use(require('./routes/category'));
app.use(require('./routes/comment'));



app.listen(PORT, () => {
  console.log('server is started at '+ PORT);
})