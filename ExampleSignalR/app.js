var MyController = (function () {
    function MyController($scope) {
        this.$scope = $scope;
    }
    MyController.prototype.init = function () {
        var _this = this;
        this.hub = $.connection.chatHub;
        this.hub.client.init = function (connection, messages) {
            _this.messages = messages;
            _this.connectionId = connection;
            _this.$scope.$apply();
        };
        this.hub.client.newMessage = function (message) {
            _this.messages.push(message);
            _this.$scope.$apply();
        };
        $.connection.hub.start();
    };
    MyController.prototype.send = function () {
        this.hub.server.send(this.message);
        this.message = "";
    };
    return MyController;
}());
MyController.$inject = ['$scope'];
angular.module('myApp', []).controller('myController', MyController);
//# sourceMappingURL=app.js.map