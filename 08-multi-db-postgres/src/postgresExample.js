// npm install sequelize pg pg-hstore

const Sequelize = require("sequelize");
const driver = new Sequelize("heroes", "messias", "123", {
  host: "localhost",
  dialect: "postgres",
  quoteIdentifiers: false,
  operatorsAliases: false,
});

async function main() {
  const Herois = driver.define(
    "herois",
    {
      id: {
        type: Sequelize.INTEGER,
        required: true,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        required: true,
      },
      power: {
        type: Sequelize.STRING,
        required: true,
      },
    },
    {
      tableName: "TB_HEROIS",
      freezeTableName: false,
      timestamps: false,
    }
  );

  await Herois.sync();
  await Herois.create({
    name: "Green Lantern",
    power: "Ring",
  });

  const result = await Herois.findAll({ raw: true, attributes: ["name"] });
  console.log("result", result);
}

main();
