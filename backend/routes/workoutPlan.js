const WorkoutPlan = require("../models/WorkoutPlan");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

// CREATE
router.post("/create", verifyTokenAndAdmin, async (req, res) => {
  const newWorkoutPlan = new WorkoutPlan(req.body);

  try {
    const savedWorkoutPlan = await newWorkoutPlan.save();
    res.status(200).json(savedWorkoutPlan);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedWorkoutPlan = await WorkoutPlan.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedWorkoutPlan);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await WorkoutPlan.findByIdAndDelete(req.params.id);
    res.status(200).json("Workout plan has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET WORKOUT PLAN
router.get("/find/:id", async (req, res) => {
  try {
    const workoutPlan = await WorkoutPlan.findById(req.params.id);
    res.status(200).json(workoutPlan);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL WORKOUT PLANS
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;

  try {
    let workoutPlans;

    if (qNew) {
      workoutPlans = await WorkoutPlan.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      workoutPlans = await WorkoutPlan.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      workoutPlans = await WorkoutPlan.find();
    }

    res.status(200).json(workoutPlans);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;