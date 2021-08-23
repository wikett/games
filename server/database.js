"use strict";
const { MongoClient } = require("mongodb");
class Service {
  constructor(uri) {
    this.client = new MongoClient(uri);
  }

  async addWinner() {
    try {
      // Connect to the MongoDB cluster
      await this.client.connect();

      const db = this.client.db("democratic_games");

      const pointObj = {
        user: "fredy",
        channel: "twitch",
        game: 1,
        category: 3,
        createdAt: new Date(),
        points: 10,
      };
      // const resultInsert = await addWinner(db, pointObj);
      // console.log(resultInsert);
      const resultInsert = await db.collection("points").insertOne(pointObj);
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
}
module.exports = { Service };
