app.factory('channel', ['$http', 'socket', 'user', function($http, socket, user){

  function connect(name){

    const currentUser = user.current;

    function messages(){
      return $http.get(`/channel/${name}`);
    }

    function send(message){
      message.createdAt = Date.now();
      message.user = user.current ? user.current.name : 'anonymous';
      message.channel = name || 'general';

      socket.emit('message', message);

      message.me = true;

      return message;
    }

    function receive(eventHandler){
      socket.on('message', eventHandler);
    }

    return {messages, send, receive};
  }

  function list(){
    return $http.get('/channel/');
  }

  return {connect, list};

}]);
