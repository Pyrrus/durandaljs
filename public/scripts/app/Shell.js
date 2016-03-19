define(function (require, exports, module) {

    var router = require('plugins/router');


    function Shell() {
    
        var self = this;

        self.router = router;

        self.activate = function () {

            router.map([
            
                { route: '', title: 'Login', moduleId: 'login/LoginView', nav: true },
                
                { route: 'query', title: 'query', moduleId: 'query/QueryView', nav: true }
            ]);

            return router.activate();
        }
    }

    module.exports = Shell;
});