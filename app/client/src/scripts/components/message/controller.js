app.component('message', {

  templateUrl: 'template.html',

  bindings: {
    message: '<'
  },

  controller: ['user', function(user){
    this.me = user.is(this.message.user);
  }]

});
