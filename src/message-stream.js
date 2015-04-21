/**
 * Created by scarratt on 21/04/2015.
 */

function MessageStream(options) {
    var self = this;
    options = options || {name: 'wiretap'};
    var backgroundPageConnection = chrome.runtime.connect({
        name: options.name
    });

    self.newMessageEvent = {};
    self.resetEvent = {};

    publisher.make(self.newMessageEvent);
    publisher.make(self.resetEvent);

    backgroundPageConnection.onMessage.addListener(function (message) {
        if (message.type === 'init') {
            self.resetEvent.publish();
        } else {
            self.newMessageEvent.publish(JSON.parse(message.data));
        }
    });

    self.start = function () {
        backgroundPageConnection.postMessage({tabId: chrome.devtools.inspectedWindow.tabId});
    };
}