const express = require('express');
const app = express();
const mysql = require("mysql");
cors = require("cors");
app.use(express.json())
app.use(cors());

var db = mysql.createConnection({

    host: "localhost",
    user: "uma",
    password: "Amuv@1997!",
    database: "employees"

});

db.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + db.threadId);
  });
  app.get('/getAllEmployee',(req,res)=>{

    let queryStatement=`SELECT ed.id as id,ed.empName,ed.email,ed.reportingPerson,g.name as gender,b.name as bloodGroup FROM employeedetails ed 
    left join gender g on g.id=ed.genderId
    left join bloodgroup b on b.id=ed.bloodGroupId where ed.isActive=1;`
    db.query(queryStatement,(err,results)=>{
        if(err) console.log('error',err)
        console.log(results)
        res.json(results)
    })
  })

  app.get('/',(req,res)=>{

    let queryStatement=`select id ,name from gender where isActive=1;`
    db.query(queryStatement,(err,results)=>{
        if(err) console.log('error',err)
        console.log(results)
        res.json(results)
    })
  })
  app.get('/getAllBloodGroup',(req,res)=>{

    let queryStatement=`select id ,name from bloodgroup where isActive=1;`
    db.query(queryStatement,(err,results)=>{
        if(err) console.log('error',err)
        console.log(results)
        res.json(results)
    })
  })
  app.get('/getAllGender',(req,res)=>{

    let queryStatement=`select id ,name from gender where isActive=1;`
    db.query(queryStatement,(err,results)=>{
        if(err) console.log('error',err)
        console.log(results)
        res.json(results)
    })
  })

 

  app.get('/getEmployeeById/:id',(req,res)=>{

    let queryStatement=`SELECT ed.id as id,ed.empName,ed.email,ed.reportingPerson,ed.genderId,ed.bloodGroupId FROM employeedetails ed 
    left join gender g on g.id=ed.genderId
    left join bloodgroup b on b.id=ed.bloodGroupId where ed.isActive=1 && ed.id=?;`
    db.query(queryStatement,[req.params.id],(err,results)=>{
        if(err) console.log('error',err)
        console.log(results)
        res.json(results)
    })
  })

  app.post('/addEmployee',(req,res)=>{
    let {empName,email,reportingPerson,gender,bloodGroup}=req.body
    // console.log(empName,email,reportingPerson);
    let queryStatement=`insert into employeedetails (empName,email,reportingPerson,genderId,bloodGroupId,isActive) values (?,?,?,?,?,?)`
    db.query(queryStatement,[empName,email,reportingPerson,gender,bloodGroup,1],(err,results)=>{
        if(err) console.log('error',err)
        console.log(results)
        res.json(results)
    })
  })
  
  app.put('/updateEmployee/:id',(req,res)=>{
    let {empName,email,reportingPerson,gender,bloodGroup}=req.body
    // console.log(empName,email,reportingPerson);
    let queryStatement=`update employeedetails set empName=?,email=?,reportingPerson=?,genderId=?,bloodGroupId=? where isActive= ? && id =?`
    db.query(queryStatement,[empName,email,reportingPerson,gender,bloodGroup,1,+req.params.id],(err,results)=>{
        if(err) console.log('error',err)
        console.log(results)
        res.json(results)
    })
  })
  app.put('/deleteEmployee',(req,res)=>{
    // console.log(empName,email,reportingPerson);
    let queryStatement=`update employeedetails set isActive=? where id =?`
    db.query(queryStatement,[0,+req.body.id],(err,results)=>{
        if(err) console.log('error',err)
        console.log(results)
        res.json(results)
    })
  })

app.listen(4000, () => {
    console.log('port connected')
})