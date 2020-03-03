'use strict'; 
var base = module.superModule;


module.exports = function (product, apiProduct, type) {

    base.call(this, product, apiProduct, type);


    Object.defineProperty(product, 'myBrand', {

        enumerable: true,

        value:"test"

    });
    return product;
};