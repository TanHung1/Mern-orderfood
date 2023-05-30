const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
var methodOverride = require('method-override')
const app = express();
const route = require('./routes');
const db = require('./config/db');
const cors = require('cors');

//Connect to DB
db.connect();

const port = 5000;
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'))

// route init
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});