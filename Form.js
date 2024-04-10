







const express=require("express");
const bcrypt= require("bcrypt");
const app=express();
const bodyParser = require('body-parser');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
// app.get("/",(request,response)=>{
 
  
//   response.render("index.ejs")
// })
app.use(bodyParser.json())
app.use(express.static("Public"))
app.listen(5500,()=>{
    console.log("I'm Listening from port 5500");
})

app.use(express.json())

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'sql8.freemysqlhosting.net',
    user: 'sql8696843',
    password: '5Qwl8FaYIQ',
    database: 'sql8696843'
});

connection.connect((err)=>{
    if(err){
        console.log("Error in Connection");
        return;
    }
    

console.log("Connected Succefuly");
})

// connection.query('SELECT * FROM User',(err,res,field)=>{
//     if(err){
//         console.log(err);
//         return;
//     }
//     console.log(res[0]["Number"]);
// })
app.get("/Signup",(request,response)=>{

    response.render("Signups.ejs");
}
)
app.get("/",(request,response)=>{
   
response.render("\welcome.ejs",{ERR:""});

})

 let  User={
    Id:-1,
    FName:"",
    LName:"",
    Number:"",
    Password:"",
    Tasks:{
        Task:[],
      Done:[],
    },
}

app.post("/submit/AddTask",(request,response)=>{
    let {task}=request.body;
    let isFound=User.Tasks.Task.find(ele=>{
        return ele==task;
    })
    if(!isFound){
    User.Tasks.Task.push(task);
    console.log(task);
    console.log(User.Id);
    connection.query("INSERT INTO ToDoList (ListName,UserID) VALUES(?,?)",[task,User.Id],(err,res)=>{

if(err){
    response.send("Error");
}
else{
    

response.render("\login.ejs",{FN:User.FName,LN:User.LName,PN:User.Number,Tasks:User.Tasks.Task,Done:User.Tasks.Done});

}

    })



    }
    
})



app.post("/Signup/submit",async(request,response)=>{
let{FName,LName,Number,password1}=request.body;
const hashedPassword= await bcrypt.hash(password1,10);

    console.log(FName,LName,Number,password1);
    
     connection.query("INSERT INTO User (FirstName,LastName,Number,Password) VALUES(?,?,?,?)",[FName,LName,Number,hashedPassword],(err,res)=>{

        if(err){
            response.send(err);
        }
        else{
            User.Tasks.Task=[];
            User.Tasks.Done=[];
            connection.query('SELECT * FROM User Where FirstName=? AND LastName=?',[FName,LName],(err,result)=>{
if(err){
    response.send(err);

}        else{
    User.Id=result[0]["ID"];
    User.FName=result[0]["FirstName"];
    User.LName=result[0]["LastName"];
    User.Number=result[0]["Number"];
    User.Password=result[0]["Password"];
    response.render("\login.ejs",{FN:User.FName,LN:User.LName,PN:User.Number,Pass:User.Password,Tasks:User.Tasks.Task,Done:User.Tasks.Done});
}
              

            })
            
        }
     })
     
})

app.post("/submit",async(request,response)=>{
    const {FName,LName,Password}=request.body;
    console.log(FName,LName,Password);
   
    connection.query('SELECT * FROM User Where FirstName=?',[FName], async(err,result)=>{
        try{
       console.log(result[0]["Password"]);
        let CheckPass=await bcrypt.compare(Password,result[0]["Password"]);
        // console.log(CheckPass);
        //  if(err){
        //     response.render("\index.ejs",{ERR:err});
        // }
     
        if(CheckPass&&result[0]["LastName"]==LName&& result[0]["FirstName"]==FName){
            User.Id=result[0]["ID"];
            User.FName=result[0]["FirstName"];
            User.LName=result[0]["LastName"];
            User.Number=result[0]["Number"];
            User.Password=result[0]["Password"];
           
            connection.query('SELECT * FROM ToDoList Where UserID=?',[User.Id],(err,result)=>{
                if(err){
                    response.send(err);
                }
                else{
                    User.Tasks.Task=[];
                    User.Tasks.Done=[];
                   for(let j=0;j<result.length;j++){
                    User.Tasks.Task.push(result[j]["ListName"]);
                    User.Tasks.Done.push(result[j]["Done"]);
                   
                   }
                   
                   
                   console.log(User.Tasks.Done);
                   response.render("\login.ejs",{FN:User.FName,LN:User.LName,PN:User.Number,Tasks:User.Tasks.Task,Done:
                User.Tasks.Done});
                }
                
            })

     }
     
    else{
        let err="Invalid UserName or Password";
        
        response.render("\welcome.ejs",{ERR:err});
    }
}
    catch(err){
        response.render("\welcome.ejs",{ERR:"Invalid UserName or Password"});
    }

     
 
 
    })

 });

app.post("/submit/TaskDone",(request,response)=>{
   let{ListName,Done}=request.body;
   console.log(ListName,Done);
   connection.query("UPDATE ToDoList SET Done=? WHERE ListName=?",[Done,ListName],(err,res)=>{

if(err){
    response.send(err);
}
else
console.log("List Updated");


   })
})

 


// app.get("/login", (req, res) => {
   
//     res.sendFile(__dirname + '/login.html');
// });

    
    



