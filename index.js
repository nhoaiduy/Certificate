var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var {connect, sql} = require('./connect');
const e = require('express');

// parse application/json
app.use(bodyParser.json())

require('./app/routes/certificate-type_route')(app)
require('./app/routes/course_route')(app)
require('./app/routes/certificate_route')(app)
require('./app/routes/candidate_route')(app)
require('./app/routes/employee_route')(app)
require('./app/routes/account_route')(app)
require('./app/routes/test-schedule_route')(app)
require('./app/routes/test-info_route')(app)
require('./app/routes/schedule_route')(app)
require('./app/routes/schedule-info_route')(app)



app.listen(3000, function(){
    console.log('http://localhost:3000')
});
