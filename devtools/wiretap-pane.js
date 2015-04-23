/**
 * Created by scarratt on 21/04/2015.
 */

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

var eventFilter = new EventFilter();
var messageStream = new MessageStream({eventFilter: eventFilter});

var messageCollection = new MessageCollection(messageStream);

messageStream.start();

$(document).ready(function () {
    ko.applyBindings(new WiretapViewModel({collection: messageCollection, stream: messageStream, eventFilter: eventFilter}));
});

function WiretapViewModel(params) {
    var self = this;

    self.filterView = new FilterView(params);
    self.searchView =  new SearchView(params);
    self.timelineView =  new TimelineView(params);
    self.channelView =  new ChannelView(params);
    self.clear = function () {
        params.stream.resetEvent.publish();
    };
    self.stream = params.stream;
}