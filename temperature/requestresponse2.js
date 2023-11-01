
    
    function handleDropdownLigneChange(){


        var element = document.getElementById("canvas"); // Replace "myElement" with the actual ID of your element
        if (element) {
                element.style.display = "none";
        };

        var element = document.getElementById("canvasEmpty"); // Replace "myElement" with the actual ID of your element
        if (element) {
              element.style.display = "block";

        };

        var dropdown = document.getElementById("valueSelectorLigne");
        var dropdownToTarget = document.getElementById("valueSelectorEquipement");
        var dropdownToTarget2 = document.getElementById("valueSelectorPoint");


        dropdown.disabled = true;

        while (dropdownToTarget2.firstChild) {
            dropdownToTarget2.removeChild(dropdownToTarget2.firstChild);
        }

        while (dropdownToTarget.firstChild) {
            dropdownToTarget.removeChild(dropdownToTarget.firstChild);
        }


        
        var selectedValue = '';
        for (var i = 0; i < dropdown.options.length; i++) {
                if (dropdown.options[i].selected) {
                    selectedValue=dropdown.options[i].value;
                    i=dropdown.options.length;
                }
            }

            

        

            sendHttpRequest(selectedValue);             
      

    }



      function handleDropdownEquipementChange(){


        var element = document.getElementById("canvas"); // Replace "myElement" with the actual ID of your element
        if (element) {
                element.style.display = "none";
        };

        var element = document.getElementById("canvasEmpty"); // Replace "myElement" with the actual ID of your element
        if (element) {
              element.style.display = "block";

        };   




        var dropdownLigne = document.getElementById("valueSelectorLigne");
        var dropdownEquipement = document.getElementById("valueSelectorEquipement");
        var dropdownPoint = document.getElementById("valueSelectorPoint");

        dropdownLigne.disabled = true;
        dropdownEquipement.disabled = true;

        while (dropdownPoint.firstChild) {
            dropdownPoint.removeChild(dropdownPoint.firstChild);
        }


        
        var selectedValueL = '';
        var selectedValueE = '';
        for (var i = 0; i < dropdownLigne.options.length; i++) {
                if (dropdownLigne.options[i].selected) {
                    selectedValueL=dropdownLigne.options[i].value;
                    i=dropdownLigne.options.length;
                }
            }

            for (var i = 0; i < dropdownEquipement.options.length; i++) {
                if (dropdownEquipement.options[i].selected) {
                    selectedValueE=dropdownEquipement.options[i].value;
                    i=dropdownEquipement.options.length;
                }
            }

            

        

            sendHttpRequest1(selectedValueL,selectedValueE);            
      

      }








      function handleDropdownPointChange(){

        var dropdownLigne = document.getElementById("valueSelectorLigne");
        var dropdownEquipement = document.getElementById("valueSelectorEquipement");
        var dropdownPoint = document.getElementById("valueSelectorPoint");

        dropdownLigne.disabled = true;
        dropdownEquipement.disabled = true;
        dropdownPoint.disabled = true;

    

        
        var selectedValueL = '';
        var selectedValueE = '';
        var selectedValueP = '';
        for (var i = 0; i < dropdownLigne.options.length; i++) {
                if (dropdownLigne.options[i].selected) {
                    selectedValueL=dropdownLigne.options[i].value;
                    i=dropdownLigne.options.length;
                }
            }

            for (var i = 0; i < dropdownEquipement.options.length; i++) {
                if (dropdownEquipement.options[i].selected) {
                    selectedValueE=dropdownEquipement.options[i].value;
                    i=dropdownEquipement.options.length;
                }
            }


            for (var i = 0; i < dropdownPoint.options.length; i++) {
                if (dropdownPoint.options[i].selected) {
                    selectedValueP=dropdownPoint.options[i].value;
                    i=dropdownPoint.options.length;
                }
            }

            

        

            sendHttpRequest2(selectedValueL,selectedValueE,selectedValueP);
            
          
      

      }



    function handleDropdownLigneChangeForAlert(){




        var dropdownForAlert = document.getElementById("valueSelectorLigneForAlert");
        var dropdownToTargetForAlert = document.getElementById("valueSelectorEquipementForAlert");
        
            
       
        

        
        dropdownForAlert.disabled = true;
        dropdownToTargetForAlert.disabled = true;


        while (dropdownToTargetForAlert.firstChild) {
            dropdownToTargetForAlert.removeChild(dropdownToTargetForAlert.firstChild);
        }


        
        var selectedValue = '';
        for (var i = 0; i < dropdownForAlert.options.length; i++) {
                if (dropdownForAlert.options[i].selected) {
                    selectedValue=dropdownForAlert.options[i].value;
                    i=dropdownForAlert.options.length;
                }
            }

            

        

            sendHttpRequestForAlert(selectedValue);             
      

    }






