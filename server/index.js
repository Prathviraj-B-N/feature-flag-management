const express = require("express");
const cors = require("cors");

const { OpenFeature } = require("@openfeature/server-sdk");
const { FlagdProvider } = require("@openfeature/flagd-provider");

OpenFeature.setProvider(new FlagdProvider());
const client = OpenFeature.getClient();

const app = express();
const port = 5003;

app.use(cors());

app.get("/api/comp1", async (_, res) => {
  const client = OpenFeature.getClient();

  const context = {
    company: "initech",
  };

  const bgColor = await client.getStringDetails("background-color",{}, context);

  // console.log(bgColor);

  const c1flag = await client.getBooleanValue("comp1", false);
  if (c1flag) res.json({ msg: "comp1" });
  else res.json({ msg: "component1 unavailable for you" });
});

app.get("/api/comp2", async (_, res) => {
  const client = OpenFeature.getClient();
  const c1flag = await client.getBooleanValue("comp2", false);
  
  const context = {
    email: "prathviraj@gmail.com"
  };

  const access = await client.getBooleanDetails("enable-email-access",{}, context);
  console.log(access);


  if (c1flag) res.json({ msg: "comp2" });
  else res.json({ msg: "component2 unavailable for you" });
});

app.get("/api/comp3", async (_, res) => {
  res.json({ msg: "comp3" });
});

app.get("/", async (_, res) => {
  const showWelcomeMessage = await client.getBooleanValue(
    "welcome-message",
    false
  );
  if (showWelcomeMessage) {
    res.send("Express + TypeScript + OpenFeature Server");
  } else {
    res.send("Express + TypeScript Server");
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
