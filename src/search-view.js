/**
 * Created by scarratt on 21/04/2015.
 */

function SearchView(params){
    var self = this,
        searchInput = ko.observable(),
        collection = params.collection;

    self.searched = ko.computed(function () {
        var searchValue = searchInput();

        if (searchValue) {
            var parsedObjectFilter;
            try {
                parsedObjectFilter = JSON.parse(searchValue);
            } catch (error) {

            }
            return _.chain(collection.messages())
                .filter(parsedObjectFilter)
                .filter(function (event) {
                    var searchRegex = new RegExp(searchValue, 'gi');
                    return event.topic.match(searchRegex) || event.channel.match(searchRegex);
                }).value();
        }

        return collection.messages();
    });

    self.searchValue = searchInput;

}
