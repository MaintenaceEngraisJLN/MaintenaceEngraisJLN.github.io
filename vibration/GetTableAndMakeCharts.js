 function sendHttpRequestTable() {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var response = xhr.responseText;
          displayResponseTable(response);
        }
      };
      xhr.open("GET", "https://script.google.com/macros/s/AKfycbyr56hUrrsr8ooOSgMa3AtcePdy_rBnQhY7fqyZjoqP3DjIrxG1Ysg6Zd4WFWSdbZLC/exec?func=RR&id=0", true);  // Replace with your API endpoint
      xhr.send();
    }

    function displayResponseTable(response) {
      var responseLines = response.trim().split('\n');

      var uniqueCombinations = [];
      var uniqueLigneEquipement = [];  // Object to store unique Ligne + Equipement combinations

      var combinedKey = 1;
      for (var i = 1; i < responseLines.length; i++) {
        var fields = responseLines[i].split(',');
        var ligne = fields[0];
        var equipement = fields[1];
        

    // Store the combination as a key in the object
        if (!uniqueLigneEquipement.includes(fields[0] + ',' + fields[1])) {
         uniqueCombinations[combinedKey] = fields[0] + ',' + fields[1] + ',' + fields[2] + ',' + fields[3] + ',' + fields[4] + ',' + fields[5] + ',' + fields[6];
         uniqueLigneEquipement[combinedKey] = fields[0] + ',' + fields[1] ;
         combinedKey=combinedKey+1;  

        
         };
       }
     







      var tableHtml = "<table class='table table-striped table-sm'><tr><th>Ligne</th><th>Equipement</th><th>Famille</th><th>Point de mesure</th><th>Seuil</th><th>Valeur</th><th>Date</th></tr>";
      
      for (var i = 1; i < responseLines.length; i++) {
        var fields = responseLines[i].split(',');
        tableHtml += "<tr>";
        for (var j = 0; j < fields.length; j++) {
          tableHtml += "<td>" + fields[j] + "</td>";
        }
        tableHtml += "</tr>";
      }
      
      tableHtml += "</table>";
      document.getElementById("responseTable1").innerHTML = tableHtml;

      
      var ligneData = {};
      var familleData = {};

      for (var i = 1; i < uniqueCombinations.length; i++) {
        var fields = uniqueCombinations[i].split(',');
        var ligne = fields[0];
        var famille = fields[2];

        // Count items per Ligne
        if (!ligneData[ligne]) {
          ligneData[ligne] = 1;
        } else {
          ligneData[ligne]++;
        }

        // Count items per Famille
        if (!familleData[famille]) {
          familleData[famille] = 1;
        } else {
          familleData[famille]++;
        }
      }



  // Customize the colors for each part of the bar chart
      var ligneColors = generateColors(Object.keys(ligneData));
      var familleColors = generateColors(Object.keys(familleData));

      function generateColors(labels) {
        var colors = [];
        var colorPalette = ['#4FC3A1', '#FF6384', '#36A2EB', '#FFCE56', '#9966FF', '#FF9900'];
        
        for (var i = 0; i < labels.length; i++) {
          colors.push(colorPalette[i % colorPalette.length]);
        }
        
        return colors;
      }




      // Create bar chart for Ligne data
      var ligneCanvas = document.getElementById('ligneChart');
      var ligneChart = new Chart(ligneCanvas, {
        type: 'bar',
        data: {
          labels: Object.keys(ligneData),
          datasets: [{
            label: 'Alerts par Zone',
      pointStyle: 'none',
            data: Object.values(ligneData),
            backgroundColor: ligneColors
          }]
        },
        options: {
          legend: {
            display: false
          },
      scales: {
        xAxes: [{
          ticks: {
            autoSkip: false
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
      plugins: {
  legend: {
        display: false,
  
  },
        datalabels: {
          anchor: 'end',
          align: 'top',
          formatter: function(value) {
            return value; // Display item value on the bar
          }
        }
      }
    }
  });

      // Create bar chart for Famille data
      var familleCanvas = document.getElementById('familleChart');
      var familleChart = new Chart(familleCanvas, {
        type: 'bar',
        data: {
          labels: Object.keys(familleData),
          datasets: [{
            label: "Alertes par famille d'Equipement",
      pointStyle: 'none',
            data: Object.values(familleData),
            backgroundColor: familleColors
          }]
        },
        options: {
          legend: {
            display: false
          },
      scales: {
        xAxes: [{
          ticks: {
            autoSkip: false
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
      plugins: {
  legend: {
        display: false,
  
  },
        datalabels: {
          anchor: 'end',
          align: 'top',
          formatter: function(value) {
            return value; // Display item value on the bar
          }
        }
      }
    }
  });
    }




    // Call the function when the page loads and every refresh
    sendHttpRequestTable();
