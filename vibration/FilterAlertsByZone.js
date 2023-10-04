 
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


      var familleReccuperer = document.getElementById("famillestr").textContent;
      var famillearray = familleReccuperer.split(',');
      var equipementReccuperer = document.getElementById("equipementstr").textContent;
      var equipementarray = equipementReccuperer.split(',');
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

      
      var selectedValueAF = '';

      var selectedValuesEquipement = [];
      var selectedValuesPoint = [];
      var selectedValuesSeuilV = [];
      var selectedValuesSeuilA = [];

      for (var i = 0; i < dropdownAlertEquipementByEquipement.options.length; i++) {
                if (dropdownAlertEquipementByEquipement.options[i].selected) {
                    selectedValueAF=dropdownAlertEquipementByEquipement.options[i].value;
                    if (i>0){

                      for (t=0;t<equipementarray.length;t++){
                        if(famillearray[t]==selectedValueAF){

                           selectedValuesEquipement.push(equipementarray[t]);
                           selectedValuesPoint.push(pointarray[t]);
                           selectedValuesSeuilV.push(seuilVarray[t]);
                           selectedValuesSeuilA.push(seuilAarray[t]);
                         }
                      }
                    }
                    i=dropdownAlertEquipementByEquipement.options.length;
                }
        }




        var responseLines = response.trim().split('\n');
        var responseFiltredLines = [];

        responseFiltredLines.push(responseLines[0].split(','));

        for(var b=1;b<responseLines.length;b++){

          var fields1 = responseLines[b].split(',');
          var ligne1 = fields1[6];
          var famille1 = fields1[5];

          if (ligne1 == selectedValueAZ && famille1 == selectedValueAF){

            responseFiltredLines.push(fields1);


          }


        }







        var entetRecord = responseLines[0].split(',');
        var entetToKeep =[];

        let count = 0;
        


        for(var j=8;j<entetRecord.length;j++){
          count = 0;
          for (let i = 0; i < responseFiltredLines.length; i++) {
            if (responseFiltredLines[i][j]!=="") {
              count++;

            }
          }
          

          if(count>1){

            entetToKeep.push(entetRecord[j]);

          }
        }
        





        var tableHtml = "<table class='table table-striped table-sm'><tr><th style='text-align: center; vertical-align: middle;'>Equipement</th>";

        for(var j=0; j<entetToKeep.length;j++){

      

            tableHtml += "<th  style='text-align: center; vertical-align: middle;'>";
            tableHtml += entetToKeep[j];
            tableHtml += "</th>";

         }


       

        tableHtml += "</tr>";

        var points = [];
        var seuilsV = [];
        var seuilsA = [];


      for(var a=0;a<selectedValuesEquipement.length;a++){




        points = selectedValuesPoint[a].split('/');
        seuilsV = selectedValuesSeuilV[a].split('/');
        seuilsA = selectedValuesSeuilA[a].split('/');
      




        var equipementRecord = [];
        

      

        for (var i = 1; i < responseFiltredLines.length; i++) {
          var fields = responseFiltredLines[i];
          var equipement = fields[4];
          

          if (equipement == selectedValuesEquipement[a]) {

            equipementRecord=fields;  
            i = responseFiltredLines.length + 1;

          
           };
         }
       

         if(i > responseFiltredLines.length){

             tableHtml += "<tr><td style='text-align: center; vertical-align: middle; font-weight: bold;'>" + equipement + "</td>";


              for(var y=0; y<entetToKeep.length;y++){

                for(var w=8;w<equipementRecord.length;w++){

                      if (entetToKeep[y]==entetRecord[w]){

                        for (var k=0; k<points.length;k++){
                          if(entetToKeep[y]==points[k]+"_V"){

                            

                            if(equipementRecord[w] - seuilsV[k] > 0) {

                             

                              tableHtml += "<td style='background-color: red; text-align: center; vertical-align: middle; color : white; font-weight: bold;'>";
                              tableHtml += equipementRecord[w] ;
                              tableHtml += "</td>";
                              


                            }else{

                              tableHtml += "<td  style='text-align: center; vertical-align: middle;'>";
                              tableHtml += equipementRecord[w];
                              tableHtml += "</td>";


                            }

                            k=points.length;
                          }

                          if(entetToKeep[y]==points[k]+"_A"){

                            if(equipementRecord[w] - seuilsA[k]>0) {

                              tableHtml += "<td style='background-color: #fc0394; text-align: center; vertical-align: middle; color : white; font-weight: bold;'>";
                              tableHtml += equipementRecord[w];
                              tableHtml += "</td>";
                              


                            }else{

                              tableHtml += "<td style='text-align: center; vertical-align: middle;'>";
                              tableHtml += equipementRecord[w];
                              tableHtml += "</td>";


                            }

                            k=points.length;
                          }

                        }                
                    

                      }

               }
              }

               tableHtml += "</tr>";
            }



      }


       tableHtml += "</table>";




    


      document.getElementById("responseTable2").innerHTML = tableHtml;


      



      

      dropdownAlertZoneByEquipement.disabled = false;
      dropdownAlertEquipementByEquipement.disabled = false;

      

}
      
