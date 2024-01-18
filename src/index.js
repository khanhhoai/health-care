var path = require("path");
var methodOverride = require('method-override')
const express = require("express");
var morgan = require("morgan");
const handlebars = require("express-handlebars");
const session = require('express-session');
const app = express();
const port = 3000;
const route = require('./routes');
const db = require('./config/db');
const MongoDBStore = require('connect-mongodb-session')(session);


//Connect to Db
db.connect();

app.use(express.static(path.join(__dirname, "public")));

//http logger
// app.use(morgan('combined'))

// Create a MongoDB session store
const store = new MongoDBStore({
  uri: 'mongodb://127.0.0.1:27017/doctor', 
  collection: 'sessions', // Name of the collection to store sessions
});
store.on('error', (error) => {
  console.error('MongoDB Session Store Error:', error);
});


// Session middleware
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
    maxAge: 60 * 60 * 1000, // 1 hour (in milliseconds)
    }
  })
);


app.use((req, res, next) => {
  res.locals.user = req.session.user || null; // Pass user's data to the templates or null if not logged in
  next();
});

// Middleware to check if the user is logged in
const checkLoggedIn = (req, res, next) => {
  if (req.session.isAuthenticated) {

    res.locals.isLoggedIn = true;
    // req.session.users = users; // Store user's data in the session
    next();

  } else {
    res.locals.isLoggedIn = false;
    next();
  }
};

// Apply the middleware to all routes that render pages with the navbar
app.use(checkLoggedIn);

// Middleware to check if the user is admin
const isAdminMiddleware = (req, res, next) =>{
  if (req.session.user && req.session.user.role === 'admin') {
    res.locals.isAdmin = true;
    next();
  } else {
    res.locals.isAdmin = false;
  next();
  }
};

app.use(isAdminMiddleware);


//template engine
app.engine("hbs", 
    handlebars.engine({ extname: ".hbs",
    helpers:{
      sum: (a,b) => a + b,
    }
  }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));


app.use(
  express.urlencoded({
      extended: true,
  }),
);
app.use(methodOverride('_method'))
app.use(express.json());

//route init
route(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 