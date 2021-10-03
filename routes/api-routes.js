const router = require("express").Router();
const db = require("../models/workout");
require("mongoose");

//gets all past workouts
router.get("/api/workouts", (req, res) => {
	db.find()
		.then((dbData) => {
			res.json(dbData);
		})
		.catch((err) => {
			res.json(err);
		});
});

//get last 7 workouts
router.get("/api/workouts/range", (req, res) => {
    db.find({})
    .then(dbData => {
        res.json(dbData);
    })
    .catch((err) => {
        res.json(err);
    });
});

//add workout
router.post("/api/workouts", (req, res) => {
    db.create({
      day: Date.now()
    })
      .then(newWorkout => {
        console.log("New Workout Created: ", newWorkout);
        res.json(newWorkout);
      })
      .catch(err => res.json(err));
  });
  

  router.put("/api/workouts/:id", (req, res) => {
    db.findByIdAndUpdate(
      req.params.id,
      { $push: { exercises: req.body } },
      { new: true }
    )
      .then(workout => res.json(workout))
      .catch(err => res.json(err));
  });
  


module.exports = router;
