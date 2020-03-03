'use strict';

var server = require('server');
var page = module.superModule;  
server.extend(page);

var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');

server.append(
    'Show',
    consentTracking.consent,
    server.middleware.https,
    csrfProtection.generateToken,
    function (req, res, next) {

        var data = res.getViewData()||{};

        var Site = require('dw/system/Site');
        var beautyAttributes = JSON.parse(Site.getCurrent().getCustomPreferenceValue('beautyAttributes'), function(key, value) {
            return value;
        });
        data.beautyAttributes=beautyAttributes;

        // res.setViewData({
        //     beautyAttributes:beautyAttributes
        // });
        res.setViewData(data);
        
        return next();
    });

  
module.exports = server.exports();
