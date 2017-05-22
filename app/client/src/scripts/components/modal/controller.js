app.directive('modal', function(){
  return {

    templateUrl: 'template.html',
    transclude: true,
    scope: {
      heading: '@'
    },

    link: function($scope, element, attrs){
      element.addClass('modal');

      $scope.close = () => element.removeClass('open');
      $scope.$on('open', event => element.addClass('open'));
    }

  };
});
