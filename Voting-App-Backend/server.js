const express = require("express");
const app = express();
const db = require("./db");

const { jwtAuthMiddleaware } = require("./jwt");

require("dotenv").config();

const cors = require("cors");

const corsOptions = {
  origin: true,
  methods: "GET, POST, DELETE, PATCH, PUT, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));

const bodyparser = require("body-parser");
const passport = require("./auth");
app.use(bodyparser.json());

const PORT = 3000 || process.env.PORT;
app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate("local", { session: false });

const userRoutes = require("./Routes/userRoutes");
const candidateRoutes = require("./Routes/candidateRoutes");

app.use("/user", userRoutes);
app.use("/candidate", candidateRoutes);

app.get("/", (req, res) => {
  res.json({ Message: "VOTING APP" });
});

app.listen(PORT, () => {
  console.log("Listening on PORT:", PORT);
});
