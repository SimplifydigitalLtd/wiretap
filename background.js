/**
 * Created by scarratt on 20/04/2015.
 */

var devtoolConnections = {};

chrome.tabs.onUpdated.addListener(function (tabId, info) {
    if (info.status == "loading") {
        var devtoolConnection = devtoolConnections[tabId];
        if (devtoolConnection) {
            injectPostalDiagnostics(tabId);
        }
    }
});

chrome.runtime.onConnect.addListener(function (devToolsConnection) {
    // assign the listener function to a variable so we can remove it later
    var devToolsListener = function (message, sender, sendResponse) {
        devtoolConnections[message.tabId] = devToolsConnection;
        // Inject a content script into the identified tab
        injectPostalDiagnostics(message.tabId);
    };

    // add the listener
    devToolsConnection.onMessage.addListener(devToolsListener);

    devToolsConnection.onDisconnect.addListener(function () {
        devToolsConnection.onMessage.removeListener(devToolsListener);
    });
});

chrome.runtime.onMessageExternal.addListener(
    function (request, sender, sendResponse) {
        var devtoolConnection = devtoolConnections[sender.tab.id];

        if (devtoolConnection) {
            devtoolConnection.postMessage(request);
        }
    });

function injectPostalDiagnostics(tabId) {
    chrome.tabs.executeScript(tabId, {file: 'content-scripts/entry.js'});
}

