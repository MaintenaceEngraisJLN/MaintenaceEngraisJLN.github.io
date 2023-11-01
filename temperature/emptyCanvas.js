        


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
          label: 'Température',
          data: [0],
          borderColor : 'red',
          fill: false,
          borderDash: [5, 5],
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Evolution des valeurs de Température'
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
     


 
    