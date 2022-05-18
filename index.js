require("dotenv").config();
const consign = require("consign");
const cors = require("cors");
const express = require("express");
const connectDB = require("./database/db");
const routes = require("./src/routes/routes");
const User = require("./database/models/user");
const Frag = require("./database/models/frag_user");
const Pix = require("./database/models/pix_user");
const Winners = require("./database/models/winners");
const IdsGroupsVinte = require("./database/models/ids_groups_20");
const IdsGroupsCinquenta = require("./database/models/ids_groups_50");
const IdsGroupsCem = require("./database/models/ids_groups_100");
const IdsGroupsQuinhentos = require("./database/models/ids_groups_500");
const GroupVinte = require("./database/models/group_20");
const GroupCinquenta = require("./database/models/group_50");
const GroupCem = require("./database/models/group_100");
const GroupQuinhentos = require("./database/models/group_500");
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
