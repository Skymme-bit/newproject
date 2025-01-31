/**
 * @description Improvised ETL
 *              THe reason that node.js is used is because we are working with a JSON formatted object,
 *              which node is able to do natively without using any plugins or libraries. Simply read
 *              from the data file.
 */

//Node JS dependencies for reading and writing files to the file system.
var fs = require('fs');
//Read the file from the file system
var obj = JSON.parse(fs.readFileSync('./data.json', 'utf8'));

//get the date from the first item.
var date = new Date(obj[0].timestamp);
//format the date to the YYYYMMDD.csv required for the submission.
var datef = date.getFullYear() + pad2(date.getMonth()+1) + pad2(date.getDate());

//to return string object
var csv = "";

//for loop to parse all items
for (var i = 0, l = obj.length; i < l; i++) {
  //item is a single person
  var item = obj[i];

  //check if item has a creditcard then save the :name and :creditcard to the cvs object in the cvs format
  if(item.creditcard != null){
    csv += item.name + "," + item.creditcard + "\n";
  }
}

//store the compiled cvs in a file formated YYYYMMDD.csv
fs.writeFile("./" + datef + ".csv", csv, function(err) {
  if(err) {
    return console.log(err);
  }
  console.log("The file was saved!");
});

//formating function for making numbers 2 digits ex "2" -> "02"
function pad2(number) {
  return (number < 10 ? '0' : '') + number
}
