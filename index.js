const express = require("express");
const fs = require("fs");
const app = express();
const bodyparser = require("body-parser");
const dateEt = require("./src/dateTimeET");
const textRef = "public/txt/vanasonad.txt";

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
	res.render("index");
});

app.get("/timenow", (req, res) => {
	const weekDayNow = dateEt.weekDay();
	const dateNow = dateEt.fullDate();
	res.render("timenow", { weekDayNow: weekDayNow, dateNow: dateNow });
});

app.get("/vanasonad", (req, res) => {
	fs.readFile(textRef, "utf8", (err, data) => {
		if (err) {
			res.render("genericlist", {
				heading: "Valik Eesti vanas�nu",
				listData: ["Ei leidnud �htegi vanas�na!"],
			});
		} else {
			const folkWisdom = data.split(";");
			res.render("genericlist", {
				heading: "Valik Eesti vanas�nu",
				listData: folkWisdom,
			});
		}
	});
});

app.get("/regvisit", (req, res) => {
	res.render("regvisit");
});

app.post("/regvisit", (req, res) => {
	const firstName = req.body.firstNameInput;
	const lastName = req.body.lastNameInput;
	const fullName = firstName + " " + lastName + "\n";

	fs.appendFile("public/txt/visitlog.txt", fullName, (err) => {
		if (err) throw err;

		console.log("Salvestatud!");
		res.render("visitregistered", { fullName: fullName.trim() });
	});
});
app.get("/visitlog", (req, res) => {
  fs.readFile("public/txt/visitlog.txt", "utf8", (err, data) => {
    const rows = err ? [] : data.split("\n").filter(Boolean);
    res.render("genericlist", { heading: "Külastuste logi", listData: rows });
  });
});

app.listen(5132, () => {
	console.log("Server t��tab pordil 5132");
});
