const Joi =require('joi');

const express = require("express");
const router = express.Router();

let courses = [
  { id: 1, name: "chemistr" },
  { id: 2, name: "math" },
];

router.get("/", (req, res) => {
  res.send(courses);
});

router.get("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("coudnt find the course");
  res.status(200).send(course);
});
router.delete("/:id", (req, res) => {
  //lookup the course
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("coudlnt find the course");
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  return res.send(course);
});
router.post("/", (req, res) => {
  var { error } = validateCourse(req.body);
  if (error) return res.status(400).send("error.details[0].message");
  const course = { id: courses.length + 1, name: req.body.name };
  courses.push(course);
  res.send(course);
});

router.put("/:id", (req, res) => {
  //find the cours
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("coudlnt find the course");
  //input alidation using Joi package
  //object destructuring=> unpack arrays and props into units [a,b]= [1,2]
  var { error } = validateCourse(req.body);
  if (error) return res.status(400).send("error.details[0].message");

  //apply the change
  course.name = req.body.name;
  return course;
});

function validateCourse(course) {
  const schema = {
    name: Joi.String().min(3).required(),
  };
  return Joi.validate(course, schema);
}

module.exports = router;
