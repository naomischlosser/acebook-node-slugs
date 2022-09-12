// const parse = require("parse/node");
// const express = require("express");
// const app = express();

// // app id: ogAgJ7PPdut5pwLv85O5mSx4uikPFbn9Kpp2dk21
// // javascript id: crKiG4oslo6S15cKqq4fjnTp0DbFj5bn5IoUiKhY

// Parse.initialize(
// 	ogAgJ7PPdut5pwLv85O5mSx4uikPFbn9Kpp2dk21,
// 	crKiG4oslo6S15cKqq4fjnTp0DbFj5bn5IoUiKhY
// );
// Parse.serverURL = "https://parseapi.back4app.com/";
// const Acebook = Parse.Object.extend("Acebook");
// const acebook = new Acebook();
// const acebookQuery = new Parse.Query(Acebook);

// app.get("/", (req, res) => {
// 	acebookQuery
// 		.find()
// 		.then((obj) => res.json(obj))
// 		.catch((err) => res.json(err));
// });

// const port = parseInt(process.env.PORT) || 8080;
// app.listen(port, () => {
// 	console.log(`helloworld: listening on port ${port}`);
// });
