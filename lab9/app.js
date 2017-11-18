const express = require('express');
const static = express.static(__dirname + '/public');
const app = express();
const configRoutes = require('./routes');
const exhbs = require('express-handlebars');
const passport = require("passport");
const flash = require("connect-flash");
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const Handlebars = require('handlebars');

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
    // If the user posts to the server with a property called _method, rewrite the request's method
    // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
    // rewritten in this middleware to a PUT route
    if (req.body && req.body._method) {
        req.method = req.body._method;
        delete req.body._method;
    }

    // let the next middleware run:
    next();
};

app.use("/public", static);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(rewriteUnsupportedBrowserMethods);
app.use(cookieParser());
app.use(session({secret:"somekeu", resave:true, saveUninitialized:true}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session()); 
app.engine('hbs', exhbs({defaultlayout:'login', extname: ".hbs"}));
app.set('view engine', 'hbs');

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});