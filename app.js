const express = require("express");
const fs = require("fs");

const app = express();

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
  fs.readFileSync(`${__dirname}/dev-data/data/tours.json`),
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

// server basic setting
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
