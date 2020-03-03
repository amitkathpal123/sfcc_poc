'use strict';

var server = require('server');

server.get('Display', function (req, res, next) {
    res.setStatusCode(200);
    res.json({age:'35'});
    next();
});

server.get(
	    'Register',
	    function (req, res, next) {

	        var registerForm = server.forms.getForm('register');
	        registerForm.clear();
	        res.render('account/register', {
	            profileForm: registerForm
	        });
	        next();
	    }
	);

server.post(
	    'SubmitProfile',
	    function (req, res, next) {
	        
	        var formErrors = require('*/cartridge/scripts/formErrors');
	        var profileForm = server.forms.getForm('register');
	        var profileFormErrors = formErrors.getFormErrors(profileForm);

	        if (profileForm.customer.firstname.value == "bibin") {
	        	profileForm.customer.firstname.valid = false;
	            //profileForm.customer.firstname.error ="Not acceptable !!";
	            profileForm.valid = false;
	        }
            var Transaction = require('dw/system/Transaction');
	        var customMgr = require('dw/object/CustomObjectMgr');
	        try {
                Transaction.wrap(function () {
                	
        	        var custObj = customMgr.createCustomObject("custData",profileForm.customer.firstname.value);
        	        var email = "bibin.kt@publicissapient.com";
        	        
        	        var allObj = customMgr.getAllCustomObjects("custData");
        	        
        	        dw.system.HookMgr.callHook('testEmail' ,'sendEmail', allObj.asList());
                });
            } catch (e) {}
	        				
	        if (Object.keys(profileFormErrors).length > 0) {
	        	res.json({
	        		profileForm: profileForm,
	                fieldErrors: [profileFormErrors],
	                serverErrors: [],
	                error: true
	            });
	        
	        }else{
	        	var result = {
	    	            firstName: profileForm.customer.firstname.value,
	    	            profileForm: profileForm
	    	        };
	    	         res.setViewData(result);
	    	         res.render('account/display');
	        }
	        return next();
	    }
	);

module.exports = server.exports();