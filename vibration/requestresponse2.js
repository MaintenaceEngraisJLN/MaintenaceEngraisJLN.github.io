
    
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

function showTrendFunction(l,e,p,i){

        var ids = i.split('|');


        if (document.getElementById("selectedTDid").innerText!=""){

            var oldids = document.getElementById("selectedTDid").innerText.split('|');
            document.getElementById(document.getElementById("selectedTDid").innerText).style.backgroundColor=document.getElementById("selectedTDoldValue").innerText;
            document.getElementById(document.getElementById("selectedTDid").innerText).style.color=document.getElementById("selectedTDoldColor").innerText;

            document.getElementById("E"+oldids[0]).style.backgroundColor=document.getElementById("selectedTDEoldColor").innerText;
            document.getElementById("E"+oldids[0]).style.color="black";
            
            document.getElementById("P"+oldids[1]).style.backgroundColor=document.getElementById("selectedTDPoldColor").innerText;
            document.getElementById("P"+oldids[1]).style.color="black";

            
        }
            document.getElementById("selectedTDid").innerText= i;
            document.getElementById("selectedTDoldValue").innerText=document.getElementById(i).style.backgroundColor;
            document.getElementById("selectedTDoldColor").innerText=document.getElementById(i).style.color;

            document.getElementById("selectedTDEoldColor").innerText=document.getElementById("E"+ids[0]).style.backgroundColor;
            document.getElementById("selectedTDPoldColor").innerText=document.getElementById("P"+ids[1]).style.backgroundColor;

            document.getElementById("E"+ids[0]).style.backgroundColor = "blue";
            document.getElementById("P"+ids[1]).style.backgroundColor = "blue";
            document.getElementById(i).style.backgroundColor = "blue";

            document.getElementById("E"+ids[0]).style.color = "white";
            document.getElementById("P"+ids[1]).style.color = "white";
            document.getElementById(i).style.color = "white";

            sendHttpRequest2(l,e,p);
            
          
      

      }