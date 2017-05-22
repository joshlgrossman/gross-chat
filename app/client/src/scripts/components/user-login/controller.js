app.component('userLogin', {

  templateUrl: 'template.html',

  controller: ['$scope', 'user', function($scope, user){

    this.open = () => $scope.open();

    this.submit = () => {
      if(!this.name || !this.password) return;
      user.login(this);
    };

  }]

});
