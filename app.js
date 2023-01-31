const express = require('express');
const fs = require('fs');
const port = 3000;

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res
    .status(200)
    .json({ Message: 'Hello from the server side!', App: 'Natours' });
});

// app.post('/', (req, res) => {
//   res.send('You Can Post To This Endpoint');
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  //   console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
  //   res.send('Done');
});

app.listen(port, () => {
  console.log(`App running on port $(port)....`);
});
