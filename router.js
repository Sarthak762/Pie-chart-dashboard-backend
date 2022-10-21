const { response } = require("express");
const express = require("express");
const pieChart = require("./schema.js");

const router = express.Router();

router.post("/post", async (req, res) => {
  console.log(req.body);
  pieChart.create(req.body, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

router.get("/get", async (req, res) => {
  const data = await pieChart.find({});
  try {
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
