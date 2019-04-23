/*
 * Usage: /default/purchase_confirm/eng - returns template,
 */
exports.loadtemplatehtml = function(templateid, geo){
  console.log("Load html Template...");
  
  /*
   * Load properties file into template
   */
  var velocity = require('velocityjs');
  var fs = require('fs');
  var PropertiesReader = require('properties-reader');
 
  if (geo == "en")
	  var properties = PropertiesReader('../templates/emailtemplate.properties');  // eng
  else
	  var properties = PropertiesReader('../templates/emailtemplate_' + geo + '.properties'); 
  var templatefile = "../email.templates/bss.shim/" + templateid + "_html.vm";   // purchase

  if(!fs.existsSync(templatefile)) {
	  console.log("File not found");
	  return "";
  }
  var emailVM = fs.readFileSync(templatefile, 'utf8');
  var asts = velocity.parse(emailVM); 
  var macros = null;

  var results = (new velocity.Compile(asts)).render(properties._properties,macros);

  console.log(results); 
  return results; 
};

exports.loadtemplatetext = function(templateid, geo){
  console.log("Load text Template...");
  
  /*
   * Load properties file into template
   */
  var velocity = require('velocityjs');
  var fs = require('fs');
  var PropertiesReader = require('properties-reader');
  if (geo == "en")
	  var properties = PropertiesReader('../templates/emailtemplate.properties');  // eng
  else
	  var properties = PropertiesReader('../templates/emailtemplate_' + geo + '.properties'); 
  var templatefile = "../email.templates/bss.shim/" + templateid + "_text.vm";   // purchase

  if(!fs.existsSync(templatefile)) {
	  console.log("File not found");
	  return "";
  }
  var emailVM = fs.readFileSync(templatefile, 'utf8');
  var asts = velocity.parse(emailVM); 
  var macros = null;

  var results = (new velocity.Compile(asts)).render(properties._properties,macros);

  console.log(results); 
  return results; 
};
