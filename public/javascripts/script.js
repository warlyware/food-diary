console.log('Loaded script');

var app = angular.module("bmiApp", []);

app.controller("MainCtrl", function($scope, $http, User, Food) {
  $scope.showUserForm = function() {
    console.log('Angular!');
  }

  $scope.deleteEntry = function(index) {
    console.log(index);
    $scope.foods.splice(index, 1)
  }

  var editingIndex;
  var editing = false;
  $scope.editEntry = function(index) {
    console.log(index);
    $scope.food = $scope.foods[index];
    editing = true;
    editingIndex = index;
  }

  var foodsArray = [];
  var usersArray = [];

  $scope.saveUser = function(user) {
    var newUser = new User(user);
    usersArray.push(newUser); 
    $scope.user = newUser;
    $http.post("/user", {user: newUser}).success(function(data) {
      console.log(data);
    }).catch(function(err) {
      console.log(err);
    });
  }

  $scope.saveFood = function(food) {
    var newFood = new Food(food);
    foodsArray.push(newFood);
    console.log(editing);
    // if (editing === true) {
    //   $scope.foods[editingIndex] = food;
    $scope.foods = foodsArray;

    computeWeight();
    computeBMI();

    $http.post("/food", {food: newFood}).success(function(data) {
      console.log(data);
      $scope.food = [];
      // $scope.quotes.push(data.quote);
      // $scope.newQuote = "";
    }).catch(function(err) {
      console.log(err);
    });
  }

  function computeWeight() {
    var totalCalories = $scope.foods.reduce(function(accumulator, food) {
      return accumulator + (food.calories * food.servings);
    }, 0);
    $scope.weightGained = totalCalories / 3500;
    $scope.currentWeight = $scope.user.weight + $scope.weightGained;
  }

  function computeBMI() {
    var inches = $scope.user.height;
    $scope.bmi = ($scope.user.weight * 703) / Math.pow(inches, 2);
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
  var today = new Date();
  var todayFormatted = today.toLocaleDateString();
  var Food = function(food) {
    this.desc = food.desc;
    this.meal = food.meal;
    this.calories = food.calories;
    this.servings = food.servings;
    this.date = todayFormatted;
  };
 
  // Return a reference to the function
  return (Food);
});