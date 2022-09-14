const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

  Create: (req, res) => {
    const user = new User(req.body);

    User.find(
      { $or: [{ username: req.body.username }, { email: req.body.email }] },
      (err, result) => {
        if (err) {
          throw err;
        } else if (result.length) {
          let userNameExists = false;
          let emailExists = false;
          if (result.filter((user) => user.username).length)
            userNameExists = true;
          if (result.filter((user) => user.email).length) emailExists = true;
          res.send(
            JSON.stringify({
              usernameExists: usernameExists,
              emailExists: emailExists,
            })
          );
        } else {
          user.save((err) => {
            if (err) {
              throw err;
            }
            res.status(201).redirect("/posts");
          });
        }
      }
    );
  },
};

module.exports = UsersController;
