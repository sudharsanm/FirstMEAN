var myApp = angular.module('trackDetailApp',[]);

myApp.controller('TrackDetailCtrl', ['$scope','$http',
function($scope,$http){
    
    var refresh = function() {
        console.log('Inside response');
        $http.get('/trackDetail',{params :{"MonthYear": GetYearMonth(new Date())}}).success(function(response) {
            $scope.trackList = response;   
            $scope.track = "";
        });
    };
    
    var GetYearMonth = function (date) {
        var year=date.getFullYear();
        var month=date.getMonth()+1;
            if (month<10){
            month="0" + month;
            };
        var day=date.getDate();   
        return year + "-" + month; 
    }
    
    refresh();
    
    $scope.deleteTrackDetail = function(id) {
        console.log(id);
        $http.delete('/trackDetail/'+ id).then(
            function (success) {
                console.log('Delete Success');
                refresh();
            },
            function (error) {
                console.log('Delete falied');
            }
        );
    };
     
     $scope.editTrackDetail = function(id) {
        console.log(id);
        $http.get('/trackDetail/'+ id).then(
            function (success) {
                console.log('GET By ID Success' + success.data);
                $scope.track = success.data;
            },
            function (error) {
                console.log('GET By ID falied');
            }
        );
     };
     
     $scope.updateTrackDetail = function() {
         console.log('Put ' + $scope.catgory._id);
        $http.put('/trackDetail/'+ $scope.track._id, $scope.Amount, $scope.TrackDate).then(
            function (success) {
                console.log('Put Success');
                refresh();
            },
            function (error) {
                console.log('Put falied');
            }
        );
    };
    
    $scope.clearTrackDetail = function() {
        $scope.track = "";
    };
}]);

// function CategoryCtrl()
// {
//     console.log("Hello World from controller");
    

    
// }