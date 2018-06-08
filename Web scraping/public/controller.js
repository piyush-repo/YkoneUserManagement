"use strict";

var app = angular.module('myapp', [])

app.controller('userController', function ($scope, $http) {
    $scope.show = false;
    $scope.listUsers;
    $scope.searchText;
    $scope.name;
    $scope.email;
    $scope.company;
    $scope.zip;
    $scope.phone;
    $scope.countryCode = "+91";


    function listUsersFunc() {
        $http.get("http://localhost:4000/client/listAll").then((result) => {
            console.log(result);
            $scope.listUsers = result.data.payload;
        })
    }
    $scope.deleteUser = function (email) {
        $http.delete("http://localhost:4000/client/" + email).then((success) => {
            listUsersFunc();
            console.log("delete : ", email);
        })
    }
    $scope.updateUser = function (email) {
        console.log("update : ", email);
    }
    $scope.search = function (text) {
        $http.get("http://localhost:4000/client/search?searchtext=" + text).then((result) => {
            if (result.data.payload.length > 0) {
                console.log("hello");
                $scope.listUsers = result.data.payload;
            }
            else {
                listUsersFunc();
            }
            console.log("searchtext ", text);
        })
    }

    $scope.showCreate = function () {
        if ($scope.show) {
            $scope.show = false;
        }
        else {
            $scope.show = true;
        }
    }

    $scope.Create = function () {
        let data = {
            name: $scope.name,
            email: $scope.email,
            company: $scope.company,
            zip: $scope.zip,
            phone: $scope.phone,
            countryCode: $scope.countryCode
        }
        $http.post("http://localhost:4000/client/create", data).then((success) => {
            listUsersFunc();
        })
        $scope.show = false;
    }

    $scope.getUser = function (data) {
        //console.log(JSON.stringify(data));
        alert("name : " + data.name + " email : " + data.email + " company : " + data.company + " Phone : " + data.countryCode + data.phone + " zip : " + data.zip);
    }

    listUsersFunc();
})