/*
 * Load properties file into template
 */
var velocity = require('velocityjs');
var fs = require('fs');
var PropertiesReader = require('properties-reader');

var properties = PropertiesReader('../templates/emailtemplate.properties');  // eng
var templatefile = "../email.templates/bss.shim/purchase_confirm_text.vm";   // purchase


var emailVM = fs.readFileSync(templatefile, 'utf8');
var asts = velocity.parse(emailVM); 
var macros = null;

var results = (new velocity.Compile(asts)).render(properties._properties,macros);

console.log(results); 


