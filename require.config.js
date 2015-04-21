/**
 * Created by scarratt on 18/12/2014.
 */
// require.js looks for the following global when initializing
var require = {
    baseUrl: chrome.extension.getURL(''),
    paths: {
        "bootstrap":            "bower_components/components-bootstrap/js/bootstrap.min",
        "jquery":                   "bower_components/jquery/dist/jquery",
        "jqueryui":                 "bower_components/jqueryui/jquery-ui",
        "knockout":                 "bower_components/knockout/dist/knockout",
        "text":                     "bower_components/requirejs-text/text",
        "underscore":               "bower_components/underscore/underscore",
        "knockout-projections":     "bower_components/knockout-projections/dist/knockout-projections",
        "postal":               "bower_components/postal.js/lib/postal",
        "lodash":               "bower_components/lodash/dist/lodash"
    },
    shim: {
        "bootstrap": { deps: ["jquery"] },
        'underscore' : {
            exports : '_'
        }
    }
};
