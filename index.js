const express = require("express");
const table = require("./connection/create_table");
const knex = require("./connection/knex_connection");

const router = express.Router();

const app = express();
app.use(express.json());
app.use("/", router);

app.get("/", (req, res) => {
  knex
    .select("*")
    .from("users")
    .then((data) => {
      res.send(data);
      // res.json({
      //   message: "This username isn't available. Please try another.",
      // });
    });
});

require("./router/signUp")(router);
require("./router/logIn")(router);

app.listen(3001, () => {
  console.log("running on port 3001");
});
