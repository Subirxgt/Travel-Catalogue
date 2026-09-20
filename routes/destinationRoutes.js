const express = require("express");

const {
    showAddForm,
    addDestination,
    listDestinations,
    upload
} = require("../controllers/destinationController");

const router = express.Router();


// List destinations
router.get("/", listDestinations);


// Add form
router.get("/add", showAddForm);


// Submit destination
router.post(
    "/",
    upload.single("image"),
    addDestination
);


module.exports = router;