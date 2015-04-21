/**
 * Created by scarratt on 21/04/2015.
 */


function ChannelView(params) {
    var self = this,
        stream = params.stream,
        groupedMessages = ko.observableArray([]);

    stream.resetEvent.addSubscriber(function () {
        groupedMessages([]);
    });

    stream.newMessageEvent.addSubscriber(function (message) {
        var channelName = message.channel;

        var targetGroup = _.find(groupedMessages(), {channel: channelName});

        if (targetGroup) {
            targetGroup.messages.unshift(message)
        } else {
            groupedMessages.unshift({
                visible: ko.observable(false),
                messages: ko.observableArray([message]),
                channel: channelName
            })
        }
    });

    self.groupedMessages = groupedMessages;
}