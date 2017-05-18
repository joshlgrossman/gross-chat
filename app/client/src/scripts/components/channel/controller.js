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
      message.timestamp = new Date(message.timestamp);

      if(lastMessage && lastMessage.user === message.user &&
        message.timestamp - lastMessage.timestamp < 60000){
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
      .then(({data}) => data.forEach(push));
    };

  }]

});
