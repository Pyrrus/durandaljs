define(function (require, exports, module) {

	var http = require('plugins/http'); // Simpler wrapper for Ajax calls

	ko = require('knockout');

    function LoginView() {

        var self = this;

        self.activate = function() {

            return http.get('/data').then(function(response) {
                console.log(response.message);
                if (response.message == 1) {

                   $(location).attr('href', '/#/query');

                } 

            });
        }
    }
    
    return {
            user: {
                user: ko.observable(),
                password: ko.observable()
            },
       
            post: function () {
                url ="/login";

                var user = {
                    password: this.user.pass,
                    username: this.user.pass2
                }
                
                http.post(url,user).then(function(response){
                        if (response.name == "admin")
                            $(location).attr('href', '/#/query');
                });
            }
        };
   
});