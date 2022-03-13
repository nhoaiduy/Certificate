module.exports = function(app){
    var csController = require('../controllers/schedule_controller')
    app.get('/schedule', csController.getList)
    app.get('/schedule/:ID', csController.getById)
    app.post('/schedule', csController.addNew)
    app.put('/schedule', csController.update)
    app.delete('/schedule/:ID', csController.delete)
}