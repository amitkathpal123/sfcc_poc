'use strict';

var server = require('server');
var page = module.superModule;        
	server.extend(page);

server.append(
    'SubmitRegistration',
    function (req, res, next) {
        
    	var CustomerMgr = require('dw/customer/CustomerMgr');
        var Resource = require('dw/web/Resource');
        var oldHandler = this.listeners('route:BeforeComplete');
        	
        	this.off('route:BeforeComplete');
        	this.on('route:BeforeComplete', function (req, res) { 
        		
        		if (oldHandler[0]) {
        			oldHandler[0].call(this, req, res); 
        		}
                var Transaction = require('dw/system/Transaction');
                var authenticatedCustomer;
                var serverError;
                var registrationForm = res.getViewData();

                if (registrationForm.validForm) {
                    var login = registrationForm.email;
                    var password = registrationForm.form.login.password.value;

                    try {
                        Transaction.wrap(function () {
                            var error = {};
                            var authenticateCustomerResult = CustomerMgr.authenticateCustomer(login, password);
                            if (authenticateCustomerResult.status !== 'AUTH_OK') {
                                error = { authError: true, status: authenticateCustomerResult.status };
                                throw error;
                            }

                            authenticatedCustomer = CustomerMgr.loginCustomer(authenticateCustomerResult, false);

                            if (!authenticatedCustomer) {
                                error = { authError: true, status: authenticateCustomerResult.status };
                                throw error;
                            } else {
                                // assign values to the profile
                                var newCustomerProfile = authenticatedCustomer.profile;
                                newCustomerProfile.custom.haircolor = registrationForm.form.customer.haircolor.value;
                                newCustomerProfile.custom.skintone = registrationForm.form.customer.skintone.value;
                                newCustomerProfile.custom.skintype = registrationForm.form.customer.skintype.value;
                                newCustomerProfile.custom.eyecolor = registrationForm.form.customer.eyecolor.value;

                            }
                        });
                    } catch (e) {
                        if (e.authError) {
                            serverError = true;
                        } else {
                            registrationForm.validForm = false;
                            registrationForm.form.customer.email.valid = false;
                            registrationForm.form.customer.emailconfirm.valid = false;
                            registrationForm.form.customer.email.error =
                                Resource.msg('error.message.username.invalid', 'forms', null);
                        }
                    }
                }
            });
        
        next();
    }
);

module.exports = server.exports();
