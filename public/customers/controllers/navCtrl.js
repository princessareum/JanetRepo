angular.module('janet').controller('navCtrl', function($scope, customerService, $state){

  $scope.currentUser = function(){
    customerService.currentUser().then(function(response){
      $scope.user = response;
    })
  }();

  $scope.modalShown = false;
  $scope.toggleModal = ()=>{
    $scope.modalShown = !$scope.modalShown;
    location.reload();
  };

  $scope.logout = function(){
    customerService.logout().then(function(response){
      swal('You are logged out!!')
      $state.go('home');
      location.reload();
    });
  };



});
