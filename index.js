const express = require ("express");
const fs = require ("fs");
const app = express();
const bodyparser = require("body-parser");
const dateEt = require("./src/dateTimeET");
const textRef = "public/txt/vanasonad.txt";

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: false}));
app.get("/", (req, res)=>{

	res.render("index");
});	




app.get("/timenow", (req, res)=>{
	const weekDayNow = dateEt.weekDay();
	const dateNow = dateEt.fullDate();
	res.render("timenow", {weekDayNow: weekDayNow, dateNow: dateNow});
});	

app.get("/vanasonad", (req, res)=>{
	let folkWisdom = [];
	fs.readFile(textRef, "utf8", (err, data)=>{});
		if(err){
			//kui tuleb viga, siis ikka väljastame veebilehe, lihtsalt vanasõnu pole ühtegi
			res.render("genericlist", {heading: "Valik Eesti vanasõnu", listData:["Ei leidnud ühtegi vanasõna!"]});
		}
		else {
			folkWisdom = data.split(";");	
			res.render("genericlist", {heading: "Valik Eesti vanasõnu", listData: folkWisdom});
		}	
});

app.get("/regvisit", (req, res)=>{
	res.render("regvisit");
});

app.post ("/regvisit", (req, res)=>{
	console.log(req.body);
	fs.open("public/txt/visitlog.txt", "a" (err, file)=>{
		if(err){
			throw(err);
		}
			else{
				//faili senisele sisule lisamine
				fs.appendFile("public/txt/visitlog.txt" req.body.nameInput + "; ", (err)=>{
					if(err){
						throw(err);
					}
					else {
						console.log(!Salvestatud!");
						res.render("regvisit");
					}
				});
			}
	});
});
	
app.listen(5132);
