 
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
      xhr1.open("GET", "https://script.google.com/macros/s/AKfycbyr56hUrrsr8ooOSgMa3AtcePdy_rBnQhY7fqyZjoqP3DjIrxG1Ysg6Zd4WFWSdbZLC/exec?func=RR&id=0", true);  // Replace with your API endpoint
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



















function handleDropdownAlertZoneByEquipement() {
      var dropdownAlertEquipementByEquipement = document.getElementById("valueSelectorEquipementForAlert");
      dropdownAlertEquipementByEquipement.disabled = true;
      var dropdownAlertZoneByEquipement = document.getElementById("valueSelectorLigneForAlert");
      dropdownAlertZoneByEquipement.disabled = true;

      handleDropdownAlertZoneByEquipement2();

    }



    function handleDropdownAlertZoneByEquipement2() {
      var xhr1 = new XMLHttpRequest();
      xhr1.onreadystatechange = function() {
        if (xhr1.readyState === 4 && xhr1.status === 200) {
          var response = xhr1.responseText;
          
          
          handleDropdownAlertZoneByEquipement1(response);

        }
      };
      xhr1.open("GET", "https://script.google.com/macros/s/AKfycbyr56hUrrsr8ooOSgMa3AtcePdy_rBnQhY7fqyZjoqP3DjIrxG1Ysg6Zd4WFWSdbZLC/exec?func=RR&id=13", true);  // Replace with your API endpoint
      xhr1.send();

      
    }




    function handleDropdownAlertZoneByEquipement1(response) {


  
      var dropdownAlertEquipementByEquipement = document.getElementById("valueSelectorEquipementForAlert");
      
      var dropdownAlertZoneByEquipement = document.getElementById("valueSelectorLigneForAlert");



      var pointReccuperer = document.getElementById("pointstr").textContent;
      var pointarray = pointReccuperer.split(',');
      var seuilVReccuperer = document.getElementById("seuilVstr").textContent;
      var seuilVarray = seuilVReccuperer.split(',');
      var seuilAReccuperer = document.getElementById("seuilAstr").textContent;
      var seuilAarray = seuilAReccuperer.split(',');


      
      var selectedValueAZ = '';

      for (var i = 0; i < dropdownAlertZoneByEquipement.options.length; i++) {
                if (dropdownAlertZoneByEquipement.options[i].selected) {
                    selectedValueAZ=dropdownAlertZoneByEquipement.options[i].value;
                    i=dropdownAlertZoneByEquipement.options.length;
                }
        }

      
      var selectedValueAE = '';
      var selectedValuePoint = '';
      var selectedValueSeuilV = '';
      var selectedValueSeuilA = '';

      for (var i = 0; i < dropdownAlertEquipementByEquipement.options.length; i++) {
                if (dropdownAlertEquipementByEquipement.options[i].selected) {
                    selectedValueAE=dropdownAlertEquipementByEquipement.options[i].value;
                    if (i>0){
                     selectedValuePoint = pointarray[i-1];
                     selectedValueSeuilV = seuilVarray[i-1];
                     selectedValueSeuilA = seuilAarray[i-1];
                    }
                    i=dropdownAlertEquipementByEquipement.options.length;
                }
        }



        var points= selectedValuePoint.split('/');
        var seuilsV= selectedValueSeuilV.split('/');
        var seuilsA= selectedValueSeuilA.split('/');
      









      var responseLines = response.trim().split('\n');

      var equipementRecord = [];
      var entetRecord = responseLines[0].split(',');

      

      for (var i = 1; i < responseLines.length; i++) {
        var fields = responseLines[i].split(',');
        var ligne = fields[6];
        var equipement = fields[4];
        

        if ( ligne == selectedValueAZ && equipement == selectedValueAE) {

          equipementRecord=fields;  
          i = responseLines.length;

        
         };
       }
     


     var tableHtml = "<table class='table table-striped table-sm'><tr>";

     for(var j=8; j<equipementRecord.length;j++){

        if (equipementRecord[j]!=""){

          tableHtml += "<th  style='text-align: center; vertical-align: middle;'>";
          tableHtml += entetRecord[j];
          tableHtml += "</th>";

        }


     }

     tableHtml += "</tr>";

     tableHtml += "<tr>";


      for(var j=8; j<equipementRecord.length;j++){

        if (equipementRecord[j]!=""){

          for (var k=0; k<points.length;k++){
            if(entetRecord[j]==points[k]+"_V"){

              if(equipementRecord[j]>seuilsV[k]) {

                tableHtml += "<td style='background-color: red; text-align: center; vertical-align: middle; color : white; font-weight: bold;'>";
                tableHtml += equipementRecord[j];
                tableHtml += "</td>";
                


              }else{

                tableHtml += "<td  style='text-align: center; vertical-align: middle;'>";
                tableHtml += equipementRecord[j];
                tableHtml += "</td>";


              }

              k=points.length;
            }

            if(entetRecord[j]==points[k]+"_A"){

              if(equipementRecord[j]>seuilsA[k]) {

                tableHtml += "<td style='background-color: red; text-align: center; vertical-align: middle; color : white; font-weight: bold;'>";
                tableHtml += equipementRecord[j];
                tableHtml += "</td>";
                


              }else{

                tableHtml += "<td style='text-align: center; vertical-align: middle;'>";
                tableHtml += equipementRecord[j];
                tableHtml += "</td>";


              }

              k=points.length;
            }

          }

          


          

        }

       }

       tableHtml += "</tr>";

       tableHtml += "</table>";


      document.getElementById("responseTable2").innerHTML = tableHtml;


      



      

      dropdownAlertZoneByEquipement.disabled = false;
      dropdownAlertEquipementByEquipement.disabled = false;

      

}
      
