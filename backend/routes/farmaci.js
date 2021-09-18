const express = require("express");
const router = express.Router();
const Farmaci = require("../models/farmaci");
const redis = require("redis");
const redisPort = process.env.REDISPORT || 6379;
const redisHost = process.env.REDISHOST || 'redis';
const redisDisabled = process.env.REDISDISABLE === "true" || false;
const redisTimeCache = parseInt(process.env.REDISTTL) || 60;

const client = redis.createClient(redisPort, redisHost);

router.get("/", async (req, res) => {
  try {
    const searchTerm = `FARMACIALL`;
    client.get(searchTerm, async (err, data) => {
      if (err) throw err;

      if (data && !redisDisabled) {
        res.status(200).send(JSON.parse(data));
      } else {
        const farmaci = await Farmaci.find();

        client.setex(searchTerm, redisTimeCache, JSON.stringify(farmaci));
        res.status(200).json(farmaci);
      }
    });

  } catch (err) {
    console.error("Error: ", err);
    res.status(500).json({"Error": err});
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const searchTerm = `FARMACIBY${id}`;
    client.get(searchTerm, async (err, data) => {
      if (err) throw err;

      if (data && !redisDisabled) {
        res.status(200).send(JSON.parse(data));
      } else {
        const farmaci = await Farmaci.findById(id);

        client.setex(searchTerm, redisTimeCache, JSON.stringify(farmaci));
        res.status(200).json(farmaci);
      }
    });
  } catch (err) {
    res.status(500).json({"Error": err});
  }
});

router.post("/", async (req, res) => {
  try {
    const farmaci = new Farmaci({
      nome: req.body.nome,
      descrizione: req.body.descrizione,
      formato: req.body.formato,
      dose: req.body.dose,
      qty: req.body.qty,
      codice_interno: req.body.codice_interno
    });

    const result = await farmaci.save();
    res.status(200);
    res.json(result);

  } catch (err) {
    res.status(500).json({error: err}) 
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const farmaci = await Farmaci.updateOne(
      { _id: id },
      {
        $set: {
          nome: req.body.nome,
          descrizione: req.body.descrizione,
          formato: req.body.formato,
          dose: req.body.dose,
          qty: req.body.qty,
          codice_interno: req.body.codice_interno
        },
      }
    );

    const searchTerm = `FARMACIBY${id}`;
    client.del(searchTerm);
    res.status(200);
    res.json(farmaci);

  } catch (err) {
    res.status(500).json({error: err}) 
  }
});

module.exports = router;
