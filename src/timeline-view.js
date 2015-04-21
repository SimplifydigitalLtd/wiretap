/**
 * Created by scarratt on 21/04/2015.
 */

function TimelineView(params) {
    var self = this,
        stream = params.stream,
        groupedMessages = ko.observableArray([]);

    stream.resetEvent.addSubscriber(function () {
        groupedMessages([]);
    });

    stream.newMessageEvent.addSubscriber(function (message) {
        var messageTime = moment(message.timeStamp).format('MMMM Do YYYY, h:mm:s a');

        var targetGroup = _.find(groupedMessages(), {timestamp: messageTime});

        if (targetGroup) {
            targetGroup.messages.unshift(message)
        } else {
            groupedMessages.unshift({
                visible: ko.observable(false),
                messages: ko.observableArray([message]),
                timestamp: messageTime
            })
        }
    });

    self.groupedMessages = groupedMessages;
}