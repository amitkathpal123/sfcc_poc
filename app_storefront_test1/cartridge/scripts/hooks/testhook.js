/**
 * is Page Designer page in Edit Mode
 */
function sendEmail(email1) {
	
	var Mail = require('dw/net/Mail');

    var email = new Mail();
    email.addTo("bibin.kt@publicissapient.com");
    email.setSubject("Test");
    email.setFrom("bibin.kt@publicissapient.com");
    email.setContent(email1);
    email.send();
}

module.exports = {
		sendEmail: sendEmail
	};