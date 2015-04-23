/**
 * Created by scarratt on 23/04/2015.
 */


function EventFilter() {
    var self = this;
    self.inclusiveFilters = [];
    self.exclusiveFilters = [];

    self.calculateCombinedFilterView = function () {
        var inclusive = _.map(self.inclusiveFilters, function (filterText) {
            return {exclusive: false, text: filterText};
        });

        var exclusive = _.map(self.exclusiveFilters, function (filterText) {
            return {exclusive: true, text: filterText};
        });

        return _.union(inclusive, exclusive);
    };

    self.addFilter = function (filter) {
        if (filter.exclusive) {
            self.exclusiveFilters.push(filter.text);
        } else {
            self.inclusiveFilters.push(filter.text);
        }

    };

    self.removeFilter = function (filter) {
        if (filter.exclusive) {
            self.exclusiveFilters = _.without(self.exclusiveFilters, filter.text);
        } else {
            self.inclusiveFilters = _.without(self.inclusiveFilters, filter.text);
        }
    };

    self.eventAllowed = function (event) {
        if (self.exclusiveFilters.length && _.some(self.exclusiveFilters, matchFilter)) {
            return false;
        }

        if (self.inclusiveFilters.length) {
            return _.some(self.inclusiveFilters, matchFilter);
        } else {
            return true;
        }

        function matchFilter(filter) {
            var query = $objeq(filter);
            return query([event]).length > 0;
        }
    };


}
