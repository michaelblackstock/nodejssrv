exports.metadata = function(request, response) {

  //  CRUD on custom templates. isCustomerAdmin() === true || isCSR() === true	
  var checkaccess = require('./accessControl.js');
  
  var isCSR = checkaccess.isCSR(request, response);
  var isCustomerAdmin = checkaccess.isCustomerAdmin(request, response);
  console.log("/custom isCSR:" + isCSR);
  console.log("/custom isCustomerAdmin:" + isCustomerAdmin);

  if (isCSR || isCustomerAdmin) {
	  const customerid = request.headers['ldap_customerid'];
	  
	  console.log("[" + customerid + "]");
	  var last2 = customerid.slice(-2);
	  
	  var fs = require('fs');
	  
	  fs.readFile("/tmp/" + last2 + "/" + customerid + "/settings.json", 'utf8', function(err, contents) {
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

exports.storeMetadata = function(request, response) {
    
  var checkaccess = require('./accessControl.js');
  
  var isCSR = checkaccess.isCSR(request, response);
  var isCustomerAdmin = checkaccess.isCustomerAdmin(request, response);
  console.log("/custom isCSR:" + isCSR);
  console.log("/custom isCustomerAdmin:" + isCustomerAdmin);
	  
  const customerid = request.headers['ldap_customerid'];
  console.log("[" + customerid + "]");

  if (customerid && customerid.length > 2) {
	  console.log("customerid:" + customerid);
	  
	  var last2 = customerid.slice(-2);
  
	  const fs = require('fs');  
	  // console.log("[" + last2 + "]");
	  try {
		    fs.statSync('/tmp/' + last2);
		    console.log('file or directory exists');
	  }
	  catch (err) {
		  if (err.code === 'ENOENT') {
			  
			// create folder
			fs.mkdirSync('/tmp/' + last2);
			fs.mkdirSync('/tmp/' + last2 + "/" + customerid);
			
		    console.log('Creating folder');
		  }
	  }

	  // create file
	  fs.writeFile("/tmp/" + last2 + "/" + customerid + "/settings.json", JSON.stringify(request.body), function(err) { 		
	      if(err) {
	          return console.log(err);
	      }
	
	      console.log("The file was saved!");
	  });
	  response.send("/metadata called");
  } else {
	  response.statusCode = 401;
	  response.send("/metadata Unauthenticated user.");  
  }
  return 0; 
};
