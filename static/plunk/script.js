
angular.module('contacts', ['ui.bootstrap']);

function ContactsCtrl($scope, $dialog){

  // Inlined template for demo
  var t = '<div class="modal-header">'+
          '<h3>This is the title</h3>'+
          '</div>'+
          '<div class="modal-body">'+
          '<p>Enter a value to pass to <code>close</code> as the result: <input ng-model="result" /></p>'+
          '</div>'+
          '<div class="modal-footer">'+
          '<button ng-click="close(result)" class="btn btn-primary" >Close</button>'+
          '</div>';

  $scope.opts = {
    backdrop: true,
    keyboard: true,
    backdropClick: true,
    templateUrl: 'dialog/addContact.html',
    controller: 'addContactCtrl'
  };

  $scope.openDialog = function(){
    var d = $dialog.dialog($scope.opts);
    d.open().then(function(result){		
		console.log(result);
      if(result.firstName && result.lastName && result.phoneNumber)
      {	  
       console.log('AT LEAST ! dialog closed with result:('+result.firstName+' - '+result.lastName +' :'+result.phoneNumber+')');
      }
    });
  };

  $scope.openMessageBox = function(){
    var title = 'This is a message box';
    var msg = 'This is the content of the message box';
    var btns = [{result:'cancel', label: 'Cancel'}, {result:'ok', label: 'OK', cssClass: 'btn-primary'}];

    $dialog.messageBox(title, msg, btns)
      .open()
      .then(function(first,last,phone){
        console.log('closing('+first+','+last+','+phone+')');
    });
  };

  
}

function addContactCtrl($scope, dialog){ 
	$scope.closeDlg = function(first,last,phone){
	console.log('in closeDlg('+first+','+last+','+phone+')');
    dialog.close({'firstName':first,'lastName':last,'phoneNumber':phone});
  };
}