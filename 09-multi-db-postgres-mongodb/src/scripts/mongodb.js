// sudo docker exec -it 47cf07a892ac mongo -u messias -p 123 --authenticationDatabase herois

// databases
// show dbs

// mudando o contexto para uma database
// use herois

// mostrar tabelas (colecoes)
// show collections

db.herois.insert({
  name: "Flash",
  power: "Speed",
  dateOfBirth: "1998-01-01",
});

db.herois.find();
db.herois.find().pretty();

for (let i = 0; i <= 100000; i++) {
  db.herois.insert({
    name: `Clone-${i}`,
    power: "Speed",
    dateOfBirth: "1998-01-01",
  });
}

db.herois.count();
db.herois.findOne();
db.herois.find().limit(1000).sort({ name: -1 });
db.herois.find({}, { power: 1, _id: 0 });

// create
db.herois.insert({
  name: `Clone-${i}`,
  power: "Speed",
  dateOfBirth: "1998-01-01",
});

// read
db.herois.find();

// update
db.herois.update(
  { _id: ObjectId("66134faa1abaec599ef2c5e4") },
  {
    name: "Mulher Maravilha",
  }
);

db.herois.update(
  { _id: ObjectId("6613502f1abaec599ef2c5e6") },
  {
    $set: { name: "Lanterna Verde" },
  }
);

// delete
db.herois.remove({});
db.herois.remove({ name: "Mulher Maravilha" });
