var request = require('request'),
    cheerio = require('cheerio');
var fs = require('fs');
var url = 'http://services.telecom-bretagne.eu/rak/plat.php?id_plat=';
var output = "src/meals.json";
var meals = {};


function parse(id) {
    console.log("Getting : ",id);
    request(url+id, function (error, response, body) {
      let m = parseMeal(id,body);
       //Detect if empty meal name
      if (m.name == 'Non indiqué'){
        console.log("Skipping :", id)
        parse(id+1); //Start next
      }else{
        meals[id] = m;
        console.log(meals[id], Object.keys(meals).length);
        fs.writeFile(output, JSON.stringify(meals), function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
            parse(id+1); //Start next
        });
      }
    });
    //return p;
}

var typeId = {
  "unknown" : 0,
  "Non indiqué" : 0,
  "Plat principal" : 1,
  "Accompagnement" : 2,
  "Entrée" : 3,
  "Entrée chaude" : 4,
  "Dessert" : 5,
  "Dessert chaud" : 6,
  "Sandwich" : 7,
  "Cafeteria" : 8
};
var containId = {
  viande : 0,
  porc   : 1,
  gluten : 2,
  alcool : 3
};
var containStateId = {
  "unknown" : 0,
  "Non renseigné" : 0,
  "Non renseignée" : 0,
  "Oui" : 1,
  "Non" : 2
};
function parseMeal(id,body){
  var $ = cheerio.load(body);
  let meal = {
    id : id,
    name: "",
    img : "",
    t : 0,
    c : [0,0,0,0]
  }

  meal.name = $("article>.row h1").text().trim();
  meal.img = $(".fenetre img.thumbnail").attr("src");
  meal.t = typeId[$(".fenetre h4").text().split(" : ")[1]]; //TODO detect missing type
  if (meal.t == null) {
    console.log("type",$(".fenetre h4").text().split(" : ")[1],meal.t);
  }
  $(".fenetre .description>ul>li").each(function(index, el) {
      //TODO check
      var d = $(el).text().split(" : ");
      if (containId[d[0]] == null || containStateId[d[1]] == null) {
        console.log("contain",d[0],d[1]);
      }
      meal.c[containId[d[0]]] = containStateId[d[1]];
  });
  return meal;
};

//parse(1);
var content = fs.readFileSync(output);
meals = JSON.parse(content);
parse(parseInt(Object.keys(meals)[Object.keys(meals).length-1])+1); //Start from last id
