exports.testCustomStepFunc = function(parameters) {
	var customMgr = require('dw/object/CustomObjectMgr');
        	
	        var custObj = customMgr.getCustomObject("custData",parameters.MyParameter1);
	        customMgr.remove(custObj);
}