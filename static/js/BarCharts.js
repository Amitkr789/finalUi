// Load Google Charts
google.charts.load('current', { packages: ['corechart', 'calendar'] });
google.charts.setOnLoadCallback(drawAreaChart);
google.charts.setOnLoadCallback(drawCalendarChart);

// ---------------------- Area Chart ----------------------
function drawAreaChart() {
    var data = google.visualization.arrayToDataTable([
        ['Year', 'Sales', 'Expenses'],
        ['2013', 1000, 400],
        ['2014', 1170, 460],
        ['2015', 660, 1120],
        ['2016', 1030, 540]
    ]);

    var options = {
        title: 'Lead Performance',
        hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
        vAxis: { minValue: 0 }
    };

    var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}

// ---------------------- Calendar Chart ----------------------
function drawCalendarChart() {
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: 'date', id: 'Date' });
    dataTable.addColumn({ type: 'number', id: 'Won/Loss' });
    dataTable.addRows([
        [new Date(2024, 9, 4), 38177],
        [new Date(2024, 9, 5), 38705],
        [new Date(2024, 9, 12), 38210],
        [new Date(2024, 9, 13), 38029],
        [new Date(2024, 9, 19), 38823],
        [new Date(2024, 9, 23), 38345],
        [new Date(2024, 9, 24), 38436],
        [new Date(2024, 9, 30), 38447],
        [new Date(2025, 3, 13), 37032],
        [new Date(2025, 3, 14), 38024],
        [new Date(2025, 3, 15), 38024],
        [new Date(2025, 3, 16), 38108],
        [new Date(2025, 3, 17), 38229],
        
    ]);

    var options = {
        title: "Lead statistics by calendar",
        height: 350,
    };

    var chart = new google.visualization.Calendar(document.getElementById('calendar_basic'));
    chart.draw(dataTable, options);
}
