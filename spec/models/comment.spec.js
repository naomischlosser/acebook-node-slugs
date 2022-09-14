var mongoose = require("mongoose");

require("../mongodb_helper");
const Comment = require("../../models/comment");

describe("Comments model", () => {
  beforeEach((done) => {
    // mongoose.connection.collections.comments.drop(() => {
    //   mongoose.connection.collections.users.drop(() => {
    //     done();
    //   });
    // });
    // fakeCallbackResponse = jest.fn()
    // mockUser = { find: (toFind, callbackFunction) => { callbackFunction(fakeCallbackResponse) }}

    // fakeCallbackResponse.mockReturnValueOnce({ MOCKED USER OBJECT });

    mongoose.connection.collections.comments.drop(() => {
      done();
    });
  });

  it("has a message", () => {
    var comment = new Comment({ message: "some message" });
    expect(comment.message).toEqual("some message");
  });

  it("can list all posts", (done) => {
    Comment.find((err, comments) => {
      expect(err).toBeNull();
      expect(comments).toEqual([]);
      done();
    });
  });

  it("can save a comment", (done) => {
    var comment = new Comment({ message: "some message" });

    comment.save((err) => {
      expect(err).toBeNull();

      Comment.find((err, comments) => {
        expect(err).toBeNull();

        expect(comments[0]).toMatchObject({ message: "some message" });
        done();
      });
    });
  });
});
