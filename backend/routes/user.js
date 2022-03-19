const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const User = require("../models/user");
const Dipendenti = require("../models/dipendenti");
const Presenze = require("../models/presenze");
const Turnimensili = require("../models/turnimensili");

//const redis = require("redis");
//const redisPort = process.env.REDISPORT || 6379;
//const redisHost = process.env.REDISHOST || "redis";
//const redisDisabled = process.env.REDISDISABLE === "true" || false;
const redisTimeCache = parseInt(process.env.REDISTTL) || 60;
//const client = redis.createClient(redisPort, redisHost);

router.get("/info/:id", async (req, res) => {
  const { id } = req.params;

  try {
    var query = { idUser: mongoose.Types.ObjectId(id) };
    const dipendenti = await Dipendenti.find(query);

    res.status(200).json(dipendenti);
  } catch (err) {
    res.status(500).json({ Error: err });
  }
});

router.get("/", async (req, res) => {
  const getData = () => {
    return User.find();
  };

  try {
    redisClient = req.app.get("redis");
    redisDisabled = req.app.get("redisDisabled");

    if (redisClient == undefined || redisDisabled) {
      const users = await getData();
      res.status(200).json(users);
      return;
    } else {
      const searchTerm = `USERALL`;
      // Ricerca su Redis Cache
      redisClient.get(searchTerm, async (err, data) => {
        if (err) throw err;

        if (data) {
          // Dato trovato in cache - ritorna il json
          res.status(200).send(JSON.parse(data));
        } else {
          // Recupero informazioni dal mongodb
          const users = await getData();
          // Aggiorno la cache con i dati recuperati da mongodb
          redisClient.setex(searchTerm, redisTimeCache, JSON.stringify(users));

          // Ritorna il json
          res.status(200).json(users);
        }
      });
    }
  } catch (err) {
    console.error("Error: ", err);
    res.status(500).json({ Error: err });
  }
});

// http://[HOST]:[PORT]/api/user/[ID_USER]
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  redisClient = req.app.get("redis");
  redisDisabled = req.app.get("redisDisabled");
  
  const getDataById = (id) => {
    return User.findById(id);
  };

  try {
    if (redisClient == undefined || redisDisabled) {
      const users = await getDataById(id);
      res.status(200).json(users);
      return;
    } else {
      const searchTerm = `USERBY${id}`;
      redisClient.get(searchTerm, async (err, data) => {
        if (err) throw err;

        if (data) {
          res.status(200).send(JSON.parse(data));
        } else {
          const user = await getDataById(id);
          redisClient.setex(searchTerm, redisTimeCache, JSON.stringify(user));
          res.status(200).json(user);
        }
      });
    }
  } catch (err) {
    res.status(500).json({ Error: err });
  }
});

router.post("/authenticate", async (req, res) => {
  try {
    
    const user = res.locals.auth;
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours()+1);

    const query = {
      user: mongoose.Types.ObjectId(user._id),
      dataRifInizio: { $lte: currentDate },
      dataRifFine: { $gte: currentDate },
      turnoInizio: { $lte: currentDate.getHours() },
      turnoFine: { $gte: currentDate.getHours() },
    };
    const turno = await Turnimensili.findOne(query);

    //console.log("Authorization query", query, turno);

    if (turno == null && user.username !== "admin") {
      res.status(401);
      res.json({ Error: 'Not Authorized - Fuori turno' });
      return;
    }

    const presenzeFind = await Dipendenti.aggregate([
      {
        $match: {
          idUser: mongoose.Types.ObjectId(user._id),
        },
      },
      {
        $lookup: {
          from: "presenze",
          localField: "idUser",
          foreignField: "user",
          as: "presenze",
        },
      },
      {
        $unwind: {
          path: "$codiceFiscale",
        },
      },
    ]);

    if (presenzeFind.length > 0) {
      if (turno != null) {
        const dataRif = currentDate;
        const dataRifNowInizio = new Date(
          Date.UTC(
            dataRif.getFullYear(),
            dataRif.getMonth(),
            dataRif.getDate(),
            0,
            0,
            0
          )
        );

        const dataRifNowFine = new Date(
          Date.UTC(
            dataRif.getFullYear(),
            dataRif.getMonth(),
            dataRif.getDate(),
            0,
            0,
            0
          )
        );

        turno.dataRifInizio.setHours(turno.turnoInizio+1);
        turno.dataRifFine.setHours(turno.turnoFine+1);
        dataRifNowInizio.setHours(turno.fturnoInizio+1);
        dataRifNowFine.setHours(turno.turnoFine+1);

        const resultPresenze = presenzeFind.map((x) => {
          // return x.presenze.map( x=> {
          //   return {

          //     res: 
          //       x.data >= turno.dataRifInizio &&
          //       x.data <= turno.dataRifFine &&
          //       x.data >= dataRifNowInizio &&
          //       x.data <= dataRifNowFine,

          //     data: x.data,
          //     dateNow: currentDate,

          //     dataRifInizioRES: x.data >= turno.dataRifInizio,
          //     dataRifFineRES: x.data <= turno.dataRifFine,
          //     dataRifNowInizioRES: x.data >= dataRifNowInizio,
          //     dataRifNowFineRES: x.data <= dataRifNowFine,


          //     dataRifInizio: turno.dataRifInizio,
          //     dataRifFine: turno.dataRifFine ,
          //     dataRifNowInizio,
          //     dataRifNowFine
          //   }
          // }
            
          // );

          return {
            presenze: x.presenze.find(
              (a) =>
              //a.data,
              a.data >= turno.dataRifInizio &&
              a.data <= turno.dataRifFine &&
              a.data >= dataRifNowInizio &&
              a.data <= dataRifNowFine
              ),
              
              debug: x.presenze.map((a) => a.data),
            };
          });

        const adding =
          resultPresenze.length == 0 || 
          resultPresenze[0].presenze == undefined;
        
        if (adding) {
            const presenzeAdding = new Presenze({
              data: currentDate,
              user: mongoose.Types.ObjectId(user._id),
            });

          // Aggiungere un record sulla collection presenze
          const result = await presenzeAdding.save();
          console.log("Add item in presenze");
        }
      }
    }
    
    redisClient = req.app.get("redis");
    redisDisabled = req.app.get("redisDisabled");

    if (redisClient != undefined && !redisDisabled) {
      const searchTerm = `PRESENZEALL`;
      redisClient.del(searchTerm);
    }

    res.status(200);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500);
    res.json({ Error: err });
  }
});

