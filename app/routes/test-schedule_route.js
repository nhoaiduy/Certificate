module.exports = function(app){
    var csController = require('../controllers/test-schedule_controller')
    app.get('/test', csController.getList)
    app.get('/test/:ID', csController.getById)
    app.post('/test', csController.addNew)
    app.put('/test', csController.update)
    app.delete('/test/:ID', csController.delete)
}