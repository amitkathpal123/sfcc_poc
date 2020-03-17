'use strict';
 

var base = module.superModule;
 

module.exports = function account(currentCustomer, addressModel, orderModel) {
    base.call(this, currentCustomer, addressModel, orderModel);
   this.profile=getUpdatedProfile(currentCustomer);
    
}
 
 
function getUpdatedProfile(currentCustomer) {
    var result;
    if (currentCustomer.profile) {
        result = {
            firstName: currentCustomer.profile.firstName,
            lastName: currentCustomer.profile.lastName,
            email: currentCustomer.profile.email,
            phone: currentCustomer.profile.phone,
            password: '********',
            haircolor: currentCustomer.raw.profile.custom.haircolor,
            skintone: currentCustomer.raw.profile.custom.skintone,
            skintype: currentCustomer.raw.profile.custom.skintype,
            eyecolor: currentCustomer.raw.profile.custom.eyecolor
            
        };
    } else {
        result = null;
    }
    return result;
}