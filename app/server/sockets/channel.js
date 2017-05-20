const shell = require('../shell');
const Socket = require('./Socket');
const Message = require('../documents/Message');

module.exports = Socket.extend(function(io){

  this.on('message', message => {
    this.broadcast.emit('message', message);
    new Message.Model(message).save().catch(shell.trace);
  });

});
