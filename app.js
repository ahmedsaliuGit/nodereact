const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const dotenv = require("dotenv");
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log("DB connected."));

mongoose.connection.on("error", error =>
  console.log(`Database connection failed: ${error.message}`)
);

const postRoutes = require("./routes/post");

// const myOwnMiddleware = (req, res, next) => {
//   console.log("Middleware Applied!!!");
//   next();
// };

app.use(morgan("dev"));
// app.use(myOwnMiddleware);
app.use(bodyParser.json());
app.use(expressValidator());
app.use("/", postRoutes);

const port = process.env.PORT || 8081;
app.listen(port, () =>
  console.log(`Node Server running & listening on port:::${port}`)
);
