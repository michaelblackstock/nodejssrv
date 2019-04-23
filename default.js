/*
 * Usage: /default - returns all the default templates. isCustomerAdmin() === true || isCSR() === true
 */
exports.default = function(request, response){
  //  CRUD on custom templates. isCustomerAdmin() === true || isCSR() === true	
  var checkaccess = require('./accessControl.js');
  
  var isCSR = checkaccess.isCSR(request, response);
  var isCustomerAdmin = checkaccess.isCustomerAdmin(request, response);
  console.log("/default isCSR:" + isCSR);
  console.log("/default isCustomerAdmin:" + isCustomerAdmin);
  
  // isCSR = true; // testing....

  if (isCSR || isCustomerAdmin) {
	  const templateid = request.params.templateid;
	  const geo = request.params.languageid;
	  
	  console.log("[" + templateid + "]");
	  console.log("[" + geo + "]");

	  var velocity = require('./loadtemplate.js');

	  var html = velocity.loadtemplatehtml(templateid, geo);
	  var text = velocity.loadtemplatetext(templateid, geo);
	  
	  if (html.length == 0) {
    	  response.statusCode = 404;
    	  response.send("");
    
	  } else {
	
		  var obj = new Object();
		  obj.subject = "<subject data>";
		  obj.body = {};
		  obj.body.html = html;
		  obj.body.text = text;
	
		  response.send(obj);
      }
	  return true;
  }

  
  response.send("/custom nothing sent ");
  return 0; 
};

exports.storeDefault = function(request, response) {
	
  const templateid = request.params.templateid;
  const geo = request.params.languageid;
  console.log("[" + templateid + "]");
  console.log("[" + geo + "]");
  
  if ((templateid && templateid.length > 0) && (geo && geo.length > 0)) {

	  const fs = require('fs');  
	  
	  // create folder
	  try {
		    fs.statSync('/tmp/' + templateid);
		    console.log('file or directory exists');
	  }
	  catch (err) {
		  if (err.code === 'ENOENT') {

			fs.mkdirSync('/tmp/' + templateid);			
		    console.log('Creating folder');
		  }
	  }

      // create file
      fs.writeFile("/tmp/" + templateid + "/index_" + geo + ".json", JSON.stringify(request.body), function(err) { 		
         if(err) {
            return console.log(err);
         }

         console.log("The file was saved!");
	  }); 
  }
  response.send("/Default called")
  return 0; 
};
