/**
 * Created by scarratt on 23/04/2015.
 */


function FilterView(params) {
    var self = this,
        exclusiveFilterText = "channel == 'postal'",
        systemMessageFilter = {exclusive: true, text: exclusiveFilterText};

    self.currentFilterText = ko.observable();
    self.excludeSystemMessages = ko.observable(true);
    self.addExclusiveFilter = ko.observable(false);
    self.activeFilters = ko.observable();
    self.activeFilters.calculateCombinedFilterView = function() {
        var inclusive = _.map(params.eventFilter.inclusiveFilters, function (filterText) {
            return {exclusive: false, text: filterText};
        });

        var exclusive = _.chain(params.eventFilter.exclusiveFilters)
            .without(exclusiveFilterText)
            .map(function (filterText) {
                return {exclusive: true, text: filterText};
            }).value();

        this(_.union(inclusive, exclusive));
    };

    self.excludeSystemMessages.subscribe(function (newValue) {

        if (newValue){
            params.eventFilter.addFilter(systemMessageFilter);
        } else {
            params.eventFilter.removeFilter(systemMessageFilter);
        }

        self.activeFilters.calculateCombinedFilterView();
    });

    self.addFilter = function () {
        var filterText = self.currentFilterText();
        self.currentFilterText('');

        params.eventFilter.addFilter({exclusive: self.addExclusiveFilter(), text: filterText});

        self.activeFilters.calculateCombinedFilterView();
    };

    self.removeFilter = function (filter) {
        params.eventFilter.removeFilter(filter);

        self.activeFilters.calculateCombinedFilterView();
    };

    params.eventFilter.addFilter(systemMessageFilter);
}