router.post("/logout", async (req, res) => {
  try {
    const user = res.locals.auth;
    console.log("Logout");

    redisClient = req.app.get("redis");
    redisDisabled = req.app.get("redisDisabled");

    if (redisClient != undefined && !redisDisabled) {
      const searchTerm = `PRESENZEALL`;
      redisClient.del(searchTerm);
    }

    res.status(200);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500);
    res.json({ Error: err });
  }
});

// http://[HOST]:[PORT]/api/user (POST)
// INSERT
router.post("/", async (req, res) => {
  try {

    const user = new User({
      group: req.body.group,
      username: req.body.username,
      password: req.body.password,
      active: false,
      role: req.body.mansione,
    });
    
    // Salva i dati sul mongodb
    const result = await user.save();

    redisClient = req.app.get("redis");
    redisDisabled = req.app.get("redisDisabled");

    if (redisClient != undefined && !redisDisabled) {
      const searchTerm = `USERALL`;
      redisClient.del(searchTerm);
    }
      
    res.status(200);
    res.json(result);
  } catch (err) {
    res.status(500);
    res.json({ Error: err });
  }
});

// http://[HOST]:[PORT]/api/user/[ID_USER]
// Modifica
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    if (id == undefined || id === "undefined") {
      res.status(400).json({
        message: "Error identify not found",
      });
      return;
    }

    mailer = req.app.get('mailer');
    mailerTopic = req.app.get('mailerTopic');
    mailerDisabled = req.app.get('mailerDisabled');


    const userUpdate = {
      group: req.body.group,
      username: req.body.username,
      password: req.body.password,
      active: req.body.active
    }

    if (mailer != undefined && !mailerDisabled && mailerTopic != undefined) {
      var query = { idUser: mongoose.Types.ObjectId(id) };
      const dipendenti = await Dipendenti.find(query);
      mailer.publish(mailerTopic, JSON.stringify(dipendenti));
    }
    
    // Aggiorna il documento su mongodb
    const user = await User.updateOne(
      { _id: id },
      { $set: userUpdate });
      
    redisClient = req.app.get("redis");
    redisDisabled = req.app.get("redisDisabled");

    if (redisClient != undefined && !redisDisabled) {
      const searchTerm = `USERBY${id}`;
      redisClient.del(searchTerm);
    }
      
    res.status(200).json({
      operation: "Update",
      status: "Success",
    });
  } catch (err) {
    res.status(500).json({ Error: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.remove({ _id: id });
    
    redisClient = req.app.get("redis");
    redisDisabled = req.app.get("redisDisabled");

    if (redisClient != undefined && !redisDisabled) {
      let searchTerm = `USERBY${id}`;
      redisClient.del(searchTerm);
      searchTerm = `USER${id}`;
      redisClient.del(searchTerm);
    }  
    
    res.status(200);
    res.json(user);
  } catch (err) {
    res.status(500).json({ Error: err });
  }
});

module.exports = router;
