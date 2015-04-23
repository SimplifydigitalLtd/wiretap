/**
 * Created by scarratt on 21/04/2015.
 */


function MessageCollection(messageStream) {
    var self = this,
        allLogs = ko.observableArray([]);

    messageStream.resetEvent.addSubscriber(function () {
        allLogs([]);
    });

    messageStream.newMessageEvent.addSubscriber(function (message) {
        allLogs.unshift(message);
    });

    return {
        messages: ko.computed(function () {
            return allLogs();
        }),
        clear: function () {
            allLogs([]);
        }
    }
}