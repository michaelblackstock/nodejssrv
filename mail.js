/*
 * Usage: .isService() - "iv-user" header is set to "service" AND "iv-groups" contains "service"
 */
exports.mail = function(request, response){
  var checkaccess = require('./accessControl.js');
  
  // check headers
  var retcode = checkaccess.isService(request, response);
  console.log("/mail isService:" + retcode);
  
  // TESTING TESTING TESTING ignore header for now
  // retcode = true;
  
  if (retcode == true ) {
	    
	  // process mail
	  const email = request.query.email;
	  const subject = request.query.subject;
	  const body = request.query.body;
	  console.log(email);
	  console.log(subject);
	  console.log(body);
	
	  response.send("/mail email sent");
	
	  var helper = require("sendgrid").mail;
	  to_email = new helper.Email(email);
	  content = new helper.Content("text/plain", body);
	  from_email = new helper.Email("test@example.com");
	
	  mail = new helper.Mail(from_email, subject, to_email, content);
	
	  var sg = require("sendgrid")(process.env.SENDGRID_API_KEY);
	  var request = sg.emptyRequest({
	    method: "POST",
	    path: "/v3/mail/send",
	    body: mail.toJSON()
	  });
	
	  sg.API(request, function(error, response) {
	    console.log(response.statusCode);
	    console.log(response.body);
	    console.log(response.headers);
	  });
	  
	  return 0;
  }
  
  response.send("/mail email not sent");
  return -1;
};
