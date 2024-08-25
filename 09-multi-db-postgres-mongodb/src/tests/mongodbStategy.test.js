const assert = require("assert");
const MongoDB = require("../db/strategies/mongodb");
const Context = require("../db/strategies/base/contextStrategy");

const context = new Context(new MongoDB());
const MOCK_HEROI_CADASTRAR = {
  name: "Mulher Maravilha",
  power: "Laco",
};
const MOCK_HEROI_DEFAULT = {
  name: `Homem Aranha-${Date.now()}`,
  power: "Super Teia",
};

describe("MongoDB Suite de testes", function () {
  this.timeout(Infinity);
  this.beforeAll(async () => {
    await context.connect();
    await context.create(MOCK_HEROI_DEFAULT);
  });
  it("Verificar conexao", async () => {
    const result = await context.isConnected();
    const expected = "Connected";
    assert.deepEqual(result, expected);
  });
  it("Cadastrar", async () => {
    const { name, power } = await context.create(MOCK_HEROI_CADASTRAR);
    assert.deepEqual({ name, power }, MOCK_HEROI_CADASTRAR);
  });
  it.only("Listar", async () => {
    const [{ name, power }] = await context.read({
      name: MOCK_HEROI_DEFAULT.name,
    });
    const result = {
      name,
      power,
    };
    console.log("result", result);
    assert.deepEqual(result, MOCK_HEROI_DEFAULT);
  });
});
