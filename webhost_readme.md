General explanation:

The main instruction to the webhosting service for what to run are in package.json

In there, you specify "main": "app.js",
And you have to change "start" [telling the webhosting service what file to run when it boots everything up] from the current "start": "nodemon ./bin/www", which is for local development, to "start": "node app.js", so it runs app.js.

Then in app.js you have to add the port

youtube walkthrough if desired
https://www.youtube.com/watch?v=HgpCjChgjoQ&t=350s

get the gcloud sdk
https://cloud.google.com/sdk/docs/install

config
https://cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-nodejs-service

app.yaml file
https://cloud.google.com/appengine/docs/standard/nodejs/config/appref

$ nvm install 16
$ nvm use 16

layout.hbs

<meta name="google-site-verification" content="5_9yO4V7MqcLuKWksbKBWstpQ5Oy90pzNNF3gd1Vu6E" />

## https://slugs-acebook.ew.r.appspot.com

accessed via
$ gcloud app browse
back4app
"nodemon ./bin/www"
//
