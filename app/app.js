require("dotenv").config();
const express = require("express");

const { notFoundHandler, errorHandler } = require("../errors/server.error");
const middleware = require("../middleware/middleware");
const status = require("../routes/health");
const app = express();

//middleware
app.use(middleware);
// routes middleware
app.use(status);
//errors
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
