const express = require('express');
const static = express.static(__dirname + '/public');
const app = express();
const configRoutes = require('./routes');
const exhbs = require('express-handlebars');

app.use("/public", static);
app.engine('hbs', exhbs({defaultlayout:'main', extname: ".hbs"}));
app.set('view engine', 'hbs');

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});