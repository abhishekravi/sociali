﻿app.controller("LoginController", function ($scope, $http, $rootScope, $location, UserService, MyEventsService, PreferenceService) {
    $scope.currentUser = null;
    $rootScope.currentUser = null;
    $scope.preferences = null;
    $rootScope.preferences = null;
    $scope.invalid = false;

    $scope.login = function (user) {
        $http.post("/api/login", user)
         .success(function (response) {

             //console.log(response);
             $rootScope.currentUser = response;
             $scope.currentUser = response;
             $scope.invalid = false;

             var username = response.username;
             UserService.getUserDetails(username, function (response) {
                 //console.log(response);
                 $scope.userDetails = response;
                 $rootScope.userDetails = response;
             });

             PreferenceService.getUserPreferences(username, function (response) {
                 if(response) {
                     console.log(response);
                     $scope.preferences = response.preferences;
                     $rootScope.preferences = response.preferences;
                     $rootScope.distance = response.distance;
                 }
             });

             MyEventsService.getUserEvents(username, function(response){
                 if(response){
                     $scope.myEvents = response;
                     $rootScope.myEvents = response;
                     console.log($rootScope.myEvents);
                 }
             });

             $location.url("/events/");
         })
         .error(function (response) {
             console.log("username or password is incorrect");
             $scope.invalid = true;
             console.log(response);
         });
    }

/*    $scope.login = function (user) {
        alert("In login ctrl ");
        AuthenticationService.login(user, function (response) {
                alert("In success of loginctrl");
                console.log(response);
                $rootScope.currentUser = response;
                $scope.currentUser = response;
                $scope.invalid = false;

                var username = response.username;
                UserService.getUserDetails(username, function (response) {
                    console.log(response);
                    $scope.userDetails = response;
                    $rootScope.userDetails = response;
                })
                $location.url("/events/");

        })
    };*/


    $scope.change = function (response) {
        $scope.invalid = false;
    }
});