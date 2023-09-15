const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

// // route setting
// app.get("/", (req, res) => {
//   // response with plain text
//   // res.status(200).send("Hello from the server side! test!");
//
//   // response with json format
//   // use .json method -> automatically set Content-Type: application/json
//   res
//     .status(200)
//     .json({ message: "Hello from the server side! test!", app: "Natours" });
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`),
);

app.get("/api/v1/", (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.post("/api/v1/", (req, res) => {
  const lastId = tours[tours.length - 1].id;
  const newId = lastId + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tours: newTour,
        },
      });
    },
  );
});

// server basic setting
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
