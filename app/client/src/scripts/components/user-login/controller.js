app.component('userLogin', {

  templateUrl: 'template.html',

  controller: ['$scope', function($scope){

    this.open = () => $scope.$broadcast('open');

  }]

});
