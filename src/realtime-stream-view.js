/**
 * Created by scarratt on 21/04/2015.
 */

function RealtimeStream(params) {
    var self =this,
        chart = new chartRT();

    params.stream.newMessageEvent.addSubscriber(function () {
        chart.addCount();
    });
}