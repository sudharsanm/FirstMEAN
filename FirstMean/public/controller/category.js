var myApp = angular.module('myApp',
[]);
//   ["ngRoute"])
//  .config(function ($routeProvider) {
//      $routeProvider
//      .when("/Track",{
//          templateUrl:"Track.html",
//          controller : "TrackCtrl"
//      })
//      .when("/",{
//          templateUrl:"index.html",
//          controller : "CategoryCtrl"
//      })
//  });
myApp.controller('CategoryCtrl', ['$scope','$http',
function($scope,$http){
    console.log("Hello World from controller");
    
    var refresh = function() {
        console.log('Inside response');
        $http.get('/categories').success(function(response) {
            console.log('Received response1');
            $scope.categoryList = response;   
            $scope.catgory = "";
        });
    };
    
    console.log('before calling response1');
    refresh();
    
    $scope.addCategory = function() {
        //console.log($scope.catgory);
        $http.post('/categories',$scope.catgory).then(
            function(response) {
            console.log('calling response after add');
            console.log(response);
            refresh();
        },
        function(error) {
            refresh();
            console.log('Error Block'+ error);
        });
    };
    
    $scope.deleteCategory = function(id) {
        console.log(id);
        $http.delete('/categories/'+ id).then(
            function (success) {
                console.log('Delete Success');
                refresh();
            },
            function (error) {
                console.log('Delete falied');
            }
        );
    };
     
     $scope.editCategory = function(id) {
        console.log(id);
        $http.get('/categories/'+ id).then(
            function (success) {
                console.log('GET By ID Success' + success.data);
                $scope.catgory = success.data;
                console.log('GET By ID Success' + success.data.CategoryName);
            },
            function (error) {
                console.log('GET By ID falied');
            }
        );
     };
     
     $scope.updateCategory = function() {
         console.log('Put ' + $scope.catgory._id);
        $http.put('/categories/'+ $scope.catgory._id, $scope.catgory).then(
            function (success) {
                console.log('Put Success');
                refresh();
            },
            function (error) {
                console.log('Put falied');
            }
        );
    };
    
    $scope.clearCategory = function() {
        $scope.catgory = "";
    };
}]);

// function CategoryCtrl()
// {
//     console.log("Hello World from controller");
    

    
// }