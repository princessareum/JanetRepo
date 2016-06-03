"use strict";

angular.module("janet", ["ui.router", "ngAnimate"]).config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/home");
  $stateProvider.state("home", {
    url: "/home",
    templateUrl: "./customers/views/homeView.html",
    controller: "homeCtrl"
  }).state("productDetails", {
    url: "/productDetails",
    templateUrl: "./customers/views/productDetailsView.html",
    controller: "productDetailsCtrl"
  }).state("cart", {
    url: "/cart",
    templateUrl: "./customers/views/cartView.html",
    controller: "cartCtrl"
  }).state("settings", {
    url: "/settings",
    templateUrl: "./customers/views/customerSettingsView.html",
    controller: "settingsCtrl"
  })

  // ADMIN SIDE VIEWS =============================
  .state("admin", {
    url: "/admin",
    templateUrl: "./admin/adminView.html",
    controller: "adminCtrl"
  }).state("adminProductView", {
    url: "/adminProductView",
    templateUrl: "./admin/adminProductView.html",
    controller: "adminCtrl"
  });

});

angular.module("janet").controller("adminCtrl", function ($scope, adminService) {
  $scope.showProducts = function () {
    adminService.getProducts().then(function (response) {
      console.log(response);
      $scope.products = response;
    });
  };

  $scope.showProducts();

  $scope.addNewProduct = function (newProduct) {
    adminService.createProduct(newProduct).then(function (response) {
      $scope.showProducts();
      $scope.newProduct = response;
    });
  };

  $scope.editProduct = function (product) {
    adminService.updateSingleProduct(product).then(function () {
      $scope.showProducts();
    });
  };

  $scope.id = product._id;

  $scope.deleteProduct = function (id) {
    adminService.deleteProduct(id).then(function () {
      $scope.showProducts();
    });
  };
});

angular.module("janet").service("adminService", function ($http) {
  this.getProducts = function () {
    return $http({
      method: "GET",
      url: "/api/products" }).then(function (response) {
      return response.data;
    });
  };

  this.createProduct = function (newProduct) {
    return $http({
      method: "POST",
      url: "/api/products",
      data: newProduct
    }).then(function (response) {
      return response.data;
    });
  };

  this.updateSingleProduct = function (product) {
    return $http({
      method: "PUT",
      url: "/api/products/:id",
      data: {
        name: product.name,
        description: product.description,
        seller: product.seller,
        retailPrice: product.retailPrice,
        discountPrice: product.discountPrice,
        qty: product.qty,
        images: product.images,
        color: product.color,
        size: product.size,
        material: product.material,
        category: product.category,
        parent: product.parent
      }
    }).then(function (response) {
      return response.data;
    });
  };

  this.deleteSingleProduct = function (id) {
    return $http({
      method: "DELETE",
      url: "/api/products/" + product._id
    });
  };


});

angular.module("janet").controller("cartCtrl", function ($scope) {});

angular.module("janet").controller("homeCtrl", function ($scope) {
  console.log("testing");
});

angular.module("janet").controller("loginSignupCtrl", function ($scope) {});

angular.module("janet").controller("productDetailsCtrl", function ($scope) {









  function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor(t / 1000 % 60);
    var minutes = Math.floor(t / 1000 / 60 % 60);
    var hours = Math.floor(t / (1000 * 60 * 60) % 24);
    //   var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      total: t,
      // 'days': days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  }

  function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    //   var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector(".hours");
    var minutesSpan = clock.querySelector(".minutes");
    var secondsSpan = clock.querySelector(".seconds");

    function updateClock() {
      var t = getTimeRemaining(endtime);

      // daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
      minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
      secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);

      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
  }

  var deadline = new Date(Date.parse(new Date()) + 24 * 60 * 60 * 1000);
  initializeClock("clockdiv", deadline);
});

angular.module("janet").controller("settingsCtrl", function ($scope) {});

angular.module("janet").directive("footerDirective", function () {
  return {
    restrict: "E",
    templateUrl: "./customers/views/footerView.html"
  };
});

angular.module("janet").directive("loginSignupDirective", function () {
  return {
    restrict: "E",
    templateUrl: "./customers/views/loginSignupView.html"
  };
});

angular.module("janet").directive("navDirective", function () {
  return {
    restrict: "E",
    templateUrl: "./customers/views/navView.html"
  };
});

angular.module("janet").directive("productDetailsDirective", function () {
  return {
    restrict: "E",
    templateUrl: "./customers/views/productDetailsView.html"
  };
});

angular.module("janet").service("cartService", function ($http) {});

angular.module("janet").service("customerService", function ($http) {});

angular.module("janet").service("productsService", function ($http) {});