    

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
            borderColor : '#36A2EB',
//            borderColor: Utils.CHART_COLORS.red,
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
                unit: 'day'
                 //round: 'day'
                //tooltipFormat: 'll HH:mm'
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




    function sendHttpRequestForAlert(selectedValue) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var response = xhr.responseText;
          displayResponseForAlert(response,selectedValue);
        }
      };
      xhr.open("GET", "https://script.google.com/macros/s/AKfycbzefFDcfX2c4Pe0ufUYDc7kcn-YP3DfQZTI7sa_VhFUQaoVwsd2v8EuG-s9Ga9ieuRB/exec?func=RR&id=11", true);  // Replace with your API endpoint
      xhr.send();
    };

      

    function displayResponseForAlert(response,selectedValue) {
          var responseLines = response.trim().split('\n');


 
          var familleSet = new Set();
          var famillearray = [];
          var equipementarray = [];
          var pointarray = [];
          var seuil = [];
          
   
          for (var i = 1; i < responseLines.length; i++) {
            var fields = responseLines[i].split(',');
            if (selectedValue==fields[2]){
              familleSet.add(fields[1]);
              famillearray.push(fields[1]);
              equipementarray.push(fields[0]);
              pointarray.push(fields[3]);
              seuil.push(fields[4]);
              
            }
          }





          const familleString = famillearray.join(",");
          const equipementString = equipementarray.join(",");
          const pointString = pointarray.join(",");
          const seuilString = seuil.join(",");
          


          document.getElementById("famillestr").innerText= familleString;
          document.getElementById("equipementstr").innerText= equipementString;
          document.getElementById("pointstr").innerText= pointString;
          document.getElementById("seuilVstr").innerText= seuilString;
          




          


        var select = document.getElementById('valueSelectorEquipementForAlert');

        var option = document.createElement('option');
          option.value = 'Choose ...';
          option.text = 'Choose ...';
          select.appendChild(option);


        familleSet.forEach(function(ligne) {
          var option = document.createElement('option');
          option.value = ligne;
          option.text = ligne;
          select.appendChild(option);
        });

        var dropdown = document.getElementById("valueSelectorLigneForAlert");
            dropdown.disabled = false;
        var dropdown1 = document.getElementById("valueSelectorEquipementForAlert");
            dropdown1.disabled = false;
        


      };




//PLOT MULTIPLE CURVES


    function sendHttpRequest21(selectedValueL,selectedValueP) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var response = xhr.responseText;
          displayResponse21(response);
        }
      };
      xhr.open("GET", "https://script.google.com/macros/s/AKfycbze1UWW8NYHkU1zjnCF5knl6CIj4JqX-8GEduWvpohTO65Yi-pYuW_D5gOZnT11n1YJ/exec?func=MultiPlot&id=17&ligne="+selectedValueL+"&point="+selectedValueP, true);  // Replace with your API endpoint
      xhr.send();
    };

      

    function displayResponse21(response) {
          var responseLines = response.split(',');


          
        


          var dateSetTtemp = responseLines[0].split('|');
          var dateSet=[];
          var temp1 = [];

          for (var x=0;x<dateSetTtemp.length;x++){

            temp1=dateSetTtemp[x].split("/");

            dateSet[x]= new Date(temp1[2]+'-'+temp1[1]+'-'+temp1[0]);
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
          datasets: []
        },
        options: {


          spanGaps: true,
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
                unit: 'day'
                 //round: 'day'
                //tooltipFormat: 'll HH:mm'
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

      var ePVToPlot = [];
      var equiAndPointToPlotAndVal =[];
      var equiAndPointToPlot ="";
      var pointToPlot = [];
      var datatopush = {label: '',data: [],borderColor : '#36A2EB',tension: 0,fill: false};
      var colors = ['#FF9900','#FF3300','#00FFFF','#990000','#99CC00','#FFFF00','#33FF00','#339900','#333300','#000000','#996600','#FF9900','#FF3300','#00FFFF','#990000','#99CC00','#FFFF00','#33FF00','#339900','#333300','#000000','#996600','#FF9900','#FF3300','#00FFFF','#990000','#99CC00','#FFFF00','#33FF00','#339900','#333300','#000000','#996600','#FF9900','#FF3300','#00FFFF','#990000','#99CC00','#FFFF00','#33FF00','#339900','#333300','#000000','#996600'];
      var ind =0;

      for(var i=1;i<responseLines.length;i++){

        ePVToPlot=responseLines[i].split("$");
        for(var j=0;j<ePVToPlot.length;j++){

          equiAndPointToPlotAndVal=ePVToPlot[j].split("*");
          equiAndPointToPlot=equiAndPointToPlotAndVal[0];
          pointToPlot = equiAndPointToPlotAndVal.slice(1);
          var transformedpointArray = pointToPlot.map(function (element) {
            return element === "" ? undefined : element;
          });



          var datatopush = {label: equiAndPointToPlot,data: transformedpointArray,borderColor : colors[ind],tension: 0,fill: false};
          ind=ind+1;
          
          config.data.datasets.push(datatopush);



        }
        






        
      }



              





      document.getElementById("temp").innerText=colors;




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


   

                  
          
      };




      function interpolateColor(color1, color2, factor) {
              var r1 = parseInt(color1.substring(1, 3), 16);
              var g1 = parseInt(color1.substring(3, 5), 16);
              var b1 = parseInt(color1.substring(5, 7), 16);

              var r2 = parseInt(color2.substring(1, 3), 16);
              var g2 = parseInt(color2.substring(3, 5), 16);
              var b2 = parseInt(color2.substring(5, 7), 16);

              var r = Math.round(r1 + (r2 - r1) * factor);
              var g = Math.round(g1 + (g2 - g1) * factor);
              var b = Math.round(b1 + (b2 - b1) * factor);

              // Convert the RGB values back to a hex color code
              var hexR = r.toString(16).padStart(2, '0');
              var hexG = g.toString(16).padStart(2, '0');
              var hexB = b.toString(16).padStart(2, '0');

              return `#${hexR}${hexG}${hexB}`;
      }

      // Generate n color codes from red to purple
      function generateColors(n) {
              var colors = [];
              for (var i = 0; i < n; i++) {
                  var factor = i / (n - 1); // Adjust this to control the range
                  var color = interpolateColor("#000000", "#FFFF00", factor);
                  colors.push(color);
              }
              return colors;
      }