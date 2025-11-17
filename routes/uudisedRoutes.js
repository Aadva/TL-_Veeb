const express = require("express");
const router = express.Router();

// kontrollerid
const {
    uudisedAddPage,
    uudisAddPost,
    uudisedList
} = require("../controllers/uudisedControllers");

router.route("/lisa")
    .get(uudisedAddPage)
    .post(uudisAddPost);

router.route("/")
    .get(uudisedList);

module.exports = router;
