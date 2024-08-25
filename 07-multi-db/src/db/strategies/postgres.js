const ICrud = require("./interfaces/interfaceCrud");

class Postgres extends ICrud {
  constructor() {
    super();
  }

  create(item) {
    console.log("O item foi salvo em Postgres");
  }
  // read(item) {}
  // update(id, item) {}
  // delete(id) {}
}

module.exports = Postgres;