function handleClick() {
    // Your custom code here
    alert("The <td> was clicked!");
}

function showTrendFunction(ligne,e,p,i){

        var ids = i.split('|');
        var countV=0;
        var countH=0;
        

        if(document.getElementById(i).style.backgroundColor != "yellow"){
            document.getElementById("E"+ids[0]).style.backgroundColor = "yellow";
            document.getElementById("P"+ids[1]).style.backgroundColor = "yellow";
            document.getElementById("E"+ids[0]).style.color = "black";
            document.getElementById("P"+ids[1]).style.color = "black";
            document.getElementById(i).style.backgroundColor = "yellow";
            
            
        }else{

            var nbrE = document.getElementById("nbrEqui").innerText;
            var nbrP = document.getElementById("nbrPoint").innerText;

            for(var k=1;k<nbrE;k++){



                if(document.getElementById(k+"|"+ids[1]).style.backgroundColor=="yellow"){

                    countV = countV+1;
                }
            }


            for(var k=1;k<nbrP;k++){

                if(document.getElementById(ids[0]+"|"+k).style.backgroundColor=="yellow"){

                    countH = countH+1;
                }
            }

            if(countH==1){

            
                if (ids[0] % 2 === 0){
                    document.getElementById("E"+ids[0]).style.backgroundColor = document.getElementById("idequi").style.backgroundColor;
                    document.getElementById(i).style.backgroundColor = document.getElementById("idequi").style.backgroundColor;
                }else{
                    document.getElementById("E"+ids[0]).style.backgroundColor = "white";
                    document.getElementById(i).style.backgroundColor = "white";
                    
                }

            }else{

                if (ids[0] % 2 === 0){
                    
                    document.getElementById(i).style.backgroundColor = document.getElementById("idequi").style.backgroundColor;
                }else{
                    
                    document.getElementById(i).style.backgroundColor = "white";
                    
                }


            }



            if(countV==1){

            
                document.getElementById("P"+ids[1]).style.backgroundColor = document.getElementById("idequi").style.backgroundColor;

            }


            
           
            document.getElementById("E"+ids[0]).style.color = "black";
            document.getElementById("P"+ids[1]).style.color = "black";

        }





        var table = document.getElementById("stateMap");
        var trElements = table.getElementsByTagName("tr");
        var tdElements = table.getElementsByTagName("td");
        var blueBackgroundTDIds = [];
        var t1="";

        for (var s = 1; s < trElements.length; s++) {
            var tr = trElements[s];
            var tdi = tr.getElementsByTagName("td");

            var backgroundColorE = window.getComputedStyle(tdi[0]).backgroundColor;


            if (backgroundColorE === "rgb(255, 255, 0)" || backgroundColorE === "yellow") {

                if (t1!=""){

                    t1=t1+","+document.getElementById(tdi[0].id).innerText;                
                
                }else{
                    t1=document.getElementById(tdi[0].id).innerText;

                }

            

                for (var l = 1; l < tdi.length; l++) {
                    var td = tdi[l];
                    var backgroundColor = window.getComputedStyle(td).backgroundColor;


                    // Check if the background color is blue (adjust the color value as needed)
                    if (backgroundColor === "rgb(255, 255, 0)" || backgroundColor === "yellow") {
                        
                           var ids = td.id.split('|');
                           t1=t1+"$"+ document.getElementById("P"+ids[1]).innerText;
                    }
                        
                }

            
            }

        }

        
        
         

        sendHttpRequest21(ligne,t1);
          
      
       //document.getElementById("temp").innerText=t1;
      }

