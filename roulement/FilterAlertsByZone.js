 
    function handleDropdownAlertZone() {
      var dropdownAlertZone = document.getElementById("valueSelectorAlertZone");
      dropdownAlertZone.disabled = true;
      handleDropdownAlertZone2();

    }



    function handleDropdownAlertZone2() {
      var xhr1 = new XMLHttpRequest();
      xhr1.onreadystatechange = function() {
        if (xhr1.readyState === 4 && xhr1.status === 200) {
          var response = xhr1.responseText;
          
          
          handleDropdownAlertZone1(response);

        }
      };
      xhr1.open("GET", "https://script.google.com/macros/s/AKfycbyr56hUrrsr8ooOSgMa3AtcePdy_rBnQhY7fqyZjoqP3DjIrxG1Ysg6Zd4WFWSdbZLC/exec?func=RR&id=2", true);  // Replace with your API endpoint
      xhr1.send();

      
    }




    function handleDropdownAlertZone1(response) {


      var dropdownAlertZone = document.getElementById("valueSelectorAlertZone");  
      

      var selectedValueAZ = '';

      for (var i = 0; i < dropdownAlertZone.options.length; i++) {
                if (dropdownAlertZone.options[i].selected) {
                    selectedValueAZ=dropdownAlertZone.options[i].value;
                    i=dropdownAlertZone.options.length;
                }
        }



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
        if (fields[0] == selectedValueAZ || selectedValueAZ == "Tous les zones" )  {  
            tableHtml += "<tr>";
            for (var j = 0; j < fields.length; j++) {
              tableHtml += "<td>" + fields[j] + "</td>";
            }
            tableHtml += "</tr>";
        }
      }
      
      tableHtml += "</table>";
      document.getElementById("responseTable1").innerHTML = tableHtml;

      dropdownAlertZone.disabled = false;

      

}

      
