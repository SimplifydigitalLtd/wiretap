/**
 * Created by scarratt on 21/04/2015.
 */


function MessageCollection(wireTapConnection) {
    var self = this,
        allLogs = ko.observableArray([]),
        filterSystemMessages = ko.observable(true);


    wireTapConnection.listenForMessages(function (message) {
        if (message.type === 'init') {
            allLogs([]);
        } else {
            allLogs.unshift(JSON.parse(message.data));
        }
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