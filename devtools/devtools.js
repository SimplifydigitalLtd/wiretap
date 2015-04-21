/**
 * Created by scarratt on 21/04/2015.
 */

var backgroundPageConnection = chrome.runtime.connect({
    name: "devtools"
});

backgroundPageConnection.onMessage.addListener(function (message) {
    // Handle responses from the background page, if any
    console.log(message)
});

backgroundPageConnection.postMessage({
    tabId: chrome.devtools.inspectedWindow.tabId,
    scriptToInject: "entry.js"
});

chrome.devtools.panels.create("Wiretap",
    "MyPanelIcon.png",
    "devtools/wiretap-pane.html",
    function(panel) {



    }
);