const Mongoose = require("mongoose");

(async () => {
  try {
    await Mongoose.connect("mongodb://messias:123@localhost:27017/herois");
  } catch (error) {
    console.log("Falha na conexao", error);
  }
})();

const connection = Mongoose.connection;
connection.once("open", () => console.log("database rodando"));
// setTimeout(() => {
//   const state = connection.readyState;
//   console.log("state", state);
// }, 1000);
/*
  0: Disconectado
  1: Conectado
  2: Conectando
  3: Disconectando
*/

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

const model = Mongoose.model("herois", heroiSchema);

async function main() {
  const registrationResult = await model.create({
    name: "Batman",
    power: "Money",
  });
  console.log("registrationResult", registrationResult);

  const listItems = await model.find();
  console.log("items", listItems);
}

main();
