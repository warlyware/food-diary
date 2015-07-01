console.log('Loaded script');

var app = angular.module("bmiApp", []);

app.controller("MainCtrl", function($scope, $http, User, Food) {
  $scope.showUserForm = function() {
    console.log('Angular!');
  }
  $scope.saveFood = function(user, food) {
    console.log('user: ' + user.age, 'food: ' + food);
    var newUser = new User(user);
    var newFood = new Food(food);
    console.log(newUser);
    console.log(newFood);
    $scope.user = newUser;
    $scope.foods = newFood;
    $http.post("/user", {user: newUser}).success(function(data) {
      console.log(data);
      // $scope.quotes.push(data.quote);
      // $scope.newQuote = "";
    }).catch(function(err) {
      console.log(err);
    });

    $http.post("/food", {user: newFood}).success(function(data) {
      console.log(data);
      // $scope.quotes.push(data.quote);
      // $scope.newQuote = "";
    }).catch(function(err) {
      console.log(err);
    });    
  }
});

app.factory("User", function() {
  // Define the User function
  var User = function(user) {
    this.name = user.name;
    this.age = user.age;
    this.weight = user.weight;
    this.height = user.height;
    this.gender = user.gender;
    this.unit = user.unit
  };
 
  // Return a reference to the function
  return (User);
});

app.factory("Food", function() {
  // Define the User function
  var Food = function(food) {
    this.desc = food.desc;
    this.meal = food.meal;
    this.calories = food.calories;
    this.servings = food.servings;
  };
 
  // Return a reference to the function
  return (Food);
});