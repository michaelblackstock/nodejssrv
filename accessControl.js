exports.isCSR = function(request, response) {

  // checks if "iv-groups" header contains "CSR" or "CSRManager"	
  var ivgroups = request.headers['iv-groups'];
  if ((ivgroups && ivgroups.indexOf('CSR') !== -1) || (ivgroups && ivgroups.indexOf('CSRManager') !== -1)) {
	  return true;
  }
  return false; 
};

exports.isCustomerAdmin = function(request, response) {
  // checks if "iv-groups" header contains "CustomerAdministrator"
  var ivgroups = request.headers['iv-groups'];	
  if (ivgroups && ivgroups.indexOf('CustomerAdministrator') !== -1) {
	  return true;
  }
  return false;  
};

exports.getCustomerId = function(request, response) {
	  // check headers
	  return 0; 
};

exports.getSubscriberId = function(request, response) {
	  // check headers
	  return 0; 
};

exports.isAuthenticated = function(request, response) {
	  // check headers
	  return 0; 
};

exports.isService = function(request, response) {
	var ivuser = request.headers['iv-user'];
	var ivgroups = request.headers['iv-groups'];
	console.log("ivuser:" + ivuser);
	console.log("ivgroups:" + ivgroups);
		
	if ((ivuser && ivuser.indexOf('service') !== -1) && (ivgroups && ivgroups.indexOf('service') !== -1)) {
		return true;
	}
	return false; 
};

exports.getEmailAddress = function(request, response) {
	  // check headers
	  return 0; 
};

exports.getOrgName = function(request, response) {
	  // check headers
	  return 0; 
};

exports.getUsername = function(request, response) {
	  // check headers
	  return 0; 
};
