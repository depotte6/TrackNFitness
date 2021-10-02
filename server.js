const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const apiRoutes = require("./routes/api-routes");
const htmlRoutes = require("./routes/html-routes");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitness", {
  useNewUrlParser: true,
  useFindAndModify: false
});

app.use(apiRoutes);
app.use(htmlRoutes);


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
