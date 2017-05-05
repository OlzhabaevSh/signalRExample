declare var angular: any;
declare var $: any;

class MyController {

    public messages: string[];

    public message: string;

    public connectionId: string;

    public hub: any;

    static $inject = ['$scope'];
    constructor(private $scope: any) {
        
    }

    public init() {
        this.hub = $.connection.chatHub;

        this.hub.client.init = (connection: string, messages: string[]) => {
            this.messages = messages;
            this.connectionId = connection;
            this.$scope.$apply();
        };

        this.hub.client.newMessage = (message: string) => {
            this.messages.push(message);
            this.$scope.$apply();
        };

        $.connection.hub.start();
    }

    public send() {
        this.hub.server.send(this.message);
        this.message = "";
    }

}

angular.module('myApp', []).controller('myController', MyController);

