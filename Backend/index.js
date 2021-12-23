const connectToMongoDb = require('./database');
const express = require('express');
var cors = require('cors')

connectToMongoDb();

const app = express()
const port = 5000;

app.use(cors())


app.use(express.json());

//Availlable Routes
app.use('/api/authorization', require('./Routes/authorization'));
app.use('/api/notes', require('./Routes/notes'));

app.listen(port, () => {
  console.log(`iNotebook Backend listening at http://localhost:${port}`)
})