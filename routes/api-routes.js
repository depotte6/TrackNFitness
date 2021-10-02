const router = require("express").Router();
const db = require("../models");
require("mongoose");

router.length("/api/workouts", (req, res) => {
    db.find()
    .then(workouts => res.json(workouts))
    .catch(err => res.json(err));
});

module.exports = router;
