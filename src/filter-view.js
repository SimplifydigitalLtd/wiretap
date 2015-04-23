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
    self.activeFilters.update = function() {
        this(_.reject(params.eventFilter.calculateCombinedFilterView(), {text: exclusiveFilterText}));
    };

    self.excludeSystemMessages.subscribe(function (newValue) {

        if (newValue){
            params.eventFilter.addFilter(systemMessageFilter);
        } else {
            params.eventFilter.removeFilter(systemMessageFilter);
        }

        self.activeFilters.update();
    });

    self.addFilter = function () {
        var filterText = self.currentFilterText();
        self.currentFilterText('');

        params.eventFilter.addFilter({exclusive: self.addExclusiveFilter(), text: filterText});

        self.activeFilters.update();
    };

    self.removeFilter = function (filter) {
        params.eventFilter.removeFilter(filter);

        self.activeFilters.update();
    };

    params.eventFilter.addFilter(systemMessageFilter);
}