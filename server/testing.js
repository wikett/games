const { MongoClient } = require("mongodb");
require("dotenv").config();
async function main() {
  const uri =
    "mongodb+srv://" +
    process.env.MONGO_USER +
    ":" +
    process.env.MONGO_PASSWORD +
    "@cluster0.5yuy9.mongodb.net";

  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    const db = client.db("democratic_games");

    const pointObj = {
      user: "pauli",
      channel: "twitch",
      game: 1,
      category: 3,
      createdAt: new Date(),
      points: 8,
    };
    const resultInsert = await addWinner(db, pointObj);
    console.log(resultInsert);
    //const montList = await getMonthList(db, "twitch", 1, 3);

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
  } catch (error) {
    console.log(error);
  }
}
async function getAllPoints(db) {
  allPoints = await db.collection("points").find({}).toArray();
  return allPoints;
}

main().catch(console.error);

console.log(`Llamamos`);
//const dataDB = getData();
