

    function sendHttpRequest(selectedValue) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var response = xhr.responseText;
          displayResponse(response,selectedValue);
        }
      };
      xhr.open("GET", "https://script.google.com/macros/s/AKfycbzefFDcfX2c4Pe0ufUYDc7kcn-YP3DfQZTI7sa_VhFUQaoVwsd2v8EuG-s9Ga9ieuRB/exec?func=RR&id=11", true);  // Replace with your API endpoint
      xhr.send();
    };

      

    function displayResponse(response,selectedValue) {
          var responseLines = response.trim().split('\n');


 
          var equipementSet = new Set();
   
          for (var i = 1; i < responseLines.length; i++) {
            var fields = responseLines[i].split(',');
            if (selectedValue==fields[2])
              equipementSet.add(fields[0]);
            }
            
          


        var select = document.getElementById('valueSelectorEquipement');

        var option = document.createElement('option');
          option.value = 'Blank';
          option.text = 'Choose ...';
          select.appendChild(option);


        equipementSet.forEach(function(ligne) {
          var option = document.createElement('option');
          option.value = ligne;
          option.text = ligne;
          select.appendChild(option);
        });

        var dropdown = document.getElementById("valueSelectorLigne");
            dropdown.disabled = false;


      };










    function sendHttpRequest1(selectedValueL,selectedValueE) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var response = xhr.responseText;
          displayResponse1(response);
        }
      };
      xhr.open("GET", "https://script.google.com/macros/s/AKfycbzefFDcfX2c4Pe0ufUYDc7kcn-YP3DfQZTI7sa_VhFUQaoVwsd2v8EuG-s9Ga9ieuRB/exec?func=RP&id=6&ligne="+selectedValueL+"&equipement="+selectedValueE, true);  // Replace with your API endpoint
      xhr.send();
    };

      

    function displayResponse1(response) {
          var responsepPoints = response.trim().split('/');


        var select = document.getElementById('valueSelectorPoint');

      var option = document.createElement('option');
          option.value = 'Blank';
          option.text = 'Choose ...';
          select.appendChild(option);


          responsepPoints.forEach(function(point) {
          var option = document.createElement('option');
          option.value = point;
          option.text = point;
          select.appendChild(option);
        });

        var dropdownL = document.getElementById("valueSelectorLigne");
            dropdownL.disabled = false;
            var dropdownE = document.getElementById("valueSelectorEquipement");
            dropdownE.disabled = false;



      };

    






    function sendHttpRequest2(selectedValueL,selectedValueE,selectedValueP) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var response = xhr.responseText;
          displayResponse2(response);
        }
      };
      xhr.open("GET", "https://script.google.com/macros/s/AKfycbwB0P6uuBumj1blHTIHfRxSE_Uv4QCJLhpo50vZikEcl4r0hcAIfu3BpV3hcbjXmiA0/exec?func=RH&id=7&ligne="+selectedValueL+"&equipement="+selectedValueE+"&point="+selectedValueP, true);  // Replace with your API endpoint
      xhr.send();
    };

      

    function displayResponse2(response) {
          var responseLines = response.trim().split('\n');


 
          var dateSet = [];
          var vibrationSet = [];
          var acceleratSet = [];
   
          for (var i = 0; i < responseLines.length; i++) {
            var fields = responseLines[i].split(',');
            var dateStructer = fields[0].split('/');

            var date1 = new Date(dateStructer[2]+'-'+dateStructer[1]+'-'+dateStructer[0]);
          
            dateSet[i] = date1;
            vibrationSet[i] = fields[1];
            acceleratSet[i] = fields[2];


            
        




            }


//PLOT CHART CODE

          var timeFormat = 'MM/DD/YYYY';
      var now = window.moment();
      var dragOptions = {
        animationDuration: 1000
      };

      function randomScalingFactor() {
        return Math.round(Math.random() * 100 * (Math.random() > 0.5 ? -1 : 1));
      }

      function randomColorFactor() {
        return Math.round(Math.random() * 255);
      }

      function randomColor(opacity) {
        return 'rgba(' + randomColorFactor() + ',' + randomColorFactor() + ',' + randomColorFactor() + ',' + (opacity || '.3') + ')';
      }

      function newDate(days) {
        return now.clone().add(days, 'd').toDate();
      }

      function newDateString(days) {
        return now.clone().add(days, 'd').format(timeFormat);
      }

      

    //  document.getElementById("drag-switch").textContent = dateSet ;

      var config = {
        type: 'line',
        data: {
          labels: dateSet, // Date Objects
          datasets: [{
            label: 'Température',
            data: vibrationSet,
            borderColor : '#FC2C00',
//            borderColor: Utils.CHART_COLORS.red,
            tension: 0,

            fill: false
            
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
                 //round: 'day'
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
            pan: {
              enabled: false,
              mode: 'x',

              xScale0: {
                max: 1e4
              }
            },
            zoom: {
              enabled: true,
              mode: 'x',
              drag: dragOptions,
            }
          }
        }
        }
      };








      var element = document.getElementById("canvasEmpty"); // Replace "myElement" with the actual ID of your element
       if (element) {
          element.style.display = "none";
        };

      var element = document.getElementById("canvas"); // Replace "myElement" with the actual ID of your element
       if (element) {
          element.style.display = "block";
        };




      var ctx = document.getElementById('canvas').getContext('2d');
      window.myLine = new window.Chart(ctx, config);

//END OF PLOT CHART CODE


      var dropdown = document.getElementById("valueSelectorLigne");
            dropdown.disabled = false;
            var dropdown = document.getElementById("valueSelectorEquipement");
            dropdown.disabled = false;
            var dropdown = document.getElementById("valueSelectorPoint");
            dropdown.disabled = false;
            
          
      };



 //PLOT CHART CODE

    





    window.resetZoom = function() {
      window.myLine.resetZoom();


      

  
    };

    window.toggleDragMode = function() {
      var chart = window.myLine;
      var zoomOptions = chart.options.plugins.zoom.zoom;
      zoomOptions.drag = zoomOptions.drag ? false : dragOptions;

      chart.update();
      document.getElementById('drag-switch').innerText = zoomOptions.drag ? 'Disable drag mode' : 'Enable drag mode';
    };

 //END OF PLOT CHART CODE





