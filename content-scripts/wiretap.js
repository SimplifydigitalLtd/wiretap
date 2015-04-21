require(['postal.diagnostics'], function (DiagnosticsWireTap) {
    console.log('loaded');
    new DiagnosticsWireTap({
        writer: function (output) {
            chrome.runtime.sendMessage(chromeExtensionId, {greeting: "hello"}, function(response) {
                console.log('yeah');
                console.log(response);
            });
        }
    });
});

