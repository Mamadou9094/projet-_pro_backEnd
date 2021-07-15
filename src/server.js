const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(morgan("combined"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/", cors(), router);
app.all("*", (req, res) => {
  res.status(404).send({ message: "endpoint not found" });
});

app.listen(8000, () => {
  console.log("bienvenue a mon server");
});
