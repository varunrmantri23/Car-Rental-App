const express = require("express");
const {
    addCar,
    getCars,
    updateCar,
    deleteCar,
    getcar
} = require("../controllers/carController");

const router = express.Router();

router.get("/getcars/:id", getcar)
router.post("/cars", addCar);
router.get("/cars", getCars);
router.put("/cars/:id", updateCar);
router.delete("/cars/:id", deleteCar);

module.exports = router;
