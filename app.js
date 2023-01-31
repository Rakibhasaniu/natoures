const express = require('express');
const port = 3000;

const app = express();

app.get('/', (req, res) => {
  res.send('Hello from the server side!');
});

app.listen(port, () => {
  console.log(`App running on port $(port)....`);
});