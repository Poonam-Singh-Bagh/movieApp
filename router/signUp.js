const knex = require("../connection/knex_connection");

module.exports = (Router) => {
  Router.post("/signup", (req, res) => {
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
              flag = false;
              break;
            } else {
              flag = true;
            }
          }

          if (flag) {
            knex("users")
              .insert(user)
              .then((data) => {
                res.status(200);
                res.json({ message: "Account created successfully" });
              })
              .catch((err) => {
                console.log("err", err);
                res.status(err.status || 500).send({
                  success: false,
                  message: err.message || "Internal Server Error",
                });
              });
          } else {
            console.log("not working");
            res.status(403);
            res.json({
              message: "This username isn't available. Please try another.",
            });
          }
        });
    } catch (err) {
      console.log("err", err);
    }
  });
};
