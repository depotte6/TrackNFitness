const router = require("express").Router();
const db = require("../models");

//gets all past workouts
router.get("/api/workouts", (req, res) => {
    db.Workout.aggregate(
      [
        {
          $addFields: {
            totalDuration: {$sum: "$exercises.duration"}
          }
        }
      ]
    ).then((workouts) => {
      res.status(200).json(workouts);
    }).catch((err) => {
      res.status(400).json(err);
    });
  });

//get last 7 workouts
router.get("/api/workouts/range", (req, res) => {
    db.Workout.aggregate(
      [
        {
          $addFields: {
            totalDuration: {$sum: "$exercises.duration"}
          }
        }
      ]
    )
      .sort( {day: "desc" })
      .limit(7)
      .sort( {day: "asc" })
      .then((workouts) => {
        res.status(200).json(workouts);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
});




//add workouts
router.post( '/api/workouts', async ( req, res ) => {
	try {
		const workoutData = await db.Workout.create( req.body );

		res.status( 200 ).json( workoutData );

	} catch ( err ) {
		res.status( 400 ).json( err );
	}
} );
  

  router.put("/api/workouts/:id", (req , res) => {
      const workouts = req.body;
    db.Workout.updateOne(
      {_id: req.params.id },
      { $push: { workouts: workouts } },
    )
      .then(workouts => res.json(workouts))
      .catch(err => res.json(err));
  });
  


module.exports = router;
