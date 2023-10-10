        


    var timeFormat = 'MM/DD/YYYY HH:mm';
    var now = window.moment();
    var dragOptions = {
      animationDuration: 1000
    };


    var config1 = {
      type: 'line',
      data: {
        labels: [window.moment()], // Date Objects
        datasets: [{
          label: 'Vibration',
          data: [0],
          borderColor : '#36A2EB',
          fill: false,
          borderDash: [5, 5],
        },
         {
          label: 'Acceleration',
          data: [0],
          borderColor : '#FC2C00',
      //  borderColor: Utils.CHART_COLORS.red,
          tension: 0,
          fill: false
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Evolution des valeurs de Vibration'
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              parser: timeFormat,
              // round: 'day'
              //tooltipFormat: 'll HH:mm'
              unit: 'day'

            },
            scaleLabel: {
              display: true,
              labelString: 'Date'
            },
            ticks: {
              maxRotation: 0
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'value'
            }
          }]
        },
        plugins: {
          zoom: {
            zoom: {
              enabled: true,
              drag: dragOptions,
              mode: 'x',
              speed: 0.05
            }
          }
        }
      }
    };



    window.resetZoom = function() {
      window.myLine.resetZoom();
    };



    window.onload = function() {

      var element = document.getElementById("canvas"); // Replace "myElement" with the actual ID of your element
       if (element) {
          element.style.display = "none";
        };

      var ctx = document.getElementById('canvasEmpty').getContext('2d');
      window.myLine = new window.Chart(ctx, config1);
    };
     


 
    