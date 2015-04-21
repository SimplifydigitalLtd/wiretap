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

var wireTapConnection = new WiretapConnection();

var messageCollection = new MessageCollection(wireTapConnection);

$(document).ready(function () {
    ko.applyBindings(new WiretapViewModel({collection: messageCollection}));
});

function WiretapViewModel(params) {
    var self = this,
        searchInput = ko.observable(),
        searched = ko.computed(function () {
            var searchValue = searchInput();

            if (searchValue) {
                var parsedObjectFilter;
                try {
                    parsedObjectFilter = JSON.parse(searchValue);
                } catch (error) {

                }
                return _.chain(params.collection.messages())
                    .filter(parsedObjectFilter)
                    .filter(function (event) {
                        var searchRegex = new RegExp(searchValue, 'gi');
                        return event.topic.match(searchRegex) || event.channel.match(searchRegex);
                    }).value();
            }

            return params.collection.messages();
        }),
        recent = ko.computed(function () {
            return _.take(params.collection.messages(), 4);
        });

    self.searchValue = searchInput;
    self.messages = params.collection.messages;
    self.recent = recent;
    self.searched = searched;
    self.clear = function () {
        params.collection.clear();
    };
    self.filterSystemMessages = params.collection.filterSystemMessages;
}