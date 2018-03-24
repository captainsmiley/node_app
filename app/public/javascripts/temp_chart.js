var ctx = document.getElementById("myChart");

var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            label: 'data',
            data: null ,
            backgroundColor: 
                'rgba(255, 99, 132, 0.2)',
            borderColor: 
                'rgba(255,99,132,1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            xAxes: [{
                type: 'time',
                time: { 
                    displayFormats: {
                        second: 'mm:ss',
                        minute: 'HH:mm',
                        hour: 'DD/MM HH'
                    }
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero:false
                }
            }]
        }
    }
});

function getAllData(t) {
$(function(){
    var u = '/temp/tempdata';
    if (t != '')
        u = '/temp/tempdatafrom/'+t;
    $.ajax({
        url: u,
        type: 'GET',
        success : function(data) {
            myChart.data.datasets[0].data = data;
            myChart.update();;
        }
    });
});
}


