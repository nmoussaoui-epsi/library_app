const express = require("express");
const cors = require("cors");
const app = express();
const userRoutes = require("./routes/userRoutes");
const resourceRoutes = require('./routes/resourceRoutes');

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use('/api/resources', resourceRoutes);

module.exports = app;