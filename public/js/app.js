angular.module('twaranApp',[])
	.controller("RegisterController",["$http","$scope","$timeout", "$location","$window" ,function($http,$scope,$timeout,$location,$window){

		
		$scope.user = {
			"institute" : "",
			"name" : "",
			"sName" : "",
			"fname" : "",
			"email" : "",
			"femail" : "",
			"mobile" : "",
			"sMobile" : "",
			"games" : [],
			"ggames" : []
		};

		$scope.status = false;

		$scope.games = ["Cricket", "Football", "Basketball", "Volleyball", "Lawn-Tennis", "Badminton", "Squash", "Athletics", "Triathlon", "Table Tennis", "Swimming","Snookers", "Carrom-Board", "Chess"];
		$scope.ggames = ["Basketball", "Volleyball", "Lawn-Tennis", "Badminton", "Squash", "Athletics", "Table Tennis", "Swimming","Snookers", "Carrom-Board", "Chess"];
		$scope.checked = [false,false,false,false,false,false,false,false,false,false,false,false,false,false];
		$scope.gchecked = [false,false,false,false,false,false,false,false,false,false,false];

		$scope.addUser = function(){
			if($scope.user.institute === "" || $scope.user.institute === undefined || $scope.user.institute === null) return;
			if($scope.user.email === "" || $scope.user.email === undefined || $scope.user.email === null) return;
			if($scope.user.femail === "" || $scope.user.femail === undefined || $scope.user.femail === null) return;
			if($scope.user.name === "" || $scope.user.name === undefined || $scope.user.name === null) return;
			if($scope.user.fname === "" || $scope.user.fname === undefined || $scope.user.fname === null) return;
			if($scope.user.sName === "" || $scope.user.sName === undefined || $scope.user.sName === null) return;
			if($scope.user.mobile === "" || $scope.user.mobile === undefined || $scope.user.sMobile === "" || $scope.user.sMobile === undefined || $scope.user.sMobile === null || $scope.user.mobile.length !== 10 || $scope.user.sMobile === null || $scope.user.sMobile.length !== 10 ) return;

			for(var i = 0; i < $scope.checked.length; i++){
				if($scope.checked[i] === true)
						$scope.user.games.push($scope.games[i]);
			}

			for(var i = 0; i < $scope.gchecked.length; i++){
				if($scope.gchecked[i] === true)
						$scope.user.ggames.push($scope.ggames[i]);
			}

			// if($scope.user.mobile[1] === "") $scope.user.mobile.splice(1,1);

			console.log($scope.user);
			// Post request to insert the comment in the mongo 
			$http.post("/insert",$scope.user)
	         .success(function(data){
	         	if(data.status == "OK"){
	         		$scope.status = true;
	         		$window.alert("Registration Successful !!");
	   					$scope.clear();
	         	} else {
	         		$window.alert("Registration UnSuccessful !!");
	         	}

	   				$location.path('/');
	         })
	         .error(function(err){
	                 console.log(err);
	         });

		};

	  $scope.clear = function(){
	  	$scope.checked = [false,false,false,false,false,false,false,false,false,false,false,false,false,false];
	  	$scope.user = {
			"institute" : "",
			"name" : "",
			"sName" : "",
			"email" : "",
			"mobile" : "",
			"sMobile" : "",
			"games" : []
		};
		$scope.status = true;
	  };
		
		$scope.fetch = function(){
			$http.get("/fetch")
	         .success(function(data){
	         	console.log(data);
	         	$scope.comments = data;
	         })
	         .error(function(err){
	                 console.log(err);
	         });
		};

	}]);