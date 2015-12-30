var log = require('../utils/logmanager')();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * User schema
 */

var BearSchema = new Schema({
  name: { type: String, default: '' , unique:true},
  type: { type: String, default: 'Brown' }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */

BearSchema.method({

});

/**
 * Statics
 */

BearSchema.static({

});

/**
 * Register
 */
var Bear = mongoose.model('Bear', BearSchema);
module.exports = Bear;