/**
 * Created by scarratt on 21/04/2015.
 */

function WiretapConnection(options) {
    options = options || {name: 'wiretap'};
    var backgroundPageConnection = chrome.runtime.connect({
        name: options.name
    });

    return {
        listenForMessages: function(listener){
            backgroundPageConnection.onMessage.addListener(listener);

            backgroundPageConnection.postMessage({tabId: chrome.devtools.inspectedWindow.tabId});
        }
    }
}