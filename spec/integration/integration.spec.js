const mongoose = require("mongoose");

require("../mongodb_helper");
// var Comment = require("../../models/comment");
var User = require("../../models/user");
var Post = require("../../models/post");

beforeEach(async (done) => {
  await mongoose.connection.collections.posts.drop();
  await mongoose.connection.collections.users.drop();
    // () => {
    // mongoose.connection.collections.users.drop(() => {
    //   done()
    // })
  //     mongoose.connection.collections.comments.drop(() => {
  //       done();
  //     });
  //   });
  // });
});

describe("Integration", () => {
  // beforeEach((done) => {
  //   mongoose.connection.collections.users.drop(() => {
  //     mongoose.connection.collections.posts.drop(() => {
  //       done()
  //     })
  //   //     mongoose.connection.collections.comments.drop(() => {
  //   //       done();
  //   //     });
  //   //   });
  //   });
  // });

  // beforeEach(async () => {
  //   const collections = await mongoose.connection.db.collections();
  //   for (let connection of collections) {
  //     await connection.deleteMany({});
  //   }
  // });

  // Post integration tests
  it("adds a user's ID to the post when created", (done) => {
    Post.find((err, posts) => console.log(posts))

    const user = new User({
      username: "someone",
      first_name: "some",
      last_name: "one",
      email: "someone@example.com",
      password: "password",
      friends: [],
    });

    let userId;

    // saves user to table
    user.save((err) => {
      expect(err).toBeNull();

      // finds user in table
      User.find((err, user) => {
        expect(err).toBeNull();
        userId = user[0]._id;
        // console.log(userId);
        expect(userId).toBeTruthy();

        // create post with user's id
        const post = new Post({
          message: "some message",
          user_id: user[0]._id,
        });

        // save post
        post.save((err) => {
          expect(err).toBeNull();

          // find saved post
          Post.find((err, posts) => {
            console.log(posts);
            expect(err).toBeNull();
            expect(posts[0].message).toEqual("some message");
            expect(posts[0].user_id).toEqual(userId);

            // find user using ID from saved post
            User.find({ _id: userId }, (err, user) => {
              expect(err).toBeNull();
              expect(user[0].username).toEqual("someone");
              done();
            });
          });
        });
      });
    });
  });

  xit('adds a like to the post database', (done) => {
    // creates new user
    const user = new User({
      username: "someone",
      first_name: "some",
      last_name: "one",
      email: "someone@example.com",
      password: "password",
      friends: [],
    });

    let userId;

    // saves user to table
    user.save((err) => {
      expect(err).toBeNull();

      // finds user in table
      User.find((err, user) => {
        expect(err).toBeNull();
        userId = user[0]._id;
        expect(userId).toBeTruthy();

        // create post with a like incl. user_id
        const post = new Post({
          message: "some message",
          likes: [userId],
        });

        // save post
        post.save((err) => {
          expect(err).toBeNull();

          // find saved post
          Post.find((err, posts) => {
            expect(err).toBeNull();
            expect(posts[0].message).toEqual("some message");
            expect(posts[0].likes[0]).toEqual(userId);

            // find user using ID from saved like in post
            User.find({ _id: userId }, (err, user) => {
              expect(err).toBeNull();
              expect(user[0].username).toEqual("someone");
              done();
            });
          });
        });
      });
    });
  });

  // Comment integration tests
  xit("adds a user's ID to the comment when created", (done) => {
    const user = new User({
      username: "someone",
      first_name: "some",
      last_name: "one",
      email: "someone@example.com",
      password: "password",
      friends: [],
    });

    let userId;

    // saves user to table
    user.save((err) => {
      expect(err).toBeNull();

      // finds user in table
      User.find((err, user) => {
        expect(err).toBeNull();
        userId = user[0]._id;
        expect(userId).toBeTruthy();

        // create comment with user's id
        const comment = new Comment({
          message: "some message",
          user_id: userId,
        });

        // save comment
        comment.save((err) => {
          expect(err).toBeNull();

          // find saved comment
          Comment.find((err, comments) => {
            expect(err).toBeNull();
            expect(comments[0]).toMatchObject({
              message: "some message",
              user_id: userId,
            });

            // find user using ID from saved comment
            User.find({ _id: userId }, (err, user) => {
              expect(err).toBeNull();
              expect(user[0].username).toEqual("someone");
              done();
            });
          });
        });
      });
    });
  });

  xit('adds a like to the comment database', (done) => {
    // creates new user
    const user = new User({
      username: "someone",
      first_name: "some",
      last_name: "one",
      email: "someone@example.com",
      password: "password",
      friends: [],
    });

    let userId;

    // saves user to table
    user.save((err) => {
      expect(err).toBeNull();

      // finds user in table
      User.find((err, user) => {
        expect(err).toBeNull();
        userId = user[0]._id;
        expect(userId).toBeTruthy();

        // create comment with a like incl. user_id
        const comment = new Comment({
          message: "some message",
          likes: [userId],
        });

        // save comment
        comment.save((err) => {
          expect(err).toBeNull();

          // find saved comment
          Comment.find((err, comments) => {
            expect(err).toBeNull();
            expect(comments[0].message).toEqual("some message");
            expect(comments[0].likes[0]).toEqual(userId);

            // find user using ID from saved like in comment
            User.find({ _id: userId }, (err, user) => {
              expect(err).toBeNull();
              expect(user[0].username).toEqual("someone");
              done();
            });
          });
        });
      });
    });
  });
});