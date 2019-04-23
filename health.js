exports.handlehealth = function(request, response) {
  var checkaccess = require('./accessControl.js');
  
  var retcode = checkaccess.isCSR(request, response);
  console.log("isCSR:" + retcode);
  
  retcode = checkaccess.isCustomerAdmin(request, response);
  console.log("isCustomerAdmin:" + retcode);
  
  response.send("Health Probe passed ");
  return 0; 
};
