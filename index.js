'use strict';
const camelcaseKeys = require('camelcase-keys');

/* eslint prefer-const:0 */
/**
 * Will take any object property that is capitalized
 * and return it in camelCase.
 * @param { Object } obj The object to be mutated.
 * @param { Object } opts Options to pass to camelcaseKeys.
 * @returns { Object } The "camelized" object.
 */
function camelize(obj, opts) {
    for (let key in obj) {
        if (Array.isArray(obj[key])) {
            obj[key] = obj[key].map((item) => {
                return camelize(item, opts);
            });
        } else if (typeof obj === 'string') {
            return obj;
        } else if (typeof obj[key] === 'object' &&
            !(obj[key] instanceof Date) &&
            obj[key] !== null) {
            obj[key] = camelize(obj[key], opts);
        }
    }

    return camelcaseKeys(obj, opts);
}

module.exports = function(obj, opts) {
    return camelize(obj, opts);
};
