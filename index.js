require("dotenv").config();
const express = require("express");
const massive = require("massive");
const {
  create,
  getOne,
  update,
  deleted,
  getAll
} = require("./products_controller");
const app = express();

const { SERVER_PORT, CONNECTION_STRING } = process.env;

massive(CONNECTION_STRING)
  .then(dbInstance => {
    console.log("database connected");
    app.set("db", dbInstance);
  })
  .catch(err => console.log(err));

app.use(express.json());
const url = "/api/products";
app.post(url, create);
app.get(url, getAll);
app.get(url + "/:id", getOne);
app.put("/api/products/:id", update);
app.delete("/api/products/:id", deleted);

const server = app.listen(SERVER_PORT, () =>
  console.log(`listening on ${server.address().port}`)
);
