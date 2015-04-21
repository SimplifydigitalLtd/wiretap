/**
 * Created by scarratt on 21/04/2015.
 */


function MessageCollection(messageStream) {
    var self = this,
        allLogs = ko.observableArray([]),
        filterSystemMessages = ko.observable(true);

    messageStream.resetEvent.addSubscriber(function () {
        allLogs([]);
    });

    messageStream.newMessageEvent.addSubscriber(function (message) {
        allLogs.unshift(message);
    });

    return {
        messages: ko.computed(function () {
            if (filterSystemMessages()) {
                return _.filter(allLogs(), function (event) {
                    return event.channel != 'postal';
                });
            } else {
                return allLogs();
            }

        }),
        filterSystemMessages: filterSystemMessages,
        clear: function () {
            allLogs([]);
        }
    }
}