app.component('channel', {

  templateUrl: 'template.html',

  bindings: {
    name: '<'
  },

  controller: ['$scope', 'channel', function($scope, channel){
    this.messages = [];
    this.name = this.name || 'general';
    this.connection = channel.connect(this.name);

    const push = message => {
      const lastMessage = this.messages[this.messages.length - 1];
      message.createdAt = new Date(message.createdAt);

      if(lastMessage &&
        lastMessage.me === message.me &&
        lastMessage.user === message.user &&
        message.createdAt - lastMessage.createdAt < 60000){
        lastMessage.contents.push(message.contents[0]);
        return;
      }

      this.messages.push(message);
    };

    this.connection.receive(push);

    $scope.$on('message', (event, message) => {
      push(this.connection.send(message));
    });

    this.$onInit = () => {
      this.connection.messages()
      .then(({data}) => data.forEach(push))
    };

  }]

});
