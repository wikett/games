require("dotenv").config();
const tmi = require("tmi.js");
const httpServer = require("http").createServer();
const options = {
  cors: {
    origin: ["http://localhost:8080"],
    credentials: false,
  },
};
const io = require("socket.io")(httpServer, options);
const tmiClient = new tmi.Client({
  options: { debug: false },
  connection: {
    secure: true,
    reconnect: true,
  },
  identity: {
    username: "wikettt",
    password: process.env.TWITCH_OAUTH_TOKEN,
  },
  channels: ["wikettt"],
});
const { MongoClient } = require("mongodb");
let currentStep = 0;
let totalVotes = [];
let sentVotes = false;
let currentMovie = "";

async function main() {
  const uri =
    "mongodb+srv://" +
    process.env.MONGO_USER +
    ":" +
    process.env.MONGO_PASSWORD +
    "@cluster0.5yuy9.mongodb.net";
  console.log(`uri: ${uri}`);
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    const db = client.db("democratic_games");

    // const pointObj = {
    //   user: "fredy",
    //   channel: "twitch",
    //   game: 1,
    //   category: 3,
    //   createdAt: new Date(),
    //   points: 10,
    // };
    // const resultInsert = await addWinner(db, pointObj);
    // console.log(resultInsert);
    const montList = await getMonthList(db, "twitch", 1, 0);
    //io.emit("ranking", monthList);

    //const allPoints = await getAllPoints(db);
    //console.log(allPoints);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
async function addPoint(payload) {
  const uri =
    "mongodb+srv://" +
    process.env.MONGO_USER +
    ":" +
    process.env.MONGO_PASSWORD +
    "@cluster0.5yuy9.mongodb.net";
  console.log(`uri: ${uri}`);
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    const db = client.db("democratic_games");

    const pointObj = {
      user: payload.user,
      channel: payload.channel,
      game: payload.game,
      category: payload.category,
      createdAt: new Date(),
      points: payload.points,
    };
    const resultInsert = await addWinner(db, pointObj);

    //io.emit("ranking", monthList);

    //const allPoints = await getAllPoints(db);
    //console.log(allPoints);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

async function addWinner(db, payload) {
  try {
    console.log(`addWinner`);
    console.log(payload);
    resultInsert = await db.collection("points").insertOne(payload);
    console.log(resultInsert);
  } catch (error) {
    console.log(error);
  }
}

async function getMonthList(db, channel, game, category = 0) {
  try {
    const dateNow = new Date();
    const currentMonth = ("0" + (dateNow.getMonth() + 1)).slice(-2);
    const lastDayMonth = new Date(
      dateNow.getFullYear(),
      dateNow.getMonth() + 1,
      0
    ).getDate();
    const dateStart = `${dateNow.getFullYear()}-${currentMonth}-01T00:00:00+00:00`;
    const dateEnd = `${dateNow.getFullYear()}-${currentMonth}-${lastDayMonth}T00:00:00+00:00`;
    let query = {
      channel: channel,
      game: game,
      createdAt: {
        $gte: new Date(dateStart),
        $lt: new Date(dateEnd),
      },
    };
    if (category > 0) {
      query.category = category;
    }
    const monthList = await db.collection("points").find(query).toArray();

    console.log(`monthList:`);
    console.log(monthList);
    io.emit("ranking", monthList);
  } catch (error) {
    console.log(error);
  }
}

function groupBy(collection, property) {
  var i = 0,
    val,
    index,
    values = [],
    result = [];
  for (; i < collection.length; i++) {
    val = collection[i][property];
    index = values.indexOf(val);
    if (index > -1) result[index].push(collection[i]);
    else {
      values.push(val);
      result.push([collection[i]]);
    }
  }
  return result;
}
function cleanVotes(listVote, field) {
  let cleanVotesList = [];
  listVote.forEach((item) => {
    let voteObject = {
      key: item[0][field],
      total: item.length,
    };
    cleanVotesList.push(voteObject);
  });
  return cleanVotesList;
}
function processVotes(listVotes, field) {
  let objResult = groupBy(listVotes, field);
  let resultVotes = cleanVotes(objResult, field);
  let orderVotes = resultVotes.sort(
    (a, b) => parseFloat(b.total) - parseFloat(a.total)
  );
  return orderVotes;
}
function setDelayVariable() {
  delayConnection = true;
}

httpServer.listen(3000, function () {
  console.log("Server started!");
});
tmiClient.connect();

tmiClient.on("message", (channel, tags, message, self) => {
  // Ignore echoed messages.
  // if (self) return;
  console.log(message.toLocaleLowerCase());
  console.log(currentMovie.toLocaleLowerCase());
  if (message.toLocaleLowerCase() === currentMovie.toLocaleLowerCase()) {
    io.emit("ganador", { user: tags["display-name"] });
  }

  //console.log(`User: ${tags.username}> ${message}`);
  // io.emit("message", { user: tags["display-name"], message });
  //console.log("\x1b[36m%s\x1b[0m", "currentStep " + currentStep);
  if (parseInt(currentStep) === 2) {
    console.log("\x1b[36m%s\x1b[0m", "currentSteeeeeeep " + currentStep);

    if (message.length === 1) {
      console.log("\x1b[31m", "mensaje correcto " + message);
      let obj = totalVotes.find((o) => o.user === tags["display-name"]);
      if (obj === undefined) {
        totalVotes.push({ user: tags["display-name"], vote: message });
      } else {
        console.log(`Usuario ya ha votado`);
      }
    }
  }

  // if (message.toLowerCase() === "!hello") {
  //   //client.say(channel, `@${tags.username}, Yo what's up`);
  //   tmiClient.say("pimpinelocanalrandom", "Holaa");
  // }
});
io.on("connection", function (socket) {
  // if (!delayConnection) {
  //   setInterval(setDelayVariable, 3000);
  // }

  console.log("A user connected: " + socket.id);

  socket.on("initGame", function (initData) {
    console.log(`init Game`);
    console.log(initData);
    currentMovie = initData;
  });

  socket.on("getRanking", function () {
    main().catch(console.error);
  });

  socket.on("savePoint", function (pointObj) {
    addPoint(pointObj).catch(console.error);
  });

  socket.on("step", function (current) {
    // console.log(`Recibido del usuario ${socket.id}, el texto: ${text}`);
    console.log("\x1b[36m%s\x1b[0m", "Step recibido " + current);
    currentStep = current;

    switch (parseInt(currentStep)) {
      case 1:
        console.log("\x1b[36m%s\x1b[0m", "currentSteeeeeeep " + currentStep);
        // tmiClient.say("wikettt", "----- Sale la pregunta -----");
        break;
      case 2:
        // tmiClient.say("wikettt", "----- Tiempo para votar -----");
        break;
      case 3:
        console.log("\x1b[36m%s\x1b[0m", "currentSteeeeeeep " + currentStep);
        // tmiClient.say("wikettt", "----- Procesando votos -----");
        if (!sentVotes) {
          let restultVotes = processVotes(totalVotes, "vote");
          io.emit("resultado", restultVotes);
          sentVotes = true;
        }

        break;
      case 4:
        console.log("\x1b[36m%s\x1b[0m", "currentSteeeeeeep " + currentStep);
        //tmiClient.say("wikettt", "----- Resultado -----");
        break;
      case 5:
        console.log("\x1b[36m%s\x1b[0m", "currentSteeeeeeep " + currentStep);
        //tmiClient.say("wikettt", "----- Preparando siguiente ronda -----");
        totalVotes = [];
        sentVotes = false;
        break;

      default:
        break;
    }
  });

  socket.on("disconnect", function () {
    console.log("A user disconnected: " + socket.id);
  });
});
