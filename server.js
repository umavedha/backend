const express = require('express');
const app = express();
const mysql = require("mysql");
cors = require("cors");

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

app.listen(4000, () => {
    console.log('port connected')
})