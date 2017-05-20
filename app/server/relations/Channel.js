const Bookshelf = require('../utils/bookshelf');
const shell = require('../shell');
const tableName = 'channels';

require('./User');
const Channel = Bookshelf.model('Channel', {

  tableName,

  users(){ return this.belongsToMany('User').through('Membership'); }

});

module.exports = {
  Model: Channel,
  Collection: Bookshelf.Collection.extend({model: Channel}),
  get QueryBuilder(){ return Bookshelf.knex(tableName) },
  get Query(){ return Bookshelf.knex.raw }
}
