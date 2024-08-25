const ICrud = require("./interfaces/interfaceCrud");
const Mongoose = require("mongoose");

class MongoDB extends ICrud {
  constructor() {
    super();
    this._herois = null;
    this._driver = null;
    this._STATUS = {
      0: "Disconnected",
      1: "Connected",
      2: "Connecting",
      3: "Disconnecting",
    };
  }

  async isConnected() {
    const state = this._STATUS[this._driver.readyState];
    if (state === "Connected") return state;
    if (state !== "Connecting") return state;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return this._STATUS[this._driver.readyState];
  }

  defineModel() {
    const heroiSchema = new Mongoose.Schema({
      name: {
        type: String,
        required: true,
      },
      power: {
        type: String,
        required: true,
      },
      insertedAt: {
        type: Date,
        default: new Date(),
      },
    });
    this._herois = Mongoose.model("herois", heroiSchema);
  }

  async connect() {
    try {
      await Mongoose.connect("mongodb://messias:123@localhost:27017/herois");
      const connection = Mongoose.connection;
      connection.once("open", () => console.log("database rodando"));
      this.defineModel();
      this._driver = connection;
    } catch (error) {
      console.log("Falha na conexao", error);
    }
  }

  async create(item) {
    return await this._herois.create(item);
  }

  async read(item, skip = 0, limit = 10) {
    return await this._herois.find(item).skip(skip).limit(limit);
  }
}

module.exports = MongoDB;
