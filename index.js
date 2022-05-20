require("dotenv").config();
const consign = require("consign");
const cors = require("cors");
const express = require("express");
const connectDB = require("./database/db");
const routes = require("./src/routes/routes");
const TokenActiveAccount = require("./database/models/tokensActiveAccount");
const BlackListAuthTokens = require("./database/models/black_list_auth_tokens");

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const PORT = 8000;

app.listen(PORT, async () => {
  console.log("Server started in port::", PORT);
  await connectDB.sync();
});
