function AddTask(){
    let Task=document.getElementById("task").value;
    if(Task==""){
        alert("Please Enter A Task to be Added");
        document.getElementById("btn").type="button";
    }
    else{
        document.getElementById("btn").type="submit";
    }

}



// document.getElementById(0).checked=true;
function CheckBox(Task,i){
    
let checked;
    if(document.getElementById(i).checked){
        checked=true;
        
    }
    else
    checked=false;

        fetch('/submit/TaskDone', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // Example data to send in the POST request
            body: JSON.stringify({
                ListName:Task,
                Done:checked,
            })
    })


}
