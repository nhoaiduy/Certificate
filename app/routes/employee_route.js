module.exports = function(app){
    var csController = require('../controllers/employee_controller')
    app.get('/employee', csController.getList)
    app.get('/employee/:ID', csController.getById)
    app.post('/employee', csController.addNew)
    app.put('/employee', csController.update)
    app.delete('/employee/:ID', csController.delete)
}