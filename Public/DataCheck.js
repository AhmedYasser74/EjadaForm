


function Submit(){
    
    let FName= document.getElementById("FName").value;
    let LName= document.getElementById("LName").value;
    let Num= document.getElementById("Number").value;
    let pass1=document.getElementById("password1").value;
    let pass2=document.getElementById("password2").value;
   
 if(pass1==""||pass2==""||document.getElementById("err4").textContent!=""||FName==""||LName==""||Num==""||document.getElementById("err").textContent!=""||document.getElementById("err2").textContent!=""||document.getElementById("err3").textContent!="")
 {
    document.getElementById("submit").type="button"
alert("Error");
 }
 else
 
 document.getElementById("submit").type="submit"
    
}
function Signin(){
    
    let FName= document.getElementById("FName").value;
    let LName= document.getElementById("LName").value;
    
    let pass2=document.getElementById("Number").value;
   
 if(pass2==""||FName==""||LName==""||document.getElementById("err").textContent!=""||document.getElementById("err2").textContent!=""||document.getElementById("err3").textContent!="")
 {
    document.getElementById("submit").type="button"
alert("Error");

 }
else{
    document.getElementById("submit").type="submit"
}
 

    
}
let flag,flag2;
function CheckName(id,s){
    let val=document.getElementById(id).value;
    
     flag=1;

    for(let i=0;i<val.length;i++){
        if(!isNaN(val[i]))
        flag=0;
    }
    
    if(flag==0)
       {
        
        let err=" Name Must be A String";
         let msg=document.getElementById(s);
         msg.textContent=err;
         msg.style.color="red";

       }

       else{
        let msg=document.getElementById(s);
        msg.textContent="";
       }

}


function CheckNumber(id,s){
    let val=document.getElementById(id).value;
    flag2=1;

   
   
   if(isNaN(val)||val.length!=11)
      {
       flag2=0;
       let err=" Phone Number Must be A Number with 11 #";
        let msg=document.getElementById(s);
        msg.textContent=err;
        msg.style.color="red";

      }

      else{
       let msg=document.getElementById(s);
       msg.textContent="";
      }
}
function Pass(){

let show =document.getElementById("CheckBox");
let pass = document.getElementById("Number");
if(show.checked){

    pass.type="text";
    
}
else
pass.type="password"

}

function PassCheck(){
    let pass1=document.getElementById("password1").value;
    let pass2=document.getElementById("password2").value;
    if(pass1==""||pass2=="")
    {
        let err=document.getElementById("err4").textContent="Please Enter Value For Password";
        flag3=0;
        
    }
    else if(pass1!=pass2){
        let err=document.getElementById("err4").textContent="Passwords does'nt match";
       
       flag3=0
    }
    else{
        document.getElementById("err4").textContent="";
       flag3=1;
    }

}