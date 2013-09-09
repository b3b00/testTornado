angular.module('contacts', ['ui.bootstrap']);


function ContactsCtrl($rootScope, $http, $dialog) { //, Contact) {

    //$scope.delContact = Contact.delContact;
    //Contact.getAll();
    $rootScope.contacts = [{
        firstName: 'first1',
        lastName: 'last1',
        phoneNumber: 'phone1',
        id: 'id1'
    }, {
        firstName: 'first2',
        lastName: 'last2',
        phoneNumber: 'phone2',
        id: 'id2'
    }];
    



    getAll = function () {

        $http.get('/contacts/getAll').success(function (data) {
            $rootScope.contacts = data;
        });

    }

    $rootScope.getAll = getAll;

    rmContact = function (id) {
        $http.get('/contacts/delete/' + id).success(function (data) {
            $rootScope.contacts = data;
        });
    }

    $rootScope.rmContact = rmContact;


    function addContact(serialForm) {

        $http.post('/contacts/add', serialForm).success(function (data) {

            $rootScope.contacts = data;
        });

    }
    $rootScope.addContact = addContact;

    // -------------------- DIALOG START ---------------------------





    $rootScope.opts = {
        backdrop: false,
        keyboard: true,
        backdropClick: true,
        templateUrl: '/dialog/addContactDialog.html', // or template : tplString
        controller: 'addContactCtrl'
    };

    function updateData(data) {
	$rootScope.contacts = data;
    }
    
    
    $rootScope.openDialog = function () {
        var d = $dialog.dialog($rootScope.opts);
        d.open().then(function (result) {
            console.log(result);
            if (result && result.firstName && result.lastName && result.phoneNumber) {                
                serialForm = 'firstName=' + result.firstName + '&lastName=' + result.lastName + '&phoneNumber=' + result.phoneNumber + '';
                $http.get('/contacts/add?' + serialForm).success(function (data) {					
		    $rootScope.contacts = data;
                });
            }
        });
    }

    $rootScope.openMessageBox = function () {
        var title = 'This is a message box';
        var msg = 'This is the content of the message box';
        var btns = [{
            result: 'cancel',
            label: 'Cancel'
        }, {
            result: 'ok',
            label: 'OK',
            cssClass: 'btn-primary'
        }];

        $dialog.messageBox(title, msg, btns)
            .open()
            .then(function (first, last, phone) {
		console.log('closing(' + first + ',' + last + ',' + phone + ')');
            });
    };






    // -------------------- DIALOG END ---------------------------





    getAll();

}

function addContactCtrl($rootScope, dialog) {
    $rootScope.closeDlg = function (first, last, phone) {        
        dialog.close({
            'firstName': first,
            'lastName': last,
            'phoneNumber': phone
        });
    };
    
    $rootScope.cancelDlg = function () {        
        dialog.close();
    };
}