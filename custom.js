exports.custom = function(request, response) {
	
  //  CRUD on custom templates. isCustomerAdmin() === true || isCSR() === true	
  var checkaccess = require('./accessControl.js');
  
  var isCSR = checkaccess.isCSR(request, response);
  var isCustomerAdmin = checkaccess.isCustomerAdmin(request, response);
  console.log("/custom isCSR:" + isCSR);
  console.log("/custom isCustomerAdmin:" + isCustomerAdmin);

  if (isCSR || isCustomerAdmin) {
	  const customerid = request.headers['ldap_customerid'];
	  const templateid = request.params.templateid;
	  const geo = request.params.languageid;
	  
	  console.log("[" + customerid + "]");
	  console.log("[" + templateid + "]");
	  console.log("[" + geo + "]");
	  
	  var fs = require('fs');
	  
	  fs.readFile("/tmp/" + customerid + "/" + templateid + "/index_" + geo + ".json", 'utf8', function(err, contents) {
	      console.log(contents);
	      if (typeof contents == 'undefined') {
	    	  response.statusCode = 404;
	      }
	      response.send(contents);
	  });
	  
	  
	  return true;
  }

  
  response.send("/custom nothing sent ");
  return 0; 
};

exports.storeCustom = function(request, response) {
    
  const customerid = request.headers['ldap_customerid'];
  const templateid = request.params.templateid;
  const geo = request.params.languageid;
  
  console.log("[" + customerid + "]");
  console.log("[" + templateid + "]");
  console.log("[" + geo + "]");
  
  if ((customerid && customerid.length > 0) && (geo && geo.length > 0)) {
	  console.log(customerid + ":" + geo);

  
	  const fs = require('fs');  
	  
	  // create folder
	  try {
		    fs.statSync('/tmp/' + customerid);
		    console.log('file or directory exists');
	  }
	  catch (err) {
		  if (err.code === 'ENOENT') {
			  
			
			fs.mkdirSync('/tmp/' + customerid);
			fs.mkdirSync('/tmp/' + customerid + "/" + templateid);
			
		    console.log('Creating folder');
		  }
	  }

      // create file
      fs.writeFile("/tmp/" + customerid + "/" + templateid + "/index_" + geo + ".json", JSON.stringify(request.body), function(err) { 		
         if(err) {
            return console.log(err);
         }

         console.log("The file was saved!");
	  }); 
  }
  response.send("/metadata called")
  return 0; 
};


exports.delete = function(request, response) {
    
  const customerid = request.headers['ldap_customerid'];
  const templateid = request.params.templateid;
  const geo = request.params.languageid;
  console.log("[" + customerid + "]");
  console.log("[" + templateid + "]");
  console.log("[" + geo + "]");
  
  if ((customerid && customerid.length > 0) && (geo && geo.length > 0)) {
	  console.log(customerid + ":" + geo);

  
	  const fs = require('fs');  
	  
	  // delete file
	  try {
		    fs.statSync('/tmp/' + customerid);
		    console.log('file or directory exists');
		    
	        // delete  file
	        console.log("/tmp/" + customerid + "/" + templateid + "/index_" + geo + ".json");		
		    fs.unlinkSync("/tmp/" + customerid + "/" + templateid + "/index_" + geo + ".json");
	        console.log("The file was deleted!");
	  }
	  catch (err) {
		  if (err.code === 'ENOENT') {		
		    console.log('Customer folder missing');
		  }
	  }	  
  }
  response.send("/custom delete called")
  return 0; 
};

