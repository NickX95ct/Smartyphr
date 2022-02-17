const express = require("express");
const router = express.Router();
const Curriculum = require("../models/curriculum");
const redisTimeCache = parseInt(process.env.REDISTTL) || 60;

router.get("/", async (req, res) => {
  try {
    redisClient = req.app.get("redis");
    redisDisabled = req.app.get("redisDisabled");

    const getData = (query) => {
      return Curriculum.find(query);
    };

    const showOnlyCancellati = req.query.show == "deleted";
    const showAll = req.query.show == "all";

    if (showOnlyCancellati || showAll) {
      console.log("Show all or deleted");
      let query = {};
      if (showOnlyCancellati) {
        query = { cancellato: true };
      }
      const curriculum = await getData(query);
      res.status(200).json(curriculum);
    } else {
      const query = {
        $or: [{ cancellato: { $exists: false } }, { cancellato: false }],
      };

      const searchTerm = `CURRICULUMALL`;
      if (redisClient == undefined || redisDisabled) {
        const eventi = await getData(query);
        res.status(200).json(eventi);
        return;
      }

      redisClient.get(searchTerm, async (err, data) => {
        if (err) throw err;

        if (data) {
          res.status(200).send(JSON.parse(data));
        } else {
          const curriculum = await getData(query);

          res.status(200).json(curriculum);
          redisClient.setex(
            searchTerm,
            redisTimeCache,
            JSON.stringify(curriculum)
          );
          // res.status(200).json(curriculum);
        }
      });
    }
  } catch (err) {
    console.error("Error: ", err);
    res.status(500).json({ Error: err });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id == undefined || id === "undefined") {
      console.log("Error id is not defined ", id);
      res.status(404).json({ Error: "Id not defined" });
      return;
    }

    redisClient = req.app.get("redis");
    redisDisabled = req.app.get("redisDisabled");

    const getData = () => {
      return Curriculum.find({
        $and: [
          {
            $or: [{ cancellato: { $exists: false } }, { cancellato: false }],
          },
          { _id: id },
        ],
      });
    };

    if (redisClient == undefined || redisDisabled) {
      const eventi = await getData();
      res.status(200).json(eventi);
      return;
    }

    const searchTerm = `CURRICULUMBY${id}`;
    redisClient.get(searchTerm, async (err, data) => {
      if (err) throw err;

      if (data) {
        res.status(200).send(JSON.parse(data));
      } else {
        const curriculum = await getData();
        redisClient.setex(
          searchTerm,
          redisTimeCache,
          JSON.stringify(curriculum)
        );
        if (curriculum != null) res.status(200).json(curriculum);
        else res.status(404).json({ error: "No patient found" });
      }
    });
  } catch (err) {
    res.status(500).json({ Error: err });
  }
});

router.post("/", async (req, res) => {
  try {
    const curriculum = new Curriculum({
      filename: req.body.filename,
      dateupload: req.body.dateupload,
      note: req.body.note,
      mansione: req.body.mansione,
      nome: req.body.nome,
      cognome: req.body.cognome,
      codiceFiscale: req.body.codiceFiscale,
    });

    const result = await curriculum.save();

    redisClient = req.app.get("redis");
    redisDisabled = req.app.get("redisDisabled");

    if (redisClient != undefined && !redisDisabled) {
      redisClient.del(`CURRICULUM*`);
    }

    res.status(200);
    res.json(result);
  } catch (err) {
    res.status(500);
    res.json({ Error: err });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (id == undefined || id === "undefined") {
      console.log("Error id is not defined ", id);
      res.status(404).json({ Error: "Id not defined" });
      return;
    }

    const curriculum = await Curriculum.updateOne(
      { _id: id },
      {
        $set: {
          filename: req.body.filename,
          dateupload: req.body.dateupload,
          note: req.body.note,
          mansione: req.body.mansione,
          nome: req.body.nome,
          cognome: req.body.cognome,
          codiceFiscale: req.body.codiceFiscale,
        },
      }
    );

    redisClient = req.app.get("redis");
    redisDisabled = req.app.get("redisDisabled");

    if (redisClient != undefined && !redisDisabled) {
      redisClient.del(`CURRICULUMBY${id}`);
    }

    res.status(200).json(curriculum);
  } catch (err) {
    res.status(500).json({ Error: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (id == undefined || id === "undefined") {
      console.log("Error id is not defined ", id);
      res.status(404).json({ Error: "Id not defined" });
      return;
    }

    if (id == null) {
      res.status(400).json({ error: "id not valid" });
    }

    const item = await Curriculum.findById(id);
    const curriculum = await Curriculum.remove({ _id: id });

    redisClient = req.app.get("redis");
    redisDisabled = req.app.get("redisDisabled");

    if (redisClient != undefined && !redisDisabled) {
      redisClient.del(`CURRICULUM*`);
    }

    res.status(200).json(curriculum);
  } catch (err) {
    res.status(500).json({ Error: err });
  }
});

module.exports = router;
