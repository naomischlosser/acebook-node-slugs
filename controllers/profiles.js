const User = require("../models/user");

const ProfilePage = {
  Index: (req, res) => {
    const profileUsername = req.params.username;
    console.log(profileUsername + " profile has been loaded");

    // find user model belonging to profile
    User.findOne({ username: profileUsername })
      .populate("friends")
      .exec((err, user) => {
        if (err) {
          // do something if there's an error
          console.log("ProfilePage.index error with User.findOne");
          console.log(err);
        } else {
          const friendsListWithUsernames = user.friends.map(
            (friend) => friend.username
          );
          res.render("profiles/index", {
            profileUsername: profileUsername,
            friends: friendsListWithUsernames,
            fetchUrl: "/friends/requests/new/" + profileUsername,
          });
        }
      });
  },
};

module.exports = ProfilePage;
