define(function (require, exports, module) {

    var http = require('plugins/http'); // Simpler wrapper for Ajax calls

    ko = require('knockout');

    function QueryView() {
        var self = this;

        // only way to fix the foreach loop for durandal
        self.data = ko.observableArray([]);

        self.activate = function() {

            return http.get('/data').then(function(response) {
                
                if (response.message == 1) {

                    // only way to fix the foreach loop for durandal
                    $.each(response.Incidents, function(index, item) {
                       self.data.push(item);
                    });


                } else {
                    $(location).attr('href', '/');
                }

            });
        }
    }

    module.exports = QueryView;
});