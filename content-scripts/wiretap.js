
require(['postal.diagnostics'], function (DiagnosticsWireTap) {

    chrome.runtime.sendMessage(chromeExtensionId, {type: "init"});

    new DiagnosticsWireTap({
        writer: function (output) {
            chrome.runtime.sendMessage(chromeExtensionId, {data: output});
        }
    });
});

