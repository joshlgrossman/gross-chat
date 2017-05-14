app.component('channel', {

  templateUrl: 'template.html',

  controller: ['$scope', '$http', 'socket', 'user', function($scope, $http, socket, user){
    this.messages = [];
    this.currentUser = user.current();

    socket.on('message', message => {
      this.messages.push(message);
    });

    $scope.$on('message', (event, message) => {
      message.timestamp = Date.now();
      message.user = this.currentUser;
      
      this.messages.push(message);
      socket.emit('message', message);
    });

  }]

});
