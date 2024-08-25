const ICrud = require("./interfaces/interfaceCrud");
const Sequelize = require("sequelize");

class Postgres extends ICrud {
  constructor() {
    super();
    this._driver = null;
    this._herois = null;
  }

  async isConnected() {
    try {
      await this._driver.authenticate();
      return true;
    } catch (error) {
      console.log("fail!", error);
      return false;
    }
  }

  async defineModel() {
    this._herois = this._driver.define(
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

    await this._herois.sync();
  }

  async create(item) {
    const { dataValues } = await this._herois.create(item);
    return dataValues;
  }

  async read(item = {}) {
    return await this._herois.findAll({ where: item, raw: true });
  }

  async update(id, item) {
    return await this._herois.update(item, { where: { id: id } });
  }

  async delete(id) {
    const query = id ? { id } : {};
    return await this._herois.destroy({ where: query });
  }

  async connect() {
    this._driver = new Sequelize("heroes", "messias", "123", {
      host: "localhost",
      dialect: "postgres",
      quoteIdentifiers: false,
      operatorsAliases: false,
    });
    await this.defineModel();
  }
}

module.exports = Postgres;
