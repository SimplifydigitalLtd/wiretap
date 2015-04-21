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
        if (element.hasChildNodes()){
            element.replaceChild(renderjson(value), element.firstChild)
        }else {
            element.appendChild(renderjson(value));
        }
    }
};

var messageStream = new MessageStream();

var messageCollection = new MessageCollection(messageStream);

messageStream.start();

$(document).ready(function () {
    ko.applyBindings(new WiretapViewModel({collection: messageCollection, stream: messageStream}));
});

function WiretapViewModel(params) {
    var self = this;

    self.searchView =  new SearchView(params);
    self.timelineView =  new TimelineView(params);
    self.channelView =  new ChannelView(params);
    self.clear = function () {
        params.stream.resetEvent.publish();
    };
    self.filterSystemMessages = params.collection.filterSystemMessages;
}