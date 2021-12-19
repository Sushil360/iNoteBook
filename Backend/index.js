const connectToMongoDb = require('./database');
const express = require('express');
connectToMongoDb();

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//Availlable Routes
app.use('/api/authorization', require('./Routes/authorization'));
app.use('/api/notes', require('./Routes/notes'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})