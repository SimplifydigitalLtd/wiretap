
require(['postal'], function (postal) {

    chrome.runtime.sendMessage(chromeExtensionId, {type: "init"});

    postal.addWireTap( function( d, e ) {
        e.timeStamp = e.timeStamp.toString();
        chrome.runtime.sendMessage(chromeExtensionId, {data: e});
    });
});

