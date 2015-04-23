/**
 * Created by scarratt on 21/04/2015.
 */

function RealtimeStream(params) {
    var chart = new chartRT(),
        messageCount = 0;

    chart.xText = "Seconds";
    chart.yText = "Value";
    chart.titleText = "Realtime Stream";
    chart.Ticks = 2000;
    chart.TickDuration = 10;
    chart.MaxValue = 200;
    chart.Init();

    chart.addSeries("Messages");


    params.stream.newMessageEvent.addSubscriber(function () {
        messageCount++;
    });

    function plot() {
        chart.chartSeries["Messages"] = messageCount;
        messageCount = 0;
        setTimeout(plot, 250)
    }

    setTimeout(plot, 1000)

}