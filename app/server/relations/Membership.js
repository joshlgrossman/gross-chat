const Bookshelf = require('../utils/bookshelf');
const shell = require('../shell');
const tableName = 'memberships';

require('./User');
require('./Channel');
const Membership = Bookshelf.model('Membership', {

  tableName,

  user(){ return this.belongsTo('User'); },
  channel(){ return this.belongsTo('Channel'); }

});

module.exports = {
  Model: Membership,
  Collection: Bookshelf.Collection.extend({model: Membership}),
  get QueryBuilder(){ return Bookshelf.knex(tableName) },
  get Query(){ return Bookshelf.knex.raw }
}
