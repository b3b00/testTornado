


contactsService = angular.module('contactsServices', ['http']);
'use strict';



/*
/* Services */
/*
contactsServices.
    factory('Contact', function($http){
		return  { getAll : function() {

							$http.get('/contacts/getAll').success(function(data) {
								$scope.contacts = data;
				
										});
		  
					}
				  delContact : function(id) {		
							$http.get('/contacts/getAll').success(function(data) { 
								alert('delete contact ['+id+']');
								console.log(data);
								});
					}
				};			
	});*/


// ------------------------
contactsService.provider('Contact', ContactProvider);

function ContactProvider() {
    this.$get = function ($http) {
        return  { getAll : function() {

							$http.get('/contacts/getAll').success(function(data) {
								$scope.contacts = data;
				
										});
		  
					},
				  delContact : function(id) {		
							$http.get('/contacts/getAll').success(function(data) { 
								alert('delete contact ['+id+']');
								console.log(data);
								});
					}
				};	
    };
}