const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
// const MongoDBStore = require("connect-mongodb-session")(session);

const methodOverride = require("method-override");

const homeRouter = require("./routes/home");
const postsRouter = require("./routes/posts");
const sessionsRouter = require("./routes/sessions");
const usersRouter = require("./routes/users");
const friendsRouter = require("./routes/friends");
const profilesRouter = require("./routes/profiles");
const adminRouter = require("./routes/admin");

const app = express();

// var store = new MongoDBStore({
// 	uri: "mongodb://0.0.0.0/acebook",
// 	collection: "mySessions",
// });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

// // new connect-mongodb-session
// app.use(
// 	session({
// 		key: user_sid,
// 		secret: process.env.SECRET,
// 		resave: false,
// 		saveUninitialized: false,
// 		store: new MongoStore({ mongooseConnection: mongoose.connection }),
// 	})
// );

// app.use(
// 	require("express-session")({
// 		key: "user_sid",
// 		secret: "super_secret",
// 		cookie: {
// 			maxAge: 1000 * 60 * 60 * 2,
// 		},
// 		store: store,
// 		resave: true,
// 		saveUninitialized: true,
// 	})
// );

// original
app.use(
	session({
		key: "user_sid",
		secret: "super_secret",
		resave: false,
		saveUninitialized: false,
		cookie: {
			expires: 600000,
		},
	})
);

// clear the cookies after user logs out
app.use((req, res, next) => {
	if (req.cookies.user_sid && !req.session.user) {
		res.clearCookie("user_sid");
	}
	next();
});

// middleware function to check for logged-in users
const sessionChecker = (req, res, next) => {
	if (!req.session.user && !req.cookies.user_sid) {
		res.redirect("/");
	} else {
		next();
	}
};

// route setup
app.use("/", homeRouter);
app.use("/posts", sessionChecker, postsRouter);
app.use("/sessions", sessionsRouter);
app.use("/users", usersRouter);
app.use("/friends", friendsRouter);
app.use("/profiles", profilesRouter);
app.use("/admin", adminRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// // Catch errors
// store.on("error", function (error) {
// 	console.log(error);
// });

// error handler
app.use((err, req, res) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

// // from connect-mongodb-session
// app.get("/", function (req, res) {
// 	res.send("Hello " + JSON.stringify(req.session));
// });

// server = app.listen(8080);

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
	console.log(`helloworld: listening on port ${port}`);
});

module.exports = app;
