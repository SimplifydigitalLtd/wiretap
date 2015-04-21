/**
 * Created by scarratt on 21/04/2015.
 */
var backgroundPageConnection = chrome.runtime.connect({
    name: "devtools"
});

renderjson.set_show_to_level(1);

ko.bindingHandlers.json = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
    },
    update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        element.appendChild(renderjson(value));
    }
};

$(document).ready(function () {
    ko.applyBindings(new WiretapViewModel({connection: backgroundPageConnection}));
});

function WiretapViewModel(params) {
    var self = this,
        allLogs = ko.observableArray([]),
        searchInput = ko.observable(),
        filtered = ko.computed(function () {
            return _.filter(allLogs(), function (event) {
                return event.channel != 'postal';
            });
        }),
        searched = ko.computed(function () {
            var searchValue = searchInput();

            if (searchValue) {
                var parsedObjectFilter;
                try {
                    parsedObjectFilter = JSON.parse(searchValue);
                } catch (error) {

                }
                return _.chain(filtered())
                    .filter(parsedObjectFilter)
                    .filter(function (event) {
                        var searchRegex = new RegExp(searchValue, 'gi');
                        return event.topic.match(searchRegex) || event.channel.match(searchRegex);
                    }).value();
            }


            return filtered();
        }),
        recent = ko.computed(function () {
            return _.take(filtered(), 4);
        });

    params.connection.onMessage.addListener(function (message) {
        if (message.type === 'init') {
            allLogs([]);
        } else {
            allLogs.unshift(JSON.parse(message.data));
        }
    });

    params.connection.postMessage({tabId: chrome.devtools.inspectedWindow.tabId});

    self.searchValue = searchInput;
    self.allLogs = allLogs;
    self.filtered = filtered;
    self.recent = recent;
    self.searched = searched;
    self.clear = function () {
        allLogs([]);
    };
}