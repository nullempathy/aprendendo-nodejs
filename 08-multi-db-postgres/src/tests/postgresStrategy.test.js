const assert = require("assert");
const Postgres = require("../db/strategies/postgres");
const Context = require("../db/strategies/base/contextStrategy");

const context = new Context(new Postgres());
const MOCK_HEROI_CADASTRAR = { name: "Black Hawk", power: "Arrows" };
const MOCK_HEROI_ATUALIZAR = { name: "Batman", power: "Money" };

describe("Postgres Strategy", function () {
  this.timeout(Infinity);
  this.beforeAll(async function () {
    await context.connect();
    await context.delete();
    await context.create(MOCK_HEROI_ATUALIZAR);
  });

  it("PostgresSQL Connection", async function () {
    const result = await context.isConnected();
    assert.equal(result, true);
  });

  it("register", async function () {
    const result = await context.create(MOCK_HEROI_CADASTRAR);
    delete result.id;
    assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
  });

  it("list", async function () {
    const [result] = await context.read({ name: MOCK_HEROI_CADASTRAR.name });
    delete result.id;
    assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
  });

  it("update", async function () {
    const [itemToUpdate] = await context.read({
      name: MOCK_HEROI_ATUALIZAR.name,
    });
    const newItem = {
      ...MOCK_HEROI_ATUALIZAR,
      name: "Mulher Maravilha",
    };
    const [result] = await context.update(itemToUpdate.id, newItem);
    const [updatedItem] = await context.read({ id: itemToUpdate.id });
    assert.deepEqual(result, 1);
    assert.deepEqual(updatedItem.name, newItem.name);
    // newItem.MOCK_HEROI_ATUALIZAR
    // newItem.name
    /*
      No Javascript temos uma tecnica chamada rest/spread que eh um metodo usado para mergear objetos ou separa-lo
      {
        name: "Batman",
        power: "Money"
      }

      {
        dateOfBirth: "1998-01-01"
      }
     */
  });

  it("removeById", async function () {
    const [item] = await context.read({});
    const result = await context.delete(item.id);
    assert.deepEqual(result, 1);
  });
});
