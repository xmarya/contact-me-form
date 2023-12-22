const rateLimit = require("express-rate-limit"); // wa want it to be a global md that's why we put it here in app.js .
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");

const express = require("express");
const path = require("path"); // a native built-in module, no need to install .
const app = express();

const Email = require("./controller/email");

// defining the template (view) engine and its path:
app.set("view engine", "pug");
// app.set("views", `${__dirname}/views`);
app.set("views", path.join(__dirname, "views"));

// SECURITY MDs //

// this fun will be called and returns a md to be used here instead of her .
app.use(helmet({ contentSecurityPolicy: false })); // setting securty hp header .
/*
  any md shouldn't ba called inside app.use(),
  but here helmet is an exception that's why it has the calling brackets .
*/

const limiter = rateLimit({
  max: 60, // #requests per hour.
  windowMs: 60 * 60 * 100, // the calculation of 1 hour.
  message: "We've got too many requests from this IP, Try again after 1 hour",
});

app.use("/", limiter); // to affect all of the routes that starts with /api .


app.use(cors()); // is going to return a md to set different headers to our response.
// which allow other requests no matter where they came from to access the whole api resources.
// we also can just specify one route to be accessible like this:
// app.use("/api/v1/users", cors(), userRouter).
// BUT this is just the first step of implementing cors
// here we just allowd the simple requests (GET and POST)
// so we have to implement it for the non-simple requests (PUT, PATCH, DELETE, requests that send cookies and requests that uses non-standard headers).
// NSRs require a so-called preflight phase, which issues by the browser automatically.
// let's say we have a DELETE request, before this request actually happens
// the browser does an OPTION request in order to figure out whether the DELETE request is safe to send or not,
// so as developers we need to respond to that OPTION request .
app.options("*", cors()); // OPTION is another HTTP method like GET, POST.. etc.
// and here we applied it to all of our routes .

/* 
  For Data sanitisation, after the previous md reads the data we want to clean it
  in oreder to prevent 2 types of attacks, which they are:
  1) NoSQL query injuction.
  2) XSS
*/
app.use(mongoSanitize()); // this fun will be called and returns a md to be used here instead of her .

app.use(express.json({ limit: "10kb" }));
app.use(express.static(path.join(__dirname, "public")));
// app.use("/css", express.static(path.join(__dirname, "public/css")));

//defining the route for rendering the pages on the browser
app.get("/", (request, response) => {
  // get is the HTTP method that always used for this role.
  response.status(200).render("form");
});

app.post("/sendEmail", async (request, response) => {
  await new Email(
    request.body.clientEmail,
    request.body.projectDetail
  ).sendThanks();

  response.status(201).json({
    status: "success",
    data: request.body,
  });
});

module.exports = app;
