app.factory('user', ['$cookies', '$http', '$rootScope', '$q', function($cookies, $http, $rootScope, $q){

	let current = $cookies.getObject('user');

	function register({name, password}){
		return $http.post('/user/register', {name, password})
		.then(user => {
			return current = user;
		});
	}

	function login({name, password}){
		return $http.post('/user/authenticate', {name, password})
		.then(user => {
			return current = user;
		});
	}

	function logout(){
		return $q((resolve, reject) => {
			if(!current) return reject();
			current = undefined;
			$cookies.putObject('user', undefined);
			resolve();
		});
	}

	function is(name){
		return current && current.name === name;
	}

	return {
		register,
		login,
		logout,
		is,
		get current(){ return current; }
	};

}]);
