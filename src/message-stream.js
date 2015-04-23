/**
 * Created by scarratt on 21/04/2015.
 */

function MessageStream(params) {
    var self = this,
        excludeSystemMessages = ko.observable(true);

    params = params || {name: 'wiretap'};
    var backgroundPageConnection = chrome.runtime.connect({
        name: params.name
    });

    self.newMessageEvent = {};
    self.resetEvent = {};
    self.excludeSystemMessages = excludeSystemMessages;
    self.reset= function(){
        self.resetEvent.publish();
    };

    publisher.make(self.newMessageEvent);
    publisher.make(self.resetEvent);

    backgroundPageConnection.onMessage.addListener(function (message) {
        if (message.type === 'init') {
            self.resetEvent.publish();
        } else {
            var event = message.data;

            if (params.eventFilter.eventAllowed(event)){ // excludeSystemMessages() || (excludeSystemMessages() && event.channel != 'postal')){
                self.newMessageEvent.publish(event);
            }
        }
    });

    self.start = function () {
        backgroundPageConnection.postMessage({tabId: chrome.devtools.inspectedWindow.tabId});
    };
}