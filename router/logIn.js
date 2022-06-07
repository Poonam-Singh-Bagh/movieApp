const knex = require("../connection/knex_connection");

module.exports = (Router) => {
  Router.post("/login", (req, res) => {
    try {
      knex
        .select("*")
        .from("users")
        .then((data) => {
          const user = {
            number: req.body.number,
          };

          let flag = true;
          for (i of data) {
            if (user.number == i.number) {
              flag = true;
              break;
            } else {
              flag = false;
            }
          }

          if (flag) {
            res.status(200);
            res.json({ message: "You have logged in successfully!" });
          } else {
            res.status(403);
            res.json({
              message: "User doesn't match! Please try another number.",
            });
          }
        });
    } catch (err) {
      console.log("err", err);
    }
  });
};
