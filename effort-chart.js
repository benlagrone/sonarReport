
google.charts.load('current', { 'packages': ['corechart'] });
google.setOnLoadCallback(drawSeriesChart);

function drawSeriesChart() {
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'ID');
  data.addColumn('number', 'Bugs');
  data.addColumn('number', 'Vulnerabilities');
  data.addColumn('string', 'Risk');
  data.addColumn('number', 'Effort');
  data.addRows([
    ['', 50,5,'clear',0.5],
    ['', -0.5,-0.5,'clear',0.5]
  ]);
  dataImport.forEach(item=>{
    data.addRows([
      [
        item.name + ', ' + item.title,
        item.bugs.total,
        item.vulnerability.total,
        item.bugs.total>3?"High":item.bugs.total<1?"Low":"Medium",
        item.effortTotal,
      ]
    ]);
  })

  var options = {
    title: 'SonarQube Code Quality Risk Analysis',
    hAxis: { title: 'Bugs' },
    vAxis: { title: 'Vulnerabilities' },
    bubble: { textStyle: { fontSize: 11 } },
    series: {'clear':{color:'white'}, 'High':{color:'red'}, 'Med':{color:'yellow'}, 'Low':{color:'green'}}
  };

  var chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
  chart.draw(data, options);
}