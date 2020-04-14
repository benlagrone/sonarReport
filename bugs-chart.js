google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawSeriesChart);

function drawSeriesChart() {

var data = google.visualization.arrayToDataTable([
  ['ID', 'High', 'Low', 'Region',     'Population'],
  ['',    -2,              -2,      '',  0],
  ['',    10,              15,      '',  0],
  ['66723',    1,           1,      'Fail',  0],
  ['66722',    0,           4,      'Warn',   1],
  ['66998',    0,           0,      'Pass',  0],
  ['66404',    0,           6,      'Warn',    3],
  ['66725',    8,           13,      'Fail',    20],
  ['62621',    1,           1,       'Fail',    2],
  ['Connectivity ',   1,     0,      'Fail',    1],
]);

var options = {
  title: 'Stage Testing Results',
  hAxis: {title: 'High Severity Bugs'},
  vAxis: {title: 'Low Severity Bugs'},
  bubble: {textStyle: {fontSize: 11}}      };

var chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
chart.draw(data, options);
}